import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link  } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <AppBar position="fixed" align="center" style={{backgroundColor: '#FFBF86'}}>
        <Toolbar>
          <Typography m={2} t={3} variant="h6" color="inherit" noWrap>
          <Link style={{color:"white"}} to="">
            <Button  style={{color:"white", textTransform: "none" }}>
              Home
            </Button>
            </Link>
            <Link style={{color:"white"}} to="login">
            <Button  style={{color:"white", textTransform: "none" }}
  
            >
              Login
            </Button>
            </Link>
            <Link style={{color:"white"}} to="items">
            <Button color="inherit" style={{color:"white", textTransform: "none" }}>
              Items
            </Button>
            </Link>
            <Link style={{color:"white"}} to="createPost">
            <Button color="inherit" style={{color:"white", textTransform: "none" }}>
              CreatePost
            </Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
