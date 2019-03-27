module.exports = function insert(db, opt) {
  return new Promise(function(resolve, reject) {
    console.log(opt);
    db.insert(opt, function(err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}
