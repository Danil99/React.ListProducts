import React from 'react';

function Button(props) {
  return (
      <button onClick={props.onClick} className={`${props.className} icon`}>
        {
          props.icon ?
            <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
              :
                props.children
        }
      </button>
  );
};

export default Button;
