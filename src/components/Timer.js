import React, { useEffect, useState } from "react";

import { Typography, Button } from "@material-ui/core";

function Timer({ seconds, setSeconds, status, setStatus }) {
    //had to put the interval counter in state bc it's the only way it works and I can actually stop it from counting when toggling status XD
    const [myInterval, setMyInterval] = useState(null);

  useEffect(() => {
    if (status === true) {
      setMyInterval(setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000));
    } else {
        clearInterval(myInterval);
  
    }
  }, [status]);
  const startTimer = () => {
    setStatus(true);
  };

  const finishTimer = () => {
    setStatus(false);
    console.log(seconds);
    setSeconds(0)
  };

  return (
    <div>
      <Typography variant="h3" align="center" style={{ margin: 8 }}>
          {/* this % is modulo and it lets us show only the rest of what's left when dividing by 60 */}
       {('0' + Math.floor(seconds / 3600)).slice(-2)}:
       {('0' + Math.floor((seconds / 60) % 60)).slice(-2)}:
       {('0' + seconds % 60).slice(-2)}
      </Typography>
      {status === false ? (
        <Button
          viariant="contained"
          color="primary"
          onClick={() => setStatus(true)}
        >
          {seconds === 0 ? 'Start' : 'Resume'}
        </Button>
      ) : (
        <Button onClick={() => setStatus(false)}>Pause</Button>
      )}
      {seconds !== 0 && (
          <Button onClick={() => finishTimer()}>Finish</Button>
      )}
    </div>
  );
}

export default Timer;
