/**
font-size: 13px;position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: 1000;background: #ffffffe0;width: 100%;height: 100%;text-align: center;
**/

var basicHTML = '<div style="font-size: 13px;position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: 1000;background: #fffffff0;width: 100%;height: 100%;text-align: center;">';
basicHTML += '<div class="container" style="font-size:13px;max-width: 95%;">';
basicHTML += '    <div class="row">';
basicHTML += '        <p>월급쟁이 부자들.. 표 스타일,</p><br/>';
basicHTML += '    </div>';
basicHTML += '    <div class="row">';
basicHTML += '        <p>';
basicHTML += '            <button class="btn btn-primary" type="button" onclick="grid.publishBasicTable()">소호리치 시세표</button>';
basicHTML += '            <button class="btn btn-primary" type="button" onclick="grid.publishSimpleTable()">파워포인트 시세표</button>';
basicHTML += '            <button class="btn btn-primary" type="button" onclick="grid.publishMichelleTable()">방랑미쉘 시세표</button>';
basicHTML += '            <button class="btn btn-primary" type="button" onclick="grid.publishYujinTable()">유진아빠 시세표</button>';
basicHTML += '        </p>';
basicHTML += '    </div>';
basicHTML += '    <div class="row">';
basicHTML += '        <p>';
basicHTML += '            <button class="btn btn-warn" type="button" onclick="grid.exportXlsx()">엑셀 다운로드</button>';
basicHTML += '        </p>';
basicHTML += '    </div>';
basicHTML += '    <div class="row" id="tableWrapper" style="background: #ffffff;">';
basicHTML += '        <table class="table table-bordered" id="data-table">';
basicHTML += '            <thead>';
basicHTML += '            </thead>';
basicHTML += '            <tbody>';
basicHTML += '            </tbody>';
basicHTML += '        </table>';
basicHTML += '    </div>';
basicHTML += '</div>';
basicHTML += '</div>';

var basicTR = '';
basicTR += '<tr>';
basicTR += '    <td>{{complexName}}</td>';                  //단지명
basicTR += '    <td>{{yearMonth}}</td>';                    //입주년월
basicTR += '    <td>{{totalHouseholdCount}}</td>';          //총세대수
basicTR += '    <td>{{householdCountByPyeong}}</td>';       //평형별 세대수
basicTR += '    <td>{{supplyPyeong}}</td>';                             //공급평형
basicTR += '    <td>{{supplyArea}}</td>';                            //공급(㎡)
basicTR += '    <td>{{exclusivePyeong}}</td>';                            //전용평형
basicTR += '    <td>{{exclusiveArea}}</td>';                            //전용(㎡)
basicTR += '    <td>{{dealPriceMin}}</td>';                             //매매최저
basicTR += '    <td>{{leasePriceMax}}</td>';                             //전세최고
basicTR += '    <td>{{gap}}</td>';                                //갭
basicTR += '    <td>{{leasePercent}}</td>';                             //전세가율
basicTR += '    <td>{{pyeongUnitPrice}}</td>';                             //매매평단
basicTR += '    <td>{{roomCount}}</td>';                                //방 (알수 없음)
basicTR += '    <td>{{bathCount}}</td>';                               //욕실 (알수없음)
basicTR += '    <td>{{entranceType}}</td>';                            //계단식,복도식
basicTR += '    <td>{{comment}}</td>';                               //비고
basicTR += '</tr>';

var TABLE = {
    complexName : '<td>{{complexName}}</td>',
    yearMonth : '<td>{{yearMonth}}</td>',
    totalHouseholdCount : '<td>{{totalHouseholdCount}}</td>',
    householdCountByPyeong : '<td>{{householdCountByPyeong}}</td>',
    supplyPyeong : '<td>{{supplyPyeong}}</td>',
    supplyArea : '<td>{{supplyArea}}</td>',
    exclusivePyeong : '<td>{{exclusivePyeong}}</td>',
    exclusiveArea : '<td>{{exclusiveArea}}</td>',
    dealPriceMin : '<td>{{dealPriceMin}}</td>',
    leasePriceMax : '<td>{{leasePriceMax}}</td>',
    gap : '<td>{{gap}}</td>',
    leasePercent : '<td>{{leasePercent}}</td>',
    pyeongUnitPrice : '<td>{{pyeongUnitPrice}}</td>',
    roomCount : '<td>0</td>',
    bathCount : '<td>0</td>',
    entranceType : '<td>{{entranceType}}</td>',
    comment : '<td>{{comment}}</td>',
    emptyTD : '<td></td>'
}

var basicThead = '';
basicThead += '                <tr>';
basicThead += '                    <th>단지명</th>';
basicThead += '                    <th>입주년도</th>';
basicThead += '                    <th>총세대수</th>';
basicThead += '                    <th>평형별세대수</th>';
basicThead += '                    <th>공급평형</th>';
basicThead += '                    <th>공급(㎡)</th>';
basicThead += '                    <th>전용평형</th>';
basicThead += '                    <th>전용(㎡)</th>';
basicThead += '                    <th>매매최저</th>';
basicThead += '                    <th>전세최고</th>';
basicThead += '                    <th>갭</th>';
basicThead += '                    <th>전세가율</th>';
basicThead += '                    <th>매매평단</th>';
basicThead += '                    <th>방</th>';
basicThead += '                    <th>욕실</th>';
basicThead += '                    <th>계단/복도</th>';
basicThead += '                    <th>비고</th>';
basicThead += '                </tr>';

