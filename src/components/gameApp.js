import React, { useState, useEffect } from 'react';
import _times from 'lodash/times';
import { connect } from 'react-redux';
import { showModalCreator,
  inputNameCreator, randomCreator, setRedCreator,
  setGreenCreator, setIsActiveCreator,
  setEndTimesCreator, setAiWinCreator, setYouWinCreator
} from '../reducers/gameReducer';
import Modal from '../components/modal';
import Score from '../components/score';
import DivContainer from '../components/divContainer';
import Button from '../components/button';

let interval = null;
const WIN_POINT = 9;

const GameApp = ({
  inputSecDispatch,
  showModalDispatch,
  isActiveDispatch,
  endTimesDispatch,
  randomDispatch,
  setGreenColorDispatch,
  setRedColorDispatch,
  setAiWinDispatch,
  setYouWinDispatch,
  register: {
    inputSeconds,
    randomNumber,
    redColor,
    greenColor,
    isActive,
    endTimes,
    aiWin,
    youWin
  }}) => {

  const [seconds, setSeconds] = useState();
  const [arr] = useState(_times(100, Number)); // массив от 0-100
  const disabledButton = inputSeconds > 0 ? false : true;

  const handleStartGame = () => (
    setSeconds(inputSeconds),
    randomDispatch(),
    isActiveDispatch(true)
  );

  const nextGameIteration = () => (
    setSeconds(inputSeconds),
    endTimesDispatch(false),
    randomDispatch()
  );

  const whoWin = () => {  // для определения кто выиграл и нужно ли закончить игру
    if (aiWin === WIN_POINT || youWin === WIN_POINT) {
      isActiveDispatch(false);
      showModalDispatch(true);
    }
      return
  };

  const handleClick = e => {  // определение правильности выбора и  случайных нажатий
    if (isActive || endTimes) {
      if (randomNumber === +e.target.id && !endTimes) {
        setGreenColorDispatch(+e.target.id);
        setYouWinDispatch(1);
        whoWin();
        nextGameIteration();
      } else {
        setRedColorDispatch(randomNumber);
        setAiWinDispatch(1);
        whoWin();
        nextGameIteration();
      }
    } else {
      return
    }
  };

  const gameCycle = () => (
    interval = setInterval(() => {
      setSeconds(sec => {
        if (sec === 0) {
          if (aiWin === WIN_POINT) {
            clearInterval(interval);
            whoWin();
          } else {
            setRedColorDispatch(randomNumber);
            setAiWinDispatch(1);
            endTimesDispatch(true);
            whoWin();
            nextGameIteration()
          }
            return sec;
        } else {
          return sec - 1;
        }
      });
    }, 50)
  );

  useEffect(() => {  // в хуке делаю интервал для отсчета времени

    if (isActive) {
      gameCycle()
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, gameCycle]);

  const handleOnChange = e => (   // для диспатча значения из инпута в стайте редакса
    inputSecDispatch(e.target.value)
  );

  return (
    <div className="game">
      <input
        type="number"
        className="form-control"
        placeholder="Choose your speed (ms)"
        onChange={handleOnChange}
      />
      <h1 className="h1">{seconds}</h1>

      <div className="container-score">
        <Score {...{ aiWin, youWin }} />
      </div>

      <div className="container">
        <DivContainer {...{ arr, randomNumber,
          greenColor, redColor, handleClick }}
        />
      </div>

      <div className="container-box">
        <Button {...{ disabledButton, handleStartGame }}/>
      </div>

      <Modal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    register: state.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputSecDispatch: (text) => {
      dispatch(inputNameCreator(text));
    },
    showModalDispatch: (value) => {
      dispatch(showModalCreator(value));
    },
    isActiveDispatch: (value) => {
      dispatch(setIsActiveCreator(value));
    },
    endTimesDispatch: (value) => {
      dispatch(setEndTimesCreator(value));
    },
    randomDispatch: () => {
      dispatch(randomCreator());
    },
    setGreenColorDispatch: (value) => {
      dispatch(setGreenCreator(value));
    },
    setRedColorDispatch: (value) => {
      dispatch(setRedCreator(value));
    },
    setAiWinDispatch: (value) => {
      dispatch(setAiWinCreator(value));
    },
    setYouWinDispatch: (value) => {
      dispatch(setYouWinCreator(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameApp);
