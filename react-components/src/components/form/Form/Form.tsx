import React, { useEffect } from 'react';
import { Proposal } from '../../../models/form/Proposal.interface';

import styles from './Form.module.scss';
import { FieldError, useForm } from 'react-hook-form';
import useAlert from './useAlert';

import { setFormValue, setProposalValue } from '../../../redux/slices/formSlice';
import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const Form = () => {
  const dispatch = useAppDispatch();
  const proposals = useAppSelector((state: RootState) => state.form.proposals);
  const form = useAppSelector((state: RootState) => state.form.form);

  const { alert, showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, submitCount, isValid, isSubmitSuccessful },
  } = useForm<Proposal>();

  const addErrorMes: (registerName: FieldError | undefined, errorText?: string) => JSX.Element = (
    registerName: FieldError | undefined,
    errorText = ''
  ) => (
    <div className={styles.error}>{registerName && `* The field is required. ${errorText}`}</div>
  );

  const toggleDisabled: (isDirty: boolean, isValid: boolean, submitCount: number) => boolean = (
    isDirty: boolean,
    isValid: boolean,
    submitCount: number
  ) => {
    if (!isDirty) {
      return true;
    }

    return !!submitCount && !isValid;
  };

  const onSubmit = (proposal: Proposal) => {
    const url: string =
      typeof proposal.image === 'string' ? proposal.image : URL.createObjectURL(proposal.image[0]);

    dispatch(setProposalValue([...proposals, { ...proposal, image: url, id: proposals.length }]));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      showAlert();
      reset();
    }
  }, [isSubmitSuccessful]);

  const setValues = () => {
    const {
      name,
      dateOfBirth,
      email,
      image,
      price,
      suctionPower,
      color,
      cleaningType,
      deliveryTerm,
    } = form;

    setValue('name', name);
    setValue('dateOfBirth', dateOfBirth);
    setValue('email', email);
    setValue('price', price);
    setValue('suctionPower', suctionPower);
    setValue('image', image);
    setValue('color', color);
    setValue('cleaningType', cleaningType);
    setValue('deliveryTerm', deliveryTerm);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value) {
        dispatch(setFormValue(value as Proposal));
      }
    });
    setValues();

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <label className={`${styles.label} ${styles.text}`}>
        Name:
        <input
          className={styles.input}
          {...register('name', {
            required: true,
            minLength: 2,
            pattern: /^[a-zа-я ]+$/gim,
          })}
          type="text"
          autoComplete="off"
          data-testid="name"
        />
      </label>
      {addErrorMes(errors.name, 'Name must contain more than 2 letters.')}
      <label className={`${styles.label} ${styles.text}`}>
        Date of birth:
        <input
          className={styles.input}
          {...register('dateOfBirth', {
            required: true,
            max: '2004-01-01',
          })}
          max="2004-01-01"
          type="date"
          data-testid="date"
        />
      </label>
      {addErrorMes(errors.dateOfBirth)}
      <label className={`${styles.label} ${styles.text}`}>
        Email:
        <input
          className={styles.input}
          {...register('email', {
            required: true,
            minLength: 2,
            pattern:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
          })}
          type="text"
          autoComplete="off"
          data-testid="email"
        />
      </label>
      {addErrorMes(errors.email, 'The data you entered is not in the right format.')}
      <label className={`${styles.label} ${styles.text}`}>
        Price limit in rub:
        <input
          className={styles.input}
          {...register('price', {
            required: true,
            min: 1,
          })}
          type="number"
          min="1"
        />
      </label>
      {addErrorMes(errors.price)}
      <label className={`${styles.label} ${styles.text}`}>
        Suction power in watts:
        <input
          className={styles.input}
          {...register('suctionPower', {
            required: true,
            min: 1,
          })}
          type="number"
          min="1"
        />
      </label>
      {addErrorMes(errors.suctionPower)}
      <fieldset>
        <legend className={`${styles.legend} ${styles.text}`}>Cleaning type:</legend>
        <div className={styles.wrapper}>
          {['dry', 'dry and wet'].map((value) => (
            <label className={styles.label} key={value}>
              <input
                type="radio"
                value={value}
                {...register('cleaningType', {
                  required: true,
                })}
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      {addErrorMes(errors.cleaningType)}
      <fieldset>
        <legend className={`${styles.legend} ${styles.text}`}>Color:</legend>
        <div className={styles.wrapper}>
          {['black', 'white', 'blue', 'red', 'grey'].map((value) => (
            <label className={styles.label} key={value}>
              <input
                type="checkbox"
                data-testid={value}
                value={value}
                {...register('color', {
                  required: true,
                })}
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      {addErrorMes(errors.color as FieldError)}

      <fieldset>
        <legend className={styles.text}>Delivery term:</legend>
        <select
          {...register('deliveryTerm', {
            required: true,
          })}
        >
          <option defaultValue="Not mentioned" value="Not mentioned">
            Not mentioned
          </option>
          <option value="Very fast">Very fast</option>
          <option value="Fast">Fast</option>
        </select>
      </fieldset>
      {addErrorMes(errors.deliveryTerm)}
      <fieldset>
        <label className={styles.text}>Upload sample product</label>
        <input
          {...register('image', {
            required: true,
          })}
          type="file"
          id="image"
        />
      </fieldset>
      {addErrorMes(errors.image)}
      <input
        className="button button_filters"
        disabled={toggleDisabled(isDirty, isValid, submitCount)}
        type="submit"
        value="Send"
        data-testid="submit"
      />
      <div className={`text ${styles.alert} ${alert ? styles.active : ''}`}>
        Your data has been saved
      </div>
    </form>
  );
};

export default Form;
