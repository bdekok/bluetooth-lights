import React, {Component} from 'react';
import {ConnectButton} from './components/ConnectButton';
import {ColorInputList} from './components/ColorInput';
import {Bulb} from './bluetooth/Bulb';
import {ColorBackground} from './components/ColorBackground';

export class BulbViewCtrl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bulb: new Bulb(),
      connected: false,
      colors: [{
        colorNr: 1,
        color: this.getRandomColor()
      }]
    };
  }

  setConnection = (connected) => {
    this.setState({connected: connected});
  }

  addColor = () => {
    this.setState(prevState => {
      return prevState.colors.push({
        colorNr: prevState.colors.length + 1,
        color: this.getRandomColor()
      })
    })
  }

  removeColor = () => {
    this.setState(prevState => {
      return prevState.colors.splice(-1, 1);
    })
  }

  setColors = (colorNr, color) => {
    this.setState(prevState => prevState.colors.map(colorInfo => {
      if (colorInfo.colorNr === colorNr) {
        return colorInfo.color = color;
      }
      return null;
    }));
  }
  updateBulbColor = (r, g, b) => {
    this.state.bulb.changeColor(r, g, b);
  }

  getRandomColor() {
    const hex = '0123456789abcdef';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.state.connected) {
      return (
        <div className="bulb">
          <div>
            <ConnectButton bulb={this.state.bulb} connectFunction={this.setConnection}></ConnectButton>
          </div>
        </div>
      )
    } else {
      return (
        <div className="bulb">
          <div>
            <ColorInputList colors={this.state.colors} changeColorFunction={this.setColors} />
            <ColorBackground colors={this.state.colors} updateBulbColor={this.updateBulbColor} />
          </div>
          <div>
            {this.state.colors.length > 1 ? <button onClick={this.removeColor}>-</button> : ''}
            {this.state.colors.length <= 5 ? <button onClick={this.addColor}>+</button> : ''}
          </div>
        </div>
      )
    }
  }
}
