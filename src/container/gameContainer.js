/*eslint-disable*/
import { connect } from 'react-redux';
import { showModalCreator, inputNameCreator } from '../reducers/gameReducer';
import gameApp from '../components/gameApp';

const mapStateToProps = (state) => {
  return {
    register: state.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputSec: (text) => {
      dispatch(inputNameCreator(text));
    },
    showModal: (value) => {
      dispatch(showModalCreator(value));
    },
  };
};

const gameContainer = connect(mapStateToProps, mapDispatchToProps)(gameApp);

export default gameContainer;
