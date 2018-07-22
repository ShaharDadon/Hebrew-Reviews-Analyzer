const express= require("express");
const app = express();
const path = require("path");
const posts = require("./server/routes/posts");


// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'dist/my-app')));


app.use('/',posts);

// app.get('/getClassificationByJson', (req,res)=>{
    
//     res.send({text:"TEST PASSED"});
     
// });
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'dist/my-app/index.html'));  
});

///////////////////////////////////////////
var classification = {
    text:"",
    algorithm:"",
    result:""
};

app.get('/getClassificationByJson',  function(req, res){
    console.log("Here!");
    console.log(req.query);

    CreateNewClassificationObject(req.query).then(function(){
             
        if(classification.algorithm === "NAIVEScript.py")
            return performNaiveClassification().then(function(){
                console.log("Final classification is: " + classification.result);
                res.send(classification);
                });
        else  {
            performKnnClassification().then(function(){
                console.log("Final classification is: " + classification.result);
                res.send(classification);
                });
            }
        });
    
}); 

let CreateNewClassificationObject = function(data){  
        
        return new Promise(function(resolve, reject){
            classification.text = data.text;
            
            classification.algorithm = data.algorithm;
                let isOk = true;
                    if(isOk){
                    resolve("Sucsses");
                    }
                    else {
                        reject('not Saved');
                    }            
        });
};


function performKnnClassification(){  
        return new Promise(function(resolve, reject){
            saveIntoTextFile(classification.text).then(function(){
                    console.log("finish saving into file");
                    tokenizeIntoXml();
                }).then(function(){
                     console.log("succededc to save XML");
                     return analyzeXml();
                }).then(function(){
                    console.log("succededc to analyse XML");
                        return processData();
                }).then(function(){
                classify(classification.algorithm).then(function(from){
                    classification.result =  from;
                    
                    resolve("Sucsses");
                    
                });
            });
        });
}

let performNaiveClassification = function(){
        
         return new Promise(function(resolve, reject){
                
            saveIntoArffFile(classification.text).then(function(){
                    
                    console.log("finish saving into file"+classification.text);
                    classifWithWeka("NAIVEScript.py").then(function(from){
                        
                        classification.result =  from;
                        let isOk = true;
                        if(isOk){
                        resolve("Sucsses");
                        }
                        else {
                            reject('not Saved');
                        }                       
                    });
                   // done
        
            });
        });
}


let saveIntoArffFile = function(line){
    return  new Promise(function(resolve, reject){
        var fs = require('fs');
        var newline = '\n'+"'"+line.trim()+"'"+', ?'+'\n';
        fs.appendFile('TextFiles/test.arff',newline,function (err) {
        if (err) {
     } else {
            let isOk = true;
                if(isOk){
                    
                    resolve(isOk);
                }
                else {
                    reject('not succeded');
                }
            }
        });
        
    });

}





let saveIntoTextFile = function(line){
    return  new Promise(function(resolve, reject){
        var fs = require('fs');
        fs.writeFile('TextFiles/tested-line.txt',line, 'utf-8', function (err) {
        
        if (err) {
            
        return;
      }
      
         let isOk = true;
            if(isOk){
                
                resolve(isOk);
            }
            else {
                reject('not succeded');
            }
      
          });
        
          });

};


function processData(){
    return  new Promise(function(resolve, reject){
        const { exec } = require('child_process');
            exec('python Scripts/Data_Preprocessor.py', (err, stdout, stderr) => {
                if (err) {
                // node couldn't execute the command
                    console.log(err);
                    return;
                }
                resolve("Sucsses");
                });
            });
}


function analyzeXml(){
    
    return  new Promise(function(resolve, reject){
        const { exec } = require('child_process');
        exec('java -Xmx1G -jar MorphAnalyzer/morphAnalyzer.jar false MorphAnalyzer/tested-xml.xml MorphAnalyzer/morphAnalyzer-output.xml', (err, stdout, stderr) => {
            if (err) {
                return;
              }
            resolve("Sucsses");
            });
    });
}

    
    
let classify = function(algorithm){
    
    return  new Promise(function(resolve, reject){
            const { exec } = require('child_process');
                exec('python Scripts/' + algorithm, (err, stdout, stderr) => {
                    if (err) {
                    
                    return;
                  }
                    console.log("Classify");
                    resolve(`${stdout}`);
                    
                });
        });
};



let classifWithWeka = function(algorithm){
    return  new Promise(function(resolve, reject){
            const { exec } = require('child_process');
                exec('java -jar Scripts/weka-api.jar', (err, stdout, stderr) => {
                    if (err) {
                    return;
                  }
                  resolve(`${stdout}`);  
                });
        });
};




function tokenizeIntoXml(){
    
    return  new Promise(function(resolve, reject){
                const { exec } = require('child_process');
                exec('java -Xmx1024m -jar MorphAnalyzer/tokenizer.jar TextFiles/tested-line.txt MorphAnalyzer/tested-xml.xml', (err, stdout, stderr) => {
                if (err) {
                    return;
                  }
                resolve("Sucsses");
                
            });
        });
};


///////////////////////////


app.post('/*', (req, res)=>{
  console.log(req.body);  
});

const port = process.env.PORT || 4600;

app.listen(port,() => console.log("Listening...") );

