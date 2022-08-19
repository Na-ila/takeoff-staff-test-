import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchContactList } from '../../store/lkSlice';

import ContactListTable from './ContactListTable';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const { contactListData } = useAppSelector((state) => state.lkSlice);

  React.useEffect(() => {
    dispatch(fetchContactList());
  }, [dispatch]);

  return (
    <div>
      <ContactListTable contactListData={contactListData.data} />
    </div>
  );
};

export default ContactList;
