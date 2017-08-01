var allFriends = require("../data/friends");



module.exports = function(app){
  app.get("/api/friends", function(req,res){
    res.json(allFriends);
  });

  app.post("/api/friends", function(req,res){
    //code goes here
    var surveyResults = req.body;
    var total = 0;
    var scoreArray = [];
    var named = allFriends[0].name;
    var curr = 0;
    var pic = allFriends[0].photo;

    for(var j=0; j<allFriends.length;j++){
      total=0;
      for(var i=0; i<surveyResults.scores.length; i++){

        total+=(Math.abs(parseInt(surveyResults.scores[i] - parseInt(allFriends[j].scores[i]))));

      }
      scoreArray[j]=total;
    }

    curr = scoreArray[0];

    for(var i = 0; i<scoreArray.length; i++){
      if(curr > scoreArray[i+1]){
        named = allFriends[i+1].name;
        curr = scoreArray[i+1];
        pic = allFriends[i+1].photo;
      }
    }

    var match = {
      name: named,
      photo: pic,
      matchDiff: curr
    };

    res.json(match);

    // console.log(name);
    // console.log(photo);
    // console.log(curr);

  });

};
