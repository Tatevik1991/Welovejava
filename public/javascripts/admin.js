


function selectAllWord(elem){
    var select=$($(elem).parent()).children()[0],
        allItem=$(".admin-note-checkbox");

    if(select.checked==false){
        $(select).prop("checked", true);
        $(allItem).prop("checked", true)
        return
    }
    if(select.checked==true){
        $(select).prop("checked", false);
        $(allItem).prop("checked", false);
        return;
    }
}


function selectCheckbox(elem) {

    var item=$($(elem).parent()).children()[0];
    if($(item).prop("checked")==false){
        $(item).prop("checked", true)
    }else{
        $(item).prop("checked", false);
    }

};
function selectAll(elem){
    var item=$(".admin-note-checkbox");

    if(elem.checked==true){
        item.prop("checked", true);
        return
    }

    if(elem.checked==false){
        item.prop("checked", false);
        return;
    }
}

function checkStatus(){
    var  currentURL = window.location.href,
        arrayURl=currentURL.split("/"),
        status;

    if(arrayURl[arrayURl.length-1]=="declined" || arrayURl[arrayURl.length-1]=="pending" || arrayURl[arrayURl.length-1]=="approved"){
        status=arrayURl[arrayURl.length-1];

        var radio=$(".radio");
        for(var i=0; i<radio.length; i++){

            if($(radio[i]).val()==status){
                $(radio[i]).css("display", "none");
                if(status=="pending"){
                    $($($(radio[i]).parent()).children()[0]).css("display", "none");
                }
                if(status=="approved"){
                    $($($(radio[i]).parent()).children()[2]).css("display", "none");
                }
                if(status=="declined"){
                    $($($(radio[i]).parent()).children()[4]).css("display", "none");
                }
            }
        }
    }

}
$( document ).ready(function(){

    checkStatus()

    var lastDate=$("#lastDate"),
    lastDataId=$("#lastDataId"),
    adminNoteCheckbox=$(".admin-note-checkbox"),
     adminShow=$(".admin-show");

    if((adminNoteCheckbox[adminNoteCheckbox.length-1].id==lastDataId.val())){
        adminShow.css("visibility", "hidden");
    }



    var declined=$("#declined"),
        all=$("#all"),
        pending=$("#pending"),
        approved=$("#approved"),
        words18plus=$("#words-18plus"),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/");

    if( arrayURl[arrayURl.length-1]=="pending"){
        declined.css("text-decoration", "");
        pending.css("text-decoration", "underline");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "");

        return;
    }
    if( arrayURl[arrayURl.length-1]=="declined"){
        declined.css("text-decoration", "underline");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "");

        return;
    }
    if( arrayURl[arrayURl.length-1]=="approved"){
        declined.css("text-decoration", "");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "underline");
        words18plus.css("text-decoration", "");

        return;
    }

    if( arrayURl[arrayURl.length-1]=="18plus"){
        declined.css("text-decoration", "");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "underline");

        return;
    }
});

$(window).keypress(function(e) {
    if(e.which == 13) {
        var censoredWordsAddCensoredWord=$(".censoredWords-add-censoredWord");
        if($(censoredWordsAddCensoredWord).css('display') === 'block'){

            addCensoredWord()
     }else {
            return;
        }
    }
});


function selectWords(elem){
    var select=$($(elem).parent()).children()[2];
    console.log($(select).prop("class"));

    if($(select).prop("checked")==false){
        $(select).prop("checked", true),
            selectAllCensoredWord();
    }else{
        $(select).prop("checked", false);
        selectAllCensoredWord();
    }
    return;
}

function selectAllCensoredWord(elem){

    var item = $(".censoredWord-span");
    if($(item).css("opacity")==1) {
        $(item).css("opacity", "0.5")
    }else{
        $(item).css("opacity", "1")
    }
}



