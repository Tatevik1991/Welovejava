
$(document).ready(function(){
    var lastDate = $("#lastDate"),
        lastDataId=$("#lastDataID"),
        item=$(".item"),
        show = $(".show");

    if ($(item[item.length-1]).prop("id")==lastDataId.val() || !($(item[item.length-1]).prop("id"))) {
        show.css("visibility", "hidden");
    }
});



function itemUrlMaker(item){
    var url=$(item).prop("id");
    url=url.split(" ").join("-");
    url="I-love-java-because-"+url;
    var href="http://localhost:3000/"+(encodeURIComponent(url));
    return href;
}

function openViewItem(item){

    var url=itemUrlMaker(item);
    window.location = url;

}


$(window).scroll(function () {
    var  scrollPage=$('#scrollPage'),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/"),
        page=arrayURl[arrayURl.length-1];

    for (var i=0; i<=scrollPage.val(); i++) {

        var elem = $("." + i)[0];
        if(!elem){
            continue;
        }


        if (isScrolledIntoView(elem)) {

            if(i==0){
                history.pushState({}, '', 'http://localhost:3000/');
            }else{
                console.log(i, scrollPage.val());
                history.pushState({}, '', 'http://localhost:3000/page/'+ i);
            }


        }
    }
});


function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
}


function showMore() {
    var show = $(".show");

    show.css("visibility", "hidden");

    show.val("");
    lazyLoading()


}

function lazyLoading() {

    var container = $('#container'),
        lastDataId = $("#lastDataID"),
        lastDate = $("#lastDate"),
        show = $(".show"),
        scrollPage=$('#scrollPage'),
        pointsDiv = $('.points-div');

    $.ajax({
        url: "/lazyLoading",
        type: "POST",
        data: {lastDate: lastDate.attr("value")},
        success: function (response) {

            lastDate.val(response.lastDate);

            var data = response.data,
                page;

            if (show.val() == "Show more") {
                page=1;
                scrollPage.val(page);
                history.pushState({}, '', 'http://localhost:3000/page/'+ page);
            }else{
                var currentURL = window.location.href,
                    arrayURl=currentURL.split("/"),
                    page=arrayURl[arrayURl.length-1];
                page++;
                scrollPage.val(page);
                history.pushState({}, '', 'http://localhost:3000/page/'+ page);
            }

            for (var i = 0; i < data.length; i++) {
                var wrapper = document.createElement("div");

                //var textResult = data[i].message.split(' ').join('-');

                wrapper.innerHTML = '<li class="item '+page + '"' + 'id="' + data[i]._id + '"' + ' > ' +
                '<div class="note-inner"><span class="love-heading"><span class="i-love">I<img src="../images/gruop1.png" class="group-img"/>JAVA' + ' ' + 'BECAUSE' +
                '</span>' + ' <span class="note_message">' + data[i].message + '</span>' + ' <span class="twitter">' + data[i].name + '</span>'
                + '</span>' + '</span>' + '</div>' +
                '<div class="note-overlay">' + '<div class="outer"><div class="middle" onclick="return viewItem(this)"><div class="details-btn">' +
                '<span class="details">' + '<div  class="view"   id="'+data[i].message+'-' + data[i]._id +
                '" >VIEW'
                + '<img class="group-img" src="../images/gruop1.png"/>NOTE</div></span>' +
                '<div href="" class="fbShareUrl">' + '<button class="fb-btn" onclick="return fbShareFunc()">facebook' + '</button></div>' +
                '<div class="btn"' +
                ' id="' + data[i].message + '" onclick="return tweetShare()">' + '<button class="tw-btn">tweet' +
                '</button></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</li>';
                var elem = wrapper.firstChild;
                container.append(elem);
                container.masonry('appended', elem);
            }
            container.masonry({
                itemSelector: '.item',
                isOriginTop: true,
                singleMode: false,
                isResizable: false,
                isAnimated: true,
                columnWidth: ".item",
                gutter: 7,
                animationOptions: {
                    queue: true,
                    duration: 500
                }
            });
            pointsDiv.html("...");
            var item = $(".item");
                 console.log(data[data.length - 1]._id + "           data[data.length - 1]._id")
            if (lastDataId.val() == data[data.length - 1]._id) {
                pointsDiv.css("visibility", "hidden");
                show.css("visibility", "hidden");
                return
            }
        }
    })
}

$(window).scroll(function () {
    var show = $('.show'),
        pointsDiv = $('.points-div'),
        t = pointsDiv.first().offset().top;

    if (show.val() == "Show more") {
        return;
    }

//    if( pointsDiv.css("visibility")=="hidden"){
//        return
//    }

    if (t <= $(document).scrollTop() + document.documentElement.clientHeight - 200) {
        lazyLoading()
    }
});
