import React, { useState } from "react";
import "./App.css";
// MUI stuff
import { CssBaseline, Container, Typography } from "@material-ui/core";
//makeStyles is for modifying components MUI-style, dunno if I'll be using it honestly
// import { makeStyles } from "@material-ui/core/styles";
//this is to make styled-components styling more specific than the native MUI one
import { StylesProvider } from '@material-ui/core/styles';
//Components
import BottomAppBar from "./components/BottomAppBar";
import Timer from './components/Timer/Timer';
import ActionsForm from './components/ActionsForm';
import ActionsStats from './components/Stats/ActionsStats';
import HelperText from './components/Stats/HelperText';

function App() {

/* ----------------------------- state variables ---------------------------- */
  //changing tabs
  const [currentTab, setCurrentTab] = useState(0);
  //timer
    //status is denoting if we're counting or not, to be more precise - if the timer is on and not paused
  const [status, setStatus] = useState(false);
    //this is a piece of state used to control the UI. The inputs disappear when the timer is on and vice versa
  const [timerMode, setTimerMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
    //did minutes and hours as well, but I don't know if I'll use them.
  // const [minutes, setMinutes] = useState(0);
  // const [hours, setHours] = useState(0);
  //actions
  const [actions, setActions] = useState([]);
  const [currentAction, setCurrentAction] = useState(null);
  

  return (
    <div className="App">
      <StylesProvider injectFirst>
      <CssBaseline />
      <Container>

{/* -------------------------------- first tab ------------------------------- */}

        <div role="tabpanel" hidden={currentTab !== 0}>
          <ActionsForm actions={actions} setActions={setActions} timerMode={timerMode} currentAction={currentAction} setCurrentAction={setCurrentAction} />
          <Timer seconds={seconds} setSeconds={setSeconds} status={status} setStatus={setStatus} timerMode={timerMode} setTimerMode={setTimerMode} currentAction={currentAction} setCurrentAction={setCurrentAction} actions={actions} setActions={setActions} />
        </div>

{/* ------------------------------- second tab ------------------------------- */}

        <div role="tabpanel" hidden={currentTab !== 1}>
        <Typography variant="h3" align="center" style={{ margin: 8, marginBottom: '2rem' }}>
          My statistics
        </Typography>
          <ActionsStats actions={actions} setActions={setActions} />
          <HelperText />
        </div>


        <BottomAppBar setCurrentTab={setCurrentTab} currentTab={currentTab} />
      </Container>
      </StylesProvider>
    </div>
  );
}

export default App;
