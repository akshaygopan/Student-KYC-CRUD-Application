var mongoose = require("mongoose");
var Students = require("../models/Students");

var studentController = {};

// Show list of students
studentController.list = function(req, res) {
  Students.find({}).exec(function (err, students) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/students/index", {students: students});
    }
  });
};

// Show student by id
studentController.show = function(req, res) {
  Students.findOne({_id: req.params.id}).exec(function (err, student) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/students/show", {student: student});
    }
  });
};

// Create new student
studentController.create = function(req, res) {
  res.render("../views/students/create");
};

// Save new student
studentController.save = function(req, res) {
  var student = new Students(req.body);

  student.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/students/create");
    } else {
      console.log("Successfully created an student.");
      res.redirect("/students/show/"+student._id);
    }
  });
};

// Edit a student
studentController.edit = function(req, res) {
  Students.findOne({_id: req.params.id}).exec(function (err, student) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/students/edit", {student: student});
    }
  });
};

// Update an student
studentController.update = function(req, res) {
  Students.findByIdAndUpdate(req.params.id, { $set: { rollno: req.body.rollno,name: req.body.name, address: req.body.address, department: req.body.department, aadhaar: req.body.aadhaar }}, { new: true }, function (err, student) {
    if (err) {
      console.log(err);
      res.render("../views/students/edit", {student: req.body});
    }
    res.redirect("/students/show/"+student._id);
  });
};

// Delete an student
studentController.delete = function(req, res) {
  Students.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("student deleted!");
      res.redirect("/students");
    }
  });
};

module.exports = studentController;
