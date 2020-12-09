import React from 'react';

//function Clock(props) {
//  return (
//    <div>
//      <h1>Hello, world!</h1>
//      <h2>It is {props.date.toLocaleTimeString()}.</h2>
//    </div>
//  );
//}

// OR Class equivalent for STATE & LifeCycle Management - PS `this`
// In the same DOM node, only a single instance of the Clock class will be used
export default class Clock extends React.Component {

//	State holder - Any state is always owned by some specific component and passed down as props.
	constructor(props) {
		super(props); // passed on date is available as props.date
		this.state = {date: props.date || new Date()}; // initialises
	}

	// LifeCycle events: componentWillMount: Before & componentDidMount: after the first render only
	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}
	// after unmounted
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	// Others: 
	//	componentWillReceiveProps(newProps)
	//	shouldComponentUpdate(newProps, newState), 
	//	componentWillUpdate(nextProps, nextState), 
	//	componentDidUpdate(prevProps, prevState)

	// Use `Setter` as attribute is immutable viz. this.state.date = new Date() is `incorrect`;
	tick() {  this.setState( {date: new Date()} ); }

	// render
	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}
