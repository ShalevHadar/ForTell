import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
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

const URL = `http://localhost:3030/api/items`;

export default function Items() {
  const [items, setItem] = useState([]);

  const fetchItems = () => {
    axios
    .get(URL, {
      validateStatus: (status) => {
        return status < 400;
      },
    })
    .then((res) => {
      setItem(res.data);
    });
  }

  useEffect(() => {
    fetchItems()
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Current Tasks
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cotent</TableCell>
              <TableCell align="right">Name</TableCell>
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
                  <TableCell align="right">
                    <Moment format="lll">{item.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">
                  <Button variant="contained" color="success">Done</Button>
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
        Done Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cotent</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) =>
              item.isDone ? (<TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.content}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    <Moment format="lll">{item.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="right">
                  <Button variant="contained" color="error">Restore</Button>
                  </TableCell>
                </TableRow>) : null )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
    </>
  );
}
