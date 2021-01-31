import React, { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import styled from "styled-components";
import TimerButton from "./TimerButton";

const TimerButtons = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const CurrentActionText = styled(Typography)`
  margin-bottom: 8px;
  text-align: center;
`

function Timer({ seconds, setSeconds, status, setStatus, timerMode, setTimerMode, currentAction, setCurrentAction, actions, setActions }) {
  //had to put the interval counter in state bc it's the only way it works and I can actually stop it from counting when toggling status XD
  const [myInterval, setMyInterval] = useState(null);

  useEffect(() => {
    if (status === true) {
      setMyInterval(
        setInterval(() => {
          setSeconds((seconds) => seconds + 1);
        }, 1000)
      );
    } else {
      clearInterval(myInterval);
    }
  }, [status]);
 
  const startTimer = () => {
    setStatus(true);
    setTimerMode(true);
  };

  const updateActions = (updatedAction) => {
    let actionsCopy = [...actions];
    const updatedActionIndex = actions.findIndex( el => el.id === updatedAction.id);
    actionsCopy[updatedActionIndex] = updatedAction;
    setActions(actionsCopy);
  }

  const finishTimer = () => {
    setStatus(false);
    console.log(seconds);
    setTimerMode(false);
    setCurrentAction({...currentAction, lengthInSecs: (currentAction.lengthInSecs + seconds)});
    setSeconds(0);
  };
  //because useState kind of updates the value after re-render or sth? I had to use useEffect for updating my actions array
  //I dunno if I did it correctly though, gotta watch out for it 
  useEffect(() => {
    updateActions(currentAction);
  }, [currentAction]);

  return (
    <div>
      {currentAction && (
      <CurrentActionText variant={currentAction.text.length > 30 ? 'h5' : 'h4'} >{currentAction.text}</CurrentActionText>
      )}
      {timerMode && (<Typography variant="h3" align="center" style={{ margin: 8 }}>
        {/* this % is modulo and it lets us show only the rest of what's left when dividing by 60 */}
        {("0" + Math.floor(seconds / 3600)).slice(-2)}:
        {("0" + Math.floor((seconds / 60) % 60)).slice(-2)}:
        {("0" + (seconds % 60)).slice(-2)}
      </Typography>)
}
      <TimerButtons>
        {status === false ? (
          <TimerButton handleClick={() => startTimer()}>
            {seconds === 0 ? "Start" : "Resume"}
          </TimerButton>
        ) : (
          <TimerButton handleClick={() => setStatus(false)}>Pause</TimerButton>
        )}
        {seconds !== 0 && (
          <TimerButton handleClick={() => finishTimer()}>Finish</TimerButton>
        )}
      </TimerButtons>
    </div>
  );
}

export default Timer;