function addCensoredWord(){
console.log("lol")
    var writeCensoredWord = $('.write-censoredWord'),
        censoredWords= $(".censoredWords-content"),
        check,
        newWords=[],
        noRepeated=[];
    if(!writeCensoredWord.val()){
        return true;
    }

    var word=writeCensoredWord.val();
    word=word.replace(/\s{2,}/g, ' ');
    if(writeCensoredWord.val()==" " || writeCensoredWord.val()==","){
        writeCensoredWord.val("");
        return true;
    }

    if(!(word.indexOf(',') === -1)){
        check=true;
        newWords=(word).replace(/,/g,' ').split(" ");

    }
    if(!word.match(/^\S*$/)){
        check=true;
        newWords=(word).split(" ");
    }

    if(/\s/.test(word)){
        check=true;
        newWords=word.split(/[ ,]+/);
    }
    if(!check){
        newWords.push(word);
    }
    $.each(newWords, function(i, el){
        if($.inArray(el, noRepeated) === -1) noRepeated.push(el);
    });

    $.ajax({
        url: "/admin/addCensoredWord",
        type: "POST",
        data:{words:noRepeated},
        success: function (response) {

            if(response=="data is exist"){
                writeCensoredWord.val("");
                writeCensoredWord.attr("placeholder", "The word is exist");
                return
            }
            if(response.added=="data added"){
                var words=response.words,
                    word=response.word;
                console.log(response)

                if(words.length != 0) {
                    for (var i = 0; i < words.length; i++) {
                        var wrapper = document.createElement("div");
                           words[i]=words[i].toLowerCase();
                        wrapper.innerHTML = '<span class="censoredWord-span" id="' + words[i] + '" onclick="return selectCensoredWord(this)">' + words[i] + ',</span>';
                        var elem = wrapper.firstChild;
                        censoredWords.prepend(elem);
                    }
                }
                if(word!="")  {

                    var wrapper = document.createElement("div");
                    word=word.toLowerCase();
                    wrapper.innerHTML = '<span class="censoredWord-span" id="' + word + '" onclick="return selectCensoredWord(this)">' + word + ',</span>';
                    var elem = wrapper.firstChild;
                    censoredWords.prepend(elem);
                }

                writeCensoredWord.attr("placeholder", "");
                writeCensoredWord.val("");
            }
        }
    })
}

function  selectCensoredWord(elem){
    if($(elem).css("opacity")==1) {
        $(elem).css("opacity", "0.5")
    }else{
        $(elem).css("opacity", "1")
    }
}

function removeCensoredWords(){
    var censoredWordSpan=$(".censoredWord-span"),
        removeWords=[];
    for(var i=0; i<censoredWordSpan.length; i++){
        if($(censoredWordSpan[i]).css("opacity")==0.5){
            removeWords.push($(censoredWordSpan[i]).attr("id"))
        }
    }


    $.ajax({
        url: "/admin/removeCensoredWords",
        type: "POST",
        data:{removeWords:removeWords},
        success: function (response) {
         if (response === "removed") {
             for (var i = 0; i < censoredWordSpan.length; i++) {
                 if ($(censoredWordSpan[i]).css("opacity") == 0.5) {
                     $(censoredWordSpan[i]).remove();
                 }
             }
//             $(".admin-select-all-checkbox").prop("checked", "false");
            }


        }
    });
    return false;
}

function changeStatusToDecline(id){
    var decCheck= $("#"+id+"declined");

    if($(decCheck).prop("checked")==true){
        return;
    }
    var declined=$("#declined"),
        pending=$("#pending"),
        approved=$("#approved"),
        container=$("#container"),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/");

    $.ajax({
        url: "/admin/change/status",
        type: "post",
        data:{id:id, status:"declined"},
        success: function ( response) {
            console.log( response);
                if ( response.ans == "success") {
                      if( arrayURl[arrayURl.length-1]=="approved"  || arrayURl[arrayURl.length-1]=="pending"){
                          $(decCheck).parents(".item-admin").remove();
                          container.masonry({
                                  itemSelector: '.item-admin',
                                  isOriginTop: true,
                                  singleMode: false,
                                  isResizable: false,
                                  isAnimated: true,
                                  columnWidth: ".item-admin",
                                  gutter: 7,
                                  animationOptions: {
                                      queue: true,
                                      duration: 500
                                  }
                              });
                     }else{
                          $(decCheck).prop("checked", true);

                      }
                    pending.html("Pending(" + response.countPending + ")");
                    approved.html("Approve(" + response.countApproved + ")");
                    declined.html("Decline(" + response.countDeclined + ")");
                }
        }
    })
}


