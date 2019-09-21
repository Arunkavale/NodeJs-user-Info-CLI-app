let cli = require("./lib/cli");

let app = {};

app.init = function(){
    setTimeout(function(){
        cli.init()
    },50)
}

app.init();


module.exports = app;