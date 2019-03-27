import React from 'react';
import { KEYS } from '@global/constants';

import style from './style.less';

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onBlur() {
    this.inputRef.current.value = '';
    this.props.onKeywordsChange(this.inputRef.current.value );
  }

  onChange(event) {
    this.props.onKeywordsChange(this.inputRef.current.value)
  }

  render() {
    return (
      <div className={style.searchPanel}>
        <input
          className={style.main}
          onBlur={this.onBlur.bind(this)}
          ref={this.inputRef}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }
}

export default SearchPanel
