/**
 * Publisher Factory
 *
 */
//
var templeteHTML = '';
templeteHTML += '    <div class="container" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: 1000;background: #fffffff0;width: 100%;height: 100%; margin:0;max-width: none;overflow:auto;">';
templeteHTML += '        <div class="py-5 text-center">';
templeteHTML += '           <h3>Mongburim Bot 사용에 관한 책임 안내</h3>';
templeteHTML += '           <div class="row">';
templeteHTML += '               <p class="lead" style="font-size:18px;">';
templeteHTML += '                   시세봇 사용자는 사용에 관한 모든 책임이 사용자에게 있다는 것을 인지하고, 시세봇을 사용하는 것에 동의합니다. 시세봇은 네이버 부동산의 오픈된 API를 이용하지만 승인(개발자 센터 오픈API)는 아닌 API를 사용하여 시세정보를 가져옵니다. 네이버 약관에 이러한 형태에 대해 명확하게 사용 및 금지조항이 없어 시세봇을 사용하면서 발생되는 문제에 대해서는 사용자에게 모든 책임이 있다는 것을 인지하고 시세봇을 사용하는 것에 동의합니다.';
templeteHTML += '               </p>';
templeteHTML += '               <div class="custom-control custom-checkbox" style="margin:0 auto;">';
templeteHTML += '                   <input type="checkbox" class="custom-control-input" id="isAgree">';
templeteHTML += '                   <label class="custom-control-label" for="isAgree">시세봇 사용책임 동의</label>';
templeteHTML += '               </div>';
templeteHTML += '           </div>';
templeteHTML += '        </div>';
templeteHTML += '        <div class="row" id="botProgress" style="display:block;padding:0 30px;">';
templeteHTML += '            <h4 class="d-flex justify-content-between align-items-center mb-3" >';
templeteHTML += '                <span class="text-muted" style="font-size: 18px;">bot message</span>';
templeteHTML += '                <span class="badge badge-secondary badge-pill" id="complexCount">0/0</span>';
templeteHTML += '            </h4>';
templeteHTML += '            <div class="progress" style="margin-bottom:45px;">';
templeteHTML += '                <div id="complexProgress" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>';
templeteHTML += '            </div>';
templeteHTML += '        </div>';
templeteHTML += '        <div class="row">';
templeteHTML += '            <div class="col-md-4 order-md-2 mb-4">';
templeteHTML += '                <h4 class="d-flex justify-content-between align-items-center mb-3">';
templeteHTML += '                    <span class="text-muted">Complex Count </span>';
templeteHTML += '                    <span class="badge badge-secondary badge-pill" id="complexCount">0/12</span>';
templeteHTML += '                </h4>';
templeteHTML += '                <div class="custom-control custom-checkbox" style="margin:10px;">';
templeteHTML += '                    <input type="checkbox" class="custom-control-input" value="all" id="sec-all">';
templeteHTML += '                    <label class="custom-control-label" for="sec-all">전체선택/해제</label>';
templeteHTML += '                </div>';
templeteHTML += '                <div style="max-height: 393px;overflow:auto;">';
templeteHTML += '                    <ul class="list-group mb-3" id="secList">';
templeteHTML += '                    </ul>';
templeteHTML += '                </div>';
templeteHTML += '            </div>';
templeteHTML += '            <div class="col-md-8 order-md-1">';
templeteHTML += '                <h4 class="mb-3" id="regionTitle">지역을 동단위로 선택해 주세요!</h4>';
templeteHTML += '                <form class="needs-validation" novalidate="" name="botCondition">';
templeteHTML += '                    <div class="row">';
templeteHTML += '                        <div class="col-md-6 mb-3">';
templeteHTML += '                            <label for="country">시도</label>';
templeteHTML += '                            <select class="custom-select d-block w-100" id="citySelector" disabled="">';
templeteHTML += '                                <option value="0">Choose..</option>';
templeteHTML += '                            </select>';
templeteHTML += '                        </div>';
templeteHTML += '                        <div class="col-md-6 mb-3">';
templeteHTML += '                            <label for="state">시군구</label>';
templeteHTML += '                            <select class="custom-select d-block w-100" id="dvsnSelector" disabled="">';
templeteHTML += '                                <option value="0">Choose..</option>';
templeteHTML += '                            </select>';
templeteHTML += '                        </div>';
templeteHTML += '                    </div>';
templeteHTML += '                    <hr class="mb-4">';
templeteHTML += '                    <div class="row">';
templeteHTML += '                        <div class="col-md-4 mb-3" id="areaCondition">';
templeteHTML += '                            <h4 class="mb-3">면적</h4>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area-all" checked="true">';
templeteHTML += '                                <label class="custom-control-label" for="area-all">전체</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area0py" target="areaChk">';
templeteHTML += '                                <label class="custom-control-label" for="area0py">~10평</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area10py" target="areaChk">';
templeteHTML += '                                <label class="custom-control-label" for="area10py">10평대</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area20py" target="areaChk">';
templeteHTML += '                                <label class="custom-control-label" for="area20py">20평대</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area30py" target="areaChk">';
templeteHTML += '                                <label class="custom-control-label" for="area30py">30평대</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="area40py" target="areaChk">';
templeteHTML += '                                <label class="custom-control-label" for="area40py">40평대</label>';
templeteHTML += '                            </div>';
templeteHTML += '                        </div>';
templeteHTML += '                        <div class="col-md-4 mb-3">';
templeteHTML += '                            <h4 class="mb-3">세대수</h4>';
templeteHTML += '                            <div class="d-block my-3">';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-all" name="household" value="0" type="radio" class="custom-control-input">';
templeteHTML += '                                    <label class="custom-control-label" for="household-all">전체</label>';
templeteHTML += '                                </div>';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-100" name="household" value="100" type="radio" class="custom-control-input">';
templeteHTML += '                                    <label class="custom-control-label" for="household-100">100세대 이상</label>';
templeteHTML += '                                </div>';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-200" name="household" value="200" type="radio" class="custom-control-input" checked="true">';
templeteHTML += '                                    <label class="custom-control-label" for="household-200">200세대 이상</label>';
templeteHTML += '                                </div>';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-300" name="household" value="300" type="radio" class="custom-control-input">';
templeteHTML += '                                    <label class="custom-control-label" for="household-300">300세대 이상</label>';
templeteHTML += '                                </div>';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-400" name="household" value="400" type="radio" class="custom-control-input">';
templeteHTML += '                                    <label class="custom-control-label" for="household-400">400세대 이상</label>';
templeteHTML += '                                </div>';
templeteHTML += '                                <div class="custom-control custom-radio">';
templeteHTML += '                                    <input id="household-500" name="household" value="500" type="radio" class="custom-control-input">';
templeteHTML += '                                    <label class="custom-control-label" for="household-500">500세대 이상</label>';
templeteHTML += '                                </div>';
templeteHTML += '                            </div>';
templeteHTML += '                        </div>';
templeteHTML += '                        <div class="col-md-4 mb-3" id="roomCondition">';
templeteHTML += '                            <h4 class="mb-3">방개수</h4>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room-all" checked="true">';
templeteHTML += '                                <label class="custom-control-label" for="room-all">전체</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room1" target="roomChk">';
templeteHTML += '                                <label class="custom-control-label" for="room1">방1개</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room2" target="roomChk">';
templeteHTML += '                                <label class="custom-control-label" for="room2">방2개</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room3" target="roomChk">';
templeteHTML += '                                <label class="custom-control-label" for="room3">방3개</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room4" target="roomChk">';
templeteHTML += '                                <label class="custom-control-label" for="room4">방4개</label>';
templeteHTML += '                            </div>';
templeteHTML += '                            <div class="custom-control custom-checkbox">';
templeteHTML += '                                <input type="checkbox" class="custom-control-input" id="room5" target="roomChk">';
templeteHTML += '                                <label class="custom-control-label" for="room5">방5개</label>';
templeteHTML += '                            </div>';
templeteHTML += '                        </div>';
templeteHTML += '                    </div>';
templeteHTML += '                    <hr class="mb-4">';
templeteHTML += '                    <button class="btn btn-primary" type="button" id="startBot" disabled="true"> Start Bot </button>';
templeteHTML += '                    <button class="btn btn-danger" type="button" id="stopBot" disabled="true"> Stop Bot </button>';
templeteHTML += '                    <button class="btn btn-warning" type="button" id="resetBot" disabled="true"> Reset Bot </button>';
templeteHTML += '                </form>';
templeteHTML += '            </div>';
templeteHTML += '        </div>';
templeteHTML += '        <div class="row " id="resultWrap" style="margin-top:20px;overflow: auto;display:none;">';
templeteHTML += '            <div style="padding:15px;">';
templeteHTML += '               <div class="custom-control custom-checkbox" style="margin-bottom: 10px;">';
templeteHTML += '                   <input type="checkbox" class="custom-control-input" id="isExcelRow">';
templeteHTML += '                   <label class="custom-control-label" for="isExcelRow">단지간 Row 생성</label>';
templeteHTML += '               </div>';
templeteHTML += '                <button type="button" class="btn btn-info" id="createTable">데이터 테이블 만들기</button>';
templeteHTML += '                <button type="button" class="btn btn-success" id="exportExcel">엑셀 데이터 내려받기</button>';
templeteHTML += '            </div>';
templeteHTML += '        </div>';
templeteHTML += '        <div class="row " style="margin-top:20px;overflow: auto;height:100%;">';
templeteHTML += '            <div class="table-responsive" id="tableWrap" style="max-height:900px;min-width:3500px;font-size:12px;">';
templeteHTML += '            </div>';
templeteHTML += '        </div>';
templeteHTML += '    </div>';


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
        min : 1500,
        max : 3000
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


    var complexCount = undefined;
    var complexProgress = undefined;
    var botMessage = undefined;

    function Bot() {
        this.initData();
        complexCount = document.getElementById('complexCount');
        complexProgress = document.getElementById('complexProgress');
        botMessage = $('#botProgress span.text-muted')[0];
    }

    Bot.fn = Bot.prototype;

    Bot.fn.getData = function() {
        return data;
    }
    Bot.fn.setData = function(d) {
        data = d;
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

            //progress check
            bot.progress(i);

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

            bot.progress(data.complexList.length);
            bot.message('시세 조회를 모두 마쳤습니다.');
            output.show();
        }

    }

    //단지 상세 정보 조회.
    Bot.fn.getComplexInfo = function(complex) {

        console.log('[Bot.fn.getComplexInfo] ', complex.cortarAddress,' ', complex.complexName, ' 아파트 상세정보 조회 시작.');
        bot.message(complex.cortarAddress + ' [' + complex.complexName + '] 단지 상세정보 검색');
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
                bot.message('[' + complex.complexName + '] ' + list[i].pyeongName + '타입[' + list[i].supplyPyeong + ']평 매물검색');
                console.log('[' + complex.complexName + '] ' + list[i].pyeongName + '타입[' + list[i].supplyPyeong + ']평 매물검색');
                bot.requestDealArticles(list[i], complex.complexNo);
                isAreaComplete = false;
                break;
            }
            //전세 거래 조회
            if(!list[i].check.lease) {
                bot.message('[' + complex.complexName + '] ' + list[i].pyeongName + '타입[' + list[i].supplyPyeong + ']평 전세검색');
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

    Bot.fn.progress = function(i) {
        var total = data.complexList.length;
        var rate = parseInt((i/total)*100);
        complexCount.innerHTML = i + '/' + total;
        complexProgress.innerHTML = rate + '%';
        complexProgress.style.width = rate + '%';
    }

    Bot.fn.message = function(msg) {
        botMessage.innerHTML = msg;
    }

    Bot.fn.setInterval = function(min, max) {
        if(min) {
            interval.min = min;
        }
        if(max) {
            interval.max = max;
        }
    }

    Bot.fn.getInterval = function() {
        return interval;
    }



    window.Bot = Bot;

})();