function  divChange18plusStatus(elem){
    var item=$($(elem).parent()).children()[2],
        id=$(item).prop("id"),
        status;

    if($(item).prop("checked")==false){
        $(item).prop("checked", true);
        status="yes";
        ch18plusStatus(status, id);
        changeStatusToDecline(id);
        return
    }
    if($(item).prop("checked")==true){
        $(item).prop("checked", false);
        status="no";
        ch18plusStatus(status, id);
        return
    }
}

function change18plusStatus(elem){
    var status,
        id=$(elem).prop("id");

    if($(elem).prop("checked")==true) {
        status="yes";
        ch18plusStatus(status, id);
        changeStatusToDecline(id);
        return
    }
    if($(elem).prop("checked")==false) {
        status="no";
        ch18plusStatus(status, id)
        return
    }
}

function ch18plusStatus(status, id){
    var  words18plus=$("#words-18plus"),
        container=$("#container"),

        currentURL = window.location.href,
        arrayURl=currentURL.split("/");

    $.ajax({
        url: "/admin/change/18plusStatus",
        type: "POST",
        data:{status:status, id:id},
        success: function (response) {
            if(response.success=="success"){
                words18plus.html("18+("+response.count18plus+")");
                if( arrayURl[arrayURl.length-1]=="18plus"){
                    $($("#"+id).parent()).remove();

                    container.masonry({
                        itemSelector: '.item-admin',
                        isOriginTop: true,
                        singleMode: false,
                        isResizable: false,
                        isAnimated: true,
                        columnWidth: ".item-admin",
                        gutter: 7,
                        animationOptions: {
                            queue: true,
                            duration: 500
                        }
                    });
                }
            }
        }
    });
}

function apply() {

    var currentURL = window.location.href,
        arrayURl = currentURL.split("/"),
        selected = $("#selectBox option:selected").text().toLowerCase();


    if (selected == "decline" || selected == "approve") {
        selected = selected + "d";
    }
    if (arrayURl[arrayURl.length - 1] == selected) {
        return
    }
    var arrayId = [],
        adminNoteCheckbox = $(".admin-note-checkbox"),
        container = $("#container"),
        declined = $("#declined"),
        pending = $("#pending"),
        approved = $("#approved"),
        currentURL = window.location.href,
        arrayURl = currentURL.split("/"),
    adminSelectAllCheckbox=$(".admin-select-all-checkbox");

    for (var i = 0; i < adminNoteCheckbox.length; i++) {
        if (adminNoteCheckbox[i].checked == true) {
            arrayId.push($(adminNoteCheckbox[i]).prop("id"))

        }
        $.ajax({
            url: "/admin/change/apply/status",
            type: "POST",
            data: {arrayId: arrayId, status: selected},
            success: function (response) {

                if (response.ans == "success") {
                    pending.html("Pending(" + response.countPending + ")");
                    approved.html("Approved(" + response.countApproved + ")");
                    declined.html("Declined(" + response.countDeclined + ")");
                    if($(adminSelectAllCheckbox).prop("checked")==true){
                        $(adminSelectAllCheckbox).prop("checked", false);
                    }

                    for (var i = 0; i < arrayId.length; i++) {
                        if (arrayURl[arrayURl.length - 1] == "declined" || arrayURl[arrayURl.length - 1] == "approved" || arrayURl[arrayURl.length - 1] == "pending") {
                            $($("#" + arrayId[i]).parent()).remove();

                            container.masonry({
                                itemSelector: '.item-admin',
                                isOriginTop: true,
                                singleMode: false,
                                isResizable: false,
                                isAnimated: true,
                                columnWidth: ".item-admin",
                                gutter: 7,
                                animationOptions: {
                                    queue: true,
                                    duration: 500
                                }
                            });
                        } else {
                            $("#" + arrayId[i]).prop("checked", false);
                            $("#"+arrayId[i]+selected).prop("checked", true);
                        }
                    }

                }
            }

        })
    }
}
function  changeStatusSelectItem(elem){

    var    id=$(elem).attr("name"),
        status=$(elem).val(),
        container=$("#container"),
        declined=$("#declined"),
        pending=$("#pending"),
        approved=$("#approved"),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/");


    $.ajax({
        url: "/admin/change/status",
        type: "POST",
        data:{id:id, status:status},
        success: function (response) {
            console.log(response);
            if(response.ans=="success"){
                pending.html("Pending("+response.countPending+")");
                approved.html("Approved("+response.countApproved+")");
                declined.html("Declined("+response.countDeclined+")");

                if( arrayURl[arrayURl.length-1]=="declined" || arrayURl[arrayURl.length-1]=="approved" || arrayURl[arrayURl.length-1]=="pending"){

                    $($("#"+id).parent()).remove();
                    container.masonry({
                        itemSelector: '.item-admin',
                        isOriginTop: true,
                        singleMode: false,
                        isResizable: false,
                        isAnimated: true,
                        columnWidth: ".item-admin",
                        gutter: 7,
                        animationOptions: {
                            queue: true,
                            duration: 500
                        }
                    });
                }
            }
        }
    });
}

