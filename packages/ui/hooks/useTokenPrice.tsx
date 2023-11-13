'use client';

import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

interface TokenPriceResponse {
  price: number;
  token: string;
  icon: string;
  name: string;
}

// Global context setup
const initialState: {
  state: TokenPriceResponse[];
} | null = null;

const TokenPriceContext = createContext<
  | {
      state: any;
      dispatch: React.Dispatch<{ type: any; payload: any }>;
    }
  | undefined
>(undefined);

const tokenPriceReducer = (
  state: any,
  action: { type: any; payload: TokenPriceResponse[] },
) => {
  switch (action.type) {
    case 'UPDATE_TOKEN_PRICE':
      return { ...state, tokenPrice: action.payload };
    default:
      return state;
  }
};

const TokenPriceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tokenPriceReducer, initialState);

  return (
    <TokenPriceContext.Provider value={{ state, dispatch }}>
      {children}
    </TokenPriceContext.Provider>
  );
};

const useTokenContext = () => {
  const context = useContext(TokenPriceContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenPriceProvider');
  }
  return context;
};

// Custom hook for fetching token price
const fetchTokenPrice = async () => {
  const response = await fetch('http://localhost:8000/api/v1/price/SOL');
  const { result } = await response.json();
  return result;
};

const useTokenPrice = () => {
  const { state, dispatch } = useTokenContext();

  const { error } = useQuery<TokenPriceResponse[]>({
    queryKey: ['tokenPrice'],
    queryFn: fetchTokenPrice,
    refetchInterval: 5000,
    onSuccess: (data) => {
      // Update the global context with the fetched token price
      dispatch({ type: 'UPDATE_TOKEN_PRICE', payload: data });
    },
  });

  return { tokenPrice: state.tokenPrice, error };
};

export { TokenPriceProvider, useTokenPrice };
