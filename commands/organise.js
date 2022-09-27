const fs = require("fs");
const path = require("path");


let types = {
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    images: ['jpg','png','gif','raw','webp'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
};


function organiseFn(dirPath){

    let destPath;
//Input of directory Path
    if(dirPath == undefined){
        console.log('Please enter a DIRECTORY PATH!!');
        return;
    }

    else{

        let doesExist = fs.existsSync(dirPath);
        //checks if directory exists or nah
        
        
        if(doesExist==true){

            // Create a Organised files Directory 
            destPath = path.join(dirPath,'organised_files');

            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
                //Creating directory if it doesnt exist already
            }

            else{
                console.log('File Already Exists!');
            }
        }

        else{
            console.log('Please enter a valid Path');
        }
    }
    organiseHelper(dirPath, destPath);
}

//This function will categorise all the files 
function organiseHelper(src,dest){

    let childNames = fs.readdirSync(src); //will get all the files and folders "names" in the directory
    
    
    for(let i=0; i<childNames.length;i++){
        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();

        

        if(isFile==true){
            let fileCategory = getCategory(childNames[i]);
            //console.log(childNames[i]+' belongs to '+fileCategory);

            sendFiles(childAddress,dest,fileCategory)

        }
    }
}


function getCategory(name){
    let ext = path.extname(name);

    ext = ext.slice(1); //To remove the dot from the extension name

    for(let type in types){
        
        let catTypeArr = types[type]

        for(let i=0 ; i<catTypeArr.length ; i++){ //matching extension
            if(ext==catTypeArr[i]){ //returning extentsion 
                return type;
            }
        }
    }

    return "others"
}

function sendFiles(srcFilePath , dest ,fileCategory){

    let catPath = path.join(dest,fileCategory)
   
    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
       
    }

    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath,fileName)
    fs.copyFileSync(srcFilePath, destFilePath)
    fs.unlinkSync(srcFilePath)

    console.log(fileName + " copied to " + fileCategory)

}


module.exports = {
        orgFnKey : organiseFn

}