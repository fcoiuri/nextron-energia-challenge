import React from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from '_utils/utils';
import { DataContext } from 'contexts';
import { Box, Grid, Typography, Button } from '@mui/material/';
import { ProfileCard } from 'components/ProfileCard';
import {
  cardStyle,
  titleCustomers,
  buttonAdd,
  subTitle,
  cardGrid
} from './index.style';

export default function Session() {
  const router = useRouter();
  const { state, fetchSession, fetchGetCustomers } =
    React.useContext(DataContext);
  const { session, loading, error, customers, login } = state;

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  React.useEffect(() => {
    fetchSession();
  }, []);

  React.useEffect(() => {
    if (!login.success) {
      router.push('/login');
    }
  }, [login.success, session.success, router.isReady, router.push]);

  React.useEffect(() => {
    fetchGetCustomers();
  }, []);

  const handleAddCustomer = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push('/customer/addCustomer');
  };

  return (
    <React.Fragment>
      <div className="message">{loading ? 'fetching details..' : error}</div>
      <h1>Welcome, {session.user! && session.user?.name}</h1>
      <Grid sx={titleCustomers}>
        <Typography variant="h5">All Customers</Typography>
        <Typography variant="h6" sx={subTitle}>
          To see the data of a customer just click on the card of the customer
          you want
        </Typography>
        <Button onClick={handleAddCustomer} sx={buttonAdd} variant="contained">
          Add Customer
        </Button>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" sx={cardGrid}>
        {customers.customers &&
          Object.entries(customers.customers).map(([key, subject], i) => (
            <Grid
              sx={cardGrid}
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={3}
              lg={4}
              xl={4}
            >
              <Box sx={cardStyle}>
                <ProfileCard
                  editUser
                  key={i}
                  customerProp={[key, subject][1]}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}
