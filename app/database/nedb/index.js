const { app } = require('electron')
const DataStore = require('nedb')

exports.InnerDB = function () {
  return new Promise((resolve, reject) => {
    const db = new DataStore({ filename: app.getPath('userData') + '/inner' });
    db.loadDatabase(err => {
      if (err) {
        reject(err)
      } else {
        resolve(db);
      }
    });
  });
}

exports.ConfigDB = function (path) {
  return new Promise((resolve, reject) => {
    const db = new DataStore({ filename: path + '/config' });
    db.loadDatabase(err => {
      if (err) {
        reject(err)
      } else {
        resolve(db);
      }
    });
  });
}
