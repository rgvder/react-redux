import { setupServer } from 'msw/node';
import { handlersCharacters } from './handlers';

export const server = setupServer(...handlersCharacters);
