import React from 'react'
import { Button } from '@material-ui/core';


function TimerButton({children, handleClick}) {
    return (
        <Button onClick={handleClick} variant='contained' color='primary'>{children}</Button>
    )
}

export default TimerButton
