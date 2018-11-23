(function() {

    //동단위 데이터 집합 객체
    var data = {
    };

    //api interval 참조 변수
    var botInteval;
    //Bot 동작 여부
    var isBot = false;
    //단지별 면적 조회 실행 여부.
    var isArea = false;
    //현재 검색하는 단지 정보.
    var complex = undefined;


    var msg = {
        startConfirm : '조회된 데이터가 존재합니다. 삭제하고 봇을 실행하시겠습니까?'
    }

    var interval = {
        min : 1000,
        max : 2000
    }

    var replayCount = 3;

    var api = {
        //동별 단지 리스트
        dongComplex : 'https://new.land.naver.com/api/complexes',
        // 단지 기본정보
        complexInfo : 'https://new.land.naver.com/api/complexes/{{complexNo}}',
        // 단지 상세정보
        complexDetailInfo : 'https://new.land.naver.com/api/complexes/{{complexNo}}',
        // 매물 검색.
        articles : 'https://new.land.naver.com/api/articles/complex/{{complexNo}}',
        // 매물 상세 검색
        articlesDetail : 'https://new.land.naver.com/api/articles/{{articleNo}}'
    }




    var param = {
        articles : {
            realEstateType: 'APT',
            tradeType: 'A1',   //전세:B1,매매:A1 매물만 검색.
            tag: '::::::::',
            rentPriceMin: 0,
            rentPriceMax: 900000000,
            priceMin: 0,
            priceMax: 900000000,
            areaMin: 0,
            areaMax: 900000000,
            oldBuildYears: '',
            recentlyBuildYears: '',
            minHouseHoldCount: '',
            maxHouseHoldCount: '',
            showArticle: true,
            sameAddressGroup: true,
            minMaintenanceCost: '',
            maxMaintenanceCost: '',
            priceType: 'RETAIL',
            directions: '',
            page: 1,                        //페이징
            complexNo: '',           //단지 코드
            buildingNos: '',         //동선택인 경우 단지내 동코드
            areaNos: '',             //면적별 넘버
            type: 'list',
            order: 'rank'                   //prc:낮은 가격순, prcDesc: 높은가격순
        }

    }


    function Bot() {

        this.initData();
    }

    Bot.fn = Bot.prototype;

    Bot.fn.getData = function() {
        return data;
    }

    Bot.fn.initData = function() {
        data = {
            complexList : [],
            cortarList : [],
            bot : {
                version : appVer,
                startDate : new Date().getTime(),
                endDate : undefined
            }
        }
    }

    Bot.fn.start = function(cortarList) {
        if(isBot) {
            console.info('이미 Bot이 실행중입니다.');
            return;
        } else {
            if(data.complexList.length > 0) {
                if(!confirm(msg.startConfirm)) {
                    return false;
                }
            }
        }
        //봇 실행.
        isBot = true;
        //데이터 집합체 초기화.
        this.initData();


        //동코드 참조.
        if(cortarList && cortarList.length > 0) {
            //
            for(var i=0; i < cortarList.length; i++) {
                var obj = {
                    cortarNo : cortarList[i],
                    isGet : false,
                    reCnt : 0
                }
                data.cortarList.push(obj);
            }
        }
        console.log(cortarList);
        // 실행순서 1번 실행. 동별 단지 정보 가져오기.
        this.getComplex();
    }


    Bot.fn.setTimer = function(target, time) {

        if(typeof target === 'function') {
            if(isBot) {
                botInteval = setTimeout(target, time | bot.intervalTime())
            } else {
                console.warn('[Bot.fn.setTimer] isBot false. not set interval function');
                return false;
            }
        } else {
            console.error('[Bot.fn.setTimer] target is not function!');
            return false;
        }

    }

    Bot.fn.getComplex = function() {
        //가져 오지 않은 데이터 체크
        var isAllChecked = true;


        for(idx in data.cortarList) {
            if(!data.cortarList[idx].isGet) {
                console.log('[Bot.fn.getComplex] 단지리스트 조회를 시작합니다. cortarNo:' + data.cortarList[idx].cortarNo);
                var api = '';
                if(isDev) {
                    api ='./api/regions/complexList';
                } else {
                    api = 'https://new.land.naver.com/api/regions/complexes';
                }

                $.ajax({
                    method : 'GET',
                    url : api,
                    data : {
                        cortarNo : data.cortarList[idx].cortarNo,
                        realEstateType : 'APT',
                        order : undefined
                    },
                    dataType : 'json',
                    success : function(res) {
                        if(res.complexList.length > 0) {
                            data.complexList = data.complexList.concat(res.complexList);
                            console.log('[Bot.fn.getComplex]@success' + res.complexList[0].cortarAddress + '에 총' + res.complexList.length + '개의 단지가 있습니다. 검색대상에 추가합니다.');
                        }

                        data.cortarList[idx].isGet = true;
                        bot.setTimer(bot.getComplex);
                    },
                    error : function() {
                        data.cortarList[idx].reCnt++;
                        if(data.cortarList[idx].reCnt > replayCount) {
                            data.cortarList[idx].isGet = true;
                            console.warn('[Bot.fn.getComplex]@error cortarNo[' + data.cortarList[idx].cortarNo + ']조회 실패 카운트 3회가 초과되어 다음 대상으로 이동합니다.');
                        }
                        bot.setTimer(bot.getComplex);
                    }
                });
                isAllChecked = false;
                break;
            }
        }

        if(isAllChecked) {
            // isAllChecked = true 라는 것은 모두 조회가 완료되었다는 의미. 다음 스텝으로 진행.
            console.log('[Bot.fn.getComplex] 요청한 동의 단지 정보를 모두 조회하였습니다.');
            console.log('[Bot.fn.readyComplexInfo] 단지 상세 정보를 시작합니다.');
            bot.readyComplexInfo();

        }
    }


    Bot.fn.readyComplexInfo = function() {

        for(var i=0; i < data.complexList.length; i++) {
            data.complexList[i].check = {
                info : false,
                area : false,
                skip : false,
                complete : false
            };

            if(data.complexList[i].totalHouseholdCount < condition.household ) {
                data.complexList[i].check.info = false;
                data.complexList[i].check.area = false;
                data.complexList[i].check.skip = true;
                data.complexList[i].check.complete = false;
                console.log('세대수 조건 ' + condition.household + '보다 작은 ' + data.complexList[i].totalHouseholdCount + '세대, ' + data.complexList[i].complexName + '아파트를 조회대상에서 제외합니다.');
            }

        }
        console.log('[Bot.fn.readyComplexInfo > Bot.fn.getComplexFactory] 체크 상태를 모두 추가 하였습니다. 단지 정보를 조회를 시작합니다.');
        bot.getComplexFactory();

    }

    Bot.fn.getComplexFactory = function() {

        var complexIsAllChecked = true;

        for(var i=0; i < data.complexList.length; i++) {

            if(data.complexList[i].check.skip) {
                continue;
            }

            //단지 상세 정보를 조회해야함.
            if(!data.complexList[i].check.info) {
                bot.getComplexInfo(data.complexList[i]);
                complexIsAllChecked = false;
                break;
            }

            //매물 조회를 해야함.
            if(!data.complexList[i].check.area) {
                //단지 조회가 선행되지 않은 경우.
                if(!data.complexList[i].detail) {
                    this.errorSkip('E01');
                    return;
                }

                //complexPyeongDetailList.check = 면적별 체크리스트 객체 미실행 상태로 생성.
                if(!data.complexList[i].detail.check) {
                    data.complexList[i].detail.check = {
                        area : false,
                        complete : false
                    }
                }
                //complexPyeongDetailList.check.area = 면적별 체크리스트 생성
                if(!data.complexList[i].detail.check.area) {
                    data.complexList[i].detail.check.area = bot.readyAreaChecker(data.complexList[i].detail.complexPyeongDetailList);
                }

                //complexPyeongDetailList.check.complete = 면적별 매매/전세 물건 조회 하지 않은 경우.
                if(!data.complexList[i].detail.check.complete) {
                    //현재 정보 조회 단지 참조
                    complex = data.complexList[i];
                    bot.getAreaFactory();
                    complexIsAllChecked = false;
                    break;
                }

            }

        }

        if(complexIsAllChecked) {
            // isAllChecked = true 라는 것은 모두 조회가 완료되었다는 의미. 다음 스텝으로 진행.
            isBot = false;
            data.bot.endDate = new Date().getTime();

            var runTime = Math.floor((data.bot.endDate - data.bot.startDate)/1000);

            console.log('==================================================================');
            console.log('wecando bot version : ' + data.bot.version);
            console.log('bot 시작시간 : ' + app.timeToFullDate(data.bot.startDate));
            console.log('bot 종료시간 : ' + app.timeToFullDate(data.bot.endDate));
            console.log('bot 실행시간 : ' + Math.floor(runTime/60)  + '분 ' + (runTime%60) +'초');
            console.log('==================================================================');
            console.log('=============== ### bot collection completed ### =================');
            console.log('==================================================================');

            output.createTable();
        }

    }

    //단지 상세 정보 조회.
    Bot.fn.getComplexInfo = function(complex) {

        console.log('[Bot.fn.getComplexInfo] ', complex.cortarAddress,' ', complex.complexName, ' 아파트 상세정보 조회 시작.');

        var url = '';
        if(isDev) {
            url ='./api/regions/complexDetail';
        } else {
            url = api.complexDetailInfo.replace('{{complexNo}}', complex.complexNo);
        }

        $.ajax({
            method : 'GET',
            url : url,
            data : {
                sameAddressGroup : true
            },
            dataType : 'json',
            success : function(res) {
                if(res) {
                    complex.detail = res;
                    complex.check.info = true;
                }
                bot.setTimer(bot.getComplexFactory);

            },
            error : function() {
                console.error('[ERROR] Bot.fn.getComplexInfo ajax');
                return;
            }
        });

    }

    //단지 deal 거래 정보 조회.
    Bot.fn.readyAreaChecker = function(list) {

        if(list.length > 0) {
            for(var i=0; i < list.length; i++) {
                //전체 선택인 경우 모두 조회대상에 포함.
                if(condition.area.all) {
                    list[i].check = {
                        deal : false,
                        lease : false,
                        skip : false
                    }
                    continue;
                } else {
                    //면적별 조회 조건.
                    var pyNum = parseInt(list[i].supplyPyeong);
                    if(pyNum > 50) {
                        //50평 이상은 매물을 검색하지 않음.
                        list[i].check = {
                            deal : false,
                            lease : false,
                            skip : true
                        }
                        continue;
                    }
                    var pointer = Math.floor(pyNum/10) * 10;
                    list[i].check = {
                        deal : false,
                        lease : false,
                        skip : !condition.area['area' + pointer + 'py']
                    }
                }
            }
        }

        return true;
    }

    // 단지 면적별 조회 팩토리 함수.
    // 단지 면적별 조회를 마치면 단지 팩토리 함수를 호출한다.
    Bot.fn.getAreaFactory = function() {
        if(!complex) {
            console.error('[Bot.fn.getAreaFactory] 선택된 단지 정보가 존재하지 않습니다.');
            return;
        }
        //면적 정보 조회 동작 여부
        isArea = true;
        //면적 정보 조회 완료 여부
        var isAreaComplete = true;

        //면적변 거래 조회.
        var list = complex.detail.complexPyeongDetailList;
        for(var i=0; i < list.length; i++) {
            //조회 대상이 아닌경우 넘김.
            if(list[i].check.skip) {
                continue;
            }
            //매매 거래 조회
            if(!list[i].check.deal) {
                console.log('[' + complex.complexName + '] ' + list[i].pyeongName + '타입[' + list[i].supplyPyeong + ']평 매물검색');
                bot.requestDealArticles(list[i], complex.complexNo);
                isAreaComplete = false;
                break;
            }
            //전세 거래 조회
            if(!list[i].check.lease) {
                console.log('[' + complex.complexName + '] ' + list[i].pyeongName + '타입[' + list[i].supplyPyeong + ']평 전세검색');
                bot.requestLeaseArticles(list[i], complex.complexNo);
                isAreaComplete = false;
                break;
            }
        }

        //면적 정보 조회가 모두 마친 경우 다음 단지로 이동시킴.
        if(isAreaComplete) {
            //단지 정보 조회 완료 정보 세팅.
            complex.check.area = true;
            complex.check.complete = true;
            complex.detail.check.complete = true;
            bot.setTimer(bot.getComplexFactory);
        }
    }

    //단지 deal 거래 정보 조회.
    Bot.fn.requestDealArticles = function(area, complexNo, page) {

        param.articles.tradeType = 'A1';
        param.articles.order = 'prc';      //낮은가격 우선.

        if(complexNo) {
            param.articles.complexNo = complexNo;
        } else {
            console.warn('[Bot.fn.getComplexDeal] complexNo undefined');
        }

        if(area.pyeongNo) {
            param.articles.areaNos = area.pyeongNo;
        } else {
            console.warn('[Bot.fn.getComplexDeal] areaNos undefined');
        }

        param.articles.page = page || 1;

        var url = api.articles.replace('{{complexNo}}', complexNo);

        $.ajax({
            method : 'GET',
            url : url,
            data : param.articles,
            dataType : 'json',
            success : function(res) {
                bot.responseDealArticles(res, area, param.articles.page);
            },
            error : function() {
                console.error('[ERROR] Bot.fn.requestDealArticles ajax');
                return;
            }
        });
    }

    Bot.fn.responseDealArticles = function(res, area, page) {
        var isFind = false;
        var findStr = undefined;

        if(res.articleList.length > 0) {
            // 저층, 탑층, 중층 다 찾음.
            for(idx in res.articleList) {
                var article = res.articleList[idx];
                var floorInfo = article.floorInfo.split('/');
                var floor,
                    floorText = '';
                if(isNaN(floorInfo[0])) {
                    floorText = floorInfo[0];
                } else {
                    floor = parseInt(floorInfo[0]);
                }
                var top = parseInt(floorInfo[1]);
                var isTop = floor == top;

                //저층 매물
                if(!isTop && (floor <= 3 || floorText === '저')) {
                    if(!area.dealLow) {
                        area.dealLow = article;
                    }
                }

                //탑층 매물
                if(isTop) {
                    if(!area.dealTop) {
                        area.dealTop = article;
                    }
                }

                //월부 매물.
                if(!isTop && (floor > 3 || floorText === '중' || floorText === '고')) {
                    area.deal = article;
                    isFind = true;
                    area.dealFindStr = '월부 최저가';
                    console.log('$$$ [매매최저가] ' + article.sameAddrMinPrc + ', ' + article.floorInfo);
                    break;
                }
            }
            //최저가 매물을 못찾은 경우.
            //
            if(!isFind) {
                //case1. 저층, 탑층 제외 최저가가 없는 경우 > 다음 페이지로 검색
                if(res.isMoreData) {
                    console.log('[Bot.fn.responseDealArticles] ' + complex.complexName + ',' + area.pyeongName + '의 매매 월부시세조건을 찾을 수 없어 다음페이지를 조회합니다. page :' + (page+1));
                    bot.requestDealArticles(area, complex.complexNo, (page+1));
                    return;
                } else {
                    //case2. 저층, 탑층만 매물이 있는 경우.
                    isFind = true;
                    area.deal = null;
                    area.dealFindStr = '중층매물없음';
                }
            }

        } else {
            isFind = true;
            if(!res.isMoreData) {
                // 물건이 없는 경우.
                area.deal = null;
                area.dealFindStr  = '매물없음';
            } else {
                console.warn('[Bot.fn.responseDealArticles] articleList:0, isMoreData:true ?? 무한루프');
                //이런경우 직접 조회 할 수 있도록 표시하고 다음으로 넘어간다.
                area.dealFindStr  = '직접확인요함';
            }
        }

        //매물검색 완료한 경우.
        if(isFind) {
            area.check.deal = true;
            //매물 검색이 완료되면 디테일한 매물을 상세정보 조회.
            //매물 상세 정보 조회.
            if(area.deal && area.deal.articleNo) {
                $.ajax({
                    method : 'GET',
                    url : api.articlesDetail.replace('{{articleNo}}', area.deal.articleNo),
                    dataType : 'json',
                    success : function(res) {
                        //매물상세.
                        if(res.articleDetail) {
                            area.deal.articleDetail = res.articleDetail;
                            console.log('@@@ [매물상세검색] 방:' + res.articleDetail.roomCount + ', 화장실:' + res.articleDetail.bathroomCount + ', 상세주소:' + res.articleDetail.detailAddress);
                        }
                        //매물가격상세
                        if(res.articlePrice) {
                            area.deal.articlePrice = res.articlePrice;
                        }
                        //등록 부동산 정보.
                        if(res.articleRealtor) {
                            area.deal.articleRealtor = res.articleRealtor;
                        }

                        //아무것도 등록이 안되더라고 다음 스텝 진행.
                        bot.setTimer(bot.getAreaFactory);
                        return;
                    },
                    error : function() {
                        console.error('[ERROR] Bot.fn.requestDealArticles - articlesDetail ajax');
                        //에러가 나도 그냥 다음으로 넘긴다.
                        bot.setTimer(bot.getAreaFactory);
                        return;
                    }
                });
            } else {
                bot.setTimer(bot.getAreaFactory);
            }
        }
    }



    //면적 전세 거래 정보 조회.
    Bot.fn.requestLeaseArticles = function(area, complexNo, page) {

        param.articles.tradeType = 'B1';
        param.articles.order = 'prcDesc';      //낮은가격 우선.

        if(complexNo) {
            param.articles.complexNo = complexNo;
        } else {
            console.warn('[Bot.fn.getComplexDeal] complexNo undefined');
        }

        if(area.pyeongNo) {
            param.articles.areaNos = area.pyeongNo;
        } else {
            console.warn('[Bot.fn.getComplexDeal] areaNos undefined');
        }

        param.articles.page = page || 1;

        var url = api.articles.replace('{{complexNo}}', complexNo);

        $.ajax({
            method : 'GET',
            url : url,
            data : param.articles,
            dataType : 'json',
            success : function(res) {
                bot.responseLeaseArticles(res, area, param.articles.page);
            },
            error : function() {
                console.error('[ERROR] Bot.fn.requestLeaseArticles ajax');
                return;
            }
        });

    }

    //면적 전세 거래 정보 조회.
    Bot.fn.responseLeaseArticles = function(res, area, page) {
        var isFind = false;

        if(res.articleList.length > 0) {
            // 전세가격은 sameAddrMaxPrc 기준으로 최고가를 찾음.
            var maxLeasePrice = 0;

            for(idx in res.articleList) {
                var article = res.articleList[idx];

                var priceString = app.getPriceCleanString(article.sameAddrMaxPrc);
                var priceMax = parseInt(priceString);

                if(maxLeasePrice < priceMax) {
                    area.lease = article;
                    maxLeasePrice = priceMax;
                    isFind = true;
                    area.leaseFindStr = '전세 최고가';
                    console.log('### [전세최고가] ' + article.sameAddrMaxPrc + ', ' + article.floorInfo);

                }
            }
            //최저가 매물을 못찾은 경우.
            if(!isFind) {
                //case1. 저층, 탑층 제외 최저가가 없는 경우 > 다음 페이지로 검색
                if(res.isMoreData) {
                    console.log('[Bot.fn.responseLeaseArticles] ' + complex.complexName + ',' + area.pyeongName + '의 전세 월부시세조건을 찾을 수 없어 다음페이지를 조회합니다. page :' + (page+1));
                    bot.requestLeaseArticles(area, complex.complexNo, (page+1));
                    return;
                } else {
                    //case2. 저층, 탑층만 매물이 있는 경우.
                    isFind = true;
                    area.lease = [];
                    area.leaseFindStr = '전세실제 매물없음';
                }
            }

        } else {
            isFind = true;
            if(!res.isMoreData) {
                // 물건이 없는 경우.
                area.lease = article;
                area.leaseFindStr = '매물없음';
            } else {
                console.warn('[Bot.fn.responseDealArticles] articleList:0, isMoreData:true ?? 무한루프 ??');
                //이런경우 직접 조회 할 수 있도록 표시하고 다음으로 넘어간다.
                area.lease = [];
                area.leaseFindStr = '직접확인요함';
            }
        }

        //매물검색 완료한 경우.
        if(isFind) {
            area.check.lease = true;
            //getAreaFactory 이관.
            bot.setTimer(bot.getAreaFactory);
        }

    }

    Bot.fn.errorSkip = function(type, complex) {

        switch (type) {
            case 'E01':
                console.warn('단지 상세 조회 없이 면적 조회 요청으로 들어옴. 개발자에게 확인 요함.');
                console.warn('complexList idx[' + (i+1) + '] 단지명[' + complex.complexName + ']');
                console.warn('해당 단지 조회를 건너뛰고 다음 단지를 조회함.');
                break;
            case 'E02':
                break;
            case 'E03':
                break;
            case 'E04':
                break;
            default:
                complex.check.info = true;
                complex.check.area = true;
                bot.getComplexFactory(bot.getComplexFactory);
                break;
        }
    }



    Bot.fn.intervalTime = function() {
        return Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min;
    }

    Bot.fn.end = function() {
        console.log('Bot end~ ');
    }

    Bot.fn.stop = function() {
        if(botInteval) {
            clearTimeout(botInteval);
            botInteval = undefined;
        }
        isBot = false;
    }

    Bot.fn.noName = function() {

    }



    window.bot = new Bot();

})();
