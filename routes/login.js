var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render("login");
});

router.get('/logOut', function(req, res) {
    req.session.loginPassword="";
    req.session.loginUsername="";
    res.redirect("/login")
});

router.post('/login', function(req, res) {
    var db = req.app.get('db'),
      admin = db.model('admin'),
      loginUsername=req.body.loginUsername,
        loginPassword=req.body.loginPassword;
    loginUsername=loginUsername.toLowerCase();

//   admin({
//        password: "java",
//        login: "java"
//   }).save(function (e) {
//        console.log("success")
//   });
   //admin.remove({login:"java"}, function (e, data) {
   //     console.log('plus18'+"success delete");
   //
   //});
    var result={ans:"success", url:"http://localhost:3000/admin"};
    admin.find({}).exec(function(err, data){
        if(err){
            console.log(err)
        }else{
            if(!(data[0].login==loginUsername || data[0].password==loginPassword)) {
                res.send("incorrect login and password");
                return;

            }

            if(data[0].login==loginUsername){
                req.session.loginUsername=loginUsername;
            }else{
                res.send("incorrect login");
                return;
            }
            if(data[0].password==loginPassword){
                req.session.loginPassword=loginPassword;
            }else{
                res.send("incorrect password");
                return;
            }

            res.send(result);
            return;
        }
    })
});

router.post('/changePassLog', function(req, res) {
var  db = req.app.get('db'),
     admin = db.model('admin'),
    newLogin=req.body.newLogin,
    currentPassword=req.body.currentPassword,
    newPassword=req.body.newPassword;

    newLogin= newLogin.toLowerCase();

    admin.find({}).exec(function(err, data){
        if(err){
            console.log(err)
        }else{
            var dataId=data[0] ? data[0]._id : null;

            if(!dataId) {
                return;
            }
                admin.find({_id: dataId}).exec(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {

                        if (data[0].password == currentPassword) {
                            if (!(newLogin || newPassword )) {
                                res.send('enter new login or new pass');
                                return
                            }
                            if (newLogin && newPassword) {
                                admin.update({_id: data[0]._id}, {login: newLogin, password: newPassword}, function (e) {
                                    if (e) {
                                        console.log(e)
                                    } else {
                                        res.send("change login and pass");
                                    }
                                });
                                return
                            }
                            if (newLogin && !newPassword) {
                                admin.update({_id: data[0]._id}, { login: newLogin}, function (e) {
                                    if (e) {
                                        console.log(e)
                                    } else {
                                        res.send("change login");
                                    }
                                });

                                return
                            }
                            if (!newLogin && newPassword) {
                                admin.update({_id: data[0]._id}, { password: newPassword }, function (e) {
                                    if (e) {
                                        console.log(e)
                                    } else {
                                        res.send("change pass");
                                    }
                                });

                                return;
                            }

                        } else {
                            res.send("incorrect password");
                            return;

                        }
                    }
                })

        }
  });


});
module.exports = router;