import * as React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {  Grid,  Typography } from "@mui/material";

export default function Thank() {
  const handleSubmit = () => {
    console.log("yo");
  };
  return (
    <form onSubmit={() => handleSubmit()}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
      >
        <Typography
          style={{ paddingBottom: "20px" }}
          variant="h5"
          gutterBottom
          component="div"
        >
          {<CheckCircleIcon />} Thank you !
        </Typography>
        <div>
        <Typography
          style={{ paddingBottom: "20px" }}
          variant="h5"
          gutterBottom
          component="div"
        >
           Your post will be review by the superviser.
        </Typography>
        </div>
      </Grid>
    </form>
  );
}
