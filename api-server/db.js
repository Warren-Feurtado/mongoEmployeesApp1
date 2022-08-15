const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/employees-app1')
.then((x) => {
    console.log(`Connected to MongoDB successfully. Database name: "${x.connections[0].name}"`);
})
.catch((err) => {
    console.error(`Error connecting to MongoDB`, err);
});


module.exports = mongoose;