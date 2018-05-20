import React from 'react';

export class ConnectButton extends React.Component {
  constructor(props) {
    super();
  }

  connect = () => {
    this.props.bulb.connect().then(() => {
      this.props.connectFunction(true);
    }).catch(() => {
      this.props.connectFunction(false);
    })
  }

  render() {
    return (
      <button onClick={this.connect}>Connect</button>
    )
  }
}