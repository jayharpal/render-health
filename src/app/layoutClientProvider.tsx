'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../redux/store';

type Props = {
  children: React.ReactNode;
};

export default function ClientLayoutProviders({ children }: Props) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
