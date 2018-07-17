/**
 * ##### 월급쟁이 부자들 . #####
 * ## 네이버 부동산 시세표 데이터 가져오기 란?
 * 동 단위 단지의 정보와 시세지도를 그리기 위한 시세표를 네이버 부동산 API를 연동하여 가져오는 프로그램입니다.
 * ## 법적 책임 공지
 * 네이버 부동산은 오픈 API를 사용하지 않기 때문에 이 프로그램을 사용하여 발생하는 책임은 본인이 책임져야 합니다.
 * 단, 네이버의 감시를 회피하기 위해 Chrome Browser의 Snippets 기능으로 감시를 회피하는 방법으로 프로그램을 구성하였습니다.
 * 간단히, 설명드리면 다른 도메인이 아닌 new.land.naver.com의 도메인으로 모든 API가 요청되기 때문에 감시에서 origin정보를 회피하도록 구성하였습니다.
 * 네이버 부동산은 개인정보가 아닌 오픈된 공공데이터입니다. 다만 이것을 외부에서 사용하도록 허가하지 않은 정보요청을 하도록 프로그래밍 되어 있습니다.
 * 혹시 발생할 수 있는 모든 문제는 본인이 책임져야 함을 공지합니다.
 */



// 네이버 부동산의 동 정보 코드
// ex) 죽전동 4146510200 >> make(4146510200)

//var cortarNo = 4146510200;

var isLive = false;

// 네이버에서 가져온 단지 데이터
var complexOriginList = [];
// 시세표 단지 정보 데이터
var complexList = [];
// 현재 진행중인 단지 넘버.
var searchComplexNo = undefined;

var interval = {
    min : 500,
    max : 1000
}

var range = {
    area : {
        min : 30,
        max : 120
    }
}

var interval = undefined;



var jqueryTag = document.createElement('script');
jqueryTag.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
jqueryTag.onload = function() {

    window.factory = new Factory();
}

document.body.appendChild(jqueryTag);




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

var param = {
    dongComplex : {
        page : 1,
        cortarNo : undefined,
        order : 'readRank',
        priceType : 'REAL',
        realEstateType : 'APT',
        tradeType : null,
        tag : '::::::::',
        rentPriceMin : 0,
        rentPriceMax : 900000000,
        priceMin : 0,
        priceMax : 900000000,
        areaMin : 99,
        areaMax : 132,
        sameAddressGroup : false
    },
    complexInfo : {
        complexNo : undefined,
        initial : 'Y'
    },
    complexDetailInfo : {
        sameAddressGroup : false
    },
    articles : {
        page: 1,
        complexNo: null,
        buildingNos: null,
        tradeTypes: 'A1',      //전세:B1,매매:A1 매물만 검색.
        areaNos: null,
        type: 'list',
        order: 'rank',          //prc:낮은 가격순, prcDesc: 높은가격순
        sameAddressGroup: false
    }

}




function Factory() {
    return this;
}

Factory.fn = Factory.prototype;


/**
 * Common
 */
//

//factory start!!!
Factory.fn.start = function(cortarNo) {
    param.dongComplex.cortarNo = cortarNo;
    factory.requestDongComplex();
}
Factory.fn.stop = function() {
    //모든것을 초기화 하고 멈춤.
}


//get interval Time
Factory.fn.intervalTime = function() {
    return Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min;
}
//단지 찾기.
Factory.fn.getComplex = function(complexNo) {
    return complexList.find(function(obj) {
        return obj.complexNo === complexNo;
    })
}
//네이버 금액을 실제 int 값으로 변환
Factory.fn.getPriceCleanString = function(str) {
    var millionFix = '';
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
}

Factory.fn.verticalLog = function() {
    console.info('--------------------------------------------------------------------------');
}

Factory.fn.complexLog = function(action, msg) {
    console.info('[' + selectedComplex.complexName + selectedComplex.realEstateTypeName + ' @' + action + '] ' + msg );
}

Factory.fn.articlesLog = function(action, msg) {
    console.info('[' + selectedComplex.complexName + selectedComplex.realEstateTypeName + ' @' + action + '] ' + msg );
}

/**
 * 동별 단지 리스트 조회
 */
