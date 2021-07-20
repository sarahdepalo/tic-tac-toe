import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        //initial state is being set to contain an array of 9 nulls (for the 9 squares)
        this.state = {
            //Array = an Array constructor, creates an empty array of null 9 times
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
    //Addding this method allows the state to be stored in the Board component rather than the individual square. When the Board’s state changes, the Square components re-render automatically.
    handleClick(i) {
        //Use slice to create a new array to modify.
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //flips the value of xIsNext
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      />;
    }

    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next Player: ' + (this.state.xIsNext ? 'X' : '0');
      } 
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
};


  function calculateWinner(squares) {
    //the winning combinations:
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
      //if there is a sqaure @ a index, and that a index == b, and equal to c: 
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default Board;