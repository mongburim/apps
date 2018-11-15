(function() {

    //동단위 데이터 집합 객체
    var data = {
    };
    //api interval 참조 변수
    var botInteval;
    //Bot 동작 여부
    var isBot = false;


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
        articles : 'https://new.land.naver.com/api/articles'
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
            cortarList : []
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
                        botInteval = setTimeout(bot.getComplex, bot.intervalTime());
                    },
                    error : function() {
                        data.cortarList[idx].reCnt++;
                        if(data.cortarList[idx].reCnt > replayCount) {
                            data.cortarList[idx].isGet = true;
                            console.warn('[Bot.fn.getComplex]@error cortarNo[' + data.cortarList[idx].cortarNo + ']조회 실패 카운트 3회가 초과되어 다음 대상으로 이동합니다.');
                        }
                        botInteval = setTimeout(bot.getComplex, bot.intervalTime());
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

        var chkObj = {
            info : false,
            area : false,
            skip : false
        }

        for(var i=0; i < data.complexList.length; i++) {
            data.complexList[i].check = chkObj;
            if(data.complexList[i].totalHouseholdCount < condition.household ) {
                data.complexList[i].check.info = true;
                data.complexList[i].check.area = true;
                data.complexList[i].check.skip = true;
                console.log('세대수 조건 ' + condition.household + '보다 작은 ' + data.complexList[i].totalHouseholdCount + '세대, ' + data.complexList[i].complexName + '아파트를 조회대상에서 제외합니다.');
            }

        }
        console.log('[Bot.fn.readyComplexInfo > Bot.fn.getComplexFactory] 체크 상태를 모두 추가 하였습니다. 단지 정보를 조회를 시작합니다.');
        bot.getComplexFactory();

    }

    Bot.fn.getComplexFactory = function() {

        var complexIsAllChecked = true;

        for(var i=0; i < data.complexList.length; i++) {
            //단지 상세 정보를 조회해야함.
            if(!data.complexList[i].check.info) {
                this.getComplexInfo(data.complexList[i]);
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

                if(!data.complexList[i].detail.complexPyeongDetailList.length > 0) {
                    var areaList = data.complexList[i].detail.complexPyeongDetailList;
                    for(var j=0; j < areaList.length; j++) {



                        //check 오브젝트가 없는 경우 생성.
                        if(!areaList[j].check) {
                            areaList[j].check = {
                                rant : false,
                                deal : false
                            }
                        }





                    }
                }

                this.getComplexDeal(data.complexList[i]);
                complexIsAllChecked = false;
                break;
            }

        }

        if(complexIsAllChecked) {
            // isAllChecked = true 라는 것은 모두 조회가 완료되었다는 의미. 다음 스텝으로 진행.
            console.log('단지 정보 조회 완료.');

        }

    }

    //단지 상세 정보 조회.
    Bot.fn.getComplexInfo = function(complex) {

        console.log('[Bot.fn.getComplexInfo] ', complex.cortarAddress,' ', complex.complexName, ' 아파트 상세정보 조회 시작.');

        var api = '';
        if(isDev) {
            api ='./api/regions/complexDetail';
        } else {
            api = 'https://new.land.naver.com/api/complexes/' + complex.complexNo;
        }

        $.ajax({
            method : 'GET',
            url : api,
            data : {
                sameAddressGroup : true
            },
            dataType : 'json',
            success : function(res) {
                if(res) {
                    complex.detail = res;
                    complex.check.info = true;
                }

                botInteval = setTimeout(bot.getComplexFactory, bot.intervalTime());
            },
            error : function() {
                console.error('[ERROR] Bot.fn.getComplexInfo ajax');
                return;
            }
        });



    }

    //단지 거래 정보 조회.
    Bot.fn.getComplexDeal = function() {



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
                botInteval = setTimeout(bot.getComplexFactory, bot.intervalTime());
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
    }

    Bot.fn.noName = function() {

    }



    window.bot = new Bot();

})();
