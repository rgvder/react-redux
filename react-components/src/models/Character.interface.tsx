interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  name: string;
  image: string;
  status: 'Dead' | 'Alive' | 'unknown';
  created: string;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  episode: string[];
  id: number;
}
