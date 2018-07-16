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
// 현재 진행중인 단지 넘버.
var searchComplexNo = undefined;

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
        //동별 단지 리스트
        dongComplex : 'https://new.land.naver.com/api/complexes',
        // 단지 기본정보
        complexInfo : 'https://new.land.naver.com/api/complexes/{{complexNo}}',
        // 단지 상세정보
        complexDetailInfo : 'https://new.land.naver.com/api/complexes/{{complexNo}}'
        // 매물 검색.
        articles : 'https://new.land.naver.com/api/articles'
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
            order: 'rank',
            sameAddressGroup: false
        }

    }




    function Factory() {
        var that = this;
        return this;
    }

    Factory.fn = Factory.prototype;


    /**
     * Common
     */

    //get interval Time
    Factory.fn.intervalTime = function() {
        return Math.floor(Math.random() * (inerval.max - inerval.min + 1)) + inerval.min;
    }
    //단지 찾기.
    Factory.fn.getComplex = function(complexNo) {
        return complexList.find(function(obj) {
            return obj.complexNo === complexNo;
        })
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
            complexList = complexList.concat(data.list);
            console.log('add complex list :>> '+ data.list);
        }

        if(data.isMoreData) {
            //페이지 카운트 올리기
            param.dongComplex.page++;
            setTimeout(that.requestDongComplex, that.intervalTime);
        } else {
            console.log('####### 전체 단지 정보 #########');
            console.log(complexList);
            //TODO:: 단지 조회로 넘겨야 함.

            for(obj in complexList) {
                obj.isGet = false;
            }

            //단지별 정보 가져오기.

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
        for(complex in complexList) {
            if(complex.complexNo && !complex.isGet) {
                searchComplexNo = complex.complexNo;
                setTimeout(this.requestComplexInfo, this.intervalTime());
                return;
            }
        }

    }

    Factory.fn.requestComplexInfo = function() {
        var that = this;

        if(!searchComplexNo) {
            console.info('조회할 단지 정보가 존재하지 않습니다. searchComplexNo is undefined!');
            setTimeout(this.getComplexFactory, this.intervalTime);
        }

        $.ajax({
            method : 'GET',
            url : api.complexDetailInfo.replace(/{{complexNo}}/g, searchComplexNo),
            data : param.complexDetailInfo,
            success : this.responseComplexInfo
        });

    }

    Factory.fn.responseComplexInfo = function(data) {
        var that = this;

        //단지의 기본 정보
        var item = this.getComplex(data.complex.complexNo);
        if(!item) {
            console.error('단지 정보를 가져 올 수 없습니다.');
        }

        //단지 정보.
        item.complex = data.complexDetail;
        //면적별 정보 리스트.
        item.areaList = [];

        //매물정보 검색한 areaNos 파라미터 구성
        var areaNoList = [];

        for(area in data.complexPyeongDetailList) {
            //parseInt(area.supplyAreaDouble)
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

                //저층, 탑층 제외 매매 최저가.
                areaObj.dealPriceMin = 0;
                //전세 최고가.
                areaObj.leasePriceMax = 0;

                //단지에 면적 오브젝트 추가.
                item.areaList.push(areaObj);
            }
        }
        //단지내 면적 오브젝트 생성 및 매물검색 파라미터 생성 --- end.

        //매물 파라미터 세팅.
        param.articles.complexNo = data.complex.complexNo;
        param.articles.areaNos = areaNoList.join(';');

        setTimeout(this.requestDealArticles, this.intervalTime());

    }

    Factory.fn.requestDealArticles = function() {
        // 매매 매물 검색 파라미터 세팅.
        param.articles.tradeTypes = 'A1';

        $.ajax({
            method : 'GET',
            url : api.articles,
            data : param.articles,
            success : this.responseDealArticles
        });

    }

    Factory.fn.responseDealArticles = function(data) {

        if(data.articleList.length > 0) {
            //매물이 있는 경우.

        } else {
            //매물이 없는 경우

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
