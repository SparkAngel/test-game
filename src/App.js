import React, { useState, useEffect } from 'react';
import _random from 'lodash/random';
import _times from 'lodash/times';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [firstGame, setFirstGame] = useState(false);
  const [nextGame, setNextGame] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState();
  const [random, setRandom] = useState();
  const [arr] = useState(_times(100, Number));
  const [chooseTrue, setChooseTrue] = useState(false);
  const [endTimes, setEndTimes] = useState(false);
  const [youWin, setYouWin] = useState(0);
  const [aiWin, setAiWin] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState();
  const WIN_POINT = 9;
  const disabledButton = firstGame || !input;

  const handleStartGame = () => (
    setSeconds(input),
    setRandom(_random(1, 100)),
    setIsActive(true),
    setFirstGame(true),
    setNextGame(false)
  );

  const handleNextGame = () => (
    setSeconds(input),
    setChooseTrue(false),
    setEndTimes(false),
    setFirstGame(false),
    setRandom(null),
    setNextGame(true)
  );

  const whoWin = () => (
    setShowModal(aiWin === WIN_POINT || youWin === WIN_POINT)
  );

  const handleClick = (e) => {
    if (random === +e.target.id && !endTimes) {
      setYouWin(youWin + 1);
      setIsActive(false);
      setChooseTrue(true);
      whoWin();
    } else {
      setIsActive(false);
      setAiWin(aiWin + 1);
    }
  };

  const getContainerColor = (e) => {
    if (isActive || !firstGame) {
      if (random === e) {
        return 'yellow';
      } else {
        return 'blue';
      }
    } else if (random === e && chooseTrue) {
      return 'green';
    } else if (!chooseTrue) {
      return 'red';
    } else {
      return 'blue';
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(sec => {
          if (sec === 0) {
            clearInterval(interval);
            setIsActive(false);
            setSeconds(0);

            if (!chooseTrue) { setEndTimes(true); }
            setAiWin(prev => prev + 1);
            whoWin();
          } else {
            return sec - 1;
          }
        });
      }, 50);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleClose = () => (
    setShowModal(false),
    setAiWin(0),
    setYouWin(0),
    setFirstGame(false),
    setNextGame(true),
    setRandom(),
    setInput()
  );

  const inputSeconds = e => (
    setInput(e.target.value)
  );

  return (
    <div className="App">
      <input
        type="number"
        className="form-control"
        value={input}
        placeholder="Choose your speed (ms)"
        onChange={inputSeconds}
      />
      <h1 className="h1">{seconds}</h1>

      <div className="container-score">
        <h2>Score</h2>
        <div className="score">
          <div className="text-one">You:</div>
          <div className="text-two">{youWin}</div>
          <div className="text-one">AI:</div>
          <div className="text-two">{aiWin}</div>
        </div>
      </div>

      <div className="container">
        {arr.map((el, i) => (
          <div
            key={el}
            className={`blue ${getContainerColor(i)}`}
            id={i}
            onClick={handleClick}
          >
          </div>
        ))}
      </div>

      <div className="container-box">
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={disabledButton}
          onClick={handleStartGame}
        >
              START
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={nextGame}
          onClick={handleNextGame}
        >
              Next game
        </button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{aiWin > youWin ? 'AI WIN' : 'YOU WIN'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>
              Next Game ?
          </Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
