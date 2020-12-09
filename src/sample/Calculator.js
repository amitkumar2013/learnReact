import React from 'react';
import FancyBorder from './FancyBorder.js';
import PropTypes from 'prop-types';

// Enum
const scaleNames = {
		c: 'Celsius',
		f: 'Fahrenheit'
};
// Utility 
function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}
// Separate function component being passed the state using props from parent
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}
//Child Component accessing parent state & handler through props 
class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	// parent handler is encapsulated in its own handler
	handleChange(e) {
		// referring to parent components handler - mapped to some handler
		this.props.onTemperatureChange(e.target.value);
	}
	render() {
		// referring to parent components state
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		// Input will trigger a change
		return (
				<fieldset>
					<legend>Enter temperature in {scaleNames[scale]}:</legend>
					<input value={temperature} onChange={this.handleChange} />
				</fieldset>
		);
	}
}

// Typechecking With PropTypes : Only in build mode
//TemperatureInput.propTypes = {
//	temperature: PropTypes.number,
//}
//TemperatureInput.defaultProps = {
//	temperature: 50,
//}

// Parent Component - a single “source of truth” for any data that changes in a React application
// Dis-adv: Lifting state involves writing more “boilerplate” code than two-way binding approaches 
// Adv: Any state “lives” in some component and that component alone can change it, it takes less work to find and isolate bugs.
class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		// State which flows to child components
		// If something can be derived from either props or state, it probably shouldn’t be in the state so 
		// instead of separate celsius and fahrenheit use a temperature & scale.
		this.state = {temperature: '', scale: 'c'};
	}
	// setState is like asking React to re-render itself
	handleCelsiusChange(temperature) {
		this.setState({scale: 'c', temperature});
	}
	handleFahrenheitChange(temperature) {
		this.setState({scale: 'f', temperature});
	}
	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		// besides state another attribute can be declared viz. `onTemperatureChange` as handler
		return (
			    <FancyBorder color="blue">
					<TemperatureInput scale="c" temperature={celsius}
						onTemperatureChange={this.handleCelsiusChange} />
					<TemperatureInput scale="f" temperature={fahrenheit}
						onTemperatureChange={this.handleFahrenheitChange} />
					<BoilingVerdict	celsius={parseFloat(celsius)} />
				</FancyBorder>
		);
		// React calls the render methods of the individual TemperatureInput components while re-rendering called from handlers
	}
}

export default Calculator;