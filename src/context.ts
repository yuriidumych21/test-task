import { createContext } from 'react';
import { ContextType } from './interfaces';

export const Context = createContext<ContextType | null>(null);
