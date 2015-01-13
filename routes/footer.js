var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/subscribe', function(req, res) {
    var db = req.app.get('db'),
        subscribe = db.model('subscribe'),
        email=req.body.email;

    //subscribe.remove({}, function (e, data) {
    //    if(e){
    //        console.log(e)
    //    }else {
    //        console.log('plus18' + "success delete");
    //    }
    //});
   var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'welovejavabecause@gmail.com',
            pass: 'welovejava'
        }
    });

    var mailOptions = {
        from: '<welovejavabecause@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔' // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error+ "    emailerror");
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

    subscribe.find({}).exec(function(err, data){
        if(err){
            console.log(err)
        }else{
            for(var i=0; i<data.length; i++){
                if(data[i].email==email){
                    res.send("exist email");
                    return;
                }
            }
            subscribe({email:email}).save(function(e){
                if(e){
                    console.log(e)
                }else{
                   res.send("success")
                }
            })
        }
    });
});

module.exports = router;