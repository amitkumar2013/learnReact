import React from 'react';
import ReactDOM from 'react-dom';

//BASIC
import Greeting from './Basic.jsx';

// Classical FORM: make the React state be the “single source of truth” 
// instead of HTML elements which keep their own state.
class NameForm extends React.Component {
	// In React, mutable state is typically kept in the state property of components, 
	// and only updated with setState().
	constructor(props) {
		super(props);
		
		this.state = {txtvalue: '', numvalue: '',slctValue: ''};
		// this.setTxtArea is not a function implies a setter wont be produced. Does one add using __proto__
		//this.txtArea = {txtValue: ''}; 
		
		// Reacts createRef function creates a reference for form field and 
		// on form submission we can access the field value using this.input.<current.value> 
		this.input = React.createRef();
		
		// this is optional
		this.handleChange = this.handleChange.bind(this);
		// SUBMIT BINDING - In JavaScript classes, methods are not bound to class by default
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		//this.setTxtArea({txtValue: event.target.value});// this.setTxtArea is not a function unless defined
		//this.txtArea.txtValue = event.target.value;// WRONG: this will not re-render a component
		
		// Individual assignment - works but is repetitive
		//this.setState({value: event.target.value});
		//this.setState({txtValue: event.target.value});
		
		// One can distinguish based on type if applicable else condense the same as
	    this.setState({
	      [event.target.name]: event.target.value
	    });
		
	    // Cached bindings
		//<input type="text" value={this.state.revalue} onChange={this.handleChange('check')} />
		/*
		handleChange = name => {    
			if (!this.handlers[name]) {      
				this.handlers[name] = event => {        
					this.setState({ [name]: event.target.value });
			    };
		    }
		    return this.handlers[name];
		}*/
	}

	// handlers can even be separate: React shallow merges the object you provide into the current state.
	handleSlctChange(event){
		this.setState({slctValue: event.target.value});
		// update the component manually
		//this.forceUpdate();
		var myLbl = document.getElementById('myLabel');
		ReactDOM.findDOMNode(myLbl).style.color = 'red';
		// Refs should be avoided in most cases
		ReactDOM.findDOMNode(this.refs.focusHere).focus();
	}
	
	handleSubmit(event) {
		alert('State : ' + this.state.txtvalue + ';' + this.state.numvalue + ';' + this.state.slctValue);
	    alert('A name was submitted: ' + this.input.current.value);
		event.preventDefault();// and not return false;
	}
	
	// Controlled Component - data and event are associated to component.
	
	// In uncontrolled component - form data is handled by DOM itself and not the component itself like input type='file'
	// as its value can be set by user only and not by programmatically. 
	// React provides an attribute called as defaultValue to give the initial value to uncontrolled form field.

	// (event) => this.handleSlctChange(event) Avoid this.handleSlctChange.bind(this);
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label id="myLabel">Controlled Inputs: </label>

				<br/>
				<input name="txtvalue" type="text" value={this.state.txtvalue} onChange={this.handleChange} />
				<br/>
				<input name="numvalue" ref="focusHere" type="number" value={this.state.numvalue} onChange={this.handleChange} />

				<br/>
				<select value={this.state.slctValue} onChange={(e) => this.handleSlctChange(e)}>
					<option value="grapefruit">Grapefruit</option>
					<option value="lime">Lime</option>
				</select>
				
				<br /><br />
				<label htmlFor="fileUpld">Uncontrolled component fileUpload: </label>
				
				<br/>
				<input id="fileUpld" type="file" ref={this.fileInput}></input>
				
				<br /><br />
				<input type="submit" value="Submit"></input>
						
			</form>
		);
	}
}
	
// Keys serve as a hint to React but they don’t get passed to your components
// If needed in a sub component: pass it explicitly as a prop
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

// Conditional rendering
// Components
function LoginButton(props) {
	// if (!props.onClick) { return null; } // one can disable/hide display of component
	return ( <button onClick={props.onClick}>Login</button> );
}
function LogoutButton(props) {
	return ( <button onClick={props.onClick}>Logout</button> );
}
class LoginControl extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let button;
		if (isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		} else {
			button = <LoginButton onClick={this.handleLoginClick} />;
		}
		
		return (
				<div>
					<Greeting isLoggedIn={isLoggedIn} />
					{button}
					
					<hr />
					<NameForm />
					
					<hr />
					
					<Blog posts={posts} />
				</div>
		);
	}
}

export default LoginControl;