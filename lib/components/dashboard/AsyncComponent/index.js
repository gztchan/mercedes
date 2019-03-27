import React from 'react';
import { withRouter } from "react-router";

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
    };
  }

  componentDidMount() {
    if (this.props.importComponent) {
      this.props.importComponent.then(c => {
        this.setState({ component: c.default });
      });
    }
  }

  render() {
    const Component = this.state.component;
    return Component ? <Component history={this.props.history} match={this.props.match} location={this.props.location} /> : null;
  }
}

export default withRouter(AsyncComponent)
