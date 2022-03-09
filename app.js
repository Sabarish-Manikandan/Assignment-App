const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
   
//parse application/json
app.use(bodyParser.json());
   
//Database Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'node_restapi' /* MySQL Database */
});
   
//Shows Mysql Connect
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   

// Get all records
app.get('/api/all',(req, res) => {
  let sqlQuery = "SELECT * FROM student_teacher";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   


// Get commonstudents
app.get('/api/commonstudents/:id',(req, res) => {

  const query_param = req.params.id; 
  const query_param_ar = query_param.split('&');
  var sqlQuery =  mysql.format("SELECT DISTINCT student_id FROM student_teacher WHERE teacher_id IN (?)", query_param_ar);

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   


// register student and teacher
app.post('/api/register',(req, res) => {

  const jsondata = req.body;
  var data = new Array();
  var er_msg = '';
  if(jsondata.student.length >1 && jsondata.teacher.length <2){
    for (let i = 0; i < jsondata.student.length; i++) {
      data[i] = new Array(jsondata.teacher,jsondata.student[i]);
    }
  }
  else if(jsondata.teacher.length >1 && jsondata.student.length <2){
    for (let i = 0; i < jsondata.teacher.length; i++) {
      data[i] = new Array(jsondata.teacher[i],jsondata.student);
    }
  }
  else if(jsondata.teacher.length >1 && jsondata.student.length >1){
    let k=0;
    for (let i = 0; i < jsondata.teacher.length; i++) {
    for (let j = 0; j < jsondata.student.length; j++) {
      data[k++] = new Array(jsondata.teacher[i],jsondata.student[j]);
    }
  }
  }
  else if(jsondata.teacher.length <1 || jsondata.student.length <1){
    er_msg = 'Please add id to register';
  }

  let sqlQuery = "INSERT INTO student_teacher (teacher_id,student_id) VALUES ?";

  let query = conn.query(sqlQuery, [data],(err, results) => {
    
    if(err) {
        res.send(apiResponse(er_msg));
        throw err;
    }
    else {
        res.send(apiResponse('Successfully Registered'));
    }
  });
});
   


// suspend student
app.post('/api/suspend/:id',(req, res) => {
  var student_suspend = req.params.id;
  let sqlQuery = "UPDATE student_teacher SET student_status='suspend' WHERE student_id='"+student_suspend+"'";  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse("Suspended :"+ student_suspend));
  });
});



//retrievefornotifications
 app.post('/api/retrievefornotifications',(req, res) => {
  const jsondata = req.body;
  var teacher_email = jsondata.teacher;
  const notification = jsondata.notification;  
  var notified_emails = extractEmails(notification);
  
  var sqlQuery =  mysql.format("SELECT DISTINCT Student_id FROM student_teacher WHERE (teacher_id='"+teacher_email+"' OR student_id IN(?)) AND student_status !='suspend'", [notified_emails]);
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

   

//API Response
function apiResponse(results){
    //return JSON.stringify({"status": 200, "error": null, "response": results});
    return JSON.stringify(results);
}



//extractEmails
function extractEmails (str){
  var regex = new RegExp(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  return str.match(regex);
  }  
   


//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});