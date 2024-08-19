import React, { Fragment, useState } from "react";

const SelectInputBase = ({ nameObject, label, initialValue, getData }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };
  return (
    <Fragment>
      <label className="form-label">{label}</label>
      <select
        value={selectedValue !== undefined ? selectedValue : initialValue}
        name={nameObject}
        id={nameObject}
        className="form-select"
        onChange={(e) => handleOnChange(e)}
      >
        {Array.isArray(getData) &&
          getData?.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name.toUpperCase()}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default SelectInputBase;
