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

export default function addCustomer() {
  const router = useRouter();
  const { state, fetchPostCustomers } = React.useContext(DataContext);
  const { postCustomers, loading, error, session, login } = state;

  const [emailValue, setEmailValue] = React.useState('');
  const [telephoneValue, setTelephoneValue] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [addressValue, setAddressValue] = React.useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(e.target.value);
  };

  const handleTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephoneValue(e.target.value);
  };

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };

  React.useEffect(() => {
    if (!login.success) {
      router.push('/login');
    }
  }, [login.success, session.success, router.isReady, router.push]);

  React.useEffect(() => {
    if (postCustomers.customerID!) {
      router.push('/session');
    }
  }, [postCustomers.customerID!]);

  const handleSubmit = async () => {
    fetchPostCustomers(
      emailValue,
      `${firstNameValue} ${lastNameValue}`,
      telephoneValue,
      { country: countryValue, street1: addressValue }
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
          Create Customer
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={firstNameValue}
                onChange={handleFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastNameValue}
                onChange={handleLastName}
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
                label="Telephone"
                type="telephone"
                id="telephone"
                autoComplete="telephone"
                value={telephoneValue}
                onChange={handleTelephone}
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
            Create Customer
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => router.push('/session')} variant="body2">
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
