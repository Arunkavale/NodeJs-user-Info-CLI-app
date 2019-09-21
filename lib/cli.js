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
    let commands = {
        'exit':'Exit the CLI application',
        'man':'Show the help page',
        'help':'Show the help page',
        'stats':'Get statistics on the underlying operating system and resources utilizations ',
        'list users':'Show a list of all the registereds users in the systems',
        'more user info --{userId}':'Show details of specific user',
        'list checks --up --down':'Show list of all the active checks in the system',
        'more check info --{checkId}':'Show details of specific checks',
        'list logs':'Show the list of the logs file',
        'more log info --{fileName}':'Show details of the specific logs file'
    };



    
    //show a header for help page that is as wide as the screen

    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(1); 
    for (const key in commands) {
        if (commands.hasOwnProperty(key)) {
            const command = commands[key];
            let line = '\x1b[33m'+key+'\x1b[0m';
            let padding = 60 - line.length;
            for (let index = 0; index < padding; index++) {
                line+=' ';
            }
            line+=command;
            console.log(line);
            cli.verticalSpace();
        }
    }
    cli.verticalSpace(1);
    cli.horizontalLine();
}


cli.verticalSpace = function(lines){
    lines = typeof(lines) == 'number' && lines>0 ? lines :1;
    for (let index = 0; index < lines; index++) {
        console.log(' ');
    }
}

cli.horizontalLine = function(){
    //avaliable sceen size
    let width = process.stdout.columns;
    var line = "";
    for (let i = 0; i < width; i++) {
        line+='*';
    }
    console.log(line);
}


cli.centered = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';
    
    //get screen size
    let width = process.stdout.columns;

    //calculate the left padding there should be 
    let leftPadding = Math.floor(width - str.length) / 2;

    //put in left padded spaces before the string itself
    let line ="";
    for (let index = 0; index < leftPadding; index++) {
        line+=" ";
    }
    line+= str;
    console.log(line);
}

//exit
cli.responders.exit = function (){
    process.exit();
}

//stats
cli.responders.stats = function (){
    console.log("you asked for stats");   
}

//list user
cli.responders.listUser = function (){
    console.log("you asked for  list user");   
}

//list logs
cli.responders.listLogs = function (){
    console.log("you asked for lis logs");   
}

//more check info
cli.responders.moreCheckInfo = function (){
    console.log("you asked for more check info");   
}

// more log info
cli.responders.moreLogInfo = function (){
    console.log("you asked for more log info");   
}

//more user info
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