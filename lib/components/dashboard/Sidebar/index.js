import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Row, Button, Modal } from 'antd';

import Database from '@database';
import { getCollections } from '@database/helpers';

const { Sider } = Layout;

import CollectionForm from '@components/dashboard/CollectionForm';

import style from './style.less';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selected: null,
      collections: [],
    };

    this._cform = null;
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    getCollections().then(collections => {
      this.setState({
        collections,
      })
    });
  }

  onClick() {
    this.setState({
      visible: true,
      selected: null,
    });
  }

  onOk() {
    this._cform.props.form.validateFields((errors, values) => {
      if (!errors) {
        const values = this._cform.props.form.getFieldsValue();

        let collection = null;
        if (typeof this.state.selected === 'number') {
          collection = this.state.collections[this.state.selected];
        }

        Database.get().collection.find({
          selector: { id: collection ? collection.id : null },
        }).then(result => {
          const doc = result.docs[0];
          if (doc) {
            return Database.get().collection.put(Object.assign(doc, {
              name: values.name,
              language: values.language,
            }));
          }
          return Database.get().collection.post({
            name: values.name,
            language: values.language,
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
    return (
      <Row style={{ position: 'relative', height: '100%' }}>
        <Row style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 50 }}>
          <Row>
            <p className={style.sectionTitle}>Collections</p>
            <ul>
              {this.state.collections.map(collection => {
                console.log(collection);
                return <li><Link to={`/snippet-list/${collection._id}`}>{collection.name}</Link></li>
              })}
            </ul>
          </Row>
        </Row>
        <Row style={{ position: 'absolute', bottom: 0, width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={this.onClick.bind(this)}>New Language Set</Button>
        </Row>
        <Modal
          title="Collection"
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
          {this.state.visible ? <CollectionForm wrappedComponentRef={form => this._cform = form} snippet={typeof this.state.selected === 'number' ? this.state.collections[this.state.selected] : null} /> : null}
        </Modal>
      </Row>
    )
  }
}

export default Sidebar;
