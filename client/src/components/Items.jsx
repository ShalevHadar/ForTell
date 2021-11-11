import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Items() {
  const [items, setItem] = useState([]);

  useEffect(() => {
    const URL = `http://localhost:3030/api/items`;
    axios
      .get(URL, {
        validateStatus: (status) => {
          return status < 400;
        },
      })
      .then((res) => {
        setItem(res.data);
        console.log(items);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cotent</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {items.map((item) => (
            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>{item.content}</TableCell>
            <TableCell align="right">{item.name}</TableCell>
            <TableCell align="right">{item.createdAt}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
