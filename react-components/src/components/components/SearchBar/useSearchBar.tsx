import { ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from 'react';
import { Context } from '../../AppContext/Context';
import { AppActionTypes } from '../../../models/AppState';
import items from '../../../assets/source/items.json';
import { Item } from '../../../models/Item.interface';

const useSearchBar = (initialValue: string) => {
  const { dispatch } = useContext(Context);
  const [value, setValue] = useState<string>(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event?.target;

    if (value !== input.value) {
      setValue(input.value);
    }
  };

  const onClick: MouseEventHandler = () => {
    setValue('');
  };

  useEffect(() => {
    dispatch({
      type: AppActionTypes.SET_COMPONENTS_VALUE,
      payload: [
        ...items.filter(
          (item: Item) => !value || item.model.toLowerCase().includes(value.toLowerCase())
        ),
      ],
    });
    localStorage.setItem('value', value);

    if (!localStorage.getItem('value')) {
      localStorage.removeItem('value');
    }
  }, [value]);

  return { value, onChange, onClick };
};

export default useSearchBar;
