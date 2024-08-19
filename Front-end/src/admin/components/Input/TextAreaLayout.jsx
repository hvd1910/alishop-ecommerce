import React, { Fragment, useEffect, useState } from 'react'

const TextAreaLayout = ({name,value}) => {
    const [valueInput, setValueInput] = useState(value);

    const handleInputChange = (e) => {
        setValueInput(e.target.value);
    }

    useEffect(()=> {
        setValueInput(value)
    },[value])

  return (
    <Fragment>
		<textarea className="form-control" rows="4" name='description' onChange={(e)=>handleInputChange(e)} value={valueInput}></textarea>

    </Fragment>
  )
}

export default TextAreaLayout
