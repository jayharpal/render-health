import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: {
    template: '%s | TOFORZERO',
    default: 'Inquiry',
  },
};

const Layout = ({ children }: LayoutProps) => <>{children}</>;

export default Layout;
