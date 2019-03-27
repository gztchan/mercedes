import React from 'react';

import { Row, Button, Pagination, Modal, Table } from 'antd';

import SnippetForm from '../SnippetForm';

import columns from './columns';

import Database from '@database';
import { getLanguages } from '@database/helpers';

export default class SnippetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      snippets: [],
    }

    this._sform = null;
    this._cid = null;
  }


  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    this._cid = match.params.cid
    this.fetch();
  }

  componentDidMount() {
    const { match } = this.props;
    this._cid = match.params.cid
    this.fetch();
  }

  fetch() {
    Database.get().snippet.find({
      selector: {
        cid: this._cid,
      },
      limit: 100,
      skip: 0,
    }).then(result => {
      this.setState({
        snippets: result.docs
      })
    })
  }

  remove(index) {
    const snippet = this.state.snippets[index];
    const { shortcut } = snippet;
    Database.get().snippet.find({
      selector: { shortcut: shortcut },
    }).then(result => {
      console.log(result.docs);
      const doc = result.docs[0];
      if (doc) {
        return Database.get().snippet.remove(doc);
      }
    }).then(result => {
      this.fetch();
    });
  }

  onOk() {
    this._sform.props.form.validateFields((errors, values) => {
      if (!errors) {
        const values = this._sform.props.form.getFieldsValue();
        Database.get().snippet.find({
          selector: {
            shortcut: values.shortcut,
            cid: this._cid,
          },
        }).then(result => {
          const doc = result.docs[0];
          if (doc) {
            return Database.get().snippet.put(Object.assign(doc, {
              language: values.language,
              content: values.content,
            }));
          }
          return Database.get().snippet.post({
            cid: this._cid,
            shortcut: values.shortcut,
            language: values.language,
            content: values.content,
            times: 0,
          });
        }).then(doc => {
          this.fetch();
          this.setState({
            visible: false,
            selected: null,
          });
        });
      }
    });
  }

  render() {
    if (!this._cid) return null;

    return (
      <Row style={{ height: '100%' }}>
        <Row style={{ padding: '10px 0' }}>
          <Row style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 50, boxSizing: 'border-box' }}>
            <Button onClick={() => {
              this.setState({
                visible: true,
              });
            }}>Add Snippet</Button>
          </Row>
        </Row>
        <Row style={{ position: 'relative', height: '100%' }}>
          <Row style={{ position: 'absolute', top: 0, bottom: 200, width: '100%', overflow: 'auto' }}>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    this.setState({
                      visible: true,
                      selected: rowIndex,
                    });
                  },
                  onContextMenu: (event) => {
                    this.remove(rowIndex);
                  },
                };
              }}
              dataSource={this.state.snippets}
              columns={columns}
              pagination={false}
            />
          </Row>
        </Row>
        <Row style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 100, display: 'flex', 'justify-content': 'flex-end', 'align-items': 'center', padding: '0 20px' }}>
          <Pagination defaultCurrent={1} total={50} />
        </Row>
        <Modal
          title="Basic Modal"
          width={800}
          visible={this.state.visible}
          onOk={this.onOk.bind(this)}
          onCancel={() => {
            this.setState({
              visible: false,
              selected: null,
            });
          }}
        >
          {this.state.visible ? <SnippetForm wrappedComponentRef={form => this._sform = form} cid={this._cid} snippet={typeof this.state.selected === 'number' ? this.state.snippets[this.state.selected] : null} /> : null}
        </Modal>
      </Row>
    )
  }
}
