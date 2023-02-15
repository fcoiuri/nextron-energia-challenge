import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Stack
} from '@mui/material/';
import { DataContext } from 'contexts';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  subHeaderCard,
  cardHeader,
  accountTime,
  profilePicture,
  addressInfo,
  addressDetails,
  infoTitles
} from './ProfileCard.style';
import { differenceOfDays } from '_utils/differenceOfDays';
import { CardLink } from '../CardLink';

interface ProfileCardProps {
  customerProp: any;
  editUser?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  customerProp,
  editUser
}) => {
  const { state } = React.useContext(DataContext);
  const { session, loading, error, customer } = state;
  const router = useRouter();

  return (
    <CardLink customerID={customerProp?.customerID!} editUser={editUser}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={cardHeader}
      >
        <CardHeader
          avatar={
            <Avatar sx={profilePicture} aria-label="recipe">
              {session.user?.name!.toString().charAt(0) ||
                customer.customer?.name?.charAt(0)}
            </Avatar>
          }
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1">
            {customerProp.name || customer.customer?.name}
          </Typography>
        </Grid>
      </Grid>

      <CardContent>
        <Stack direction="row" alignItems="center" gap={1}>
          <EmailIcon />
          <Typography variant="body2">
            {customerProp.email || customer.customer?.email}
          </Typography>
        </Stack>
        <Grid sx={subHeaderCard}>
          <Stack direction="row" alignItems="center" gap={1}>
            <LocalPhoneIcon />
            <Typography variant="body2">
              {customerProp.telephone || customer.customer?.telephone}
            </Typography>
          </Stack>
        </Grid>

        <Grid sx={accountTime}>
          <Stack direction="row" alignItems="center" gap={1}>
            <AccessTimeIcon />
            <Typography variant="body1">
              Account age:&nbsp;
              <React.Fragment>
                {differenceOfDays(
                  customerProp.registration_time ||
                    customer.customer?.registration_time
                )}
                &nbsp;days
              </React.Fragment>
            </Typography>
          </Stack>
        </Grid>
        <Grid sx={addressInfo}>
          <Grid sx={addressDetails}>
            <Stack direction="row" alignItems="center" gap={1}>
              <PersonPinCircleIcon />
              <Typography sx={infoTitles}>Address</Typography>
            </Stack>
          </Grid>
          <Grid sx={addressDetails}>
            <Stack direction="row" alignItems="center" gap={1}>
              <PublicIcon />
              <Typography variant="body2">
                {customerProp.Location?.country ||
                  customer.customer?.Location?.country}
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={addressDetails}>
            <Stack direction="row" alignItems="center" gap={1}>
              <HomeIcon />
              <Typography variant="body2">
                {customerProp.Location?.street1 ||
                  customer.customer?.Location?.street1}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </CardLink>
  );
};
