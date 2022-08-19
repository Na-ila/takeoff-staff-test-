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
  const [age, setAge] = React.useState<number>(1);
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [surnameError, setSurnameError] = React.useState<boolean>(false);
  const [ageError, setAgeError] = React.useState<boolean>(false);

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

  const createContact = () => {
    if (!name) {
      setNameError(true);
    } else if (!surname) {
      setSurnameError(true);
    } else if (!age) {
      setAgeError(true);
    } else {
      const contact = {
        id: modalWindow.id,
        name,
        surname,
        age,
      };

      dispatch(
        setContactListData({
          ...contactListData,
          data: [contact, ...contactListData.data],
        })
      );

      dispatch(
        setModalWindow({
          open: false,
          type: '',
          id: '',
        })
      );
    }
  };

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
        onChange={(e) => {
          setNameError(false);
          setName(e.target.value);
        }}
        className="textField"
        error={nameError}
      />
      <TextField
        id="outlined-basic"
        label="Фамилия"
        variant="outlined"
        size="small"
        value={surname}
        onChange={(e) => {
          setSurnameError(false);
          setSurname(e.target.value);
        }}
        className="textField"
        error={surnameError}
      />
      <TextField
        id="outlined-basic"
        label="Возраст"
        variant="outlined"
        size="small"
        value={age}
        type="number"
        onChange={(e) => {
          setAgeError(false);
          setAge(+e.target.value);
        }}
        className="textField"
        error={ageError}
        InputProps={{ inputProps: { min: 1, max: 100 } }}
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
