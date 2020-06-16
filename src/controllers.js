const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://database_mongo';

// Database Name
const dbName = 'app-pug';

let db;

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  db = client.db(dbName);
});

const getComments = () =>
  new Promise((resolve) => {
    db.collection('comments')
      .find({})
      .toArray((err, comments) => resolve(comments));
  });

const setComments = (comment, rate) => {
  return new Promise((resolve) => {
    db.collection('comments').insertOne(
      { comment, rate },
      (err, { ops: [comment] }) => resolve(comment)
    );
  });
};

module.exports = { getComments, setComments };
