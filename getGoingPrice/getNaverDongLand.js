





////https://new.land.naver.com/api/complexes?page=1&cortarNo=4146510200&order=readRank&priceType=REAL&realEstateType=APT:JGC:ABYG:OR&tradeType=&tag=::::::::&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=99&areaMax=132&sameAddressGroup=false
var naverLandAPI = 'https://new.land.naver.com/api/complexes';
var naverLandParam = {
    page : 1,
    cortarNo : 4146510200,       //4146510200 죽전동
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


//$.get(naverLandAPI, naverLandParam).done(aptListFactory);

$.ajax({
    method : 'GET',
    url : naverLandAPI,
    data : naverLandParam,
    success : function(data) {
        console.log(data);
    }
});
