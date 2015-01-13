function subscribe() {

                var subscribe = $(".white_input"),
                         dark_input =  $(".dark_input"),
                    subscribeInput=$(".subscribe_input");
                if (!(subscribe.val()).match(/[\w\d]{1,20}@[\w\d]{1,20}\.[\w]{1,4}/gi)) {
                     subscribe.css("border", "1px solid red");
                     subscribe.val("");
                     subscribe.attr("placeholder", "  Please enter  correct email");
                }
                else {
                     $.ajax({
                         url: "/footer/subscribe",
                         type: "POST",
                         data:{email:subscribe.val()},
                         success: function (response) {
                             console.log(response);
                             if(response == "exist email"){
                                 subscribe.css("display", "none");
                                 dark_input.css("display", "none");
                                 $("<p class='subscribe-ans'>Your email already submitted!</p>").appendTo(subscribeInput);

                                 setTimeout(function() {
                                     subscribe.val("");
                                     subscribe.css("border", "");
                                     subscribe.attr("placeholder", "Enter your email");
                                     subscribe.css("display", "");
                                     dark_input.css("display", "");
                                     $(".subscribe-ans").remove();
                                 }, 2000);
                                 return
                             }
                             if(response == "success"){
                                 subscribe.css("display", "none");
                                 dark_input.css("display", "none");
                                 $("<p class='subscribe-ans'>Your email successfully added!</p>").appendTo(subscribeInput);

                                 setTimeout(function() {
                                     subscribe.val("");
                                     subscribe.css("border", "");
                                     subscribe.attr("placeholder", "Enter your email");
                                     subscribe.css("display", "");
                                     dark_input.css("display", "");
                                     $(".subscribe-ans").remove();
                                 }, 2000);
                                 return
                             }
                         }
                     });
                 }

             }