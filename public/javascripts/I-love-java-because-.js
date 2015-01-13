    $( document ).ready(function(){
        var     firstDataID=$("#firstDataID"),
                lastDataID=$("#lastDataID"),
                viewNext=$(".view_next"),
                viewPrevious=$(".view_previous"),
                currentURL = window.location.href,
                arrayURl=currentURL.split("-"),
                urlID=arrayURl[arrayURl.length-1];

     if((firstDataID.val())==urlID){
         console.log(firstDataID.val()+ "   value");
            viewPrevious.css("background-image", "url('../images/endprevious.png')");
            return
        }
        if(lastDataID.val()==urlID){

            viewNext.css("background-image", "url('../images/endnext.png')");
            return
        }
    });



    function tweetHref(elem){
        if($(elem).hasClass('nameURL')){
            window.open('https://twitter.com/'+$($(elem).children()[0]).html())
        }
    }

    function prev(){
        var lastDate=$("#lastDate"),
            lastDataID=$("#lastDataID"),
            firstDataID=$("#firstDataID"),
            viewNext=$(".view_next"),
            viewPrev=$(".view_previous"),
            viewMessage=$(".view_message"),
            viewName=$("#divNameID"),
            currentURL = window.location.href,
            arrayURl=currentURL.split("-"),
            urlID=arrayURl[arrayURl.length-1];
        if(urlID==firstDataID.val()){

            return
        }

        $.ajax({
            url: "/I-love-java-because-/prev",
            type: "POST",
            data: {lastDate: lastDate.val()},
            success: function (response) {

                var data=response.data,
                    url=data[0].message+"-"+data[0]._id;
                url=url.split(" ").join("-");
                url=encodeURI(url);

                lastDate.val(response.lastDate);
                viewMessage.html(data[0].message);
                $(viewName.children()[0]).html(data[0].name);


                if(response.url=="URL"){

                    if(!viewName.hasClass('nameURL')){
                        viewName.removeClass('name');
                        viewName.addClass('nameURL')

                    }
                }
                if(!response.url){

                    if(viewName.hasClass('nameURL')){
                        viewName.removeClass('nameURL');
                        viewName.addClass('name')
                    }
                }


                history.pushState({}, '', 'http://localhost:3000/I-love-java-because-'+url);

                if(data[0]._id==firstDataID.val()){
                    viewPrev.css("background-image", "url('../images/endprevious.png')");

                }

                if(data[0]._id!=lastDataID.val() &&  viewNext.css("background-image").replace(/^url|[\(\)]/g, '')=="http://localhost:3000/images/endnext.png"){
                    viewNext.css("background-image",  "url('../images/next.png')")

                }

                var element=$(".view_message"),
                    time=100;
                autoHeightAnimate(element, time);

            }
        })
    }

    function autoHeightAnimate(element, time){
        var curHeight = element.height(), // Get Default Height
            autoHeight = element.css('height', 'auto').height(); // Get Auto Height
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({ height: autoHeight }, parseInt(time)); // Animate to Auto Height
    }


    function next(){
        var lastDate=$("#lastDate"),
            lastDataID=$("#lastDataID"),
            firstDataID=$("#firstDataID"),
            viewNext=$(".view_next"),
            viewPrev=$(".view_previous"),
            viewMessage=$(".view_message"),
            viewName=$("#divNameID"),
            currentURL = window.location.href,
            arrayURl=currentURL.split("-"),
            urlID=arrayURl[arrayURl.length-1];
        if(urlID==lastDataID.val()){

            return
        }

        $.ajax({
            url: "/I-love-java-because-/next",
            type: "POST",
            data:{lastDate:lastDate.val()},
            success: function(response) {
                var data=response.data,
                    url=data[0].message+"-"+data[0]._id;
                url=url.split(" ").join("-");
                url=encodeURI(url);
                lastDate.val(response.lastDate);
                viewMessage.html(data[0].message);
                $(viewName.children()[0]).html(data[0].name);
     console.log(url + "frontdata");

                if(response.url=="URL"){

                    if(!viewName.hasClass('nameURL')){
                        viewName.removeClass('name');
                        viewName.addClass('nameURL')

                    }
                }
                if(!response.url){

                    if(viewName.hasClass('nameURL')){
                        viewName.removeClass('nameURL');
                        viewName.addClass('name')
                    }
                }


                history.pushState({}, '', 'http://localhost:3000/I-love-java-because-'+ url);

                if(data[0]._id==lastDataID.val()){
                    viewNext.css("background-image", "url('../images/endnext.png')");

                }

                if(data[0]._id!=firstDataID.val() &&  viewPrev.css("background-image").replace(/^url|[\(\)]/g, '')=="http://localhost:3000/images/endprevious.png"){
                    viewPrev.css("background-image",  "url('../images/previous.png')")

                }

                var element=$(".view_message"),
                    time=100;
                autoHeightAnimate(element, time);
            }
        })
    }
