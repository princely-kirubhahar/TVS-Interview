const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./Data');
const fs = require("fs");
const cors = require('cors');

// Connect to the db

mongoose.connect('mongodb://localhost:27017/sample').then(
     () => {
          const app = express();
          app.use(bodyParser.json());
          app.use(cors());
          
          app.listen(5000, () => {
               console.log("Db is connected");
          });
          
          app.post("/form-sumbit", async (req, res) => {
               const data = req.body.map((e)=>{
                    console.log(e);
                    return {
                    name: e.name,
                    age: e.age,
                    gender: e.gender
               }})
               const dbres = await Data.insertMany(data);
               res.send(dbres);
          });

          app.get("/form-values", async (req, res) => {
               const posts = await Data.find();
               res.send(posts);
          });


          app.get("/transformedJson", async (req, res) => {
               const csv = fs.readFileSync(`./sample.csv`, "utf8");
               let arr = csv.split("\n");
               console.log(arr[0]);
               const keys = arr[0].split("|");
               arr.shift();
               const output = arr.map(row => {
                    let columns = row.split("|");
                    let json = {}
                    for (let i = 0; i < keys.length; i++) {
                         json[keys[i].replace(/\r$/, '')] = columns[i].replace(/\r$/, '');
                    }
                    return json;
               });
               res.send(output)
          });

     }
)