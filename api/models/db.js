"use strict";
const mongoClient = require("mongodb").MongoClient;
let url = 'mongodb://192.168.12.58:27017/itcast';
const obj = {};

obj.insert = function (collectionName,insertArray,callback) {
	mongoClient.connect(url,function(err,db){
		//通过db操作集合
		let collection = db.collection(collectionName);
		collection.insert(insertArray,function(err,result)
		{
			callback(err,result);
			db.close();
		})
	})
}


obj.remove = function(collectionName, filter, callback) {
    mongoClient.connect(url, function(err, db) {
        let collection = db.collection(collectionName);
        collection.deleteMany(filter, function(err, result) {
            callback(err, result);
            db.close();
        });

    });
}


obj.update = function(collectionName, filter, modifyObj, callback) {
        mongoClient.connect(url, function(err, db) {
            let collection = db.collection(collectionName);
            collection.updateMany(filter, { $set: modifyObj }, function(err, result) {
                callback(err, result);
                db.close();
            });

        });
    }


obj.find = function(collectionName, filter, callback) {
    mongoClient.connect(url, function(err, db) {
        let collection = db.collection(collectionName);
        console.log('DB:collectionName:', filter); // { username: '12345678' }
        collection.find(filter).toArray(function(err, docs) {
            console.log('DB:docs', docs)
            callback(err, docs);
            db.close();
        });

    });
}

//导出该对象
module.exports = obj;