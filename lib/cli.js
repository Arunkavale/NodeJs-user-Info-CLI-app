//Dependencies
let readline = require('readline');
let util = require('util');
let debug = util.debuglog('cli');
let events = require('events');
class _events extends events{};
let e = new _events()


//instantiantion of CLI module

let cli = {};


//input handlers

e.on('man' , function(str){
    cli.responders.help();
});


e.on('help' , function(str){
    cli.responders.help();
});


e.on('stats' , function(str){
    cli.responders.stats();
});


e.on('exit' , function(str){
    cli.responders.exit();
});

e.on('list users' , function(str){
    cli.responders.listUser();
});


e.on('more user info' , function(str){
    cli.responders.moreUserInfo();
});

e.on('more check info' , function(str){
    cli.responders.moreCheckInfo();
});

e.on('list logs' , function(str){
    cli.responders.listLogs();
});

e.on('more log info' , function(str){
    cli.responders.moreLogInfo();
}); 



//Responsders objects

cli.responders = {};


//help / man

cli.responders.help = function (){
    console.log("you asked for help");   
}

cli.responders.exit = function (){
    console.log("you asked for exit");   
}


cli.responders.stats = function (){
    console.log("you asked for stats");   
}

cli.responders.listUser = function (){
    console.log("you asked for  list user");   
}

cli.responders.listLogs = function (){
    console.log("you asked for lis logs");   
}

cli.responders.moreCheckInfo = function (){
    console.log("you asked for more check info");   
}


cli.responders.moreLogInfo = function (){
    console.log("you asked for more log info");   
}

cli.responders.moreUserInfo = function (){
    console.log("you asked for more user info");   
}



//input processor
cli.processInput = function(str){
    str = typeof(str) == 'string' && str.trim().length>0 ? str.trim():false;
    if (str) {
        let uqiqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        //go though the possible inputs , emit an event when a match is found

        let matchFound = false;
        let counter = 0 ;
        uqiqueInputs.some(function(input){
            if(str.toLowerCase().indexOf(input) > -1){
                matchFound = true;
                e.emit(input , str);
                 return true;
            }
        });


        // say sorry if not match found 
        if(!matchFound){
            console.log('Sorry, try again');
            
        }
    }
}

cli.init = function(){

    // welcome message in dark blue color
    console.log('\x1b[34m%s\x1b[0m',"The CLI is running");
    //start the interface
    let _interface = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt :''
    })

    //create an initial promt
    _interface.prompt();

    //handle each line of input seperately

    _interface.on('line',function(str){
        //send the input process
        cli.processInput(str);
        // Re-intialie the prompt afterwards
        _interface.prompt();
    });

    //if user stop CL kill the associated process

    _interface.on('close',function(){
        process.exit(0);
    })

}




module.exports = cli;