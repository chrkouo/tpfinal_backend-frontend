import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import axios from "axios";
import { useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Quests from "./Quests";
import AddQuests from "./AddQuests";

const MainPage = (props) =>{
  const {token} = props
  const [level, setLevel] = useState(0);
  let oneLevel = Math.floor(level/100);
  const navigate = useNavigate();
  const f = async () => {
    try {
      const result = await axios({
        method: "get",
        url: "http://localhost:3001/me",
        headers: {
          Authorization: "BEARER " + token,
        },
      });
      console.log(result.data)
      setLevel(result.data.xp);
    } catch (e) {
      console.log(e);
    }
  };
  f();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${250}px)`, ml: `${250}px` }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main Page
          </Typography>
          <Button color="inherit">Level : {oneLevel} </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            key={"AddQuests"}
            onClick={() => navigate("addQuests")}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"AddQuests"} />
          </ListItem>
          <ListItem button key={"Quests"} onClick={() => navigate("quests")}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Quests"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        <Routes>
          <Route path="/addQuests" element={<AddQuests token={token}  />} />
          <Route path="/quests" element={<Quests  token={token} />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default MainPage;
