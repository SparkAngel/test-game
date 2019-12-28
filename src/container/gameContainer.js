/*eslint-disable*/
import { connect } from 'react-redux';
import { showModalCreator, inputNameCreator } from '../reducers/gameReducer';
// import { showModal, inputSec } from '../reducers/gameReducer';
// import { bindActionsCreators } from 'redux'
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

// в чем суть этого компонента!? роль посредника!? почему тогда было не сделать просто классовый компонент

// const mapStateToProps = (state) => ({
//   register: state.register,
// })

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   showModal, inputSec,
// }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(gameApp);

const gameContainer = connect(mapStateToProps, mapDispatchToProps)(gameApp);

export default gameContainer;
