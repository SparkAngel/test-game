import React from 'react';

const Button = ({ disabledButton, handleStartGame }) => (
  <button
    type="submit"
    className="btn btn-primary btn-sm"
    disabled={disabledButton}
    onClick={handleStartGame}
  >
        START
  </button>
);

export default Button;
