import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: {
    template: 'Render Health',
    default: 'Render Health',
  },
};

const Layout = ({ children }: LayoutProps) => <>{children}</>;

export default Layout;
