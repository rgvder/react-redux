import { Proposal } from './Proposal.interface';

export type FormProps = {
  addProposal: (proposal: Proposal) => void;
};

export interface FormState {
  form: {
    name: boolean;
    dateOfBirth: boolean;
    image: boolean;
    email: boolean;
    color: boolean;
    price: boolean;
    suctionPower: boolean;
    cleaningType: boolean;
  };
  alert: boolean;
}
