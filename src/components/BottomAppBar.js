import React from "react";

import { Tab, Tabs, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function BottomAppBar({ currentTab, setCurrentTab }) {
    const changeTab = (event, value) => {
        setCurrentTab(value)
    }

  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0,}}>
      <Tabs value={currentTab} onChange={changeTab} centered>
        <Tab label='Timer' id="timer-tab" aria-controls="timer-panel" />
        <Tab label='My Actions' id="actions-tab" aria-controls="actions-panel" />
      </Tabs>
    </AppBar>
  );
}

export default BottomAppBar;
