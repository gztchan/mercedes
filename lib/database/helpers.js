import Database from '@database';

export const getLanguages = function () {
  return Database.get().language.allDocs({
    include_docs: true,
  }).then(result => {
    return result.rows.map(row => {
      return row.doc;
    });
  });
};

export const getCollections = function () {
  return Database.get().collection.allDocs({
    include_docs: true,
  }).then(result => {
    return result.rows.map(row => {
      return row.doc;
    })
  });
};

export const getCollection = function (cid) {
  return Database.get().collection.get(cid).then(doc => {
    return doc;
  }).catch(() => {
    return null;
  });
};
