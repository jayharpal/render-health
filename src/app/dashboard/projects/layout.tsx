import { Metadata } from 'next';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | Render Health',
    default: 'Project',
  },
};

const Layout = ({ children }: LayoutProps) => <>{children}</>;

export default Layout;
