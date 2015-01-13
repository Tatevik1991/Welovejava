var express = require('express');
var router = express.Router();
var Recaptcha = require('recaptcha').Recaptcha;

var PUBLIC_KEY = '6LeKIfsSAAAAAM2Md2gFYl7_tPNwgG_O9hmxa7qp',
    PRIVATE_KEY = '6LeKIfsSAAAAABqi3rJahR6b_39oL6TLOvVjcBi1';


var twitterAPI = require('node-twitter-api');
var twitter= new twitterAPI({
    consumerKey: 'FmEEoEKm80yFs0BI5Rc5pxGFX',
    consumerSecret: 'sXIIZwtgNcOOqa9Ii3EowoSZwGx5cIEwzh0VAMoykgzOJaf8XG',
    callback: 'http://127.0.0.1:3000/express-your-love/twitterAuth'
});


/* GET home page. */
router.get('/', function (req, res) {

    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);

    if(!req.session.errMess){
        message=req.session.errMess;
    }
    var error = req.session.ans || '';
    req.session.ans="";
    res.render('express-your-love', {recaptchaForm: recaptcha.toHTML(), message:message, error:error});
});


router.post('/submitForm', function (req, res) {

    var message = req.body.message,
        name = req.body.name,
        db = req.app.get('db'),
        notes = db.model('notes'),
        censoredWords = db.model('censoredWords'),
        result18plus,
        statusData,
        date = new Date();
    req.session.name=name;
    req.session.message=message;

    var data = {
        remoteip: req.connection.remoteAddress,
        challenge: req.body.challengeVal,
        response: req.body.reponseVal
    };
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
    var result = {recaptcha: "incorrect", twitterURL:"", name:name, message:message};

    recaptcha.verify(function (success, error_code) {
        if (success) {

            result.recaptcha="correct";
            if(name[0]=="@") {
                var twitterName = name.substr(1);
              req.session.twitterName=name.substr(1);

                    getRedirectUrl (req, res, function (url) {
                        if (url.status == 'redirect') {
                            result.twitterURL = url.location;

                            res.send(result);
                            return;
                        }
                    });
            }else{
                if(!name){
                    name="anonymous"
                }
                censoredWords.find(function(error, censoredWords) {
                    var result=findCensoredWords(censoredWords, message );
                    statusData=result.statusData;
                    result18plus=result.result18plus;
                    message=message.replace(/\s{2,}/g, ' ');
                    console.log( result.result18plus+"result18plus")
                    notes({
                        name: name,
                        message: message,
                        status: statusData,
                        date: date,
                        status18plus: result18plus
                    }).save(function (e) {
                       if(e){
                           console.log(e)
                       }else {

                           res.send("successfully saved");
                           return;
                       }
                    })
                })
            }
           }else {

            res.send(result);
            return;
        }
    });
});


function getRedirectUrl(req, res, callback){
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            req.session.requestToken = requestToken;
            req.session.requestTokenSecret = requestTokenSecret;
            callback({status: "redirect",
                location : "https://twitter.com/oauth/authenticate?oauth_token="+req.session.requestToken});
        }
    });
}

router.get('/twitterAuth', function (req, res) {
   var  db = req.app.get('db'),
        censoredWords = db.model('censoredWords');

    twitter.getAccessToken(req.query.oauth_token, req.session.requestTokenSecret, req.query.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
                if(error){
                    console.log(error);
                } else {
                    console.log(req.session.twitterName+"req.session.twitterName")
                   if(req.session.twitterName== data["screen_name"]) {
                       censoredWords.find(function(error, censoredWords) {
                           var result = findCensoredWords(censoredWords, req.session.message),
                           statusData = result.statusData,
                           result18plus = result.result18plus;

                           var db = req.app.get('db'),
                               notes = db.model('notes'),
                               date = new Date();
                           req.session.message=req.session.message.replace(/\s{2,}/g, ' ');
                           console.log( result18plus+" tw +result18plus")
                           notes({
                               name: req.session.name,
                               message: req.session.message,
                               status: statusData,
                               date: date,
                               status18plus: result18plus
                           }).save(function (e) {
                               if (e) {
                                   console.log(e)
                               } else {
                                   req.session.ans = "Successfully saved";
                                   res.redirect('/express-your-love/');
                                   return;
                               }
                           })
                       })
                   }else{
                       req.session.errMess=req.session.message;
                       req.session.ans="It's not your twitter";
                       res.redirect('/express-your-love/');
                       return;
                   }
                }
            });
        }
    });

});

function  findCensoredWords(censoredWords, message ){
    var messageArray = message.split(" "),
        result18plus,
        statusData;
    if(censoredWords.length==0){
        result18plus = "no";
        statusData = "pending";
        return {result18plus:result18plus,
            statusData:statusData
        }
    }

    for (var i = 0; i < censoredWords.length; i++) {
        if (result18plus == "yes") {
            break;
        } else {
            for (var j = 0; j < messageArray.length; j++) {
                if ((messageArray[j].toLowerCase()) == censoredWords[i].word) {
                    result18plus = "yes";
                    statusData = "declined";
                    console.log(messageArray + "messageArray");
                    console.log(messageArray);
                    break;
                } else {
                    result18plus = "no";
                    statusData = "pending";
                }
            }
        }
    }
     return {  result18plus:result18plus,
               statusData:statusData
     }
}

module.exports = router;