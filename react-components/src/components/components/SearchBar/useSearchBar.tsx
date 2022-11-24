import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import items from '../../../assets/source/items.json';
import { Item } from '../../../models/components/Item.interface';
import { setComponents } from '../../../redux/slices/componentsSlice';
import { useAppDispatch } from '../../../redux/hooks';

const useSearchBar = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const dispatch = useAppDispatch();

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
    dispatch(
      setComponents([
        ...items.filter(
          (item: Item) => !value || item.model.toLowerCase().includes(value.toLowerCase())
        ),
      ])
    );

    localStorage.setItem('value', value);

    if (!localStorage.getItem('value')) {
      localStorage.removeItem('value');
    }
  }, [value]);

  return { value, onChange, onClick };
};

export default useSearchBar;
