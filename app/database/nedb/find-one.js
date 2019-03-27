module.exports = function findOne(db, opt) {
  return new Promise(function(resolve, reject) {
    db.findOne(opt, function(err, doc) {
      if (!doc) {
        reject()
      } else {
        resolve(doc)
      }
    })
  })
}
