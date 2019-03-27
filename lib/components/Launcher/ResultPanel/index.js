const { remote } = window.require('electron')

import React from 'react';
import Candidate from '@components/Launcher/Candidate';

class ResultPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const candidates = this.props.candidates;

    const win = remote.getCurrentWindow();
    const [width, height] = win.getSize();

    win.setSize(width, 100 + candidates.length * 60)

    return (
      <div>
        {candidates.map((c, index) => {
          return <Candidate selected={this.props.index === index} candidate={c} />;
        })}
      </div>
    )
  }
}

export default ResultPanel
