import React from 'react'
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 12px;
`;

const ShowLength = styled(Typography)`
    margin-left: 10px;
    ${(props) => props.text.length > 30 && 'align-self: center'}
`


function DisplayAction({ text, length }) {
    return (
        <Wrapper>
            <Typography variant='subtitle1'>{text}</Typography>
            <ShowLength text={text} variant='subtitle1' align='center'>
            {("0" + Math.floor(length / 3600)).slice(-2)}:
        {("0" + Math.floor((length / 60) % 60)).slice(-2)}:
        {("0" + (length % 60)).slice(-2)}
                </ShowLength>
 
        </Wrapper>
    )
}

export default DisplayAction
