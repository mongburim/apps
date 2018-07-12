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
// ex) 죽전동 4146510200
var cortarNo = 4146510200;


// 단지의 정보 리스
var complexList = [];


if(!jQuery) {
    console.error('jQuery 라이브러리가 로딩되지 않았습니다. 먼저 jQuery 라이브러리를 실행해 주세요!');
}



(function($){

    if(!$) {
        return;
    }

    ////https://new.land.naver.com/api/complexes?page=1&cortarNo=4146510200&order=readRank&priceType=REAL&realEstateType=APT:JGC:ABYG:OR&tradeType=&tag=::::::::&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=99&areaMax=132&sameAddressGroup=false
    var getDongComplexAPI = 'https://new.land.naver.com/api/complexes';
    var getDongComplexParam = {
        page : 1,
        cortarNo : cortarNo,
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
    }

    function complexDataFactory(data) {
        // 총단지 수 로그
        if(getDongComplexParam.page === 1) {
            console.info('요청하신 동에 총 ' + data.count + '단지가 있습니다.');
        }

        //단지 전체 데이어 만들기
        if(data.list && data.list.length > 0) {
            complexList = complexList.concat(data.list);
            console.log('add complex list :>> '+ data.list);
        }

        if(data.isMoreData) {
            //페이지 카운트 올리기
            getDongComplexParam.page++;
            getDongComplex()
        } else {
            console.log('####### 전체 단지 정보 #########');
            console.log(complexList);
        }

    }

    //$.get(naverLandAPI, naverLandParam).done(aptListFactory);
    function getDongComplex() {
        $.ajax({
            method : 'GET',
            url : getDongComplexAPI,
            data : getDongComplexParam,
            success : complexDataFactory
        });
    }


    window.start = function() {
        getDongComplex();
    }



})(jQuery);
