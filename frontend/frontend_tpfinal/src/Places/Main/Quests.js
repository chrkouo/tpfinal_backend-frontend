import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

function Quests(props) {
  const { token } = props;
  const [quest, setQuest] = useState([]);
  let { questId } = useParams();
  const f = async () => {
    try {
      const questRequest = await axios({
        method: "get",
        url: "http://localhost:3001/quests",
        headers: {
          Authorization: "BEARER " + token,
        },
      });
      setQuest(questRequest.data);
    } catch (e) {
      console.log(e);
    }
  };
  f();

  const HandleSubmit = (id) => {
    questId = id;
    //const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    useEffect(() => {
      const completeRequest = axios({
        method: "post",
        url: `http://localhost:3001/complete/:${questId}`,
        headers: {
          Authorization: "BEARER " + token,
        },
      });
      console.log(completeRequest.status);
    }, []);
  };

  const myQuest = quest.map((a) => (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      {" "}
      <Typography variant="h6">{a.name}</Typography>
      <Typography>level {a.level}</Typography>
      <Typography>Complete for {a.completionXp} xp</Typography>
      <Button onSubmit={() => HandleSubmit(a._id)} noValidate>
        COMPLETE
      </Button>
    </Paper>
  ));
  return (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      <Box>
        <Typography variant="h5">To complete</Typography>
        {myQuest}
        <Typography variant="h5">Complete</Typography>
      </Box>
    </Paper>
  );
}

export default Quests;
