var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

//    var db = req.app.get('db'),
//censoredWords = db.model('censoredWords');
//        notes = db.model('notes');
//    notes.remove({}, function (e, data) {
//
//
//    });

//    censoredWords.remove({}, function (e, data) {
//
//
//    });


// if(!(req.session.loginUsername && req.session.loginPassword )){
//        res.redirect("/login")
//    }
// else {

        var db = req.app.get('db'),
            censoredWords = db.model('censoredWords'),
            notes = db.model('notes');
        censoredWords.find({}).exec(function (err, censoredWords) {
            if (err) {
                console.log(err)
            } else {


                notes.find({}).sort({date: -1}).limit(10).exec(function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        notes.find({status: "approved"}).count().exec(function (error, countApproved) {
                            if (error) {
                                console.log(error)
                            } else {
                                notes.find({status: "declined"}).count().exec(function (error, countDeclined) {
                                    if (error) {
                                        console.log(error)
                                    } else {
                                        notes.find({status: "pending"}).count().exec(function (error, countPending) {
                                            if (error) {
                                                console.log(error)
                                            } else {
                                                notes.find({status18plus: "yes"}).count().exec(function (error, count18plus) {
                                                    if (error) {
                                                        console.log(error)
                                                    } else {
                                                        notes.find({}).limit(1).exec(function (err, lastData) {
                                                            if (err) {
                                                                console.log(err)
                                                            } else {

                                                                if(censoredWords==""){
                                                                    console.log("lpp")
                                                                    censoredWords=[];
                                                                }

                                                                var lastDate = data[data.length -1] ? data[data.length -1].date.getTime() : null,
                                                                    lastDataId = lastData[0] ? lastData[0]._id : null,
                                                                    allCount = countApproved + countDeclined + countPending;
                                                                console.log(lastDataId + "lastDataId");
                                                                res.render("admin", {
                                                                    lastDate: lastDate,
                                                                    lastDataId: lastDataId,
                                                                    censoredWords: censoredWords,
                                                                    data: data,
                                                                    countApproved: countApproved,
                                                                    countDeclined: countDeclined,
                                                                    countPending: countPending,
                                                                    count18plus: count18plus,
                                                                    allCount: allCount
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }

        });
//    }
});





router.post('/addCensoredWord', function(req, res) {
    var db = req.app.get('db'),
        censoredWords = db.model('censoredWords'),
        exist,
        result = {added: "data added", word:"", words:""},
        wordsArray=[],
        words = req.body['words[]'];

    if(words.constructor === Array) {

        censoredWords.find({}).exec(function (err, censoredWord) {
            if (err) {
                console.log(err)
            } else {

                for (var i = 0; i < words.length; i++) {
                    exist=false;
                    if (!words[i]) {
                        continue;
                    }
                    for(var j=0; j<censoredWord.length; j++) {
                        if (censoredWord[j].word == words[i]) {

                            exist=true;
                        }
                    }
                    if(exist){
                        continue
                    }else {

                        wordsArray.push(words[i])

                       //words[i]=words[i].toLowerCase();
                        censoredWords({word: words[i].toLowerCase()}).save(function (e) {
                            if (e) {
                                console.log(e)
                            }
                        })
                    }
                }
            }

            result.words=wordsArray;


            res.send(result);
            return true;

        })

    }else{

        censoredWords.find({word:words}).exec(function (err, censoredWord) {
            if (err) {
                console.log(err)
            } else {
                if (censoredWord != "") {

                    res.send("data is exist");
                    return true;
                } else {
                    words=words.toLowerCase();
                    censoredWords({word:words}).save(function (e) {
                        if (e) {
                            console.log(e)
                        }else{
                            result.word=words;

                            res.send(result);
                            return;
                        }
                    });
                }
            }

        });

    }

});

router.post('/removeCensoredWords', function(req, res) {
    var db = req.app.get('db'),
        censoredWords = db.model('censoredWords'),
        removeWords = req.body['removeWords[]'];
    censoredWords.remove({word : undefined }, function (e, data) {
        if(e){
            console.log(e)
        }
    });
  if(removeWords.constructor === Array){
    for(var i=0; i<removeWords.length; i++) {
       censoredWords.remove({word : removeWords[i] }, function (e, data) {
            if(e){
                console.log(e)
            }
        });
    }
}else{
      censoredWords.remove({word : removeWords }, function (e, data) {
          if(e){
              console.log(e)
          }
      });
  }
    res.send("removed")
});


router.post('/:status', function(req, res) {

    if(req.params.status== "pending" || req.params.status== "declined" || req.params.status== "approved") {
        var db = req.app.get('db'),
            notes = db.model('notes'),
            status = req.body.status;
        notes.find({status: status}).sort({date: -1}).limit(10).exec(function (err, data) {
            if(err){
                console.log(err)
            }else{
                notes.find({status: status}).limit(1).exec(function (err, lastData) {
                    if (err) {
                        console.log(err)
                    } else {
                        var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                            lastDataId = lastData[0] ? lastData[0]._id : null,
                            result = {ans: "success", data: data, lastDate:lastDate, lastDataId:lastDataId};
                        res.send(result);
                        return;
                    }
                })
            }
        })
    }

    if(req.params.status=="18plus"){
        var db = req.app.get('db'),
            notes = db.model('notes');

  notes.find({status18plus: "yes"}).sort({date: -1}).limit(10).exec(function (err, data) {
            if(err){
                console.log(err)
            }else{
                notes.find({status18plus: "yes"}).limit(1).exec(function (err, lastData) {
                    if (err) {
                        console.log(err)
                    } else {
                        var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                            lastDataId = lastData[0] ? lastData[0]._id : null,
                            result = {ans: "success", data: data, lastDate:lastDate, lastDataId:lastDataId};
                        res.send(result)
                        return;
                    }
                })
            }
        })
    }


    if(req.params.status=="all"){
        var db = req.app.get('db'),
            notes = db.model('notes'),
            status = req.body.status;

        notes.find({}).sort({date: -1}).limit(10).exec(function (err, data) {
            if(err){
                console.log(err)
            }else{
                notes.find({}).limit(1).exec(function (err, lastData) {
                    if (err) {
                        console.log(err)
                    } else {

                        var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                            lastDataId = lastData[0] ? lastData[0]._id : null,
                            result = {ans: "success", data: data, lastDate:lastDate, lastDataId:lastDataId};
                        res.send(result);
                        return;
                    }
                })
            }
        })
    }
});


router.get('/:status', function(req, res) {
    if(!(req.session.loginUsername && req.session.loginPassword )){
        res.redirect("/login")
    }else {
        if (req.params.status == "pending" || req.params.status == "declined" || req.params.status == "approved" || req.params.status == "18plus") {

            var db = req.app.get('db'),
                notes = db.model('notes'),
                status = req.params.status,
                censoredWords = db.model('censoredWords');

            notes.find({status: "pending"}).count().exec(function (error, countPending) {
                if (error) {
                    console.log(error)
                } else {
                    notes.find({status: "approved"}).count().exec(function (error, countApproved) {
                        if (error) {
                            console.log(error)
                        } else {
                            notes.find({status: "declined"}).count().exec(function (error, countDeclined) {
                                if (error) {
                                    console.log(error)
                                } else {
                                    notes.find({status18plus: "yes"}).count().exec(function (error, count18plus) {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            censoredWords.find({}).exec(function (err, censoredWords) {
                                                if (err) {
                                                    console.log(err)
                                                } else {
                                                    var allCount = countApproved + countDeclined + countPending;
                                                    if (status == "18plus") {
                                                        notes.find({status18plus: "yes"}).sort({date: -1}).limit(10).exec(function (err, data) {

                                                            if (err) {
                                                                console.log(err)
                                                            } else {
                                                                notes.find({status18plus: "yes"}).limit(1).exec(function (err, lastData) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                    } else {
                                                                        var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                                                                            lastDataId = lastData[0] ? lastData[0]._id : null;


                                                                        res.render("admin", {
                                                                            lastDate: lastDate,
                                                                            lastDataId: lastDataId,
                                                                            censoredWords: censoredWords,
                                                                            data: data,
                                                                            countApproved: countApproved,
                                                                            countDeclined: countDeclined,
                                                                            countPending: countPending,
                                                                            count18plus: count18plus,
                                                                            allCount: allCount

                                                                        });
                                                                        return;
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    if (status == "pending" || status == "declined" || status == "approved") {
                                                        notes.find({status: status}).sort({date: -1}).limit(10).exec(function (err, data) {
                                                            if (err) {
                                                                console.log(err)
                                                            } else {
                                                                notes.find({status: status}).limit(1).exec(function (err, lastData) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                    } else {

                                                                        console.log(censoredWords + "censoredWords");
                                                                        var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                                                                            lastDataId = lastData[0] ? lastData[0]._id : null;
                                                                        res.render("admin", {
                                                                            lastDate: lastDate,
                                                                            lastDataId: lastDataId,
                                                                            censoredWords: censoredWords,
                                                                            data: data,
                                                                            countApproved: countApproved,
                                                                            countDeclined: countDeclined,
                                                                            countPending: countPending,
                                                                            count18plus: count18plus,
                                                                            allCount: allCount

                                                                        });
                                                                        return;
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }

        if (req.params.status == "all") {
            res.redirect("/admin");
            return;
        }
    }
});


router.post('/change/apply/status', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        status = req.body.status,
        arrayId = req.body['arrayId[]'],
        ans;


for(var i=0; i<arrayId.length; i++) {
     var   date= new Date();
    notes.update({_id:arrayId[i]}, {status: status, date:date }, function (error) {
        if (error) {
            console.log(error)
        } else {
            ans = "success";
        }
    });
}
    notes.find({status: "pending"}).count().exec(function (error, countPending) {
        if (error) {
            console.log(error)
        } else {
            notes.find({status: "approved"}).count().exec(function (error, countApproved) {
                if (error) {
                    console.log(error)
                } else {
                    notes.find({status:"declined"}).count().exec(function (error, countDeclined) {
                        if (error) {
                            console.log(error)
                        } else {

                            var  result= {
                                ans: ans,
                                countDeclined: countDeclined,
                                countApproved: countApproved,
                                countPending:countPending
                            };
                            res.send(result)
                        }
                    })
                }
            })
        }
    })

});

router.post('/change/status', function(req, res) {
    var db = req.app.get('db'),
        notes = db.model('notes'),
        status = req.body.status,
        id = req.body.id,
        ans,
        date=new Date();


    notes.update({_id:id}, {status:status, date:date}, function (error) {
        if (error) {
            console.log(error)

        } else {
             ans="success";
            console.log(ans)
        }
    });

notes.find({status: "pending"}).count().exec(function (error, countPending) {
        if (error) {
            console.log(error)
        } else {
            notes.find({status: "approved"}).count().exec(function (error, countApproved) {
                if (error) {
                    console.log(error)
                } else {
                    notes.find({status:"declined"}).count().exec(function (error, countDeclined) {
                        if (error) {
                            console.log(error)
                        } else {

                              var  result= {
                                ans: ans,
                                countDeclined: countDeclined,
                                countApproved: countApproved,
                                countPending:countPending
                           };
                           res.send(result)
                        }
                    })
                }
            })
        }
    })
});

router.post('/change/18plusStatus', function(req, res) {
   var db = req.app.get('db'),
       notes = db.model('notes'),
       status=req.body.status,
       id=req.body.id;

    notes.update({_id:id}, {status18plus:status}, function (error) {
        if(error){
            console.log(error)
        }else{
            notes.find({status18plus:"yes"}).count().exec(function (error, count18plus) {
                if (error) {
                    console.log(error)
                } else {
                    var  result={success:"success", count18plus:count18plus};
                    res.send(result);
                }
            })
       }
   });
});

router.post('/lazyLoading/newData', function(req, res) {
    var  db = req.app.get('db'),
         notes = db.model('notes'),
         lastDate=req.body.lastDate,
        status=req.body.status;

if(!status || status=="all" ||  status=="admin") {
        notes.find({date: {$lt: lastDate}}).sort({date: -1}).limit(10).exec(function (error, data) {
            if(error){
                console.log(error)
            }else{
//                console.log(data + "    daaa");
                var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                    result = {ans: "success", data: data, lastDate: lastDate};
                console.log(result.data[5]._id+ "    _id");
                res.send(result)
            }
        })
    }

    if(status=="pending" || status=="approved" || status=="declined" ) {
        notes.find({status:status, date: {$lt: lastDate}}).sort({date: -1}).limit(10).exec(function (error, data) {
            if(error){
                console.log(error)
            }else {
                var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                    result = {ans: "success", data: data, lastDate: lastDate};
                res.send(result)
            }
        })
    }

    if(status=="18plus") {
        notes.find({status18plus:"yes", date: {$lt: lastDate}}).sort({date: -1}).limit(10).exec(function (error, data) {
            if(error){
                console.log(error)
         }else {
                var lastDate = data[data.length - 1] ? data[data.length - 1].date.getTime() : null,
                    result = {ans: "success", data: data, lastDate: lastDate};
                res.send(result)
            }
        })
    }
});

module.exports = router;
