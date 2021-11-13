import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Thank() {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('../createPost');
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
      >
      <Grid item>
        <Typography style={{ paddingBottom: "20px" }} variant="h5" gutterBottom>
          {<CheckCircleIcon />} Thank you !
        </Typography>
        
          <Typography
            style={{ paddingBottom: "20px" }}
            variant="h5"
            gutterBottom
          >
            Your post will be review by the superviser.
          </Typography>
          <Button onClick={() => handleClick()}>
            Post Another Request
          </Button>
        
        </Grid>
      </Grid>
    </>
  );
}
