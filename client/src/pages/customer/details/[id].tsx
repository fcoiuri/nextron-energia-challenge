import * as React from 'react';
import {
  TableHead,
  Box,
  Grid,
  Button,
  Collapse,
  Typography,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  IconButton
} from '@mui/material/';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { monthName } from '_utils/monthName';
import { DataContext } from 'contexts';
import { ProfileCard } from 'components/ProfileCard';
import { useRouter } from 'next/router';
import {
  title,
  page,
  columnTitle,
  table,
  cardDetails,
  profileCard,
  cardSubTitle,
  tableRoot,
  buttonTable,
  buttonTableRoot
} from './customerDetails.style';

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

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">
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
        <TableCell align="center">*****{row.cardLastFour}</TableCell>
        <TableCell align="center">{row.nameOnCard}</TableCell>
        <TableCell align="center">{row.BillingAddress.country}</TableCell>
        <TableCell align="center">
          {new Date(row.registration_time).toLocaleString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={cardDetails}
                variant="h6"
                gutterBottom
                component="div"
              >
                Card Details
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={columnTitle} align="center">
                      Card bin
                    </TableCell>
                    <TableCell sx={columnTitle} align="center">
                      Expiry month
                    </TableCell>
                    <TableCell sx={columnTitle} align="center">
                      Expiry year
                    </TableCell>
                    <TableCell sx={columnTitle} align="center">
                      Address
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {row.cardBin}
                    </TableCell>
                    <TableCell align="center">
                      {monthName(row.expiryMonth)}
                    </TableCell>
                    <TableCell align="center">{row.expiryYear}</TableCell>
                    <TableCell align="center">
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

export default function customerDetails() {
  const { state, fetchPaymentMethods, fetchGetCustomer } =
    React.useContext(DataContext);
  const { paymentMethods, loading, error, customer, session, login } = state;
  const router = useRouter();
  const { id } = router.query;
  let idValue = id;

  React.useEffect(() => {
    if (router.isReady) {
      fetchPaymentMethods(parseInt(idValue?.toString()!));
    }
  }, [router.isReady, customer?.customer?.customerID]);

  React.useEffect(() => {
    if (router.isReady) {
      fetchGetCustomer(id);
    }
  }, [router.isReady]);

  React.useEffect(() => {
    if (!login.success) {
      router.replace('/login');
    }
  }, [customer.customer, router]);

  return (
    <React.Fragment>
      <Button onClick={() => router.replace('/session')} variant="contained">
        Voltar
      </Button>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={page}
      >
        <Grid item xs={5} sm={6} md={3} lg={4} xl={4}>
          <Typography variant="h5" sx={title}>
            Customer Information
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={profileCard}
          >
            <ProfileCard customerProp={customer} />
          </Grid>
        </Grid>
        <Grid item xs={7} sx={tableRoot}>
          <Typography variant="h5" sx={title}>
            Card(s) Information
          </Typography>
          {paymentMethods.payments ? (
            <React.Fragment>
              <TableContainer component={Box}>
                <Table aria-label="collapsible table" sx={table}>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={columnTitle} align="center">
                        Type
                      </TableCell>
                      <TableCell sx={columnTitle} align="center">
                        Details
                      </TableCell>
                      <TableCell sx={columnTitle} align="center">
                        Name on card
                      </TableCell>
                      <TableCell sx={columnTitle} align="center">
                        Country
                      </TableCell>
                      <TableCell sx={columnTitle} align="center">
                        Registration Time
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentMethods.payments! &&
                      Object.entries(paymentMethods.payments!).map(
                        ([key, subject], i) => (
                          <Row key={i} row={[key, subject][1]} />
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={buttonTableRoot}
              >
                <Button
                  sx={buttonTable}
                  variant="contained"
                  onClick={() => router.push('/registerCard')}
                >
                  register card
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={cardSubTitle} variant="h6">
                No card registered.
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={() => router.push('/registerCard')}
                  variant="contained"
                >
                  register card
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <div className="message">{error}</div>
    </React.Fragment>
  );
}