/**
 *
 *
 */


(function(init){

    var className = {
        table : 'table table-sm',
        thead : 'thead-dark',
        tbody : '',
        tr : '',
        td : ''
    }

    var emptyDataCell = '-';
    var emptyLineCell = '';

    var theadList = [
        '시도'
        ,'시군구'
        ,'읍면동'
        ,'단지명'
        ,'cortarNo'
        ,'complexNo'
        ,'pyeongNo'
        ,'입주년도'
        ,'총세대수'
        ,'전체동수'
        ,'세대당주차대수'
        ,'단지매매개수'
        ,'단지전세개수'
        ,'타입이름'
        ,'공급(m2)'
        ,'공급(평)'
        ,'전용(m2)'
        ,'전용(평)'
        ,'타입별 세대수'
        ,'타입 매매개수'
        ,'타입 전세개수'
        ,'매매 월부가'
        ,'매매 동호수'
        ,'매매 해당층'
        ,'매매동 총층'
        ,'매매 층정보'
        ,'매매최고가'
        ,'매매최저가'
        ,'방'
        ,'욕실'
        ,'구조(계단/복도)'
        ,'입주가능일'
        ,'방향'
        ,'전세 최고가'
        ,'전세 최저가'
        ,'동'
        ,'전세 층정보'
        ,'방향'
        ,'부동산명'
        ,'전화번호'
        ,'핸드폰번호'
        ,'주소'
        ,'비고'
    ]

    function Export() {
        //this.init();
        this.event();
    }

    var targetComplex = undefined;

    Export.fn = Export.prototype;

    Export.fn.init = function() {
        if(isDev) {
            $.ajax({
                method : 'GET',
                url : './api/result.json',
                dataType : 'json',
                success : function(res) {
                    window.data = res;
                },
                error : function() {
                    console.error('export dev data load fail!');
                }
            });
        } else {
            window.data = bot.getData();
        }
    }

    Export.fn.event = function() {
        $('#exportExcel').on('click', this.exportXlsx);
        $('#createTable').on('click', $.proxy(this.createTable, this));
    }



    Export.fn.emptyTable = function() {
        $('#tableWrap').empty();
    }

    Export.fn.createTable = function() {
        this.init();
        this.emptyTable();
        //
        var tableEle = document.createElement('table');
        tableEle.className = className.table;
        tableEle.id = 'data-table';
        // thead
        this.createThead(tableEle);
        //
        this.createTbody(tableEle);

        $('#tableWrap').append(tableEle);
        $('#resultWrap').show();
        $('#resultBtn').show();

        alert('시세표가 완성되었습니다. 엑셀파일로 다운로드해 주세요!');

    }

    Export.fn.createThead = function(tableEle) {
        // table thead make
        var thead = document.createElement('thead');
        thead.className = className.thead;
        var tr = document.createElement('tr');
        for(idx in theadList) {
            var th = document.createElement('th');
            th.textContent = theadList[idx];
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        tableEle.appendChild(thead);

    }


    Export.fn.createTbody = function(tableEle) {
        //
        var tbody = document.createElement('tbody');

        for(idx in data.complexList) {
            //조회대상 단지가 아닌 경우. 넘김.
            if(data.complexList[idx].check.skip) {
                continue;
            }

            //단지상세 정보, 단지 면적 정보 조회가 완료 되지 않은 경우. 넘김.
            if(!data.complexList[idx].check.info || !data.complexList[idx].check.area) {
                continue;
            }

            //targetComplex 변수에 대상 단지를 참조시킴.
            targetComplex = data.complexList[idx];

            this.makeComplex(targetComplex, tbody);
        }

        tableEle.appendChild(tbody);

    }

    //단지 정보 테이블 생성.
    Export.fn.makeComplex = function(complex, tbody) {
        if(targetComplex !== complex) {
            console.wran('targetComplex 와 요청 complex가 일치하지 않습니다.');
            return;
        }

        //단지 공통 정보.
        for(idx in complex.detail.complexPyeongDetailList) {
            var area = complex.detail.complexPyeongDetailList[idx];
            var detail = complex.detail.complexDetail;
            var tr = document.createElement('tr');
            //단지 정보
            this.makeComplexInfo(tr, area, detail);
            //타입별 면적 정보.
            this.makeAreaTypeInfo(tr, area, detail);
            //매매 매물 정보
            this.makeDealInfo(tr, area, detail);
            //전세 매물 정보
            this.makeLeaseInfo(tr, area, detail);
            //부동산 정보.
            this.makeRealtorInfo(tr, area, detail);

            tbody.appendChild(tr);

        }

        //단지와 단지 사이에 공백 띄우기.
        if($('#isExcelRow')[0].checked){
            this.emptyRow(tbody);
        }

    }

    Export.fn.emptyRow = function(tbody) {
        var tr = document.createElement('tr');
        for(idx in theadList) {
            var td = document.createElement('td');
            td.textContent = emptyLineCell;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    /*
    ,'시도'
    ,'시군구'
    ,'읍면동'
    ,'단지명'
    ,'cortarNo'
    ,'complexNo'
    ,'pyeongNo'
    ,'입주년도'
    ,'총세대수'
    ,'전체동수'
    ,'세대당주차대수'
    ,'단지매매개수'
    ,'단지전세개수'
    */
    //단지 공통정보 생성.
    Export.fn.makeComplexInfo = function(tr, area, detail) {
        var addr = targetComplex.cortarAddress.split(' ');
        //시도.
        tr.appendChild(this.cell(addr[0]));
        //시군구
        tr.appendChild(this.cell(addr[1]));
        //읍면동
        tr.appendChild(this.cell(addr[2]));
        //단지명
        tr.appendChild(this.cell(targetComplex.complexName));
        //cortarNo
        tr.appendChild(this.cell(targetComplex.cortarNo));
        //complexNo
        tr.appendChild(this.cell(targetComplex.complexNo));
        //pyeongNo
        tr.appendChild(this.cell(area.pyeongNo));
        //입주년도
        var yyyymm = detail.completionYearMonth.substr(0,4) + '.' + detail.completionYearMonth.substr(4,2);
        tr.appendChild(this.cell(yyyymm));
        //총세대수
        tr.appendChild(this.cell(detail.totalHouseholdCount));
        //전체동수
        tr.appendChild(this.cell(detail.totalDongCount));
        //세대당주차대수
        tr.appendChild(this.cell(detail.parkingCountByHousehold));
        //단지내 매매개수
        tr.appendChild(this.cell(detail.dealCount));
        //단지내 전세개수
        tr.appendChild(this.cell(detail.leaseCount));

    }

    /*
    ,'타입이름'
    ,'공급(m2)'
    ,'공급(평)'
    ,'전용(m2)'
    ,'전용(평)'
    ,'타입별 세대수'
    ,'타입 매매개수'
    ,'타입 전세개수'
    */
    Export.fn.makeAreaTypeInfo = function(tr, area, detail) {
        //타입이름.
        tr.appendChild(this.cell(area.pyeongName));
        //공급(m2)
        tr.appendChild(this.cell(area.supplyArea));
        //공급(평)
        tr.appendChild(this.cell(area.supplyPyeong));
        //전용(m2)
        tr.appendChild(this.cell(area.exclusiveArea));
        //전용(평)
        tr.appendChild(this.cell(area.exclusivePyeong));
        //타입별 세대수
        tr.appendChild(this.cell(area.householdCountByPyeong));
        //매물이 없는 경우
        if(area.articleStatistics) {
            //타입 매매개수
            tr.appendChild(this.cell(area.articleStatistics.dealCount));
            //타입 전세개수
            tr.appendChild(this.cell(area.articleStatistics.leaseCount));
        } else {
            tr.appendChild(this.cell(emptyDataCell));
            tr.appendChild(this.cell(emptyDataCell));
        }
    }

    /*
    ,'매매 월부가'
    ,'매매 동호수'
    ,'매매 해당층'
    ,'매매동 총층'
    ,'매매 층정보'
    ,'매매최고가'
    ,'매매최저가'
    ,'방'
    ,'욕실'
    ,'구조(계단/복도)'
    ,'입주가능일'
    ,'방향'

    */
    Export.fn.makeDealInfo = function(tr, area, detail) {
        //매물이 있는 경우
        if(area.deal) {
            //매매 월부가
            tr.appendChild(this.cell(area.deal.articlePrice.dealPrice));
            //매매 동호수
            tr.appendChild(this.cell(area.deal.articleDetail.detailAddress));
            var floors = area.deal.floorInfo.split('/');
            //매매 해당층
            tr.appendChild(this.cell(floors[0]));
            //매매동 총층
            tr.appendChild(this.cell(floors[1]));
            //매매 층정보
            tr.appendChild(this.cell('"'+ area.deal.floorInfo + '"'));
            //매매최고가
            tr.appendChild(this.cell(app.getPriceCleanString(area.articleStatistics.dealPriceMax)));
            //매매최저가
            tr.appendChild(this.cell(app.getPriceCleanString(area.articleStatistics.dealPriceMin)));
            //방
            tr.appendChild(this.cell(area.deal.articleDetail.roomCount));
            //욕실
            tr.appendChild(this.cell(area.deal.articleDetail.bathroomCount));
            //구조(계단/복도)
            tr.appendChild(this.cell(area.entranceType));
            //입주가능일
            tr.appendChild(this.cell(area.deal.articleDetail.moveInTypeName));
            //방향
            tr.appendChild(this.cell(area.deal.articleDetail.direction));
        } else {
            //매매 월부가
            tr.appendChild(this.cell(emptyDataCell));
            //매매 동호수
            tr.appendChild(this.cell(emptyDataCell));
            //매매 해당층
            tr.appendChild(this.cell(emptyDataCell));
            //매매동 총층
            tr.appendChild(this.cell(emptyDataCell));
            //매매 층정보
            tr.appendChild(this.cell(emptyDataCell));
            //매매최고가
            tr.appendChild(this.cell(emptyDataCell));
            //매매최저가
            tr.appendChild(this.cell(emptyDataCell));
            //방
            tr.appendChild(this.cell(emptyDataCell));
            //욕실
            tr.appendChild(this.cell(emptyDataCell));
            //구조(계단/복도)
            tr.appendChild(this.cell(emptyDataCell));
            //입주가능일
            tr.appendChild(this.cell(emptyDataCell));
            //방향
            tr.appendChild(this.cell(emptyDataCell));
        }

    }


    /*
    ,'전세 최고가'
    ,'전세 최저가'
    ,'층정보'
    ,'전세 층정보'
    ,'방향'
    */
    Export.fn.makeLeaseInfo = function(tr, area, detail) {
        if(area.lease) {
            //전세 최고가
            tr.appendChild(this.cell(app.getPriceCleanString(area.lease.dealOrWarrantPrc)));
            //전세 최저가
            tr.appendChild(this.cell(app.getPriceCleanString(area.articleStatistics.leasePriceMin)));
            //동
            tr.appendChild(this.cell(area.lease.buildingName));
            //전세 층정보
            tr.appendChild(this.cell('"'+area.lease.floorInfo+'"'));
            //방향
            tr.appendChild(this.cell(area.lease.direction));
        } else {
            //전세 최고가
            tr.appendChild(this.cell(emptyDataCell));
            //전세 최저가
            tr.appendChild(this.cell(emptyDataCell));
            //동
            tr.appendChild(this.cell(emptyDataCell));
            //전세 층정보
            tr.appendChild(this.cell(emptyDataCell));
            //방향
            tr.appendChild(this.cell(emptyDataCell));
        }
    }

    /*
    ,'부동산명'
    ,'전화번호'
    ,'핸드폰번호'
    ,'주소'
    ,'비고'
    */
    Export.fn.makeRealtorInfo = function(tr, area, detail) {
        if(area.deal && area.deal.articleRealtor) {
            //부동산명
            tr.appendChild(this.cell(area.deal.articleRealtor.realtorName));
            //전화번호
            tr.appendChild(this.cell(area.deal.articleRealtor.representativeTelNo));
            //핸드폰번호
            tr.appendChild(this.cell(area.deal.articleRealtor.cellPhoneNo));
            //주소
            tr.appendChild(this.cell(area.deal.articleRealtor.address));
        } else {
            //부동산명
            tr.appendChild(this.cell(emptyDataCell));
            //전화번호
            tr.appendChild(this.cell(emptyDataCell));
            //핸드폰번호
            tr.appendChild(this.cell(emptyDataCell));
            //주소
            tr.appendChild(this.cell(emptyDataCell));
        }
        //비고 텍스트 넣기
        var findstr = '[매매]' + area.dealFindStr + ', [전세]' + area.leaseFindStr;
        tr.appendChild(this.cell(findstr));
    }


    Export.fn.cell = function(text) {
        var td = document.createElement('td');
        td.textContent = text;
        return td;

    }


    Export.fn.exportXlsx = function() {
        var type = 'xlsx';
        var elt = document.getElementById('data-table');
        var wb = XLSX.utils.table_to_book(elt, {sheet:"시세표"});
        var fileName = 'wecando_bot_' + app.timeCode() +'_시세표.';
        return XLSX.writeFile(wb, (fileName + (type || 'xlsx')));
    }

    Export.fn.exportJson = function() {
        alert('준비중입니다.');
        return false;
    }


    Export.fn.show = function() {
        $('#resultWrap').show();
        $('#resultBtn').show();
        alert('시세표 설정 후 표를 만들어 주세요!');
    }


    window.Export = Export;


})(function() {

});




//global
var isDev = false;
var debug = false;
var isHTML = false;
var appVer = 'v0.2'

var condition = {
    area : {
        all : true,
        area0py : false,
        area10py : false,
        area20py : false,
        area30py : false,
        area40py : false
    },
    household : 0,
    room : {
        all : true,
        room1 : false,
        room2 : false,
        room3 : false,
        room4 : false,
        room5 : false
    }
};


(function(load, request, publisher, bot) {

    function App() {
        load(this.init);
        return this;
    }

    App.fn = App.prototype;

    App.fn.init = function() {
        console.log('App init >>>>>>>>>>>>>>>>>>>>>> ');

        if(!isHTML) {
            $(document.body).append($(templeteHTML));
        }
        window.request = request();
        window.publisher = publisher(window.request);
        if(Bot) {
            window.bot = new Bot();
        }
        if(Export) {
            window.output = new Export();
        }
        if(output) {
            if(debug) {
                output.init();
            }
        }
        //사용 책임.
        $('#isAgree').on('change', function(e) {

            $('button#startBot').attr('disabled', !e.target.checked);
            $('button#stopBot').attr('disabled', !e.target.checked);
            $('button#resetBot').attr('disabled', !e.target.checked);

            if(e.target.checked) {
                $('p.lead').hide();
            } else {
                $('p.lead').show();
            }
        });
    };

    App.fn.getPriceCleanString = function(str) {
        var millionFix = '';
        if(str.indexOf('억') > 0) {
            var strArr = str.split('억');
            strArr[1] = strArr[1].replace(/\,/g, '');

            if(strArr[1].length === 0) {
                millionFix = '0000';
            } else if(strArr[1].length === 1) {
                millionFix = '000';
            } else if(strArr[1].length === 2) {
                millionFix = '00';
            } else if(strArr[1].length === 3) {
                millionFix = '0';
            }

            return strArr[0] + millionFix + strArr[1];
        } else {
            return str.replace(/\,/g, '');
        }
    };


    App.fn.timeCode = function(date) {
        var d = date || new Date();
        var s = this.numToStr(d.getFullYear(), 4)
                + this.numToStr(d.getMonth() + 1, 2)
                + this.numToStr(d.getDate(), 2)
                + this.numToStr(d.getHours(), 2)
                + this.numToStr(d.getMinutes(), 2)
                + this.numToStr(d.getSeconds(), 2);
        d = undefined;
        return s;
    }

    App.fn.timeString = function(date) {
        var d = date || new Date();
        var s = this.numToStr(d.getFullYear(), 4) + '-'
                + this.numToStr(d.getMonth() + 1, 2) + '-'
                + this.numToStr(d.getDate(), 2) + ' '
                + this.numToStr(d.getHours(), 2) + ':'
                + this.numToStr(d.getMinutes(), 2) + ':'
                + this.numToStr(d.getSeconds(), 2);
        d = undefined;
        return s;
    }

    App.fn.timeToFullDate = function(timeVal) {
        var d = new Date(timeVal);
        var s = this.numToStr(d.getFullYear(), 4) + '-'
                + this.numToStr(d.getMonth() + 1, 2) + '-'
                + this.numToStr(d.getDate(), 2) + ' '
                + this.numToStr(d.getHours(), 2) + ':'
                + this.numToStr(d.getMinutes(), 2) + ':'
                + this.numToStr(d.getSeconds(), 2);
        d = undefined;
        return s;
    }

    App.fn.dateCode = function(date) {
        var d = date || new Date();
        var s = this.numToStr(d.getFullYear(), 4)
                + this.numToStr(d.getMonth() + 1, 2)
                + this.numToStr(d.getDate(), 2);
        d = undefined;
        return s;
    }

    App.fn.dateString = function(date) {
        var d = date || new Date();
        var s = this.numToStr(d.getFullYear(), 4) + '-'
                + this.numToStr(d.getMonth() + 1, 2) + '-'
                + this.numToStr(d.getDate(), 2);
        d = undefined;
        return s;
    }

    App.fn.numToStr = function(num, len) {
        var result = "" + num;
        var tmp;
        for ( var i = len - 1; i > 0; i--) {
            tmp = Math.pow(10, i);
            if (num < tmp) {
                result = "0" + result;
            }
        }
        return result;
    }




    window.app = new App();



})(
/**
 * Script load Class
 *
 */
//
function(callback){

    var load = {
        bootstrap : false,
        jszip : false,
        xlsx : false,
        jquery : false
    }

    var loadTimer = undefined;

    //bootstrap css
    var bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
    bootstrapLink.onerror = function() {
        console.error('bootstrap 리소스 다운로드 실패!');
    }
    bootstrapLink.onload = function() {
        load.bootstrap = true;
        console.info('bootstrap 리소스 다운로드');
    }
    document.head.appendChild(bootstrapLink);

    // xlsx.min.js
    var jszipScript = document.createElement('script');
    jszipScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.2/jszip.js';
    jszipScript.onload = function() {
        load.jszip = true;
        console.info('jszip Script 리소스 다운로드');
    }
    jszipScript.onerror = function() {
        console.error('jszip Script 리소스 다운로드 실패!');
    }
    document.body.appendChild(jszipScript);

    // xlsx.min.js
    var xlsxScript = document.createElement('script');
    xlsxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.2/xlsx.min.js';
    xlsxScript.onload = function() {
        load.xlsx = true;
        console.info('xlsx Script 리소스 다운로드');
    }
    xlsxScript.onerror = function() {
        console.error('xlsx Script 리소스 다운로드 실패!');
    }
    document.body.appendChild(xlsxScript);


    var jqueryTag = document.createElement('script');
    jqueryTag.src = 'https://code.jquery.com/jquery-3.3.1.min.js';

    //구동 준비.
    jqueryTag.onload = function() {
        load.jquery = true;
        console.info('jquery 리소스 다운로드!');
        loadTimer = setTimeout(loadCheck, 1000);
    }
    bootstrapLink.onerror = function() {
        console.error('jquery 리소스 다운로드 실패!');
    }

    document.body.appendChild(jqueryTag);
    var checkCount = 0;
    function loadCheck() {
        checkCount++;
        console.log('loadCheck Check Count >>' + checkCount);

        if(checkCount > 60) {
            clearTimeout(loadTimer);
            loadTimer = undefined;
            alert('리소스 다운로드에 실패 카운트를 초과하였습니다. 시스템을 다시 부팅시켜 주세요! [E01]');
            return;
        }

        var isChecked = true;
        for(name in load) {
            if(!load[name]) {
                isChecked = false;
            }
        }

        if(!isChecked) {
            loadTimer = setTimeout(loadCheck, 1000);
        } else {
            clearTimeout(loadTimer);
            loadTimer = undefined;
            callback();
        }
    }


}
,
/**
 * API Controll Class
 *
 */
//
function(){

    function Request() {
        this.host = {
            dev : './api/',
            live : 'https://new.land.naver.com/api/'
        }


    }

    Request.fn = Request.prototype;

    //
    Request.fn.getHost = function() {
        return isDev ? this.host.dev : this.host.live;
    }

    //
    Request.fn.regions = function(cortarNo, success, error) {
        var url,
            data;

        if(isDev) {
            url = this.getHost() + 'regions/list?cortarNo=' + cortarNo;
            this.get(url, undefined, success, error);

        } else {
            url = this.getHost() + 'regions/list';
            data = {
                cortarNo : cortarNo
            }
            this.get(url, data, success, error);
        }
    }




    //
    Request.fn.get = function(url, data, success, error) {

        if(!url) {
            console.error('[Request.fn.get] url undefined!');
            return;
        }
        console.log('>>>>>>>>>>>>>> Request.fn.get <<<<<<<<<<<<<<<');
        console.log('ajax url : ' + url);

        if(isDev) {
            url = url.replace('?','_').replace('=','_');
        }

        jQuery.ajax({
            method : 'GET',
            url : url,
            data : data || {},
            success : success || this.success,
            error : error || this.error,
            dataType : 'json',
            complete : function() {
                console.log('>>>>>>>>>> Request.fn.get complete <<<<<<<<<<')
            }
        });
    }


    Request.fn.success = function(data) {
        console.info('============ Request.fn.success ============');
        console.info(data);
        console.info('========== Request.fn.success end ==========');
    }
    Request.fn.error = function(e) {
        console.error('============ Request.fn.error ============');
        console.error(e);
        console.error('========== Request.fn.error end ==========');
    }

    return new Request();



}

,function(request) {
    /**
     * Publisher Class
     * request.
     */
    //
    var templete = {};
    templete.sec = ''
    + '<li class="list-group-item d-flex justify-content-between lh-condensed" style="height:50px;">'
    + '    <div class="custom-control custom-checkbox">'
    + '        <input type="checkbox" class="custom-control-input" value="{{val}}" id="{{id}}">'
    + '        <label class="custom-control-label" for="{{id}}">{{name}}</label>'
    + '    </div>'
    + '</li>';


    var selector = {
        areaAll : 'input#area-all',
        areaChk : '#areaCondition input[target="areaChk"]',
        areaChecked : '#areaCondition input:checked',
        roomAll : 'input#room-all',
        roomChk : '#roomCondition input[target="roomChk"]',
        roomChecked : '#roomCondition input:checked',
        secAll : 'input#sec-all',
        secChk : '#secList input[type="checkbox"]',
        secChecked : '#secList input:checked'
    }

    function Publisher(request) {
        this.that = this;
        this.defaultCortarNo = '0000000000';
        this.request = request;
        this.init();
        this.eventListener();
        this.getCity();
    }

    Publisher.fn = Publisher.prototype;

    Publisher.fn.init = function() {
        console.warn('HTML 구성후 뿌리는 부분 만들어야 함.!!!');
    }

    Publisher.fn.eventListener = function() {
        /* 시도, 시군구, 읍명동 */
        //city
        $('#citySelector').on('change', jQuery.proxy(this.cityChange, this));
        //dvsn
        $('#dvsnSelector').on('change', jQuery.proxy(this.dvsnChange, this));
        //sec
        $('#secSelector').on('change', jQuery.proxy(this.secChange, this));
        /* 면적 선택 박스 */
        // 면적 전체 선택
        $(selector.areaAll).on('change', jQuery.proxy(this.areaAll, this));
        // 면전 평형별 선택
        $(selector.areaChk).on('change', jQuery.proxy(this.areaChk, this));
        /* 방개수 선택 박스 */
        // 방개수 전체 선택
        $(selector.roomAll).on('change', jQuery.proxy(this.roomAll, this));
        // 방개수 평형별 선택
        $(selector.roomChk).on('change', jQuery.proxy(this.roomChk, this));
        /* 동선택 선택 박스 */
        // 동 전체 선택/해제
        $(selector.secAll).on('change', jQuery.proxy(this.secAll, this));

        // bot 실행
        $('button#startBot').on('click', jQuery.proxy(this.startBot, this));
        // bot 중지
        $('button#stopBot').on('click', jQuery.proxy(this.stopBot, this));
        // bot 초기#
        $('button#resetBot').on('click', jQuery.proxy(this.resetBot, this));


    }


    Publisher.fn.getCity = function() {
        request.regions(this.defaultCortarNo, this.makeCity);
    }

    Publisher.fn.makeCity = function(data) {

        console.log("[Publisher.fn.makeSido] City Selector를 구성함.");
        if(data && data.regionList && data.regionList.length > 0) {
            var $citySelector = $('#citySelector').empty();;
            $citySelector.append('<option value="0">Choose..</option>');
            //시도 데이터를 가져와서 options 를 추가.
            for(var i=0; i < data.regionList.length; i++) {
                var city = data.regionList[i];
                $citySelector.append('<option value="' + city.cortarNo + '">'+ city.cortarName +'</option>');
            }

            $citySelector.attr('disabled', false);


        } else {
            alert('시도 데이터를 가져오는 과정에서 문제가 발생했습니다. [E002]');
            return;
        }
    }


    Publisher.fn.makeDvsn = function(data) {

        console.log("[Publisher.fn.makeDvsn] 시군구 셀렉터를 구성함.");
        if(data && data.regionList && data.regionList.length > 0) {
            var $dvsnSelector = $('#dvsnSelector').empty();
            //시도 데이터를 가져와서 options 를 추가.
            for(var i=0; i < data.regionList.length; i++) {
                var city = data.regionList[i];
                $dvsnSelector.append('<option value="' + city.cortarNo + '">'+ city.cortarName +'</option>');
            }

            $dvsnSelector.attr('disabled', false);


        } else {
            alert('시도 데이터를 가져오는 과정에서 문제가 발생했습니다. [E002]');
            return;
        }
    }

    Publisher.fn.makeSec = function(data) {

        console.log("[Publisher.fn.makeSec] 읍면동 셀렉터를 구성함.");
        if(data && data.regionList && data.regionList.length > 0) {
            var $secList = $('#secList').empty();
            //시도 데이터를 가져와서 options 를 추가.

            for(var i=0; i < data.regionList.length; i++) {
                $secList.append(templete.sec.replace(/\{\{id\}\}/g, data.regionList[i].cortarType + data.regionList[i].cortarNo)
                    .replace(/\{\{val\}\}/g, data.regionList[i].cortarNo)
                    .replace(/{{name}}/g, data.regionList[i].cortarName));
            }

        } else {
            alert('시도 데이터를 가져오는 과정에서 문제가 발생했습니다. [E002]');
            return;
        }
    }

    //Change Event Listener
    Publisher.fn.cityChange = function(e) {
        if(e.target.value === '0') {
            return;
        }
        this.request.regions(e.target.value, this.makeDvsn);
    }

    Publisher.fn.dvsnChange = function(e) {
        if(e.target.value === '0') {
            return;
        }
        this.request.regions(e.target.value, this.makeSec);
    }

    Publisher.fn.secChange = function(e) {
        if(e.target.value === '0') {
            return;
        }
        console.log('단지 리스트 개발해야함. 여기서 부터 ~~~~ ');
    }
    /*
    * 면적 체크
    */
    Publisher.fn.areaChk = function(e) {
        $(selector.areaAll).get(0).checked = false;
        //condition
        condition.area.all = false;

        if($(selector.areaChecked).length === 0) {
            e.target.checked = true;
        }

        //condition
        condition.area[e.target.id] = e.target.checked;

    }

    Publisher.fn.areaAll = function(e) {
        if(e.target.checked) {
            condition.area.all = true;
            $(selector.areaChk).each(function(){
                this.checked = false;
                condition.area[this.id] = false;
            });
        } else {
            e.target.checked = true;
        }
    }

    /*
    * 방개수 체크
    */
    Publisher.fn.roomChk = function(e) {
        $(selector.roomAll).get(0).checked = false;
        //condition
        condition.room.all = false;

        if($(selector.roomChecked).length === 0) {
            e.target.checked = true;
        }
        //condition
        condition.room[e.target.id] = e.target.checked;

    }

    Publisher.fn.roomAll = function(e) {
        if(e.target.checked) {
            condition.room.all = true;
            $(selector.roomChk).each(function(){
                this.checked = false;
                condition.room[this.id] = false;
            });
        } else {
            e.target.checked = true;
        }
    }
    /*
    * 동선택
    */
    Publisher.fn.secAll = function(e) {

        $(selector.secChk).each(function(){
            this.checked = e.target.checked;
        });

    }


    /*
    * 실행 조건을 검증하고 봇 실행
    */
    Publisher.fn.startBot = function(e) {

        //조회 조건 데이터 생성.
        condition.household = parseInt(document.botCondition.household.value);

        if($(selector.secChecked).length > 0) {

            var cortarList = [];
            $(selector.secChecked).each(function() {
                cortarList.push(this.value);
            });

            if(bot) {
                bot.start(cortarList);
            } else {
                alert('Bot undefined;');
                return;
            }

        } else {

            //디버깅. 산본
            if(debug) {
                var cortarList = ['4141010400'];
                bot.start(cortarList);
                return;
            }

            alert('선택된 동이 없습니다.!')
            return false;
        }
    }

    Publisher.fn.stopBot = function(e) {
        bot.stop();
        alert('bot 동작을 중지하였습니다.');
        return false;
    }

    Publisher.fn.resetBot = function(e) {

        if(confirm('수집된 데이터를 모두 삭제합니다. 그래도 진행하시겠습니까?')) {
            bot.stop();
            bot.initData();
            alert('데이터를 초기화 하였습니다.');
        }
        return false;
    }


    return new Publisher(request);


});
