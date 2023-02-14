import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material/";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { monthName } from "../../_utils/monthName";
import { DataContext } from "../../contexts";
import { getPaymentMethods } from "../../contexts/actions/payments";

function createData(
  methodType: string,
  cardLastFour: string,
  BillingAddress: {
    country: string;
    street1: string;
  },
  nameOnCard: string,
  registration_time: string,
  cardBin: string,
  expiryMonth: number,
  expiryYear: number
) {
  return {
    methodType,
    cardLastFour,
    BillingAddress,
    nameOnCard,
    registration_time,
    cardBin,
    expiryMonth,
    expiryYear
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.methodType}
        </TableCell>
        <TableCell align="right">*****{row.cardLastFour}</TableCell>
        <TableCell align="right">{row.nameOnCard}</TableCell>
        <TableCell align="right">{row.BillingAddress.country}</TableCell>
        <TableCell align="right">{row.registration_time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Card bin</TableCell>
                    <TableCell align="center">Expiry month</TableCell>
                    <TableCell align="center">Expiry year</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.cardBin}
                    </TableCell>
                    <TableCell align="center">
                      {monthName(row.expiryMonth)}
                    </TableCell>
                    <TableCell align="center">{row.expiryYear}</TableCell>
                    <TableCell align="right">
                      {row.BillingAddress.street1}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const Dashboard: React.FC = () => {
  const { state, fetchPaymentMethods } = React.useContext(DataContext);
  const { paymentMethods, loading, error } = state;

  React.useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Type</TableCell>
            <TableCell align="right">Details</TableCell>
            <TableCell align="right">Name on card</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Registration Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentMethods.payments?.map((row: any) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
