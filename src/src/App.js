import React, {Component} from 'react';
import {BulbViewCtrl} from './BulbViewCtrl';

class App extends Component {
  constructor(props) {
    super();
    this.state = {bulbCount: 1}
  }

  addBulb = () => {
    this.setState(prevState => {
      return {bulbCount: prevState.bulbCount + 1};
    });
  }

  removeBulb = () => {
    this.setState(prevState => {
      return {bulbCount: prevState.bulbCount - 1};
    });
  }

  render() {
    let lightCtrls = [];
    for (let i = 0; i < this.state.bulbCount; i++) {
      lightCtrls.push(<BulbViewCtrl key={i} />);
    }

    return (
      <div>
        <div className="container">
          {lightCtrls}
        </div>
        <div className="bulbControls">
          {this.state.bulbCount < 4 ? <button className="add-button" onClick={this.addBulb}>Add Light</button> : ''}
          {this.state.bulbCount > 1 ? <button className="add-button" onClick={this.removeBulb}>Remove Light</button> : ''}
        </div>
      </div>
    )
  }
}

export default App;
