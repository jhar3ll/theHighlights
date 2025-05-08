import { createContext } from 'react';
import { AdminContextType } from '../data/types';

export const AdminContext = createContext<AdminContextType|null>(null);