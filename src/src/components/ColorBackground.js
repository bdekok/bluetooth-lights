import React from 'react';

export class ColorBackground extends React.Component {
  constructor(props) {
    super(props);
    this.backgroundColor = React.createRef();
    this.lastComputedColor = '';
  }

  componentDidMount() {
    this.updateCSSVariableColors(this.props.colors);
    this.timerID = setInterval(() => this.updateLight(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(prevProps) {
    this.updateCSSVariableColors(this.props.colors);
  }

  updateCSSVariableColors(colors) {
    colors.forEach(color => {
      this.backgroundColor.current.style.setProperty(`--bg-color-${color.colorNr}`, color.color);
    });
  }

  updateLight() {
    const computedColor = window.getComputedStyle(this.backgroundColor.current).backgroundColor;
    const rgb = computedColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

    if (computedColor !== this.lastComputedColor) {
      this.lastComputedColor = computedColor;
      const r = parseInt(rgb[0], 10);
      const g = parseInt(rgb[1], 10);
      const b = parseInt(rgb[2], 10);
      this.props.updateBulbColor(r, g, b);
    }
  }

  render() {
    let className = `background-color background-color--length-${this.props.colors.length}`;
    return (<div className={className} ref={this.backgroundColor} />);
  }
}
