




function Request() {
    this.host = {
        dev : './api/',
        live : 'https://new.land.naver.com/api/'
    }


}

Request.fn = Request.prototype;

//
Request.fn.getHost = function() {
    return isDev ? host.dev : host.live;
}

//
Request.fn.regions = function(cortarNo, success, error) {
    var url = this.getHost + 'regions/list?cortarNo=' + cortarNo;

    this.get(url, success, error);
}




//
Request.fn.get = function(url, data, success, error) {

    if(!url) {
        console.error('[Request.fn.get] url undefined!');
        return;
    }
    console.log('>>>>>>>>>>>>>> Request.fn.get <<<<<<<<<<<<<<<');
    console.log('ajax url : ' + url);
    jQuery.ajax({
        method : 'GET',
        url : url,
        data : data || {},
        success : success || this.success,
        error : error || this.error,
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



window.request = new Request();
