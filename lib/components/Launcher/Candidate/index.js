import React from 'react';
import classNames from 'classnames';
import style from './style.less';

class Candidate extends React.Component {
  render() {
    const candidate = this.props.candidate;
    return (
      <div className={classNames(style.candidateWrap, { [style.selected]: this.props.selected })}>
        <p>{candidate.shortcut}</p>
      </div>
    )
  }
}

export default Candidate
