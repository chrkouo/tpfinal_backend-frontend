import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import  Button  from "@mui/material/Button";

function Quests(props) {
  const {token} = props ;
  const [quest, setQuest] = useState();
  let {complete} = useParams();
  const f = async () => {
    try {
      const questRequest = await axios({
        method: "get",
        url: "http://localhost:3001/quests",
        headers: {
          Authorization: "BEARER " + token ,
        }
      });
       setQuest(questRequest.data);
    } catch (e) {
      console.log(e);
    }
  };
  f();
 
  const useHandleSubmit = (event) => {
    event.preventDefault();
    complete = quest._id;
    //const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    useEffect(() => {
      const f = async() => {
        const completeRequest = await axios({
          method: "post",
          url: "http://localhost:3001/complete/" + complete,
          headers: {
            Authorization: "BEARER " + token ,
          },
        });
         console.log(completeRequest.data);
    };
    f();
  }, []);
  };


  let myQuest = quest.forEach((a) =><Paper
  elevation={10}
  sx={{
    padding: "15px",
    heigth: "400px",
  }}
> <Typography variant="h5">{a.name}</Typography>
  <Typography variant="h6">level {a.level}</Typography>
  <Typography variant="h6">Complete for {a.completionXp}</Typography>
  <Button onSubmit={useHandleSubmit} noValidate >COMPLETE</Button></Paper>);
  return (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      <Box>
        {myQuest}
      </Box>
    </Paper>
  );
}

export default Quests;