Factory.fn.requestDongComplex = function() {
    $.ajax({
        method : 'GET',
        url : api.dongComplex,
        data : param.dongComplex,
        success : factory.responseDongComplex
    });
}

Factory.fn.responseDongComplex = function(data) {
    // 총단지 수 로그
    if(param.dongComplex.page === 1) {
        console.info('요청하신 동에 총 ' + data.count + '단지가 있습니다.');
    }

    //단지 전체 데이어 만들기
    if(data.list && data.list.length > 0) {
        complexList = complexList.concat(data.list);
        console.log('add complex list :>> '+ data.list);
    }

    if(data.isMoreData) {
        //페이지 카운트 올리기
        param.dongComplex.page++;

        interval = setTimeout(factory.requestDongComplex, factory.intervalTime());
    } else {

        for(idx in complexList) {
            var obj = complexList[idx];
            obj.isGet = false;
        }

        //단지별 정보 가져오기.
        if(isLive) {
            console.info('########## 동별 단지 ##########');
            console.info('해당동에 ' + complexList.length + '개의 단지를 검색했습니다. 단지별 정보와 매물검색을 시작합니다.');
            console.info('########## 동별 단지 ##########');
            factory.getComplexFactory();
        } else {
            console.log('####### 동별 단지 정보 #########');
            console.log(complexList);
            console.log('단지 검색을 모두 마쳤습니다. 수동으로 단지별 검색을 실행해 주세요!');
        }

    }
}


/**
 * 단지 기본 정보 조회.
 */

Factory.fn.getComplexFactory = function() {
    if(!complexList || complexList.length <= 0) {
        console.error('조회할 단지가 존재하지 않습니다. 다시 확인해 주세요!')
        return;
    }

    //단지 조회
    for(idx in complexList) {
        var complex = complexList[idx];
        if(complex.complexNo && !complex.isGet) {
            //log
            factory.verticalLog();
            console.info(complex.complexName + '단지, 매매 ' + complex.dealCount + '건, 전세 ' + complex.leaseCount + '건의 매물을 분석을 시작.');
            searchComplexNo = complex.complexNo;
            interval = setTimeout(factory.requestComplexInfo, factory.intervalTime());
            return;
        }
    }

}

Factory.fn.requestComplexInfo = function() {

    if(!searchComplexNo) {
        console.info('조회할 단지 정보가 존재하지 않습니다. searchComplexNo is undefined!');
        interval = setTimeout(factory.getComplexFactory, factory.intervalTime());
    }

    $.ajax({
        method : 'GET',
        url : api.complexDetailInfo.replace(/{{complexNo}}/g, searchComplexNo),
        data : param.complexDetailInfo,
        success : factory.responseComplexInfo
    });

}

var selectedComplex = undefined;

Factory.fn.responseComplexInfo = function(data) {

    //단지의 기본 정보
    selectedComplex = factory.getComplex(data.complexDetail.complexNo);
    if(!selectedComplex) {
        console.error('complexList에서 단지 정보를 가져 올 수 없습니다.');
        return;
    }

    //단지 정보.
    selectedComplex.complex = data.complexDetail;
    //면적별 정보 리스트.
    selectedComplex.areaList = [];

    //매물정보 검색한 areaNos 파라미터 구성
    var areaNoList = [];

    for(idx in data.complexPyeongDetailList) {
        //parseInt(area.supplyAreaDouble)
        var area = data.complexPyeongDetailList[idx];
        //소형, 중형 평수만 조회.
        if(range.area.min <= parseInt(area.supplyAreaDouble) && range.area.max >= parseInt(area.supplyAreaDouble)) {
            //파라미터에 면적 추가.
            areaNoList.push(area.pyeongNo);

            //area Data 구성.
            var areaObj = {};
            //평 넘버.
            areaObj.pyeongNo = area.pyeongNo;
            //제곱미터 더블값.
            areaObj.supplyAreaDouble = area.supplyAreaDouble;
            //평 네임.
            areaObj.pyeongName = area.pyeongName;
            // 계단식, 복도식
            areaObj.entranceType = area.entranceType;
            // 면적별 세대수.
            areaObj.householdCountByPyeong = area.householdCountByPyeong;
            // 공급 제곱미터.
            areaObj.supplyArea = area.supplyArea;
            // 평환산값.
            areaObj.supplyPyeong = area.supplyPyeong;
            // 전용 제곱미터.
            areaObj.exclusiveArea = area.exclusiveArea;
            // 전용 평.
            areaObj.exclusivePyeong = area.exclusivePyeong;

            //조회 이력 체크
            areaObj.isGet = false;

            //저층, 탑층 제외 매매 최저가.
            areaObj.deal = {
                priceMin : 999999,
                priceMax : 0,
                buildingName : '',
                floorInfo : ''
            }
            //저층, 탑층 제외 매매 최저가.
            areaObj.lease = {
                priceMin : 999999,
                priceMax : 0,
                buildingName : '',
                floorInfo : ''
            }


            //전세 최고가.
            //areaObj.leasePriceMax = 0;

            //단지에 면적 오브젝트 추가.
            selectedComplex.areaList.push(areaObj);
            //log
            var msg = 'pyeongName[' + area.pyeongName+ '] 면적을 대상에 포함합니다.';
            factory.complexLog('area include', msg)
        } else {
            var msg = 'pyeongName[' + area.pyeongName+ '] 면적을 대상에서 제외합니다.';
            factory.complexLog('area exclude', msg)
        }
    }
    //단지내 면적 오브젝트 생성 및 매물검색 파라미터 생성 --- end.

    interval = setTimeout(factory.articlesFactory, factory.intervalTime());

}

