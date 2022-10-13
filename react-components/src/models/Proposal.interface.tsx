export interface Proposal {
  name: string;
  dateOfBirth: string;
  image?: string;
  email?: string;
  deliveryTerm?: 'Very fast' | 'Fast' | 'Not mentioned';
  color?: string[];
  price?: string;
  suctionPower?: string;
  cleaningType?: string;
  disabledButton?: boolean;
  id?: number;
}

export type ProposalsState = {
  proposals: Proposal[];
};
