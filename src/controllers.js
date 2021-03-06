const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

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
  new Promise((resolve, reject) => {
    db.collection('comments')
      .find({})
      .toArray((err, comments) => {
        if (err) return reject(err);
        resolve(comments);
      });
  });

const setComments = async (comment, rate) => {
  return new Promise((resolve, reject) => {
    db.collection('comments').insertOne(
      { comment, rate: +rate },
      (err, { ops: [comment] }) => {
        if (err) return reject(err);
        resolve(comment);
      }
    );
  });
};

module.exports = { getComments, setComments };
