import React, { useState } from "react";
import "./App.css";
import { CssBaseline, Tab, Tabs, AppBar, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BottomAppBar from "./components/BottomAppBar";

function App() {
  // state variables
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <div role="tabpanel" hidden={currentTab !== 0}>
        <Typography variant="h3" align="center" style={{ margin: 8 }}>
          Here will prolly by the timer
        </Typography>
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
