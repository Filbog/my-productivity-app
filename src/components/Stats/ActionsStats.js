import React from "react";

import DisplayAction from "./DisplayAction";
import { Typography, Box } from "@material-ui/core";
import styled from 'styled-components';

const TableHead = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`

function ActionsStats({ actions, setActions }) {
  return (
    <Box>
        <TableHead>
            <Typography variant='h6'>Action</Typography>
            <Typography variant='h6'>Length </Typography>
        </TableHead>
      {actions.length > 0 ? (
        actions.map( action => <DisplayAction key={action.id} text={action.text} length={action.lengthInSecs} />)
      ) : (
        <Typography variant="h5" align='center'> No actions yet.</Typography>
      )}
    </Box>
  );
}

export default ActionsStats;
