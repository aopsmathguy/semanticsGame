import React from 'react';

function GuessTable({ guesses, lastGuess }) {
  return (
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <td width="150px"><b>Word</b></td>
          <td width="50px"><b>Similarity</b></td>
          <td width="200px"></td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(guesses)
          .sort((a, b) => b[1] - a[1])
          .map(([guess, sim]) => (
            <tr
              key={guess}
              style={{
                backgroundColor: guess === lastGuess?.guess ? 'lightgreen' : 'white',
              }}
            >
              <td>{guess}</td>
              <td>{Math.round(100 * sim)}%</td>
              <td>
                <div
                  style={{
                    width: `${sim * 100}%`,
                    backgroundColor: `hsl(${sim ** 0.5 * 100}, 100%, 50%)`,
                    height: '20px',
                    margin: '5px 0px',
                    border: '2px solid black',
                  }}
                ></div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default GuessTable;