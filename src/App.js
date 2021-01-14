import React, { useState } from "react";
import "./App.css";
// MUI stuff
import { CssBaseline, Tab, Tabs, AppBar, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//Components
import BottomAppBar from "./components/BottomAppBar";
import Timer from './components/Timer';

function App() {

/* ----------------------------- state variables ---------------------------- */
  //changing tabs
  const [currentTab, setCurrentTab] = useState(0);

  //timer
    //status is denoting if we're counting or not
  const [status, setStatus] = useState(false);
  const [seconds, setSeconds] = useState(0);
    //did minutes and hours as well, but I don't know if I'll use them.
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <div role="tabpanel" hidden={currentTab !== 0}>
          <Timer seconds={seconds} setSeconds={setSeconds} status={status} setStatus={setStatus} />
        </div>
        <div role="tabpanel" hidden={currentTab !== 1}>
        <Typography variant="h3" align="center" style={{ margin: 8 }}>
          Hi
        </Typography>
        </div>
        <BottomAppBar setCurrentTab={setCurrentTab} currentTab={currentTab} />
      </Container>
    </div>
  );
}

export default App;
