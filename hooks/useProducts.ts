'use client';

import { useContext } from 'react';
import { useProducts as useProductsContext } from '@/contexts/ProductContext';

// Re-export useProducts hook
export const useProducts = useProductsContext;
