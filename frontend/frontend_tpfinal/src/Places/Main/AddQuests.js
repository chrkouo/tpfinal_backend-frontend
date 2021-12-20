import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";


function AddQuests (props)  {
   const {token} = props ;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const f = async () => {
      try {
        const questRequest = await axios({
          method: "post",
          url: "http://localhost:3001/quests",
          headers: {
            Authorization: "BEARER " + token ,
          },
          data: {
            name: data.get("name"),
            level: data.get("level"),
            completionXp: data.get("completionXp"),
          },
        });
         console.log(questRequest.data);
      } catch (e) {
        console.log(e);
      }
    };
    f();
  };
  return (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      <Typography variant="h5">Add Quest</Typography>
      <Box
        component="form" 
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
         
        />

        <TextField
          required
          sx={{ m: 1, width: "65ch" }}
          id="level"
          label="Level"
          name="level"
          autoComplete="level"
          defaultValue = "0"
          autoFocus
        />
        <TextField
          required
          sx={{ m: 1, width: "65ch" }}
          id="completionXp"
          label="CompletionXp"
          name="completionXp"
          autoComplete="completionXp"
          defaultValue = "0"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          ADD
        </Button>
      </Box>
    </Paper>
  );
}

export default AddQuests;
