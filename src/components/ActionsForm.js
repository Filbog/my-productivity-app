import React, { useState, useRef, Fragment } from "react";
import {
  Select,
  FormControl,
  Button,
  MenuItem,
  InputLabel,
  Fab,
  TextField,
  FormHelperText,
} from "@material-ui/core";

import styled from "styled-components";
//uuid for generating random IDs
import { v4 as uuidv4 } from 'uuid';

import AddIcon from "@material-ui/icons/Add";
// const MyFab = styled(Fab)`
//   background-color: ${props => props.disabled && '#e91e63 !important'};
// `;

const StyledActionForm = styled.div`
  display: ${props => props.hidden === true ? 'hidden' : 'flex'};
  flex-direction: column;
  align-items: center;

`;

const StyledFormControl = styled(FormControl)`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  & > * {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

const StyledSelect = styled(Select)`
  width: 100%;
`

function ActionsForm({ actions, setActions, timerMode, setCurrentAction, currentAction }) {
  //controling the opening of our select. I control the text field with ref and focus
  const [openSelect, setOpenSelect] = useState(false);
  //With this I'll set the action to be connected to the timer
  const [selectAction, setSelectAction] = useState("");
  const [textFieldAction, setTextFieldAction] = useState("");
  //errors
  const [selectErrors, setSelectErrors] = useState(false);
  const [textFieldErrors, setTextFieldErrors] = useState(false);
  const textFieldErrorsContent = {empty: 'this field cannot be empty', tooManyChars: 'maximum number of characters is 40', alreadyExists: 'this action already exists!'}
  //toggler showing Fab either for select or text field
  const [toggleFabs, setToggleFabs] = useState(true);
  
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleSelectChange = (event) => {
    setSelectAction(event.target.value);
    setSelectErrors(false);
    setToggleFabs(true);
  };

  const handleTextFieldChange = (event) => {
    setTextFieldAction(event.target.value);
    setTextFieldErrors(false);
    setToggleFabs(false)
  };

  const handleSelectSubmit = (event) => {
    console.log(selectAction);
    if (selectAction === "") {
      setSelectErrors(true);
    } else {
      let selectedIndex = actions.findIndex(el => el.text === selectAction);
      setCurrentAction(actions[selectedIndex]);
      setSelectAction("");

    }
  };
  const handleTextFieldSubmit = (event) => {
    console.log(textFieldAction);
    //if it's empty
    if (textFieldAction.replace(/\s/g, "") === "") {
      setTextFieldErrors(1);
      setTextFieldAction("");
      //if it's too long
    } else if(textFieldAction.length > 40) {
      setTextFieldErrors(2);
       //if what we've introduced in the textfield matches an existing action
    } else if(actions.find(action => action.text.replace(/\s/g, "").toLowerCase() === textFieldAction.replace(/\s/g, "").toLowerCase())){
      setTextFieldErrors(3);
    } else {
      //if no errors, creating a new action
      const newAction = {text: textFieldAction, id: uuidv4(), lengthInSecs: 0};
      //adding it to the existing array
      setActions([...actions, newAction]);
      //setting it as a current action in the timer
      setCurrentAction(newAction);
      //clearing the field
      setTextFieldAction("");
    }
  };

  const handleOpenTextField = () => {
    textInput.current.focus();
  };

  //I had to use useRef in order to be able to focus properly on the text field when clicking on its label button
  let textInput = useRef(null);

  return (
    <StyledActionForm hidden={timerMode}>
      {/* the button is outside of the form because for whatever reason, it messes up the inputLabel */}
      <Button onClick={() => {handleOpenSelect(); setToggleFabs(true)}}>Select existing action</Button>
     <Fragment>
      <StyledFormControl onSubmit={handleSelectSubmit}>
        {/* ----------------------------- select section ----------------------------- */}

        <InputLabel id="demo-simple-select-filled-label">
          Pick an action...
        </InputLabel>
        <StyledSelect
          open={openSelect}
          value={selectAction}
          onClose={handleCloseSelect}
          onOpen={() => {handleOpenSelect(); setToggleFabs(true)}}
          onChange={handleSelectChange}
          variant="filled"
          error={selectErrors}
        >
          {/* those are hard-coded for now, I'll change that later */}
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          {actions.map(action => (
            <MenuItem value={action.text} key={action.id}>{action.text}</MenuItem>
          ))}
        </StyledSelect>
        {selectErrors && (
          <FormHelperText>this field cannot be empty</FormHelperText>
        )}
        <Fab
          type="submit"
          aria-label="add"
          color="secondary"
          onClick={handleSelectSubmit}
          disabled={!toggleFabs}
          size={!toggleFabs ? 'small' : 'large'}
        >
          <AddIcon fontSize="large" />
        </Fab>
      </StyledFormControl>
      </Fragment>
      {/* -------------------------- end of select section, start of text field section ------------------------- */}
      <Button onClick={() => {handleOpenTextField(); setToggleFabs(false)}}>Or create a new one</Button>
      <StyledFormControl onSubmit={handleTextFieldSubmit}>
        <TextField
          label="create a new action"
          variant="filled"
          inputRef={textInput}
          id="textfield"
          helperText={textFieldErrors && (textFieldErrors === 1 ? textFieldErrorsContent.empty : textFieldErrors === 2 ? textFieldErrorsContent.tooManyChars : textFieldErrorsContent.alreadyExists)}
          onChange={handleTextFieldChange}
          onClick={() => setToggleFabs(false)}
          error={textFieldErrors}
          value={textFieldAction}
        />
        <Fab
          type="submit"
          aria-label="add"
          onClick={handleTextFieldSubmit}
          color="secondary"
          disabled={toggleFabs}
          size={toggleFabs ? 'small' : 'large'}
        >
          <AddIcon fontSize="large" />
        </Fab>
      </StyledFormControl>
    </StyledActionForm>
  );
}

export default ActionsForm;
