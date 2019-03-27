module.exports = function insert(db, opt) {
  return new Promise(function(resolve, reject) {
    db.insert(opt, function(err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}
