var express = require('express');
var ModelUtil = require('../models/db');
var router = express.Router();

const db_name = 'test';
const table_name = 'list';
const User = new ModelUtil(db_name, table_name);

/* GET home page. */
router.get('/', function(req, res, next) {
    User.insert(table_name, {name: 'baoyule3'}, (status) => {
        if (status) {
          console.log('success');
        } else {
          console.log('error');
        }
    });
    // User.find({name: 'baoyule'}, (status, docs) => {
    //     if (status) {
    //       console.log(docs);
    //     }
    // });
    // User.update({name: 'jinbangqiang'}, {password: '333'}, (status) => {
    //     if (status) {
    //        console.log('update success');
    //     }
    // });
    // User.remove({name: 'jinbangqiang1111'}, (status) => {
    //     if (status) {
    //        console.log('remove success');
    //     }
    // });
    res.send('respond with a resource');
});

module.exports = router;
