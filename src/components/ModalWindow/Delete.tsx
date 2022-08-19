import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setModalWindow, setContactListData } from '../../store/lkSlice';

import Button from '@mui/material/Button';

const Delete = () => {
  const dispatch = useAppDispatch();
  const { contactListData, modalWindow } = useAppSelector(
    (state) => state.lkSlice
  );
  const deleteContact = () => {
    dispatch(
      setContactListData({
        ...contactListData,
        data: contactListData.data.filter((item) => item.id !== modalWindow.id),
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

  const closeModal = () =>
    dispatch(
      setModalWindow({
        open: false,
        type: '',
        id: '',
      })
    );
  return (
    <div>
      <h3>Вы уверены, что хотите удалить контакт ?</h3>
      <p>Данное действие нельзя будет отменить </p>
      <div className="modalDeleteBtnGroup">
        <Button variant="contained" onClick={deleteContact}>
          Удалить
        </Button>
        <Button variant="contained" onClick={closeModal}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default Delete;
