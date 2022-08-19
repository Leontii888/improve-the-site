
//
//cd programming/js/mySite/server-express

const express = require('express');
const app = express();

const router = express.Router();

const fs = require('fs')
const path = require('path');

const bodyParser =require('body-parser');
const PATH = 3333;

let passedData = {
    ts:"--",
    name:"tetja",
    lastname:"motya",
    email:"--",
    note:"01"
};

//--------

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"pages"));

let jsonParser = bodyParser.json();
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use("/public",express.static(path.join(__dirname, 'public')))
app.use("/", router);

//------
app.get('/', (req, res) => {
    // res.send({ message: 'Hello WWW!' });
    // res.sendFile(`${__dirname}/public/index.html`);
  return  res.render(`index`);
});
// app.get("users/posted",(req,  res) => {
//     return  res.render(`posted`, passedData);
//     })
// app.get("users/state",(req,  res) => {
//    return   res.render(`state`, passedData);
// })
// ----------------
router.route('/users/posted/')
    .get((req, res) => {
     res.render(`posted`, passedData);
      res.end();
    })
    .post((req, res) => {
      if(!req.body) {
        res.sendStatus(400).end("no body!");
      }
      passedData = req.body;
      let  bodyStringified = JSON.stringify(passedData);
      let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
      //place to file
      fs.appendFile(`D:/programming/js/mySite/server-express/public/contactsData.json`, data, function(err,data) {
        if(err) throw err; 
      });
      readLoggedFile(`contactsData.json`);
      res.end(console.log(`contactsData.json has been posted`))
    })
    .put((req, res) => {
      if(!req.body) {
          res.sendStatus(400).send("no body!").end();
        } else{
           passedData = req.body;

          // res.header(200);
          // writeHead();
          // res.status(200).send(passedData);
          //update
          console.log(passedData)
          res.send(passedData);
          //logging
          let  bodyStringified = JSON.stringify(passedData);
          let data ={
            time:`${new Date().toLocaleString()}`,
            length:`${calcChars(bodyStringified)}`,
            data:passedData
          };
          
          fs.appendFile(`D:/programming/js/mySite/server-express/public/incomingData/contactsData.json`, JSON.stringify(data,null,4), function(err,data) {
                if(err) throw err; 
          });
          //info about file
          readLoggedFile(`contactsData.json`);
         return res.end(console.log(`contactsData.json has been updated`))
      }
    })
    .delete((req, res) => {

})
router.route('/users/state/')
    .get((req, res) => {
      res.render(`state`, passedData);
      res.end;
    })
    .post((req, res) => {
      if(!req.body) {
        res.sendStatus(400).end("no body!");
      }
      passedData = req.body;
      let  bodyStringified = JSON.stringify(passedData);
      let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
      //place to file
      fs.appendFile(`state.json`, data, function(err,data) {
        if(err) throw err; 
      });
      res.send(passedData);
      readLoggedFile(`${__dirname}/public/incomingData/state.json`);
      res.end(console.log(`state.json has been posted`))
    })
    .put((req,  res) => {
      if(!req.body) {
          res.sendStatus(400).send("no body!").end();
        } else{
         passedData = req.body;

          // res.header(200);
          // writeHead();
          // res.status(200).send(passedData);
          //update
          res.send(passedData);
          //logging
          let  bodyStringified = JSON.stringify(passedData);
          let data ={
            time:`${new Date().toLocaleString()}`,
            length:`${calcChars(bodyStringified)}`,
            data:passedData
          };
          //info about file
          fs.appendFile(`D:/programming/js/mySite/server-express/public/incomingData/state.json`, JSON.stringify(data,null,4), function(err,data) {
                if(err) throw err; 
          });
          //info about file
          readLoggedFile(`state.json`);
         return res.end(console.log(`state.json has been updated`))
      }
    })
    .delete((req, res) => {

});

// //----------
function calcChars(string){
  return string.replace(/o/g,'').length
}




//-----------
// app.get("/state", (req, res) => {
//   res.render(`state`, passedData);
//      res.end;
// })
// app.get("/users/posted", (req, res) => {
//   res.render(`posted`, passedData);
//    res.end;
// });

//---------------

// function loggerPostTo(url,filename){
//     app.post(url, jsonParser,(req, res) => {
//       if(!req.body) {
//         res.sendStatus(400).end("no body!");
//       }
//       passedData = req.body;
//       let  bodyStringified = JSON.stringify(passedData);
//       let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
//       //place to file
//       fs.appendFile(filename, data, function(err,data) {
//         if(err) throw err; 
//       });
//       readLoggedFile(`${filename}`);
//       res.end(console.log(`${filename} has been posted`))
//    });
// }
// function loggerPutTo(url,filename){
//   app.put(url, (req, res)=> {
//     if(!req.body) {
//           res.sendStatus(400).send("no body!").end();
//         } else{
//           res.header(200);
//           //update
//           passedData = req.body;
//           res.status(200).send(passedData);
//           //logging
//           let  bodyStringified = JSON.stringify(passedData);
//           let data =`${new Date().toLocaleString()}-- (length:${calcChars(bodyStringified)}): ${bodyStringified}\n\n\n------------------------------\n`;
          
//           fs.appendFile(`${__dirname}/public/incomingData/${filename}`, data, function(err,data) {
//                 if(err) throw err; 
//           });
//           //info about file
//           readLoggedFile(`${filename}`);
//           res.end(console.log(`${filename} has been updated`))
//       }
//   })
// }
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
// loggerPutTo('/state',"state.json");
// loggerPutTo('/',"contactsData.json");

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


