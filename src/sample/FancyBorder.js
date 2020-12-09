import React from 'react';

// DECORATOR's - Composition

// Use of special `children` prop to pass children elements directly into their output - so it can act as decorator
function FancyBorder(props) {
	// One can add more wrapping here with <h1> messages or other components.
	// Multiple classes eg. className={`${styles.cls1} ${styles.cls2}`}
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	);
}

// Similarly define the CSS classes SplitPane[-left|right] and left & right could be components.
// viz. <SplitPane left={ <List /> } right={ <Text /> } />
function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}

export default FancyBorder;