function twitterURL(elem){
    var url=$(elem).html().slice(1);
    window.open("https://twitter.com/"+url)
}

function closeCensoredWords(){
    var censoredWordsAddCensoredWord=$(".censoredWords-add-censoredWord"),
        openCensoredWords=(".open-censoredWords");

    if($(censoredWordsAddCensoredWord).hasClass("cenWords-add-cenWord-show")){
        $(censoredWordsAddCensoredWord).removeClass("cenWords-add-cenWord-show");
        $(censoredWordsAddCensoredWord).fadeOut( 200, function() {
        $(censoredWordsAddCensoredWord).addClass("cenWords-add-cenWord-hidden");
        });

        $(openCensoredWords).css("text-decoration", "");
    }
}

function openCensoredWords(){
    var censoredWordsAddCensoredWord=$(".censoredWords-add-censoredWord"),
        openCensoredWords=(".open-censoredWords");

   if($(censoredWordsAddCensoredWord).hasClass("cenWords-add-cenWord-hidden")){
       $(censoredWordsAddCensoredWord).fadeIn( 200, function() {
           $(censoredWordsAddCensoredWord).addClass("cenWords-add-cenWord-show");
    });
       $(openCensoredWords).css("text-decoration", "underline");
   }
    $(censoredWordsAddCensoredWord).removeClass("cenWords-add-cenWord-hidden");
      $(".censoredWord-span").css("opacity","1");
      $(".admin-select-all-checkbox").prop("checked", false);

}



