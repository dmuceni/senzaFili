var conf = require('./config.json');
var yandex = require('yandex-translate-api')(conf.yandexKey)
var express = require('express');
var app = express();
const pug = require('pug');
const opn = require('opn');
app.engine('pug', require('pug').__express)
app.set('views', './views')
app.set('view engine', 'pug')





var json2html = require('node-json2html');
 
var transform = {"<>":"div","html":"${lang} : <b>${text}</b>"};

const PORT = process.env.PORT || 3000

var i = 0;
var trad = [];

app.get('/senzaFili', function (req, res) {
  i = 0;
  trad = [];	
  traduci(req.query.text,conf.langs[0], function(r){res.send(json2html.transform(r,transform));});	
  
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(PORT, function () {
  console.log('Example app listening on port '+PORT);
  opn('http://localhost:'+PORT, {app: ['google chrome', '--incognito']});
});



function traduci(text,lang,cb){
	yandex.translate(text, { to: lang.code }, function(err, res) {
        console.log("\x1b[1m",lang.lang,"\x1b[0m",res.text[0]);
        trad.push({"lang":lang.lang,"text":res.text[0] });
        i++;
        if (i < conf.langs.length) {
        	traduci(res.text[0],conf.langs[i],cb)
        } else {
        	cb(trad);
        }
    })  
}


function json2ul(json, str)
{
        if (typeof(json)!='object')
                return '';

        str += '<ul>';
        var names = [];
        for (key in json)
                names.push(key);
        names.sort();
        var len = names.length;
        for (var i=0; i<len; i++) {
                var key = names[i];
                str += "<li>"+key;
                str += json2ul(json[key], '');
                str += "</li>";
        }
        str += '</ul>';

        return str;
}

