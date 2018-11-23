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
        this.init();
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

    Export.fn.createTable = function() {
        //
        var tableEle = document.createElement('table');
        tableEle.className = className.table;
        tableEle.id = 'data-table';
        // thead
        this.createThead(tableEle);
        //
        this.createTbody(tableEle);

        $('#tableWrap').append(tableEle);

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
        this.emptyRow(tbody);

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

    window.Export = Export;


})(function() {

});
