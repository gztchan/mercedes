const { remote, ipcRenderer, clipboard } = window.require('electron')

import Database from '@database';
import { getLanguages, getCollections } from '@database/helpers';

import React from 'react';
import ReactDOM from 'react-dom';

import { Row } from 'antd';

import SearchPanel from '@components/Launcher/SearchPanel'
import LanguagePanel from '@components/Launcher/LanguagePanel'
import ResultPanel from '@components/Launcher/ResultPanel'

import { SEPARATOR, KEYS } from '@global/constants';
import { nextTick } from '@global/functions';

import process from '../../process';

import style from './style.less';

function langName(languages, key) {
  let result = null;
  for (let l of languages) {
    console.log(l, key)
    if (l.id === key) {
      result = l;
    }
  }
  return result.name;
}

console.log(123123123123)

export default class Launcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,

      candidates: [],
      collections: [],
      languages: [],
      cindex: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this), true);

    Promise.all([
      getLanguages(),
      getCollections(),
      Database.get().state.get('cid'),
    ]).then(array => {
      const [languages, collections, doc] = array;

      this.setState({ languages, collections });

      collections.forEach((c, index) => {
        if (c._id === doc.value) {
          this.setState({ cindex: index });
        } else if (index === this.state.collections.length - 1) {
          return Database.get().state.put(Object.assign({}, doc, {
            value: this.state.collections[0]._id
          }));
        }
      });
    });

    ipcRenderer.on('ipc:shortcut:next', (event) => {
      const nextIdx = this.state.cindex + 1 < this.state.collections.length ? this.state.cindex + 1: 0;
      const collection = this.state.collections[nextIdx];

      Database.get().state.get('cid').then(doc => {
        return Database.get().state.put(Object.assign({}, doc, {
          value: collection._id,
        }));
      }).then(() => {
        this.setState({
          cindex: nextIdx,
        });

        this.search();
      });
    })
  }

  onKeywordsChange(keywords) {
    const keyword = keywords.split(SEPARATOR)[0];
    this._keyword = keyword;
    this.search();
  }

  onKeyDown(event) {
    const code = event.which;
    if (code === KEYS.ENTER) {
      const option = this.state.candidates[this.state.index];
      remote.app.hide();
      nextTick(() => {
        const c = this.state.collections[this.state.cindex];
        process(option, c.language);
      })

    } else if (code === KEYS.ESC) {
      this.setState({
        candidates: [],
      });

      const win = remote.getCurrentWindow();
      win.hide();

      event.preventDefault();
    } else if (code === KEYS.TAB) {
      const next = this.state.index + 1 < this.state.candidates.length ? this.state.index + 1 : 0;
      this.setState({ index: next });
      event.preventDefault();
    }
  }

  search() {
    let c = this.state.collections[this.state.cindex];

    const selector = { shortcut: this._keyword };
    if (c) {
      selector.cid = c._id;
    }

    Database.get().snippet.find({
      selector,
    }).then(result => {
      this.setState({
        candidates: result.docs.map(doc => {
          return doc
        }),
      })
    });
  }

  renderResultPanel() {
    return (
      <div className="result-wrap">
        <ResultPanel index={this.state.index} candidates={this.state.candidates} />
      </div>
    )
  }

  render() {
    const c = this.state.collections[this.state.cindex];
    return (
      <Row>
        <Row className={style.inputWrap}>
          <SearchPanel
            onKeywordsChange={this.onKeywordsChange.bind(this)}
          />
        </Row>
        {c ? (
          <Row className={style.collectionWrap}>
            <span className={style.collectionName}>{c.name} : {langName(this.state.languages, c.language)}</span>
          </Row>
        ) : null}
        {this.renderResultPanel()}
      </Row>
    )
  }
}

ReactDOM.render(<Launcher />, document.getElementById('launcher'))
