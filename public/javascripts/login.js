$(window).keypress(function(e) {
    if(e.which == 13) {
        var changeLogPass=$(".change-log-pass");
        if(changeLogPass.hasClass("reg-show")){
            ChangeLogOrPass();

        }else {
            login();
        }
    }
});


function ChangeLogOrPass(){
    var  newLogin=$(".new-login"),
        currentPassword=$(".current-password "),
        newPassword=$(".new-password");


    if(!currentPassword.val()){
        currentPassword.css("border", "1px solid #dd3d36");
        currentPassword.attr("placeholder", "Enter the correct password");
        return
    }

    $.ajax({
        url:"/login/changePassLog",
        type: "POST",
        data:{newLogin:newLogin.val(),currentPassword:currentPassword.val(),newPassword:newPassword.val()},
        success: function(response){

            if(response=="incorrect password"){
                currentPassword.val("");
                currentPassword.css("border", "1px solid #dd3d36");
                currentPassword.attr("placeholder", "Enter the correct password");
                return;
            }
            if(response=='enter new login or new pass'){
                newLogin.attr("placeholder", "Enter new login");
                newPassword.attr("placeholder", "Enter new password");
                newPassword.css("border", "1px solid #dd3d36");
                newLogin.css("border", "1px solid #dd3d36");
                currentPassword.css("border", "");
                currentPassword.attr("placeholder", "");
                return
            }

            if(response=="change pass"){
                currentPassword.val("");
                newPassword.val("");
                newLogin.css("border", "");
                newLogin.attr("placeholder", "Enter new login");
                currentPassword.css("border", "");
                currentPassword.attr("placeholder", "Enter new password");
                newPassword.css("border", "1px solid green");
                newPassword.attr("placeholder", "Your password changed");
                setTimeout(function() {

                    newPassword.css("border", "");
                    newPassword.attr("placeholder", "Enter new password");

                },2000);
                return;
            }
            if(response=="change login"){
                currentPassword.val("");
                newLogin.val("");

                newPassword.css("border", "");
                newPassword.attr("placeholder", "Enter new password");
                currentPassword.css("border", "");
                currentPassword.attr("placeholder", "Enter the correct password");
                newLogin.css("border", "1px solid green");
                newLogin.attr("placeholder", "Your login changed");

                setTimeout(function() {
                    newLogin.css("border", "");
                    newLogin.attr("placeholder", "Enter new login");
                },2000);
                return;
            }
            if(response=="change login and pass"){
                currentPassword.css("border", "");
                currentPassword.attr("placeholder", "Enter the correct password");
                newLogin.val("");
                newPassword.val("");
                currentPassword.val("");
                newLogin.css("border", "1px solid green");
                newLogin.attr("placeholder", "Your login changed");
                newPassword.css("border", "1px solid green");
                newPassword.attr("placeholder", "Your password changed");
                setTimeout(function() {
                    newLogin.css("border", "");
                    newLogin.attr("placeholder", "Enter new login");
                    newPassword.css("border", "");
                    newPassword.attr("placeholder", "Enter new password");
                },2000);
                return;
            }


        }
    });
};

function login(){
    var loginUsername=$(".login-username"),
        loginPassword=$(".login-password");
    $.ajax({
        url:"/login/login",
        type: "POST",
        data:{loginUsername:loginUsername.val(), loginPassword:loginPassword.val()},
        success: function(response){
            if(response== "incorrect login and password"){

                loginUsername.val("");
                loginPassword.val("");
                loginPassword.css("border", "1px solid #dd3d36");
                loginPassword.attr("placeholder", "Enter the correct password");
                loginUsername.css("border", "1px solid #dd3d36");
                loginUsername.attr("placeholder", "Enter the correct username");
                return;
            }


            if(response=="incorrect login"){

                loginUsername.val("");
                loginUsername.css("border", "1px solid #dd3d36");
                loginUsername.attr("placeholder", "Enter the correct username");
                loginPassword.css("border", "");
                loginPassword.attr("placeholder", "");
                return;
            }
            if(response=="incorrect password"){

                loginPassword.val("");
                loginPassword.css("border", "1px solid #dd3d36");
                loginPassword.attr("placeholder", "Enter the correct password");
                loginUsername.css("border", "");
                loginUsername.attr("placeholder", "");
                return;
            }
            if(response.ans=="success"){

                window.location=response.url;
                return;
            }
        }
    })
}

function showLogPass(){
    var changeLogPass=$(".change-log-pass"),
        pasLogError=$(".pas-log-answer"),
        showLogPassDiv=$(".show-log-pass-div"),
        showLoginDiv=$(".show-login-div"),
        loginUsername=$(".login-username"),
        loginPassword=$(".login-password");

    loginUsername.val("");
    loginPassword.val("");

    loginUsername.css("border", "");
    loginPassword.css("border", "");

    loginPassword.attr("placeholder", "password");
    loginUsername.attr("placeholder", "username");

    if(changeLogPass.hasClass('reg-hidden')){
        changeLogPass.removeClass("reg-hidden");
        changeLogPass.addClass("reg-show");
        showLogPassDiv.css("opacity", '1');
        showLoginDiv.css("opacity", '0.5');
        pasLogError.html('')

    }

};

function showLogin(){
    var changeLogPass=$(".change-log-pass"),
        pasLogError=$(".pas-log-answer"),
        showLogPassDiv=$(".show-log-pass-div"),
        showLoginDiv=$(".show-login-div"),
        newLogin=$(".new-login"),
        currentPassword=$(".current-password "),
        newPassword=$(".new-password");

    newLogin.val("");
    currentPassword.val("");
    newPassword.val();

    newLogin.css("border", "");
    currentPassword.css("border", "");
    newPassword.css("border", "");

    newLogin.attr("placeholder", "New login");
    currentPassword.attr("placeholder", "Enter the correct password");
    newPassword.attr("placeholder", "New password");

    if(changeLogPass.hasClass('reg-show')){
        changeLogPass.removeClass("reg-show");
        changeLogPass.addClass("reg-hidden");
        showLogPassDiv.css("opacity", '0.5');
        showLoginDiv.css("opacity", '1');
        pasLogError.html('')
        newLogin.val("");
        newPassword.val("");
        currentPassword.val("");

    }

};
