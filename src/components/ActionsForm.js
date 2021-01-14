import React, { useState, useRef } from "react";
import {
  Select,
  FormControl,
  Button,
  MenuItem,
  InputLabel,
  Fab,
  TextField,
  FormHelperText
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

function ActionsForm({ actions, setActions }) {
  //controling the opening of our select. I control the text field with ref and focus
  const [openSelect, setOpenSelect] = useState(false);
  //With this I'll set the action to be connected to the timer
  const [selectAction, setSelectAction] = useState("");
  const [textFieldAction, setTextFieldAction] = useState("");
  //errors
  const [selectErrors, setSelectErrors] = useState(false);
  const [textFieldErrors, setTextFieldErrors] = useState(false);

  const handleOpenSelect = () => {
    setOpenSelect(true);

  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleSelectChange = (event) => {
    setSelectAction(event.target.value);
    setSelectErrors(false)
  };

  const handleTextFieldChange = (event) => {
    setTextFieldAction(event.target.value);
    setTextFieldErrors(false)
  };

  const handleSelectSubmit = (event) => {
    console.log(selectAction);
    if(selectAction === '') {
        setSelectErrors(true)
    } else {
        setSelectAction('');
    }
  };
  const handleTextFieldSubmit = (event) => {
    console.log(textFieldAction);
    if(textFieldAction.replace(/\s/g, '') === '') {
        setTextFieldErrors(true);
        setTextFieldAction('');
    } else {
        setActions([...actions, textFieldAction]);
        setTextFieldAction('');
    }
  };

  const handleOpenTextField = () => {
    textInput.current.focus();
  };

  //I had to use useRef in order to be able to focus properly on the text field when clicking on its label button
  let textInput = useRef(null);

  return (
    <div>
      {/* the button is outside of the form because for whatever reason, it messes up the inputLabel */}
      <Button onClick={handleOpenSelect}>Select an action</Button>
      {/* this style to be deleted later */}
        <FormControl onSubmit={handleSelectSubmit} style={{ width: "70%" }}>
        {/* ----------------------------- select section ----------------------------- */}

        <InputLabel id="demo-simple-select-filled-label">
          Pick an existing action...
        </InputLabel>
        <Select
          open={openSelect}
          value={selectAction}
          onClose={handleCloseSelect}
          onOpen={handleOpenSelect}
          onChange={handleSelectChange}
          variant="filled"
          error={selectErrors}
        >
          {/* those are hard-coded for now, I'll change that later */}
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {selectErrors && <FormHelperText>this field cannot be empty</FormHelperText>}
        <Fab type="submit" aria-label="add" onClick={handleSelectSubmit}>
          <AddIcon fontSize="large" />
        </Fab>
      </FormControl>


      {/* -------------------------- end of select section, start of text field section ------------------------- */}
      <Button onClick={() => handleOpenTextField()}>Or create a new one</Button>
      <FormControl
        style={{ width: "70%" }}
        onSubmit={handleTextFieldSubmit}
      >
        <TextField
          label="create a new action"
          variant="filled"
          inputRef={textInput}
          id="textfield"
          helperText={textFieldErrors && "this field cannot be empty"}
          onChange={handleTextFieldChange}
          error={textFieldErrors}
          value={textFieldAction}
        />
        <Fab type="submit" aria-label="add" onClick={handleTextFieldSubmit}>
          <AddIcon fontSize="large" />
        </Fab>
      </FormControl>
    </div>
  );
}

export default ActionsForm;