function getSelectData(elem){

    var     status=elem.id,
        lastDate=$("#lastDate"),
        lastDataId=$("#lastDataId"),
        adminShow=$(".admin-show"),
        adminPointsDiv=$(".admin-points-div"),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/");

    if(status=="words-18plus"){
        status="18plus";
    }
    if( arrayURl[arrayURl.length-1]==status){
        return;
    }

    var declined=$("#declined"),
        all=$("#all"),
        pending=$("#pending"),
        approved=$("#approved"),
        words18plus=$("#words-18plus"),
        container=$("#container");

    if(status=="18plus") {

        declined.css("text-decoration", "");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "underline");
    }
    if(status=="declined") {
        declined.css("text-decoration", "underline");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "");
    }
    if(status=="pending") {
        declined.css("text-decoration", "");
        pending.css("text-decoration", "underline");
        all.css("text-decoration", "");
        approved.css("text-decoration", "");
        words18plus.css("text-decoration", "");
    }
    if(status=="approved") {
        declined.css("text-decoration", "");
        pending.css("text-decoration", "");
        all.css("text-decoration", "");
        approved.css("text-decoration", "underline");
        words18plus.css("text-decoration", "");
    }

    $.ajax({
        url: "/admin/"+status,
        type: "POST",
        data:{status:status},
        success: function (response) {
            if (response.ans = "success") {
                history.pushState({}, '', 'http://localhost:3000/admin/'+ status);

                var data=response.data;
                lastDate.val(response.lastDate);
                lastDataId.val(response.lastDataId);

                var itemHtml = containerMaker(data, container);
                $('#container > div.item-admin').remove();

                $(container).append(itemHtml);

                $(container).masonry('prepended', $(container).find('div.item-admin'), true);

                if((data[data.length-1]._id==response.lastDataId) || (response.lastDate=="null")){
                    adminShow.css("visibility", "hidden");
                    adminPointsDiv.css("visibility", "hidden");
                }else{
                    adminShow.css("visibility", "visible");
                    adminShow.val("Show more");
                }
                checkStatus();
                $('.admin-note-inner').on('click', addCheckEvent);
            }
        }
    });
    $(container).masonry({
        itemSelector: '.item-admin',
        isOriginTop: true,
        singleMode: false,
        isResizable: false,
        isAnimated: true,
        columnWidth: ".item-admin",
        gutter: 7,
        animationOptions: {
            queue: true,
            duration: 500
        }
    });
}

function addCheckEvent(e){
    if (e.target !== this) {

        return;
    } else {
        var item = $(e.target).children()[0];
        if ($(item).prop("checked") == false) {
            $(item).prop("checked", true)
        } else {
            $(item).prop("checked", false)
        }
    }

}


function adminShowMore(){
    var lastDate=$("#lastDate");
    if(lastDate.val()=="null"){
        return
    }
    var   adminShow = $(".admin-show"),
        container=$("#container"),
        lastDataId=$("#lastDataId"),

        adminPointsDiv = $('.admin-points-div'),
        currentURL = window.location.href,
        arrayURl=currentURL.split("/"),

        status=arrayURl[arrayURl.length-1];

    adminShow.css("visibility", "hidden");

    adminShow.val("");

    adminLazyLoading(status);

}


$(window).scroll(function () {
    var show = $('.admin-show'),
        pointsDiv = $('.admin-points-div'),
        t = pointsDiv.first().offset().top,
        currentURL = window.location.href,
        arrayURl=currentURL.split("/"),
        status=arrayURl[arrayURl.length-1];

    if (show.val() == "Show more") {
        return;
    }

    if( pointsDiv.css("visibility")=="hidden"){
        return
    }

    if (t <= $(document).scrollTop() + document.documentElement.clientHeight-100) {
        adminLazyLoading(status)
    }
});

function adminLazyLoading(status){
    var lastDate=$("#lastDate"),
        container=$("#container"),
        lastDataId=$("#lastDataId"),

        adminPointsDiv = $('.admin-points-div');

    $.ajax({
        url: "/admin/lazyLoading/newData",
        type: "POST",
        data:{lastDate:lastDate.val(), status:status},
        success: function (response) {
            if(response.ans=="success"){
                var data=response.data;
                lastDate.val(response.lastDate);
//   console.log(data[data.length-1].message + "messsage");

                wrapperMaker(response.data, container)
                adminPointsDiv.html("...");
                console.log (data[5]._id + "data");
                if((data[5]._id==lastDataId.val()) || (response.lastDate=="null")){
                    adminPointsDiv.css("visibility", "hidden");
                }else{
                    console.log("visible");
                    adminPointsDiv.css("visibility", "visible");
                }

                checkStatus();

                $('.admin-note-inner').on('click', addCheckEvent);
            }

        }
    })
}