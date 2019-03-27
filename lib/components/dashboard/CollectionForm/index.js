import React, { Component } from 'react';

import { Form, Button, Input, Icon, Checkbox, Select } from 'antd';

import Database from '@database';
import { getLanguages } from '@database/helpers';

class CollectionForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      languages: [],
    };
  }

  componentDidMount() {
    getLanguages().then(languages => {
      this.setState({
        languages,
      })
    })
  }

  render() {
    const collection = this.props.collection || {};
    const { getFieldDecorator } = this.props.form;

    const { name, language } = collection;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ required: true, message: 'Give your collection a name' }],
          })(
            <Input placeholder="Collection" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('language', {
            initialValue: language,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: 'Choice the language' }],
          })(
            <Select onChange={value => {
              this.props.form.setFieldsValue({ language: value })
            }}>
              {this.state.languages.map(lang => {
                return <Select.Option key={lang.id} value={lang.id}>{lang.name}</Select.Option>
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}

const Wrapped = Form.create({})(CollectionForm);

export default Wrapped;