Factory.fn.articlesFactory = function() {
    //예외 처리.
    if(!selectedComplex) {
        if(isLive) {
            console.info('>>>>>>>>>> @articlesFactory:: 조회 대상 단지정보가 존재 하지 않습니다. 다음 단지 작업으로 이관합니다.');
            factory.getComplexFactory();
        } else {
            console.error('@articlesFactory:: 조회 대상 단지정보가 존재 하지 않습니다.');
        }
    }
    //예외 처리
    if(selectedComplex.areaList.length <= 0) {
        factory.complexLog('articlesFactory', '분석 대상 면적정보가 존재하지 않습니다.');
        selectedComplex.isGet = true;
        if(isLive) {
            factory.complexLog('articlesFactory', '다음 단지 작업을 이관합니다.');
            factory.getComplexFactory();
        } else {
            console.log('단지 매물 검색을 종료합니다.');
        }
    }

    param.articles.complexNo = selectedComplex.complexNo;

    //sync로 돌리기.
    for(idx in selectedComplex.areaList) {
        var area = selectedComplex.areaList[idx];
        if(!area.isGet) {
            param.articles.page = 1;
            factory.requestDealArticles(area.pyeongNo);
            return;
        }

    }

    //여기까지 왔다는건 면적별 매물을 모두 검색했다는 의미.
    //
    //선택된 단지 매물검색 완료 체크
    selectedComplex.isGet = true;

    if(isLive) {
        console.log('단지 매물 검색을 완료 하였습니다! 다음 단지 매물을 검색합니다.');
        factory.getComplexFactory();
    } else {
        console.log('단지 매물 검색을 완료 하였습니다!');
    }


}



// 선택된 단지에서 면적의 데이터를 리턴
Factory.fn.getAreaData = function(areaName) {
    if(!selectedComplex) {
        return null;
    }
    for(idx in selectedComplex.areaList) {
        var area = selectedComplex.areaList[idx];
        if(area.pyeongName === areaName) {
            return area;
        }
    }
}



Factory.fn.requestDealArticles = function(pyeongNo) {
    // 매매 매물 검색 파라미터 세팅.
    param.articles.tradeTypes = 'A1';
    param.articles.order = 'prc';      //낮은가격 우선.
    if(pyeongNo) {
        param.articles.areaNos = pyeongNo;
    }

    $.ajax({
        method : 'GET',
        url : api.articles,
        data : param.articles,
        success : factory.responseDealArticles
    });

}

