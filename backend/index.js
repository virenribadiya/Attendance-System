const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors({ origin: '*' }))
app.use(bodyPareser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//================== Connectivity ====================
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", { useNewUrlParser: true });

// schema
const studentSchema = mongoose.Schema(
    {
        enrolmentNo: String,
        isPresent: Boolean
    }
    )

//model
const Student = mongoose.model("Students", studentSchema);

// schema
const classSchema = mongoose.Schema(
    {
        class: String,
        list:[Object]
    }
)
//model
const Classe = mongoose.model("Classe", classSchema);

//================= REST API =======================

app.route("/students")
.get(function (request, response) {
        Student.find(function (error, foundStudents) {
            if (!error) {
                // var arrayToString = JSON.stringify(foundStudents);  // convert array to string
                // var stringToJsonObject = JSON.parse(assign:{},arrayToString);  // convert string to json object
                // console.log(stringToJsonObject);
                // response.send(stringToJsonObject);
                response.send(foundStudents);
            } else {
                response.send(error);
            }
        })
    })
    .post(function (request, response) {
        const newStudent = new Student({
            enrolmentNo: request.body.enrolmentNo,
            isPresent: request.body.isPresent
        })

        newStudent.save(function (error) {
            if (!error) {
                response.send("new student has been added!");
            } else {
                response.send(error);
            }
        });

    }).delete(function (request, response) {
        Student.deleteMany(function (error) {
            if (!error) {
                response.send("All data has been deleted!")
            } else {
                response.send(error);
            }
        })
    });

//=========================== Patch - specific student ==============

app.route("/students/:eno").patch(function (request, response) {
    Student.update(
        {enrolmentNo:request.params.eno},
        {$set:request.body},
        function(error){
         if (!error) {
            response.send("Database updated successfully!");
         } else {
            response.send(error);
         }   
        })
});

//=========================== GET POST classes =============

app.route("/classes")
.get(function(request,response){
    Classe.find(function(error,foundClasses){
        if (!error) {
            response.send(foundClasses);
        } else {
            response.send(error);
        }
    })
}).post(function (request, response) {
    const newClass = new Classe({
        class: request.body.class,
        List:[]
    })

    newStudent.save(function (error) {
        if (!error) {
            response.send("new student has been added!");
        } else {
            response.send(error);
        }
    });

})
 //=========================== GET - specific class in a classes ==============

app.route("/classes/:className").get(function (request, response) {
    Classe.findOne({class:request.params.className},function(error,foundClass){
         if (!error) {
            response.send(foundClass);
         } else {
            response.send(error);
         }   
        })
})
.put(function(request,response){
    //console.log(request.body);
    Classe.update(
        {class:request.params.className},
        {$set:request.body},
        {overWrite:true},
        function(error){
            if (!error) {
                response.send("Successfully updated the attandence!")
            } else {
                response.send(error);
            }
        }
        )
})

app.listen(4000, function () {
    console.log("Server is up @ http://localhost:4000");
})

