import React, { Component } from 'react';

import { Form, Button, Input, Icon, Checkbox, Select } from 'antd';

import Database from '@database';
import { getLanguages, getCollection } from '@database/helpers';

const { TextArea } = Input;

class SnippetForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      languages: [],
      language: null,
    };
  }

  componentDidMount() {
    getLanguages().then(languages => {
      this.setState({
        languages,
      })
    });

    getCollection(this.props.cid).then(collection => {
      this.setState({ language: collection.language });
    })
  }

  render() {
    const snippet = this.props.snippet || {};
    const { getFieldDecorator } = this.props.form;

    const { shortcut, language, content } = snippet;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('shortcut', {
            initialValue: shortcut,
            rules: [{ required: true, message: 'Give your snippet a shortcut' }],
          })(
            <Input disabled={shortcut ? true : false } placeholder="Snippet shortcut" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('language', {
            initialValue: this.state.language,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: 'Choice the language' }],
          })(
            <Select disabled={true} onChange={value => {
              this.props.form.setFieldsValue({ language: value })
            }}>
              {this.state.languages.map(lang => {
                return <Select.Option key={lang.id} value={lang.id}>{lang.name}</Select.Option>
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [{ required: true, message: 'Any snippet?' }],
          })(
            <TextArea rows={10} />
          )}
        </Form.Item>
      </Form>
    )
  }
}

const Wrapped = Form.create({})(SnippetForm);

export default Wrapped;
