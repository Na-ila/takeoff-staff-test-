import Alert, { AlertProps } from '@mui/material/Alert';

interface IAlert {
  text: string;
  severity: AlertProps['severity'];
}

const AlertMessage = ({ text, severity }: IAlert) => {
  return <Alert severity={severity}>{text}</Alert>;
};

export default AlertMessage;
