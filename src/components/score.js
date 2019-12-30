import React from 'react';

const Score = ({ youWin, aiWin }) => (
  <>
  <h2>Score</h2>
  <div className="score">
    <div className="text-one">You:</div>
    <div className="text-two">{youWin}</div>
    <div className="text-one">AI:</div>
    <div className="text-two">{aiWin}</div>
  </div>
  </>
);

export default Score;
