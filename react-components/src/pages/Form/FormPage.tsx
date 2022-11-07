import React from 'react';
import styles from '../../styles/TextPages.module.scss';
import Form from '../../components/form/Form/Form';
import { InfoCards } from '../../components/form/InfoCards/InfoCards';

const FormPage = () => {
  return (
    <>
      <h2 className={styles.heading}>Dear buyer!</h2>
      <p className={styles.text}>
        If you did not find the product you are looking for, please fill out the form below. We will
        definitely contact you.
      </p>
      <Form />
      <InfoCards />
    </>
  );
};

export default FormPage;
