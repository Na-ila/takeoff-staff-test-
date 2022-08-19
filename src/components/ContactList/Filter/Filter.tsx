import React from 'react';

import { setFilters } from '../../../store/lkSlice';
import { useAppDispatch } from '../../../hooks/hooks';

import SplitBtn from './SplitBtn';
import TextField from '@mui/material/TextField';

const Filter = () => {
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = React.useState('name');
  const [text, setText] = React.useState('');
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      dispatch(
        setFilters({
          field: selectedFilter,
          text: text,
        })
      );
    }, 500);
  }, [text, selectedFilter, dispatch]);

  return (
    <div className="filterContainer">
      <SplitBtn setSelectedFilter={setSelectedFilter} />
      <TextField
        id="outlined-basic"
        label="Поиск"
        variant="outlined"
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textField"
      />
    </div>
  );
};

export default Filter;
