import React from 'react'
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const MyText = styled(Typography)`
    position: absolute;
    bottom: 4rem;
`

function HelperText() {
    return (
        <MyText variant='subtitle1' >
            Click on an action to see more details
        </MyText>
    )
}

export default HelperText
