
import { Metadata } from 'next';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | TOFORZERO',
    default: 'Community',
  },
};


export default function Layout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