var simpleThaed = '<tr><th colspan="7">파워포인트용 시세박스</th></tr>';

var SIMPLE = {
    complexInfo : '<td colspan="7">{{complexInfo}}</td>',
    area : '<td>{{area}}</td>',
    houseCount : '<td>{{houseCount}}</td>',
    dealPriceMin : '<td>{{dealPriceMin}}</td>',
    leasePriceMax : '<td>{{leasePriceMax}}</td>',
    gap : '<td>{{gap}}</td>',
    leasePercent : '<td>{{leasePercent}}</td>',
    pyeongUnitPrice : '<td>{{pyeongUnitPrice}}</td>'
}


function GridFactory() {
    this.init();
}

GridFactory.fn = GridFactory.prototype;

GridFactory.fn.init = function() {
    $(document.body).append($(basicHTML));
}

GridFactory.fn.publishBasicTable = function() {
    this.clearTable();

    if(!complexList) {
        alert('단지 데이터가 존재하지 않습니다. 다시 확인해 주세요!');
        return;
    }
    //thead append
    $('table#data-table thead').append($(basicThead));
    //tbody
    var $tbody = $('table#data-table tbody');

    for(idx in complexList) {
        var complex = complexList[idx];
        var initial = true;
        var complexHTML = '';

        //단지 기본정보 입력.

        if(complex.areaList.length > 0) {
            //단지가 있는 경우.
            //면적별.
            var areaLen = complex.areaList.length;

            for(var i=0; i < areaLen; i++) {
                var area = complex.areaList[i];
                complexHTML = '';
                if(i === 0) {
                    //단지명
                    complexHTML += TABLE.complexName.replace('{{complexName}}', complex.complex.complexName);
                    //입주년월
                    complexHTML += TABLE.yearMonth.replace('{{yearMonth}}', (complex.complex.completionYearMonth.substr(0,4) + '년 ' +  complex.complex.completionYearMonth.substr(4,2) + '월'));
                    //입주년월
                    complexHTML += TABLE.totalHouseholdCount.replace('{{totalHouseholdCount}}', complex.complex.totalHouseholdCount);
                } else {

                    //단지 아래 row에 빈공간 넣기.
                    complexHTML += TABLE.emptyTD;
                    complexHTML += TABLE.emptyTD;
                    complexHTML += TABLE.emptyTD;

                }

                //평형별 세대수.
                complexHTML += TABLE.householdCountByPyeong.replace('{{householdCountByPyeong}}', area.householdCountByPyeong);
                //공급 평형.
                complexHTML += TABLE.supplyPyeong.replace('{{supplyPyeong}}', area.supplyPyeong);
                //공급 제곱미터.
                complexHTML += TABLE.supplyArea.replace('{{supplyArea}}', area.supplyArea);
                //전용평형. exclusivePyeong
                complexHTML += TABLE.exclusivePyeong.replace('{{exclusivePyeong}}', area.exclusivePyeong);
                //전용 제곱미터. exclusiveArea
                complexHTML += TABLE.exclusiveArea.replace('{{exclusiveArea}}', area.exclusiveArea);
                //매매 최저 가격. dealPriceMin
                var dealPriceMin = area.deal ? area.deal.priceMin : 0;
                complexHTML += TABLE.dealPriceMin.replace('{{dealPriceMin}}',dealPriceMin === 999999 ? 0 : dealPriceMin);
                //전체 최고 가격. leasePriceMax
                var leasePriceMax = area.lease ? area.lease.priceMax : 0;
                complexHTML += TABLE.leasePriceMax.replace('{{leasePriceMax}}', leasePriceMax);
                //gap
                var gapPrice = 0;
                if(dealPriceMin !== 999999 && leasePriceMax !== 0) {
                    gapPrice = dealPriceMin - leasePriceMax
                }
                complexHTML += TABLE.gap.replace('{{gap}}', gapPrice);
                //전세가율.  leasePercent
                var percentage = Math.round((leasePriceMax / dealPriceMin) * 100);
                complexHTML += TABLE.leasePercent.replace('{{leasePercent}}', percentage + '%');
                //평단가. pyeongUnitPrice
                var pyeongUnitPrice = Math.floor((dealPriceMin/area.supplyAreaDouble) * 3.3 );
                complexHTML += TABLE.pyeongUnitPrice.replace('{{pyeongUnitPrice}}', Math.floor(pyeongUnitPrice/10) * 10);

                //roomCount : '<td>0</td>',
                complexHTML += TABLE.roomCount;

                //bathCount : '<td>0</td>',
                complexHTML += TABLE.bathCount;

                //entranceType : '<td>{{entranceType}}</td>',
                complexHTML += TABLE.entranceType.replace('{{entranceType}}', area.entranceType);

                //comment : '<td>{{comment}}</td>',
                var comments = [];
                if(area.deal.priceMin === 999999) {
                    comments.push('매매물건 없음');
                }
                if(area.lease.priceMax === 0) {
                    comments.push('전세물건 없음');
                }

                complexHTML += TABLE.comment.replace('{{comment}}', comments.join(','));

                $tbody.append($('<tr>'+ complexHTML +'</tr>'));
            }

        } else {
            //대상 단지가 없는 경우.
            // 14개의 공백을 만든후 비고에 대상 없음.문구 넣기.
            //단지명
            complexHTML += TABLE.complexName.replace('{{complexName}}', complex.complex.complexName);
            //입주년월
            complexHTML += TABLE.yearMonth.replace('{{yearMonth}}', (complex.complex.completionYearMonth.substr(0,4) + '년 ' +  complex.complex.completionYearMonth.substr(4,2) + '월'));
            //입주년월
            complexHTML += TABLE.totalHouseholdCount.replace('{{totalHouseholdCount}}', complex.complex.totalHouseholdCount);

            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;   //5
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;   //10
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;
            complexHTML += TABLE.emptyTD;   //13
            complexHTML += TABLE.comment.replace('{{comment}}', '분석 대상 면적이 존재 하지 않음');
            $tbody.append($('<tr>'+ complexHTML +'</tr>'));

        }

    }
}

