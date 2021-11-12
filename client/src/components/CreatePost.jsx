import * as React from "react";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Fab, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function CreatePost() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh" }}
    >
    <Typography style={{paddingBottom:"20px"}} variant="h5" gutterBottom component="div">{<LiveHelpIcon/>} Please Tell Me What happend</Typography>
      <Grid item xs={3}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField fullWidth label="Name" id="fullWidth" sx={{ mb: 3 }} />
          <TextField fullWidth label="Text" id="fullWidth" multiline rows={6} required/>
        </Box>
        <Box
        style={{paddingTop:"20px"}}
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Fab variant="extended" sx={{ mb: 3 }} color="secondary" value="name">
            <AddBoxTwoToneIcon sx={{ mr: 1 }} />
            ADD Post
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}
