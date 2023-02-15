import { SxProps } from '@mui/system';

export const title: SxProps = {
  textAlign: 'center',
  fontWeight: '600',
  padding: '1rem'
};

export const page: SxProps = {};

export const columnTitle: SxProps = {
  fontWeight: '700'
};

export const cardDetails: SxProps = {
  textAlign: 'center',
  fontWeight: '700'
};

export const profileCard: SxProps = {
  textAlign: 'center',
  fontWeight: '700'
};

export const cardSubTitle: SxProps = {
  textAlign: 'center'
};

export const buttonTableRoot: SxProps = {
  marginTop: '1rem'
};

export const buttonTable: SxProps = {
  backgroundColor: '#01506f'
};

export const tableRoot: SxProps = {
  minHeight: '28rem'
};

export const table: SxProps = {
  minWidth: 650,
  minHeight: '28rem',
  '& .MuiTableCell-root': {
    borderLeft: '1px solid #E0E0E0',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0'
  }
};
