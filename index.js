var conf = require('./config.json');
var yandex = require('yandex-translate-api')(conf.yandexKey)


var i = 0;
function traduci(text,lang){
	yandex.translate(conf.text, { to: lang.code }, function(err, res) {
        console.log("\x1b[1m",lang.lang.padStart(10),"\x1b[0m",res.text[0]);
        i++;
        if (i < conf.langs.length) {
        	traduci(res.text[0],conf.langs[i])
        }
    })  
}


traduci(conf.text,conf.langs[0]);
