import React, { Component } from 'react'

export default class DraggableInput extends Component {


  constructor(props) {
    super(props);
    this.state={text:props.text}
  }

  //Holds data for editable style & location. DOM Component.
  setHandleRef = ref => {
    this.handleRef = ref;
  }

  //A function that gets called on mousedown that calculates the position of the component.
  initializeDrag = event => {
    const { target, clientX, clientY, view} = event;
    this.handleChange(event);
    console.log("ClientX"+clientX);
    console.log("ClientY"+clientY);
    console.log("PageY"+view.scrollY)
    const { offsetTop, offsetLeft } = target;
    console.log(offsetTop, offsetLeft);
    const { left, top } = this.handleRef.getBoundingClientRect();
    this.dragStartLeft = left - offsetLeft;
    this.dragStartTop = top - offsetTop;
    this.dragStartX = clientX;
    this.dragStartY = clientY-view.scrollY;

    //Activates startDragging.
    window.addEventListener('mousemove', this.startDragging, false);
    //Deactivates startDragging.
    window.addEventListener('mouseup', this.stopDragging, false);
  }

  //An event function thats called on mouse move. Adds the style to the component. Changes location.
  startDragging = ({ clientX, clientY }) => {
    this.handleRef.style.transform = `translate(${this.dragStartLeft + clientX - this.dragStartX}px, ${this.dragStartTop + clientY - this.dragStartY}px)`;
  //   this.setState({ x: this.dragStartLeft + clientX - this.dragStartX, y: this.dragStartTop + clientY - this.dragStartY })
   }

  //An event called to release moveable text.
  stopDragging = (event) => {
    window.removeEventListener('mousemove', this.startDragging, false);
    window.removeEventListener('mouseup', this.stopDragging, false);
    //console.log(this.state);
    
  }
  handleChange=(event)=> {
    // Here, we invoke the callback with the new value
    this.props.parentCallback(event.target.innerText);
    this.setState({text: event.target.innerText})
    return event.target.innerText;
}
  render() {
    return (
      <div className="memeText" onMouseDown={this.initializeDrag} ref={this.setHandleRef} contentEditable="true" onChange={this.handleChange} >
        Edit and Drag Me
      </div>
    )
  }
}
