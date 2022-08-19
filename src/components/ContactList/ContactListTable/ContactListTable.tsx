import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

interface Column {
  id: 'name' | 'surname' | 'age';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Имя', minWidth: 170 },
  { id: 'surname', label: 'Фамилия', minWidth: 100 },
  {
    id: 'age',
    label: 'Возраст',
    minWidth: 170,
    align: 'right',
  },
];

interface IContactListTable {
  contactListData: {
    id: string;
    name: string;
    surname: string;
    age: number;
  }[];
}

const ContactListTable = ({ contactListData }: IContactListTable) => {
  const addContact = () => {};
  const editContact = (id: string) => {};
  const deleteContact = (id: string) => {};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right" style={{ minWidth: 170 }}>
                <IconButton color="primary" onClick={addContact}>
                  <Tooltip title="Добавить">
                    <AddBoxIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactListData.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right" className="actions">
                    <IconButton
                      color="success"
                      onClick={() => editContact(row.id)}
                    >
                      <Tooltip title="Изменить">
                        <EditIcon fontSize="medium" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteContact(row.id)}
                    >
                      <Tooltip title="Удалить">
                        <DeleteIcon fontSize="medium" />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ContactListTable;