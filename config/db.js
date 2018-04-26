const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://admin:1234redadmin@ds161529.mlab.com:61529/redirecionamento';

// Database Name
const dbName = 'redirecionamento';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // insertDocuments(db);
  queryFilter(db, 'documents');
});

/**
 * @method insertDocuments
 */
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

/**
 * @method findDocuments
 */
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

/**
 * @method queryFilter
 */
const queryFilter = function(db, dbCollection, callback) {
 // Get the documents collection
 const collection = db.collection(dbCollection);
 // Find some documents
 collection.find({'a': 3}).toArray(function(err, docs) {
   assert.equal(err, null);
   console.log("Found the following records");
   console.log(docs);
   if(callback) {
     callback(docs);
   }
 });
}

module.exports = function() {
  return MongoClient
}
