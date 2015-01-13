var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        page=0;

//notes.remove({name:undefined}, function (e, data) {
//        console.log('p
// lus18'+"success delete");
//
//    });

    //notes.update({_id:"54a87bb9876418ec15a397a2"}, {status18plus:"yes"}, function (error) {
    //});
    notes.find({status: "approved"}).sort({date: -1}).limit(10).exec(function (error, data) {
      if (error) {
            console.log(error)
        } else {
            notes.find({status: "approved"}).limit(1).exec(function (error, lastData) {
                if (error) {
                    console.log(error)
                } else {


                    var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                        lastDataID = lastData[0] ? lastData[0]._id : null;
                    res.render('index', {data: data, lastDate: lastDate, lastDataID: lastDataID, page:page});
                }
            });
        }
    });
});

router.get('/page/:page', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        page=req.params.page;

       if(page==0){
         res.redirect("/");
            return;
         }

    notes.find({status: "approved"}).limit(1).exec(function (error, lastData) {
        if (error) {
            console.log(error)
        } else {

            notes.find({status: "approved"}).sort({date: -1}).limit(page*10).exec(function (error, dataTime) {
            if (error) {
                    console.log(error)
                } else {

                var dataTime=dataTime[dataTime.length-1] ? dataTime[dataTime.length-1].date.getTime() : null;

                notes.find({status: "approved", date: {$lt: dataTime}}).sort({date: -1}).limit(10).exec(function (error, data) {
                    if (error) {
                        console.log(error)
                    } else {

                  var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                            lastDataID = lastData[0] ? lastData[0]._id : null;
                        res.render('index', {data: data, lastDate: lastDate, lastDataID: lastDataID, page: page});
                    }
                })
                }
            });
        }
    });
});

router.post('/lazyLoading', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        lastDate = req.body.lastDate;

    notes.find({status: "approved", date: {$lt: lastDate}}).sort({date: -1}).limit(10).exec(function (error, data) {
           console.log(data + "  dataa");
        if (error) {
            console.log(error)
        } else {
            var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                       result = {data: data, lastDate: lastDate};
//               console.log(result.data+ "   message");
                    res.send(result)
                }

    });
});

router.get('/I-love-java-because-:href', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        arrayURL=req.params.href.split("-"),
        id=arrayURL[arrayURL.length-1];

 notes.find({status: "approved"}).exec(function (err, firstLastData) {
        if (err) {
            console.log(err)
        }
        else
        {
            notes.find({_id: id}, function (err, data) {
                if (err) {
                   console.log(err)
                } else {
                    var url="",
                        firstDataID=firstLastData[firstLastData.length-1] ? firstLastData[firstLastData.length-1]._id : null,
                        lastDataID=firstLastData[0] ? firstLastData[0]._id : null,
                        lastDate = data[0] ? data[0].date.getTime() : null,
                         firstLetterName=data[0] ? data[0].name[0] : null;

                    if(firstLetterName=="@"){
                        url="URL"
                    }

                    res.render('I-love-java-because-', {data: data, firstDataID:firstDataID,  lastDataID:lastDataID,lastDate:lastDate, url:url });
                }
            })
        }
    })
});
module.exports = router;
