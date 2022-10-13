import React, { Component } from 'react';
import styles from '../../styles/TextPages.module.scss';
import Form from '../../components/proposals/Form/Form';
import { InfoCards } from '../../components/proposals/InfoCards/InfoCards';
import { Proposal, ProposalsState } from '../../models/Proposal.interface';

class Proposals extends Component<Record<string, never>, ProposalsState> {
  state = {
    proposals: [],
  };

  addProposal(proposal: Proposal) {
    this.setState((prevState: ProposalsState) => ({
      proposals: [...prevState.proposals, { ...proposal, id: prevState.proposals.length }],
    }));
  }

  render() {
    return (
      <>
        <h2 className={styles.heading}>Dear buyer!</h2>
        <p className={styles.text}>
          If you did not find the product you are looking for, please fill out the form below. We
          will definitely contact you.
        </p>
        <Form addProposal={this.addProposal.bind(this)} />
        <InfoCards proposals={this.state.proposals} />
      </>
    );
  }
}

export default Proposals;
