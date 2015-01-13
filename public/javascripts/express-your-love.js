
$(window).keypress(function(e) {
    if(e.which == 13) {
        submitForm();
    }

});

$( document ).ready(function(){
    var formError = $(".form-error");
    $(".form-text-area").focus();

    if(formError.html()=="Successfully saved"){
        formError.css("color", "rgb(146, 255, 146)");
        setTimeout(function() {
            formError.html("");
        }, 2000);
    }


    if(formError.html()=="It's not your twitter"){
        formError.css("color","rgb(215, 30, 30)");
        setTimeout(function() {
            formError.html("");
        }, 2000);
    }
});

$(window).load(function() {
    var recaptcha_res_field =  $("#recaptcha_response_field"),
        recaptchaReload=$("#recaptcha_reload");
    recaptcha_res_field.attr('placeholder','  enter captcha text');
    recaptchaReload.attr("src","../images/refresh-btn.png");

});

function submitForm() {

    var     message = $("#message"),
        name = $("#name"),
        formError = $(".form-error"),
        challenge = $("#recaptcha_challenge_field"),
        response = $("#recaptcha_response_field");

    if( message.val() == ""){
        formError.html("Express your love");
        formError.css("color", "rgb(215, 30, 30)")
        return false;
    }


    if (message.val().length > 100) {

        formError.html("Your express is too long");
        formError.css("color", "rgb(215, 30, 30)")
        return false;
    }


    if(name.val().length> 30){
        formError.html("Your name  is too long");
        formError.css("color", "rgb(215, 30, 30)");
        return false;
    }
    console.log(message.val()+" "+name.val()+" "+challenge.val()+" "+response.val())
    $.ajax({
        url:"/express-your-love/submitForm",
        type: "POST",
        data:{message:message.val(), name:name.val(), challengeVal:challenge.val(),reponseVal:response.val()},
        success: function (data) {

            if(data.recaptcha=="incorrect"){
                formError.html("Incorrect captcha");
                formError.css("color", "rgb(215, 30, 30)");
                Recaptcha.reload();
                name.val(data.name);
                message.val(data.message);
                return;
            }

            if(data=="successfully saved"){
                response.val("");
                message.val("");
                name.val("");
                Recaptcha.reload();
                formError.html("Successfully saved");
                formError.css("color", "rgb(146, 255, 146)");
                setTimeout(function() {
                    formError.html("");
                }, 2000);
            }
            if(data.twitterURL){
                console.log(data.twitterURL)
                window.location = data.twitterURL;
            }

        }
    })

}
