import React, {useState, useEffect} from 'react';

//To create state in functional component, we can use the useState hook.
function Message(){	
	// two outputs 1. variable and 2. Setter method initialized with 'hello'
	// useState can only be used to declare one state variable although there can be multiple useState(s)
   const [message, setMessage] = useState('world');
   // useEffect: This accesses state as well
   useEffect(() => { document.title = 'Hi ${message}' });
   return (setMessage('hello '+message));
}

// function components as only one render() and no state
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.
// Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked. 
class Board extends React.Component {
	renderSquare(i) {
		return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />);
	}
	render() {
	    return (
	      <div>
	        <div className="board-row">{this.renderSquare(0)}  {this.renderSquare(1)}  {this.renderSquare(2)}</div>
	        <div className="board-row">{this.renderSquare(3)}  {this.renderSquare(4)}  {this.renderSquare(5)}</div>
	        <div className="board-row">{this.renderSquare(6)}  {this.renderSquare(7)}  {this.renderSquare(8)}</div>
	      </div>
	    );
	}
}
// props is a properties JavaScript object which hold information passed as an attribute to the component.
// Props value are immutable and should not be changed inside the component.
// State is mutable and It can be changed as per the actions.
// State can be created as an object in class based component. To create state in functional component, we can use the useState hook.
class Game extends React.Component {
  // To store state as history
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    // This binding should be necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this); // but works as () =>...
    // this.jumpTo = this.jumpTo.bind(this); // but works as () =>...
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
	// check if the game needs to end
    if (calculateWinner(squares) || squares[i]) { 
		return; 
	}
	// Flip the symbol
    squares[i] = this.state.xIsNext ? 'X' : 'O';
	// Set a new state as its immutable.
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
 
  // Traverse history
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

	// game-info elements
	// the move buttons
    
    // .map() is like an iterator for key value; works even for single elements of list
    // although `index` is available to map - best to avoid as it changes. 
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      // React events are named using camelCase viz. this.jumpTo(...
      // if ()=> ... is not used `this` won't work until the function is binded.
      // Cons (performance): a different callback is created each time the button renders
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
	
	// Winner status
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

	// View
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// Utility function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;