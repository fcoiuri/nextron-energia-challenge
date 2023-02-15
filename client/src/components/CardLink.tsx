import * as React from 'react';
import { Card } from '@mui/material/';
import { useRouter } from 'next/router';
import { card } from 'components/ProfileCard/ProfileCard.style';
import { DataContext } from 'contexts';

interface CardLinkProps {
  children?: React.ReactNode;
  customerID: number;
  editUser?: boolean;
}

export const CardLink: React.FC<CardLinkProps> = ({
  children,
  customerID,
  editUser
}) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const { state } = React.useContext(DataContext);
  const { customer } = state;

  return editUser ? (
    <Card
      sx={card}
      onClick={() => {
        router.push(`/customer/details/${customerID}`);
      }}
    >
      {children}
    </Card>
  ) : (
    <Card
      sx={card}
      onClick={() => {
        router.push(`/customer/edit/${customer.customer?.customerID}`);
      }}
    >
      {children}
    </Card>
  );
};
