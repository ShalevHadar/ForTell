import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <AppBar position="fixed" align="center">
        <Toolbar>
        
          <Typography m={2} t={3} variant="h6" color="inherit" noWrap>
          <Link to="">
            <Button color="inherit" style={{ textTransform: "none" }}>
              Home
            </Button>
            </Link>
            <Link to="items">
            <Button color="inherit" style={{ textTransform: "none" }}>
              Items
            </Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
