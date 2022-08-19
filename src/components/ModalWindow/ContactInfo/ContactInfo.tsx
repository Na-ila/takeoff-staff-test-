import React from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { setContactListData, setModalWindow } from '../../../store/lkSlice';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface IContactInfo {
  type: 'create' | 'edit';
}

const ContactInfo = ({ type }: IContactInfo) => {
  const dispatch = useAppDispatch();
  const { contactListData, modalWindow } = useAppSelector(
    (state) => state.lkSlice
  );

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [age, setAge] = React.useState<number>(0);

  React.useEffect(() => {
    if (type === 'edit') {
      const contact = contactListData.data.filter(
        (item) => item.id === modalWindow.id
      )[0];

      setName(contact.name);
      setSurname(contact.surname);
      setAge(contact.age);
    }
  }, [contactListData.data, modalWindow.id, type]);

  const createContact = () => {};

  const editContact = () => {
    const contact = {
      id: modalWindow.id,
      name,
      surname,
      age,
    };
    const index = contactListData.data.findIndex(
      (item) => item.id === modalWindow.id
    );

    dispatch(
      setContactListData({
        ...contactListData,
        data: [
          ...contactListData.data.slice(0, index),
          contact,
          ...contactListData.data.slice(index + 1),
        ],
      })
    );

    dispatch(
      setModalWindow({
        open: false,
        type: '',
        id: '',
      })
    );
  };

  return (
    <div className="contactInfo">
      <TextField
        id="outlined-basic"
        label="Имя"
        variant="outlined"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="textField"
      />
      <TextField
        id="outlined-basic"
        label="Фамилия"
        variant="outlined"
        size="small"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="textField"
      />
      <TextField
        id="outlined-basic"
        label="Возраст"
        variant="outlined"
        size="small"
        value={age}
        type="number"
        onChange={(e) => setAge(+e.target.value)}
        className="textField"
      />
      <Button
        variant="contained"
        onClick={type === 'create' ? createContact : editContact}
      >
        {type === 'create' ? 'Создать' : 'Редактировать'}
      </Button>
    </div>
  );
};

export default ContactInfo;
