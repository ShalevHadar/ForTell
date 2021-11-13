import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Moment from "react-moment";
import { Box } from "@mui/system";

const URL = `http://localhost:3030/api/items`;

export default function Items() {
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

  const fetchItems = () => {
    axios
      .get(URL, {
        validateStatus: (status) => {
          return status < 400;
        },
      })
      .then((res) => {
        setItems(res.data);
      });
  };

  const handleCick = (item) => {
    axios
      .patch(`${URL}/${item._id}`, { item })
      .then(fetchItems())
      .then(setFlag);
  };

  useEffect(() => {
    fetchItems();
  }, [flag]);

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Current Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cotent</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Class</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) =>
              item.isDone ? null : (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.content}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.currClass}</TableCell>
                  <TableCell align="right">
                    <Moment format="lll">{item.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleCick(item)}
                    >
                      Done
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Typography variant="h4" gutterBottom component="div">
        Done Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cotent</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Class</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) =>
              item.isDone ? (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.content}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.currClass}</TableCell>
                  <TableCell align="right">
                    <Moment format="lll">{item.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#6166B3" }}
                      onClick={() => handleCick(item)}
                    >
                      Restore
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
