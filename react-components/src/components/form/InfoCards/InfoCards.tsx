import React from 'react';
import styles from './InfoCards.module.scss';
import { InfoCard } from '../InfoCard/InfoCard';
import { Proposal } from '../../../models/Proposal.interface';
import { useSelector } from 'react-redux';
import { State } from '../../../store/store';

export const InfoCards = () => {
  const proposals = useSelector((state: State) => state.form.proposals);

  return (
    <section className={styles.infoCards}>
      <div>
        {proposals &&
          proposals.map((proposal: Proposal) => (
            <InfoCard
              key={proposal.id}
              image={proposal.image}
              name={proposal.name}
              dateOfBirth={proposal.dateOfBirth}
              deliveryTerm={proposal.deliveryTerm}
              email={proposal.email}
              color={proposal.color}
              price={proposal.price}
              suctionPower={proposal.suctionPower}
              cleaningType={proposal.cleaningType}
            />
          ))}
      </div>
    </section>
  );
};
