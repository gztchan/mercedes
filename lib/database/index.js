import path from 'path';
import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';

PouchDB.plugin(Find);

PouchDB.defaults({
  prefix: path.resolve(__dirname, '../../pouchdb')
});

let databases = null;

const state = new PouchDB('state');
const language = new PouchDB('language');
const snippet = new PouchDB('snippet');
const collection = new PouchDB('collection');

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'cli', name: 'CLI' },
]

function buildConfig() {
  return state.allDocs({
  }).then(function (result) {
    if (result.rows.length < 1) {
      return state.put({
        _id: 'cid',
        value: null,
      });
    }
    return result.rows;
  });
}

function buildLanguages() {
  return language.allDocs({
  }).then(function (result) {
    if (result.rows.length < 1) {
      return Promise.all(languages.map(lang => {
        return language.post(lang);
      }))
    }
    return result.rows;
  });
}

export default {
  get() {
    return {
      state,
      language,
      snippet,
      collection,
    };
  },
  init() {
    return Promise.resolve().then(() => {
      return Promise.all([
        buildLanguages(),
        buildConfig(),
      ]);
    }).then(() => {
      return {
        state,
        language,
        snippet,
        collection,
      };
    });
  },
};
