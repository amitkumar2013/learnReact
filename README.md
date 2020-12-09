	return (
	      <div className="shopping-list">
	        <h1>Shopping List for {this.props.name}</h1>
	        <ul>
	          <li>Instagram</li>
				...
	        </ul>
	      </div>
	    );

// same as 

	return React.createElement('div', {className: 'shopping-list'},<----- not closed
	  React.createElement('h1', /* ... h1 children ... */),        <----- closed
	  React.createElement('ul', /* ... ul children ... */)
	);

fn(...args) is ---> fn.call(window [ES5-strict: undefined], ...args)
	
	hello("world") // desugars to: hello.call(undefined with ES6 earlier it was window, "world");
	// More example
	function hello(thing) {
	  console.log(this + " says hello " + thing);
	}
	
	// Object is created and assigned a function
	person = { name: "Brendan Eich" }
	person.hello = hello;
	
	// CALL without explicit this
	person.hello("world") // still desugars to person.hello.call(person, "world")
	// Call without Object is still `window`
	hello("world") // "[object DOMWindow]world"
	
	// To avoid this
	var person = {
	  name: "Brendan Eich",
	  hello: function(thing) { console.log(this.name + " says hello " + thing); }
	}
	
	// Below is safe overriding the unkonwn caller
	var boundHello = function(thing) { return person.hello.call(person, thing); }
	boundHello("world"); // "Brendan Eich says hello world"
	
	// ALTERNATIVELY --- one can use apply() i.e. wrap func and reset.
	// bind returns a new function invoking the original function passed in, setting the original value as this. It also passes through the arguments.
	var bind = function(func, thisValue) {
	  // apply method works exactly like the call primitive, except that it takes an Array
	  return function() { return func.apply(thisValue, arguments); }
	}
	
	var boundHello = bind(person.hello, person); or person.hello.bind(person);
	boundHello("world") // "Brendan Eich says hello world"

--

STATE MANAGEMENT
----------------
To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. 
The parent component can pass the state back down to the children by using `props`; this keeps the child components in sync with each other and with the parent component.

	// var newObject = Object.assign({}, old_obj, {attribute_name: updated_value});
	OR new syntax 
	// var newObject = {...old_obj, attribute_name: updated_value};

--

A JavaScript build toolchain typically consists of:

- A package manager, such as `Yarn` or `npm`. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
- A bundler, such as `webpack` or `Parcel` (web application bundler). It lets you write modular code and bundle it together into small packages to optimize load time.
- A compiler such as `Babel`. It lets you write modern JavaScript code that still works in older browsers.

--

Function component

	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}
	// same as
	class Welcome extends React.Component {
	  render() {
	    return <h1>Hello, {this.props.name}</h1>;
	  }
	}
--
### `yarn eject`

	$ yarn global add serve
	$ yarn build
	$ serve -s build
Now its available at localhost:3000

### FOR PWA - adding Service worker

	$ npx create-react-app my-app --template cra-template-pwa - use 2 files and import
	...
	import * as serviceWorkerRegistration from './serviceWorkerRegistration';
	serviceWorkerRegistration.unregister();

	$ npm install --save-dev workbox-build


### Code Splitting
This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
### Analyzing the Bundle Size
This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
### Making a Progressive Web App
This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
### Advanced Configuration
This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
### Deployment
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
### `yarn build` fails to minify
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## REDUX

## CSS transitions and animations
$ npm install react-addons-css-transition-group

With style sheet: 

	.example-appear {
	   opacity: 0.04;
	}
	.example-appear.example-appear-active {
	   opacity: 2;
	   transition: opacity 50s ease-in;
	}
	.example-enter {
	   opacity: 0.04;
	}
	.example-enter.example-enter-active {
	   opacity: 5;
	   transition: opacity 50s ease-in;
	}
	.example-leave {
	   opacity: 1;
	}
	.example-leave.example-leave-active {
	   opacity: 0.04;
	   transition: opacity 50s ease-in;
	}
	
	var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
	...
	<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
		<h1>My Element...</h1> or {items} and keep changing using add or remove
	</ReactCSSTransitionGroup>
