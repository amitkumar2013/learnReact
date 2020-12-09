import React from 'react';

var newData = {
   data: 'Data from HOC...',
}

// Higher order function replace mixins(now deprecated) & is used only to pass data to Component.

// 	It(MyHOC) is actually a function that takes one component(MyComponent),
//		enhances it with (newData) and 
//		returns another wrapped and enhanced original "normal" component - to render on screen.
var MyHOC = ComposedComponent => class extends React.Component {
   componentDidMount() {
      this.setState({
         data: newData.data
      });
   }
   render() {
      return <ComposedComponent {...this.props} {...this.state} />;
   }
};


class MyComponent extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.data}</h1>
         </div>
      )
   }
}

export default MyHOC(MyComponent);