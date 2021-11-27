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

// now it's working v3
export function IncidentTable({
  items,
  handleItemClick,
  title,
  btnColor,
  btnLabel,
}) {
  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        {title}
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
            {items.map((item) => (
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
                    color={btnColor}
                    onClick={() => handleItemClick(item)}
                  >
                    {btnLabel}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
