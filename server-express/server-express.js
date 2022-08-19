
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
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

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
      readLoggedFile(`${filename}`);
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
          
          fs.appendFile(`${__dirname}/public/incomingData/${filename}`, data, function(err,data) {
                if(err) throw err; 
          });
          //info about file
          readLoggedFile(`${filename}`);
          res.end(console.log(`${filename} has been updated`))
      }
  })
}
function readLoggedFile(filename){
    fs.readFile(`${__dirname}/public/incomingData/${filename}`,'utf8',  function(error,data){
        fs.stat(`${__dirname}/public/incomingData/${filename}`,(err,stats) => {
          if (err) throw err; 
            console.log(`${filename} size: `,stats.size)
        });
        //show file
        // console.log(data);
    });
}

readLoggedFile(`state.json`);
readLoggedFile(`contactsData.json`);

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

app.use((req,res,next) => {
  res.status(404).type("text/plain")
  res.send("Not found")
})

app.listen(PATH, () => console.log(`Application is listening Localhost:${PATH}!`));