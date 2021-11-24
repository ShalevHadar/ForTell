import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("token");
    navigate('./')
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: "#FFBF86" }}>
        <Toolbar>
          <Typography sx={{ pb: 1 }}>
            <SportsKabaddiIcon /> Violence Reporting
          </Typography>
          <Typography m={2} t={3} variant="h6" color="inherit" noWrap>
            <Link style={{ color: "white" }} to="">
              <Button style={{ color: "white", textTransform: "none" }}>
                Login
              </Button>
            </Link>
            <Link style={{ color: "white" }} to="items">
              <Button
                color="inherit"
                style={{ color: "white", textTransform: "none" }}
              >
                Items
              </Button>
            </Link>
           
          </Typography>
          
          {/* help */}
          <Button style={{ float: "right" }} onClick={() => handleLogout()}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
