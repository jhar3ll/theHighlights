import { createContext } from 'react';
import { AdminContextType, ServiceContextType } from '../data/types';

export const AdminContext = createContext<AdminContextType|null>(null);
export const ServiceContext = createContext<ServiceContextType|null>(null);