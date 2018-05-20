import React from 'react';

export const ColorInputList = (props) => {
  let colorInputs = [];
  for (let i = 0; i < props.colors.length; i++) {
    colorInputs.push(<ColorInput key={props.colors[i].colorNr} colorNr={props.colors[i].colorNr} color={props.colors[i].color} changeColorFunction={props.changeColorFunction}></ColorInput>);
  }
  return colorInputs;
}

export class ColorInput extends React.Component {
  constructor(props) {
    super()
  }

  updateColor(event) {
    this.props.changeColorFunction(this.props.colorNr, event.target.value)
  }

  render() {
    return (
      <input type="color" value={this.props.color} onChange={(event) => this.updateColor(event)} />
    )
  }
}