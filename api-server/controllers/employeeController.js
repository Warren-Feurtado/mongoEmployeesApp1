const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;
var { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find((err, data) => {
        if(!err) {
            res.json(data);
        } else {
            console.log("Error retreiving Employees:" + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) =>{
    if (!objectId.isValid(req.params.id))
        return res.status(400).send(`No records were found with ID# ${req.params.id}`);

    Employee.findById(req.params.id, (err, data) => {
        if(!err){
            res.send(data)
        } else{
            console.log('Error Retreiving Employee' + JSON.stringify(err, undefined, 2));
        }
    })
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        psition: req.body.psition,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log("Error Adding New Employee to Database.:" + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!objectId.isValid(req.params.id))
        return res.status(400).send(`No records were found with ID# ${req.params.id}`); 
    var emp = {
        name: req.body.name,
        psition: req.body.psition,
        office: req.body.office,
        salary: req.body.salary
    }

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, (err, data => {
        if(!err) {
            res.send(data);
        } else {
            console.log("Error updating this Employee's info:" + JSON.stringify(err, undefined, 2));
        }
    }))
});

router.delete('/:id', (req, res) => {
    if (!objectId.isValid(req.params.id))
        return res.status(400).send(`No records were found with ID# ${req.params.id}`); 

    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log("Error deleting this Employee's info:" + JSON.stringify(err, undefined, 2));
        }
    })
});


module.exports = router;