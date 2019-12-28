
const initialState = {
  inputValue: 0,
  show: false,
};

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'INPUT_SEC':
//       return {
//         ...state,
//         inputValue: action.value,
//       };
//     case 'SHOW_MODAL':
//       return {
//         ...state,
//         show: action.value,
//         };
//     default:
//       return state;
//   }
// };

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_SEC':
      return {
        ...state,
        inputValue: action.value,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: action.value,
        };
    default:
      return state;
  }
};

export const inputNameCreator = values => ({ type: 'INPUT_SEC', value: values });

export const showModalCreator = value => ({ type: 'SHOW_MODAL', value });

export default gameReducer;
