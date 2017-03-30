import React, {Component} from 'react';

export default class ThemeInfo extends Component {
  render() {
    return (
      <div>
        <strong>{this.props.name}</strong>
        <br/>
        <i>by {this.props.author_name} ({this.props.author_username})</i>
      </div>
    );
  }
}
