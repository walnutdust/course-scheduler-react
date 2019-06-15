import React from 'react';
import './Checkbox.css';

const Checkbox = ({onClick}) => {
    return <input type="checkbox" onClick={onClick} />;
};

export default Checkbox;
