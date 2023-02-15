import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Link,
  CssBaseline,
  Typography,
  TextField,
  Button
} from '@mui/material/';
import { DataContext } from 'contexts';

export default function registerCard() {
  const router = useRouter();
  const {
    state,
    fetchPostPaymentMethods,

    fetchPaymentMethods
  } = React.useContext(DataContext);
  const { postPaymentMethods, loading, error, session, login, customer } =
    state;

  const [emailValue, setEmailValue] = React.useState('');
  const [expiryMonthValue, setExpiryMonthValue] = React.useState('');
  const [cardBinValue, setCardBinValue] = React.useState('');
  const [cardLastFourValue, setCardLastFourValue] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [expiryYearValue, setExpiryYearValue] = React.useState('');
  const [eWalletValue, setEWalletValue] = React.useState('');
  const [nameOnCardValue, setNameOnCardValue] = React.useState('');
  const [addressValue, setAddressValue] = React.useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleCardBin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardBinValue(e.target.value);
  };

  const handleCardLastFour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardLastFourValue(e.target.value);
  };

  const handleExpiryMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryMonthValue(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);
  };

  const handleExpiryYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryYearValue(e.target.value);
  };

  const handleEWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEWalletValue(e.target.value);
  };

  const handleNameOnCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOnCardValue(e.target.value);
  };

  React.useEffect(() => {
    if (!login.success) {
      router.replace('/login');
    }
  }, [login.success, session.success, router.isReady, router.push]);

  React.useEffect(() => {
    if (postPaymentMethods.paymentID !== undefined) {
      router.push(`/customer/details/${customer.customer?.customerID}`);

      fetchPaymentMethods(customer.customer?.customerID);
    }
  }, [postPaymentMethods.paymentID]);

  const handleSubmit = async () => {
    fetchPostPaymentMethods(
      { country: countryValue, street1: addressValue },
      customer.customer?.customerID,
      cardBinValue,
      cardLastFourValue,
      Number(expiryMonthValue),
      Number(expiryYearValue),
      eWalletValue,
      nameOnCardValue
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Register Card
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                fullWidth
                id="firstName"
                label="Card Bin Digits"
                autoFocus
                value={cardBinValue}
                onChange={handleCardBin}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Card Last Four Digits"
                name="lastName"
                value={cardLastFourValue}
                onChange={handleCardLastFour}
                autoComplete="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                value={emailValue}
                onChange={handleEmail}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="telephone"
                label="Expiry Month"
                type="telephone"
                id="telephone"
                autoComplete="telephone"
                value={expiryMonthValue}
                onChange={handleExpiryMonth}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="address"
                label="Expiry Year"
                type="address"
                id="address"
                autoComplete="address"
                value={expiryYearValue}
                onChange={handleExpiryYear}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Name on Card"
                type="address"
                id="address"
                autoComplete="address"
                value={nameOnCardValue}
                onChange={handleNameOnCard}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="country"
                label="Country"
                type="country"
                id="country"
                autoComplete="country"
                value={countryValue}
                onChange={handleCountry}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="country"
                label="EWallet"
                type="country"
                id="country"
                autoComplete="country"
                value={eWalletValue}
                onChange={handleEWallet}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
                autoComplete="address"
                value={addressValue}
                onChange={handleAddress}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            Register Card
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() =>
                  router.push(
                    `/customer/details/${customer.customer?.customerID}`
                  )
                }
                variant="body2"
              >
                Click here to go back
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div className="message">{error}</div>
    </Container>
  );
}
