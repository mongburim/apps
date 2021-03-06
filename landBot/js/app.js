

//global
var isDev = true;




(function(load, request, publisher) {

    function App() {
        load(this.init);
    }

    App.fn = App.prototype;

    App.fn.init = function() {
        console.log('App init >>>>>>>>>>>>>>>>>>>>>> ');
        window.request = request();
        window.publisher = publisher(window.request);

    };




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
        //city
        $('#citySelector').on('change', jQuery.proxy(this.cityChange, this));
        //dvsn
        $('#dvsnSelector').on('change', jQuery.proxy(this.dvsnChange, this));
        //sec
        $('#secSelector').on('change', jQuery.proxy(this.secChange, this));

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



    return new Publisher(request);




});
