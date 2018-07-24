const mongoose = require('mongoose');
const config = require('../config');

class ModelUtil {
    constructor(db_name, table_name){
        this.db_name = db_name;
        this.table_name = table_name;
        this.model = this.model();
    }

    model() {
        const Schema = mongoose.Schema;
        const db_name = this.db_name;
        const table_name = this.table_name;
        const db_message = config.db_list[db_name][table_name];
        mongoose.connect(config.mongodb + db_name);
        const schema = new Schema(db_message['schema'], { timestamps: true });
        schema.index(db_message['index']);
        return mongoose.model(table_name, schema);
    }

    next_id(table_name, callback) {
        const Schema = mongoose.Schema;
        const schema = new Schema({name: String, seq: Number}, { timestamps: true });
        schema.index({name: 1});
        const Object = mongoose.model('data_id', schema);
        Object.find({name: table_name}, (err, docs) => {
             if (docs.length === 0) {
                 const object = new Object({name: table_name, seq: 1});
                 object.save();
                 callback(1);
             } else {
                 let seq = docs[0]['seq'] + 1;
                 Object.update({name: table_name}, {seq}, () => {
                     callback(seq);
                 });
             }
        });
    }

    find(conditions, callback) {
        const Model = this.model;
        Model.find(conditions, (err, docs) => {
            callback(err, docs);
        });
    }

    insert(table_name, conditions, callback) {
        const Model = this.model;
        this.find(conditions, (err, docs) => {
            if (docs.length === 0) {
                this.next_id(table_name, (id) => {
                    conditions['id'] = id;
                    const object = new Model(conditions);
                    object.save();
                });
            }
            callback(docs.length === 0);
        });
    }

    update(conditions, update, callback) {
        const Model = this.model;
        this.find(conditions, (err, docs) => {
            if (docs.length > 0) {
                Model.update(conditions, update, (err, docs) => {
                    callback(docs.length > 0);
                });
            } else {
                callback(docs.length > 0);
            }
        });

    }

    remove(conditions, callback) {
        const Model = this.model;
        this.find(conditions, (err, docs) => {
            if (docs.length > 0) {
                Model.remove(conditions);
            } else {
                callback(docs.length > 0);
            }
        });

    }
}

exports = module.exports = ModelUtil;