const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

// parse application/json
app.use(bodyParser.json());
app.use(cors());

//connection
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mylist'

});
 
  

//open the connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
 
 
 
//show all posts
app.get('/posts',(req, res) => {
  let sql = "SELECT * FROM posts where status=1";
  let query = conn.query(sql, (err, results) => {
    if(!!err) {
        console.log("err->",err);
    }else{
        res.json(results);
    }
  });
});
 

//show single post by id
app.get('/posts/:id',(req, res) => {
  let sql = "SELECT * FROM posts WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(!!err) {
        console.log("err->",err);
    }else{
        res.json(results);
    }
  });
});
 
//Server listening
app.listen(3080,() =>{
  console.log('Server started on port 3080...');
});