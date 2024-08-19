import { Fragment, useState } from "react";

const SelectActiveLayout = ({ nameObject, label, initialValue }) => {
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const dataActive = [
        {
          id: '1',
          name: true
        },
        {
          id: '2',
          name: false
        },
      ]
    
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
          {Array.isArray(dataActive) &&
            dataActive?.map((data) => (
              <option key={data.id} value={data.name}>
                {data.name.toString().toUpperCase()}
              </option>
            ))}
        </select>
      </Fragment>
    );
  };
  
  export default SelectActiveLayout;
  