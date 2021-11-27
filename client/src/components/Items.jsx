import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCookies } from "react-cookie";
import { IncidentTable } from "./IncidentTable";

const URL = `http://localhost:3030/api/items`;

export default function Items() {
  const [cookies, ,] = useCookies(["token"]);

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const deleteAll = () => {
    axios
      .delete(URL)
      .catch((e) => console.log(e.message))
      .then(console.log("all was deleted"))
      .then(setFlag);
  };

  const fetchItems = useCallback(() => {
    axios
      .get(URL, {
        validateStatus: (status) => {
          return status < 400;
        },
        headers: { "x-access-token": cookies.token },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => console.log(e.message));
  }, [cookies.token]);

  const handleClick = (item) => {
    axios
      .patch(
        `${URL}/${item._id}/status`,
        { item },
        { headers: { "x-access-token": cookies.token } }
      )
      .then(fetchItems())
      .then(setFlag);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems, flag]);

  return (
    <>
      <IncidentTable
        items={items.filter((item) => item.isDone === false)}
        handleItemClick={handleClick}
        title="Pending Incidents"
        btnLabel="done"
      />

      <br />
      <br />

      <IncidentTable
        items={items.filter((item) => item.isDone === true)}
        handleItemClick={handleClick}
        title="Completed Incidents"
        btnLabel="restore"
        btnColor="secondary"
      />

      <Box sx={{ mx: "auto", p: 1, m: 1, mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleClickOpen}
        >
          Delete all Done Requests
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete all Requests??"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you will decide to delete all task, the action cannot be
              reveresed ! be carefull before using this option.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                handleClose();
                deleteAll();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <br />
      <br />
    </>
  );
}

//item.isDone ? true : false;
