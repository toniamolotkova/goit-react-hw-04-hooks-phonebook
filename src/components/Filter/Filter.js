import PropTypes from 'prop-types';
import React from 'react';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={s.label}>
      Find contacts by name:
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input}
        placeholder="Fiona Holmse"
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}
export default Filter;
