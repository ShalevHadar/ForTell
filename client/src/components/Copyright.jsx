import { Link, Typography } from "@mui/material";
import React from "react";

export default function Copyright() {
  let myYear = new Date().getFullYear();

  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        style={{
          backgroundColor: "#DED9C4",
          fontSize: "20px",
          color: "white",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          padding: "20px",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        {`Copyright © Shalev Hadar ${myYear}`}
      </Typography>
    );
  }

  return <div>{Copyright()}</div>;
}
