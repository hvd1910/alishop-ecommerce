import React, { Fragment, useState } from 'react'

const SelectValueIdLayout = ({nameObject,label,  initialValue , getData}) => {

    const [selectedValue, setSelectedValue] = useState(initialValue);
    const handleOnChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
      };
      console.log(getData)
  return (
    <Fragment>
       <label className="form-label">{label}</label>
                <select value={selectedValue !== undefined ? selectedValue: initialValue} name={nameObject} id={nameObject} className="form-select" onChange={e=>handleOnChange(e)}>
                    {Array.isArray(getData) && getData?.map((category)=> (<option key={category.id} value={category.id}>{category.name.toUpperCase()}</option>))}
                        
                </select>
    </Fragment>
  )
}

export default SelectValueIdLayout
