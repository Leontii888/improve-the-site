
//
//cd programming/js/mySite/server-express

const express = require('express');
const fs = require('fs')
const path = require('path');

const app = express();
const bodyParser =require('body-parser')
const PATH = 3333;
let dataPosted = {
    ts:"--",
    name:"--",
    lastname: "--",
    email:"--",
    note: "--"
  };
let jsonParser = bodyParser.json()

app.set("view engine", "ejs")
app.set("views", "./routes")

app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())



function posted(url,filename){
    app.post(url, jsonParser,(req, res) => {
      if(!req.body) {
        res.sendStatus(400).end("no body!");
      }
      let  bodyStringified = JSON.stringify(req.body);
      let data =`${new Date().toLocaleString()}-- (length:${bodyStringified.split(" ").length}): ${bodyStringified}\n\n\n------------------------------\n`;
      //place to file
      fs.appendFile(filename, data, function(err,data) {
        if(err) throw err; 
      });
      res.sendStatus(200)
      res.end(`${filename} BEEN FILLED`)
   });
}
function readMyFile(filename){
    fs.readFile(`${__dirname}/`+filename,'utf8',  function(error,data){
        fs.stat(filename,(err,stats) => {
          if (err) throw err; 
            console.log(`${filename} size: `,stats.size)
        });
        //show file
        // console.log(data);
    });
}

//
posted('/state',"state.json");
readMyFile("state.json");
//
posted('/mypost',"contactsData.json");
readMyFile("contactsData.json");

app.get('/', (req, res) => {
    // res.send({ message: 'Hello WWW!' });
    // res.sendFile(`${__dirname}/public/index.html`);
    res.render(`index`);
    res.end;
});
app.get("/state", (req, res) => {
  res.render(`state`, dataPosted);
     res.end;
})
app.get("/mypost", (req, res) => {
  res.render(`mypost`,dataPosted);
   res.end;
});
app.put("/mypost", (req, res)=> {
  if(!req.body) {
        res.sendStatus(400).send("no body!").end();
        return
      } else{
        res.header(200);
        dataPosted = req.body;
        res.status(200).send(dataPosted)
        // res.send(`mypost`,req.body)
        res.end;
    }
})

 //rename
//  fs.rename("1.txt", "new.txt", function(err){
// if(err) throw err;
//  })
 //delete
//   fs.unlink("new.txt", function(err){
// if(err) throw err;
//  })

app.listen(PATH, () => {
    console.log(`Application listening on port ${PATH}!`);
});