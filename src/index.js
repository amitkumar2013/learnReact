import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Other being MemoryRouter
import { BrowserRouter, Route, Switch} from "react-router-dom";

// Check manifest.json for Service Worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// PROPS
import Game from './sample/Game.js';
// STATE
import Clock from './sample/Clock.js';
import LoginControl from './sample/Login.js';
// lifting state up
import Calculator from './sample/Calculator.js';
// import the components which are not exported by default inside the curly braces {}
import FilterableProductTable,{PRODUCTS} from './example/Product.js';

// Modular CSS
import { CompA } from './styl/comp-a.js';
import { CompB } from './styl/comp-b.js';

ReactDOM.render(
	(<BrowserRouter>
		{/*BrowserRouter can have only 1 child so use DIV*/}
		<div>
			<Route path={"/"} component={LoginControl} />
			{/*Switch only renders 1st element*/}
			<Switch>
				<Route path={"/fun_calc"} component={Calculator} />
				<Route path={"/fun_game"} component={Game} />
			</Switch>
			{/* CompB uses Fragment*/}
			<CompA />
			<CompB />
		</div>
	 </BrowserRouter>),
  document.getElementById('root')
);

//		<Clock date={new Date()} />,
//		<FilterableProductTable products={PRODUCTS} />,

// Enabling Service Worker - Not Working
serviceWorkerRegistration.register();
