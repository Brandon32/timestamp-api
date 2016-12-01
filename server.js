var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Timestamp API');
});

app.get('/*', function (req, res) {
  var date = decodeURIComponent(req.originalUrl).slice(1);
  var objDate = new Date();
  if(date.split(' ').length === 1){
    objDate = new Date();
    objDate.setTime(date * 1000);
  }
  else{
    objDate = new Date(date);
  }
  var natural = objDate.toLocaleString("en-us", { month: "long" }) + " ";
  natural += objDate.getDate() + ', ';
  natural += objDate.getFullYear();
  var unix = Math.floor(objDate.getTime()/1000);
  var converted = {
    "unix":objDate.getTime()?unix:null,
    "natural":objDate.getTime()?natural:null
  };
  console.log(objDate,converted.unix,converted.natural);
  res.send(JSON.stringify(converted));
});

app.listen(8080, function () {
  console.log('Timestamp API app listening on port 8080!');
})