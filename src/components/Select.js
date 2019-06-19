import React from 'react';
import './Select.css';

const Select = ({onChange, times}) => {
    return (
        <select onChange={onChange}>
            <option value="">Pick a Time</option>
            {times.map((time) => {
                if (time) return <option value={time}>{time}</option>;
            })}
        </select>
    );
};

export default Select;
