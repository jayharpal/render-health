import { Metadata } from 'next';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | TOFORZERO',
    default: 'Interns',
  },
};

const Layout = ({ children }: LayoutProps) => <>{children}</>;

export default Layout;
