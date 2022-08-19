
//
//cd programming/js/mySite/server-express

const express = require('express');
const fs = require('fs')
const path = require('path');

const app = express();
const bodyParser =require('body-parser');
const PATH = 3333;
let passedData = {
    ts:"--",
    name:"--",
    lastname:"--",
    email:"--",
    note:"--"
};
let jsonParser = bodyParser.json();

//----------
function calcChars(string){
  return string.replace(/o/g,'').length
}
//--------

app.set("view engine", "ejs")
app.set("views", "./routes")

app.use(bodyParser.json())
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))

//------
app.get('/', (req, res) => {
    // res.send({ message: 'Hello WWW!' });
    // res.sendFile(`${__dirname}/public/index.html`);
    res.render(`index`);
    res.end;
});
app.get("/state", (req, res) => {
  res.render(`state`, passedData);
     res.end;
})
app.get("/mypost", (req, res) => {
  res.render(`mypost`, passedData);
   res.end;
});

//---------------
function loggerPostTo(url,filename){
    app.post(url, jsonParser,(req, res) => {
      if(!req.body) {
        res.sendStatus(400).end("no body!");
      }
      passedData = req.body;
      let  bodyStringified = JSON.stringify(passedData);
      let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
      //place to file
      fs.appendFile(filename, data, function(err,data) {
        if(err) throw err; 
      });
      readRecievedFile(`${filename}`);
      res.end(console.log(`${filename} has been posted`))
   });
}
function loggerPutTo(url,filename){
  app.put(url, (req, res)=> {
    if(!req.body) {
          res.sendStatus(400).send("no body!").end();
        } else{
          res.header(200);
          //update
          passedData = req.body;
          res.status(200).send(passedData);
          //logging
          let  bodyStringified = JSON.stringify(passedData);
          let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
          
          fs.appendFile(filename, data, function(err,data) {
                if(err) throw err; 
          });
          //info about file
          readRecievedFile(`${filename}`);
          res.end(console.log(`${filename} has been updated`))
      }
  })
}
function readRecievedFile(filename){
    fs.readFile(`${__dirname}/`+filename,'utf8',  function(error,data){
        fs.stat(filename,(err,stats) => {
          if (err) throw err; 
            console.log(`${filename} size: `,stats.size)
        });
        //show file
        // console.log(data);
    });
}

readRecievedFile("state.json");
readRecievedFile("contactsData.json");

//----------
loggerPutTo('/state',"state.json");
loggerPutTo('/',"contactsData.json");

//----------
//rename
//  fs.rename("1.txt", "new.txt", function(err){
// if(err) throw err;
//  })
 //delete
// fs.unlink("new.txt", function(err){
// if(err) throw err;
//  })

app.listen(PATH, () => console.log(`Application listening on port ${PATH}!`));