Factory.fn.responseDealArticles = function(data) {
    var isLoop = true;
    if(data.articleList.length > 0) {
        //매물이 있는 경우.
        for(idx in data.articleList) {
            var article = data.articleList[idx];
            var areaData = factory.getAreaData(article.areaName);
            //매매 금액 만원단위 환산.
            var floorInfo = article.floorInfo.split('/');
            var floor = parseInt(floorInfo[0]);
            var top = parseInt(floorInfo[1]);
            var isTop = floor == top;
            //탑층과 저층 제외.
            if(!isTop && floor > 3) {
                //sameAddrMinPrc 매물 가격을 숫자 String 값으로 가져오기, 억제거. 빈 공간 0채우기.
                var priceString = factory.getPriceCleanString(article.sameAddrMinPrc);
                var priceMin = parseInt(priceString);

                //매매 최저가 세팅.
                if(areaData.deal.priceMin > priceMin) {
                    areaData.deal.priceMin = priceMin;
                    areaData.deal.buildingName = article.buildingName;
                    areaData.deal.floorInfo = article.floorInfo;
                    isLoop = false;
                    //log
                    factory.complexLog('Deal', areaData.deal.buildingName + '> ' + article.areaName +'타입 ' + article.floorInfo + '층, 매매가 :' + article.sameAddrMinPrc);
                    break;
                }
                //TODO:: 최고가도 저장하는 것이 의미 있을까?

            } else {
                //TODO:: 탑층과 저층만 매물이 있는 경우 어떻게 하지?
            }

        }
    } else {
        //매물이 없는 경우
    }



    //매물이 추가적으로 더 있는 경우
    if(isLoop && data.isMoreData) {
        api.article.page++;
        interval = setTimeout(factory.requestDealArticles, factory.intervalTime());
    } else {
        //더이상 매물이 없는 경우 전세 매물 검색.
        param.articles.page = 1;
        interval = setTimeout(factory.requestLeaseArticles, factory.intervalTime());
    }

}

Factory.fn.requestLeaseArticles = function() {
    // 매매 매물 검색 파라미터 세팅.
    param.articles.tradeTypes = 'B1';
    param.articles.order = 'prcDesc';       //높은 가격 우선.
    $.ajax({
        method : 'GET',
        url : api.articles,
        data : param.articles,
        success : factory.responseLeaseArticles
    });

}

Factory.fn.responseLeaseArticles = function(data) {
    var isLoop = true;
    if(data.articleList.length > 0) {
        //매물이 있는 경우.
        for(idx in data.articleList) {
            var article = data.articleList[idx];
            var areaData = factory.getAreaData(article.areaName);
            //전세 금액 만원단위 환산.
            //sameAddrMinPrc 매물 가격을 숫자 String 값으로 가져오기, 억제거. 빈 공간 0채우기.
            var priceString = factory.getPriceCleanString(article.sameAddrMaxPrc);
            var priceMax = parseInt(priceString);

            //매매 최저가 세팅.
            if(areaData.lease.priceMax < priceMax) {
                areaData.lease.priceMax = priceMax;
                areaData.lease.buildingName = article.buildingName;
                areaData.lease.floorInfo = article.floorInfo;
                isLoop = false;
                //log
                factory.complexLog('lease', areaData.deal.buildingName + '> ' + article.areaName + '타입 ' + article.floorInfo + '층, 전세가 : ' + article.sameAddrMaxPrc);
                areaData.isGet = true;
                break;
            }

        }
    } else {
        //매물이 없는 경우
    }

    //매물이 추가적으로 더 있는 경우
    if(isLoop && data.isMoreData) {
        api.article.page++;
        interval = setTimeout(factory.requestLeaseArticles, factory.intervalTime());
    } else {
        //더이상 매물이 없는 경우 전세 매물 검색.
        param.articles.page = 1;

        //선택된 단지 매물검색 완료 체크
        factory.articlesFactory();
    }

}








/**
 * user interface.
 * 사용자 인터페이스
 */
window.make = function(cortarNo) {
    if(!cortarNo) {
        console.info('cortarNo[네이버부동산 동구분 키값]이 없습니다. 확인후 다시 요청해 주세요!');
        return;
    }
    if(isNaN(cortarNo)) {
        console.info('cortarNo[네이버부동산 동구분 키값]은 숫자로만 구성되어 있습니다. 다시 확인해 주세요!');
        return;
    }

    console.log('ok! start!!! going apt price 화이팅!');
    factory.start(cortarNo);

}

window.stop = function() {
    if(interval) {
        clearTimeout(interval);
        interval = undefined;
    }
}
