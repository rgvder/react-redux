import React, { useState } from 'react';
import styles from '../../styles/TextPages.module.scss';
import Form from '../../components/form/Form/Form';
import { InfoCards } from '../../components/form/InfoCards/InfoCards';
import { Proposal, ProposalsState } from '../../models/Proposal.interface';

const useForm = () => {
  const [proposals, setProposals] = useState<ProposalsState>([]);

  const addProposal: (proposal: Proposal) => void = (proposal: Proposal) => {
    setProposals([...proposals, { ...proposal, id: proposals.length }]);
  };

  return { proposals, addProposal };
};

const FormPage = () => {
  const { proposals, addProposal } = useForm();

  return (
    <>
      <h2 className={styles.heading}>Dear buyer!</h2>
      <p className={styles.text}>
        If you did not find the product you are looking for, please fill out the form below. We will
        definitely contact you.
      </p>
      <Form addProposal={addProposal} />
      <InfoCards proposals={proposals} />
    </>
  );
};

export default FormPage;
