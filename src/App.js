import React from "react";
import "./style.css";

export default function App() {
  const [data, setdata] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const [player1, setplayer1] = React.useState({});
  const [player2, setplayer2] = React.useState({});

  const [turn, setturn] = React.useState(true);
  const [result, setresult] = React.useState("");
  const winningCombination = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  const checkforWinner = () => {
    let winner;
    for (let i = 0; i < winningCombination.length; i++) {
      let combo = winningCombination[i];
      let p1win = true;
      let p2win = true;

      for (let j = 0; j < combo.length; j++) {
        // console.log(combo[j], player1)
        if (!player1[combo[j]]) {
          p1win = false;
        }

        if (!player2[combo[j]]) {
          p2win = false;
        }
      }
      // console.log(p1win, p2win)

      if (p1win) {
        winner = "Player 1";
        break;
      }
      if (p2win) {
        winner = "Player 2";
        break;
      }
    }

    if (!winner) {
      console.log("Tie", Object.keys(player1) + Object.keys(player2));
      if (Object.keys(player1).length + Object.keys(player2).length === 9)
        return "Tie";
    }
    return winner;
  };
  const getCellNumber = (i, j) => {
    return i * 3 + j + 1;
  };

  const handleCellClick = (i, j, value) => {
    if (result) return;
    // Can't reset
    if (data[i][j]) return;

    // console.log(i,j,value);
    const cellNum = getCellNumber(i, j);
    if (turn) {
      // Player 2 turn
      player2[cellNum] = true;
    } else {
      // Player 1 turn
      player1[cellNum] = true;
    }
    data[i][j] = {
      value,
      player: turn
    };
    console.log(turn);
    setdata(data);
    setturn(!turn);
    // console.log(player1, player2);

    let winner = checkforWinner();
    setresult(winner);
  };

  const renderCols = rowIndex => {
    let cols = [];

    for (let j = 0; j < 3; j++) {
      cols.push(
        <Cell
          x={rowIndex}
          y={j}
          turn={turn}
          key={`${rowIndex}-${j}`}
          data={data[rowIndex][j]}
          onClick={handleCellClick}
        />
      );
    }
    return <div className="row">{cols}</div>;
  };

  const handlereset = () => {
    setdata([["", "", ""], ["", "", ""], ["", "", ""]]);
    setplayer1({});
    setplayer2({});
    setresult("");
  };
  const renderReset = () => {
    return <button onClick={handlereset}>Reset</button>;
  };

  const renderRows = () => {
    let rows = [];

    for (let j = 0; j < 3; j++) {
      rows.push(renderCols(j));
    }
    return (
      <div>
        {rows}
        <div>Result</div>
        {result}
        {renderReset()}
      </div>
    );
  };

  return renderRows();
}

const Cell = props => {
  const { data, x, y, turn, onClick } = props;

  const handleClick = () => {
    console.log("handleClick", turn);
    onClick(x, y, turn ? "o" : "x");
  };

  const getClass = val => {
    if (!data) return "";

    if (data.value === val) return "selected";
  };
  return (
    <div className="cell" onClick={handleClick}>
      {data.value}
    </div>
  );
};
