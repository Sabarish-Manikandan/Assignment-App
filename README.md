# Assignment-App

**Steps to Run (Locally)**<br>
Run Terminal -> Open the Assignment-App folder location in terminal <br>
Run the command-> npm install (Makesure you already installed node in current machine )<br>
import the attached .sql<br>
Update the Mysql configuration in app.js file<br>
Now run the app using the command-> node app.js <br><br>

**API End Points (JSON)** <br>
GET:  /api/all<br>
POST: /api/register<br>
GET:  /api/commonstudents/{id}  OR /api/commonstudents/{id}&{id}<br>
PUT:  /api/suspend/{id} <br>
POST: /api/retrievefornotifications
<br><br><br>

**Register** <br>
A teacher can register multiple students. A student can also be registered to multiple teachers.<br>
Multiple students also can regiter to multiple teacher (each student will be registered to all teachers)
<br>
<br>
Example 1:
```JSON
{
    "teacher": "teacherken@gmail.com",
    "students": [
        "studentjon@gmail.com",
        "studenthon@gmail.com"
    ]
}
```

Example 2:
```JSON
{
    "teacher": [
        "teacherken@gmail.com",
        "teacherjoe@gmail.com"
    ]
  "students": "studentjon@gmail.com"
}
```

Example 3:
```JSON
{
    "teacher": [
        "teacherken@gmail.com",
        "teacherjoe@gmail.com"
    ],
    "students": [
        "studentjon@gmail.com",
        "studenthon@gmail.com"
    ]
}
```
<br><br>
**Commonstudents**
<br>
A teacher can retrieve a list of students common to a given list of teachers<br>

Example 1:<br>
GET :  /api/commonstudents/teacherken@gmail.com<br>
List data only under teacherken.<br>
```JSON
{
  "students" :
    [
      "studentjon@gmail.com", 
      "studenthon@gmail.com"
    ]
}
```

Example 2:<br>
List common students under both the teachers(teacherken, teacherken).<br>
GET :  /api/commonstudents/teacherken@gmail.com&teacherjoe@gmail.com <br>
```JSON
{
  "students" :
    [      
      "studenthon@gmail.com"
    ]
}
```
<br><br>
**Suspend** <br>
PUT :  /api/suspend/"studentjon@gmail.com"<br>
A teacher can suspend a specified student.<br>

```JSON
{
  "student" : "studentjon@gmail.com"
}
```
<br><br>
**Retrievefornotifications** <br>
POST: /api/retrievefornotifications<br>
The students of the teacher, who is sending the notification and @mentioned students with no suspend
will receive the notification<br>

```JSON
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```
<br>

<br><br>
<br><br>
<br><br>
Regards<br>
**Sabarish Manikandan**