GridFactory.fn.publishSimpleTable = function() {
    this.clearTable();

    if(!complexList) {
        alert('단지 데이터가 존재하지 않습니다. 다시 확인해 주세요!');
        return;
    }
    //thead append
    $('table#data-table thead').append($(simpleThaed));
    //tbody
    var $tbody = $('table#data-table tbody');

    for(idx in complexList) {
        var complex = complexList[idx];
        var initial = true;
        var complexHTML = '';

        //단지 기본정보 입력.
        if(complex.areaList.length > 0) {
            //단지가 있는 경우.
            //면적별.
            var areaLen = complex.areaList.length;

            for(var i=0; i < areaLen; i++) {
                var area = complex.areaList[i];
                complexHTML = '';

                if(i === 0) {
                    //단지명
                    var complexInfo = complex.complex.complexName +'['+ complex.complex.completionYearMonth.substr(0,4) + '년, 총 ' + complex.complex.totalHouseholdCount +'세대]';
                    complexHTML += SIMPLE.complexInfo.replace('{{complexInfo}}', complexInfo);
                    $tbody.append($('<tr style="text-align:left;">'+ complexHTML +'</tr>'));
                    complexHTML = '';
                }
                //면적 정보.
                var areaInfo = parseInt(area.supplyPyeong) + 'py(' + parseInt(area.supplyArea) + '㎡)';
                complexHTML += SIMPLE.area.replace('{{area}}', areaInfo);
                //평형별 세대수. //pyeongName
                var areaHouseCount = area.pyeongName + '타입('+ area.householdCountByPyeong +')';
                complexHTML += SIMPLE.houseCount.replace('{{houseCount}}', areaHouseCount);

                //매매 최저가.
                var dealPriceMin = area.deal ? area.deal.priceMin : 0;
                complexHTML += SIMPLE.dealPriceMin.replace('{{dealPriceMin}}', dealPriceMin);
                //전세 최고가.
                var leasePriceMax = area.lease ? area.lease.priceMax : 0;
                complexHTML += SIMPLE.leasePriceMax.replace('{{leasePriceMax}}', leasePriceMax);
                //gap.
                complexHTML += SIMPLE.gap.replace('{{gap}}', (dealPriceMin - leasePriceMax));
                //전세가율.
                var percentage = Math.round((leasePriceMax / dealPriceMin) * 100);
                complexHTML += SIMPLE.leasePercent.replace('{{leasePercent}}', percentage + '%');
                //평단가.
                var pyeongUnitPrice = Math.floor((dealPriceMin/area.supplyAreaDouble) * 3.3 );
                complexHTML += SIMPLE.pyeongUnitPrice.replace('{{pyeongUnitPrice}}', pyeongUnitPrice);

                $tbody.append($('<tr>'+ complexHTML +'</tr>'));
            }
        }

    }

}

GridFactory.fn.publishMichelleTable = function() {
    alert('방랑미쉘님의 면적별 시세표! 멋지게 준비중입니다. 곧 찾아 뵙겠습니다.! 오늘도 힘찬 하루 되세요!');
    return;
}

GridFactory.fn.publishYujinTable = function() {
    alert('유진아빠님의 디테일 시세표 준비중입니다. 곧 찾아 뵙겠습니다.! 오늘도 힘찬 하루 되세요!');
    return;
}

GridFactory.fn.clearTable = function() {
    $('table#data-table thead').html('');
    $('table#data-table tbody').html('');

}

GridFactory.fn.exportXlsx = function() {
    var type = 'xlsx';
    var elt = document.getElementById('data-table');
    var wb = XLSX.utils.table_to_book(elt, {sheet:"시세표"});
    return XLSX.writeFile(wb, ('시세표.' + (type || 'xlsx')));
}






window.grid = new GridFactory();
