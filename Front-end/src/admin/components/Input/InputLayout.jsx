import React, { Fragment, useEffect, useState } from 'react'

const InputLayout = ({name, value, type}) => {
    const [valueInput, setValueInput] = useState(value);

    const handleInputChange = (e) => {
        setValueInput(e.target.value);
    }

    useEffect(()=> {
        setValueInput(value)
    },[value])
  return (

    <Fragment>
      	<input onChange={handleInputChange} id={name} name={name} className="form-control-2 here slug-title" type={type} value={valueInput !== null ? valueInput : ''}/>

    </Fragment>
  )
}

export default InputLayout
