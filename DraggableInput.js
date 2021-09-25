import React, { Component } from 'react'

export default class DraggableInput extends Component {


  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  //Holds data for editable style & location. DOM Component.
  setHandleRef = ref => {
    this.handleRef = ref;
  }

  //A function that gets called on mousedown that calculates the position of the component.
  initializeDrag = event => {
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = this.handleRef.getBoundingClientRect();
    this.dragStartLeft = left - offsetLeft;
    this.dragStartTop = top - offsetTop;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    //Activates startDragging.
    window.addEventListener('mousemove', this.startDragging, false);
    //Deactivates startDragging.
    window.addEventListener('mouseup', this.stopDragging, false);
  }

  //An event function thats called on mouse move. Adds the style to the component. Changes location.
  startDragging = ({ clientX, clientY }) => {
    this.handleRef.style.transform = `translate(${this.dragStartLeft + clientX - this.dragStartX}px, ${this.dragStartTop + clientY - this.dragStartY}px)`;
    this.setState({ x: this.dragStartLeft + clientX - this.dragStartX, y: this.dragStartTop + clientY - this.dragStartY })
  }

  //An event called to release moveable text.
  stopDragging = () => {
    window.removeEventListener('mousemove', this.startDragging, false);
    window.removeEventListener('mouseup', this.stopDragging, false);
    console.log(this.state);
  }

  render() {
    return (
      <div className="memeText" onMouseDown={this.initializeDrag} ref={this.setHandleRef} contentEditable="true">

        Edit and Drag Me
      </div>
    )
  }
}
