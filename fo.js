const fs = require("fs");
const path = require("path");

const helpObj = require('./commands/help')
const orgObj = require('./commands/organise')
const treeObj = require('./commands/tree')



let inputArr = process.argv.slice(2) 


let command = inputArr[0]




switch(command){
    case 'tree':
        treeObj.treeFnKey(inputArr[1])
        break;

    case 'organise':
        orgObj.orgFnKey(inputArr[1])
        break;

    case 'help':
        helpObj.helpFnKey()
        break;

    default :
        console.log('Wrong Command!')
        break;
}

    


    

    