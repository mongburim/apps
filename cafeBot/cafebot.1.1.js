

/**
 * 댓글봇
 * 먼저, 네이버에 로그인 하셔야 합니다.
 * 1. m.cafe.naver.com으로 접속합니다.
 * 2. url의 menuId값을 입력합니다.
 * 3. 댓글 문장을 입력합니다.
 * 4. 실행후 대기합니다.
 *
 * Naver Cafe Comment Bot by mongburim
 */

//독서모임게시판
var intervalURL = 'https://m.cafe.naver.com/ArticleList.nhn?search.clubid=27549420&search.menuid=89&search.boardtype=L';

// 게시판의 url의 menuId=123 의 숫자값을 입력해 주세요!
var menuId = '89';
// 댓글 문장을 입력합니다.
var myComment = 'rr';
// 딜레이 타이밍입니다. 수정하지 않으셔도 됩니다.
var intervalTime = 250;
// 딜레이 여부
var isDelay = true;


var target;
var parser = new DOMParser();

var dataCafeId = undefined;
var oldArticleId = undefined;
var newArticleId = undefined;
var checkInterval = undefined;
var checkTime = new Date().getTime();
var isStop = false;


function intervalChecker() {
    checkInterval = undefined;
    jQuery.get({
        url : intervalURL,
        success : function(res) {
            target = parser.parseFromString(res, "text/html");

            var $firstNode = jQuery(target).find('div#articleListArea ul li:first a');
            if(!dataCafeId) {
                dataCafeId = $firstNode.attr('data-cafe-id');
            }

            if(!oldArticleId) {
                oldArticleId = $firstNode.attr('data-article-id');
            }

            if(oldArticleId === $firstNode.attr('data-article-id')) {
                //새로운 게시글이 없는 경우.
                //checkInterval = undefined;
                var currentTime = new Date().getTime();
                var gapTime = currentTime - checkTime;
                checkTime = currentTime;
                console.log('새로운 게시글이 없습니다. 첫번째 게시글 아이디 : ' + $firstNode.attr('data-article-id') + ', interval Time :' + gapTime);

                if(!isStop) {
                    if(isDelay) {
                        checkInterval = setTimeout(intervalChecker, intervalTime);
                    } else {
                        intervalChecker();
                    }
                } else {
                    console.log('stop:: interval check post');

                }

            } else {
                //새로운 게시글이 있는 경우.
                newArticleId = $firstNode.attr('data-article-id');
                console.log('새로운 게시글이 게시 되었습니다. 댓글봇 폼 전송 : ' + $firstNode.attr('data-article-id'));
                commentSubmit();
            }

            //console.log(res)
        },
        error : function() {
            console.log('html get Error!!!');
        }
    });
}




function commentSubmit() {

    var form = document.createElement("form");
    form.action = '/CommentPost.nhn?m=write';
    form.method = 'post';
    form.enctype = 'application/x-www-form-urlencoded';
    form.autocomplete = 'off';
    form.name = 'cafebotForm';


    // clubid INPUT Element Create
    var clubidNode = document.createElement('input');
    clubidNode.type = 'hidden';
    clubidNode.name = 'clubid';
    clubidNode.value = dataCafeId;

    // clubid INPUT Element Create
    var articleidNode = document.createElement('input');
    articleidNode.type = 'hidden';
    articleidNode.name = 'articleid';
    articleidNode.value = newArticleId;

    // clubid INPUT Element Create
    var pageNode = document.createElement('input');
    pageNode.type = 'hidden';
    pageNode.name = 'page';
    pageNode.value = '1';


    // clubid INPUT Element Create
    var menuidNode = document.createElement('input');
    menuidNode.type = 'hidden';
    menuidNode.name = 'menuid';
    menuidNode.value = menuId;

    // clubid INPUT Element Create
    var showCafeHomeNode = document.createElement('input');
    showCafeHomeNode.type = 'hidden';
    showCafeHomeNode.name = 'showCafeHome';
    showCafeHomeNode.value = 'false';

    /**
     * 아래부터는 value 값이 없는 input
     */
    // stickerId INPUT Element Create
    var stickerIdNode = document.createElement('input');
    stickerIdNode.type = 'hidden';
    stickerIdNode.name = 'stickerId';

    // clubid INPUT Element Create
    var imagePathNode = document.createElement('input');
    imagePathNode.type = 'hidden';
    imagePathNode.name = 'imagePath';

    // clubid INPUT Element Create
    var imageFileNameNode = document.createElement('input');
    imageFileNameNode.type = 'hidden';
    imageFileNameNode.name = 'imageFileName';

    // clubid INPUT Element Create
    var imageWidthNode = document.createElement('input');
    imageWidthNode.type = 'hidden';
    imageWidthNode.name = 'imageWidth';

    // clubid INPUT Element Create
    var imageHeightNode = document.createElement('input');
    imageHeightNode.type = 'hidden';
    imageHeightNode.name = 'imageHeight';

    // clubid INPUT Element Create
    var contentNode = document.createElement('textarea');
    contentNode.name = 'content';
    contentNode.value = myComment;

    form.appendChild(clubidNode);
    form.appendChild(articleidNode);
    form.appendChild(pageNode);
    form.appendChild(menuidNode);
    form.appendChild(showCafeHomeNode);
    form.appendChild(stickerIdNode);
    form.appendChild(imagePathNode);
    form.appendChild(imageFileNameNode);
    form.appendChild(imageWidthNode);
    form.appendChild(imageHeightNode);
    form.appendChild(contentNode);

    document.body.appendChild(form);

    form.submit();
}

function start() {
    isStop = false;
    intervalChecker();
}

function stop() {
    isStop = true;
    if(checkInterval) {
        clearTimeout(checkInterval);
        checkInterval = undefined;
        console.log('commentBot STOP');
    }
}



window.start = start;
window.stop = stop;

intervalChecker();
