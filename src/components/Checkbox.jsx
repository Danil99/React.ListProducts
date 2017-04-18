import React from 'react';

import Button from './Button.jsx';

function Checkbox(props) {
  return (
    <Button onClick={props.onStateClick} icon={`${props.checked ? 'check-' : ''}square-o`} className="checkbox" />
  );
};

export default Checkbox;
