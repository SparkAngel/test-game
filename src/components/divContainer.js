import React from 'react';
import classNames from 'classnames';

const DivContainer = ({ arr, randomNumber,
  greenColor, redColor, handleClick }) => (
  <>
  {arr.map((el, i) => (
    <div
      key={el}
      className={classNames({
        'blue': true,
        'yellow': randomNumber === i,
        'green': greenColor.includes(i),
        'red': redColor.includes(i),
          })}
      id={i}
      onClick={handleClick}
    >
    </div>
  ))}
  </>
);

export default DivContainer;
