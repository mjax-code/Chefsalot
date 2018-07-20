import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class UserView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            Hey! There!
        </div>
    );
  }
}

ReactDOM.render(
    React.createElement(UserView, window.props),    // gets the props that are passed in the template
    window.react_mount,                                // a reference to the #react div that we render to
)

