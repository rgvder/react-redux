export interface Proposal {
  name: string;
  dateOfBirth: string;
  image: string | FileList;
  email: string;
  deliveryTerm: 'Very fast' | 'Fast' | 'Not mentioned';
  color: string[];
  price: string;
  suctionPower: string;
  cleaningType: string;
  disabledButton?: boolean;
  submit?: boolean;
  id?: number;
}

export type ProposalsState = Proposal[];
