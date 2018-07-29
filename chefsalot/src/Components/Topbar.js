import React, { Component } from 'react';
import NavButton from 'Components/NavButton';


class Topbar extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
    return(
      <div className="nav-bar-container">
        <NavButton text="Users" value={this.props.userview} onNav={this.props.onNav} />
        <NavButton text="Groups" value={this.props.groupview} onNav={this.props.onNav} />
        <NavButton text="Add Recipe" value={this.props.recipeview} onNav={this.props.onNav} />
      </div>
    );
  }
}

export default Topbar;