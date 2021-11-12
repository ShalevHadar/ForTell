import * as React from "react";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Autocomplete, Fab, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const teachers = [
    { label: "Doron Freeman", teacher_id: 1 },
    { label: "Avi Ron", teacher_id: 2 },
    { label: "Shlomi At", teacher_id: 3 },
    { label: "Ben Shelo", teacher_id: 4 },
    { label: "Itay Yafti", teacher_id: 5 },
  ];

  const classes = [
    { label: "First Grade", class_id: 1 },
    { label: "Second Grade", class_id: 2 },
    { label: "Third Grade", class_id: 3 },
    { label: "Fourth Grade", class_id: 4 },
    { label: "Fifth Grade", class_id: 5 },
    { label: "Sixth Grade", class_id: 6 },
    { label: "Seventh Grade", class_id: 7 },
    { label: "Eighth Grade", class_id: 8 },
  ];

  const [data, setData] = React.useState({ name: "", class: "", teacher:"", text: "" });
  console.log(data);
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("../thank");
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
          style={{ paddingBottom: "10px" }}
          variant="h5"
          gutterBottom
          component="div"
        >
          {<LiveHelpIcon />} Please Tell Me What happend
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mb: 2, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined"
            label="Name"
            sx={{ mb: 2 }}
            value={data.name}
            onChange={(e) => setData({ name: e.target.value })}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={classes}
            renderInput={(params) => <TextField {...params} label="Classess *" />}
          />
        </Box>
        <Grid item xs={3}>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={teachers}
              sx={{ width: 500, mb: 3 }}
              renderInput={(params) => (
                <TextField {...params} label="Teachers *" />
              )}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Text"
              id="fullWidth"
              multiline
              rows={6}
              required
            />
          </Box>
          <Box
            style={{ paddingTop: "20px" }}
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <Fab
              variant="extended"
              sx={{ mb: 3 }}
              color="secondary"
              value="name"
              type="submit"
            >
              <AddBoxTwoToneIcon sx={{ mr: 1 }} />
              ADD Post
            </Fab>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
