var express = require('express');
var router = express.Router();

router.post('/next', function(req, res) {
var lastDate=req.body.lastDate,
    db = req.app.get('db'),
    notes = db.model('notes');
   console.log(lastDate + "lastDate");

    notes.find({status: "approved", date: {$lt: lastDate}}).sort({date: -1}).limit(1).exec(function (error, data) {
    var lastDate=data[0] ? data[0].date.getTime() : null,
        firstLetterName=data[0] ? data[0].name[0] : null,
        result={data:data, lastDate:lastDate, url:""};
        console.log(data + "lastDateinnerfindprrev");

       if(firstLetterName=="@"){
           result.url="URL"
        }
        res.send(result)
    })
});

router.post('/prev', function(req, res) {
    var lastDate=req.body.lastDate,
        db = req.app.get('db'),
        notes = db.model('notes');

    console.log(lastDate + "lastDate");

    notes.find({status: "approved", date: {$gt:lastDate}}).limit(1).exec(function (error, data) {
        var lastDate=data[0] ? data[0].date.getTime() : null,
            firstLetterName=data[0] ? data[0].name[0] : null,
            result={data:data, lastDate:lastDate, url:""};

        console.log(lastDate + "lastDateinnerfindnext");

        if(firstLetterName=="@"){
            result.url="URL";
        }
        res.send(result)
    })
});

module.exports = router;