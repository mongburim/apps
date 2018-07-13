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

// 네이버에서 가져온 단지 데이터
var complexOriginList = [];
// 시세표 단지 정보 데이터
var complexList = [];

var interval = {
    min : 500,
    max : 1000
}

var range = {
    area : {
        min : 30
        max : 120
    }
}






(function(Factory){

    var jqueryTag = document.createElement('script');
    jqueryTag.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
    jqueryTag.onload = function() {

        window.factory = Factory();
    }

    document.body.appendChild(jqueryTag);






})(function() {

    var api = {
        dongComplex : 'https://new.land.naver.com/api/complexes',
        complexInfo : 'https://new.land.naver.com/api/complexes/{{complexNo}}'
    }

    var param = {
        dongComplex : {
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
        },
        complexInfo : {
            complexNo : undefined,
            initial : 'Y'
        }

    }



    /*
     * 단지 정보 오브젝트.
     * @complex : 네이버 단지 기본정보 데이터.
     * return : 시세표 단지 정보 데이터 클래스.
     */
    function complexObject(complex) {
        this.complexNo = complex.complexNo;
        this.complexName = complex.complexName;
        this.realEstateTypeCode = complex.realEstateTypeCode;
        this.realEstateTypeName = complex.realEstateTypeName;
        this.completionYearMonth = complex.completionYearMonth;
        this.totalDongCount = complex.totalDongCount;
        this.areaList = [];
        return this;
    }


    function Factory() {
        var that = this;
        return this;
    }

    Factory.fn = Factory.prototype;


    /**
     * Common
     */

    Factory.fn.intervalTime = function() {
        return Math.floor(Math.random() * (inerval.max - inerval.min + 1)) + inerval.min;
    }


    /**
     * 동별 단지 리스트 조회
     */
    Factory.fn.requestDongComplex = function() {
        var that = this;
        $.ajax({
            method : 'GET',
            url : api.dongComplex,
            data : param.dongComplex,
            success : that.responseDongComplex
        });
    }

    Factory.fn.responseDongComplex = function(data) {
        // 총단지 수 로그
        if(param.dongComplex.page === 1) {
            console.info('요청하신 동에 총 ' + data.count + '단지가 있습니다.');
        }

        //단지 전체 데이어 만들기
        if(data.list && data.list.length > 0) {
            complexOriginList = complexOriginList.concat(data.list);
            console.log('add complex list :>> '+ data.list);
        }

        if(data.isMoreData) {
            //페이지 카운트 올리기
            param.dongComplex.page++;
            setTimeout(that.requestDongComplex, that.intervalTime);
        } else {
            console.log('####### 전체 단지 정보 #########');
            console.log(complexOriginList);
            //TODO:: 단지 조회로 넘겨야 함.

        }
    }


    /**
     * 단지 기본 정보 조회.
     */
    Factory.fn.requestComplexInfo = function(complexNo) {
        var that = this;
        param.dongComplex = complexNo;

        $.ajax({
            method : 'GET',
            url : api.complexInfo.replace(/{{complexNo}}/g, complexNo),
            data : param.dongComplex,
            success : this.responseComplexInfo
        });

    }

    Factory.fn.responseComplexInfo = function(data) {
        var that = this;

        //단지의 기본 정보
        var complexData = new complexObject(data.complex);

        for(item in data.complex.areaList) {
            if(if)
        }


    }







    /**
     * user interface.
     * 사용자 인터페이스
     */
    Factory.fn.make = function(cortarNo) {
        if(!cortarNo) {
            console.info('cortarNo[네이버부동산 동구분 키값]이 없습니다. 확인후 다시 요청해 주세요!');
            return;
        }
        if(isNaN(cortarNo)) {
            console.info('cortarNo[네이버부동산 동구분 키값]은 숫자로만 구성되어 있습니다. 다시 확인해 주세요!');
            return;
        }

        console.log('ok! start!!! 화이팅! ')

    }

    return new Factory();



});
