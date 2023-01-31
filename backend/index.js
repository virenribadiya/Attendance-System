const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: '*' }))
app.use(bodyPareser.urlencoded({ extended: true }));

//================== Connectivity ====================
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", { useNewUrlParser: true });

// schema
const studentSchema = mongoose.Schema({
    enrolmentNo: String,
    isPresent: {
        type: Boolean,
        default: false
    }
})

//model
const Student = mongoose.model("Students", studentSchema);

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
    Student.update({enrolmentNo:request.params.eno},
        {$set:request.body},
        function(error){
         if (!error) {
            response.send("Database updated successfully!");
         } else {
            response.send(error);
         }   
        })
});


app.listen(4000, function () {
    console.log("Server is up @ http://localhost:4000");
})


// Student.update(
    //     {enrolmentNo:request.params.eno},
    //     {$set:request.body},
    //     function(error){
    //         if (!error) {
    //             response.send("operation completed!");
    //         } else {
    //             response.send(error);
    //             console.log(error);
    //         }
    //     }
    // )