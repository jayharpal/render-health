// sections
import { Metadata } from 'next';
import { EnrolleeListView } from 'src/sections/hmo/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <EnrolleeListView />;
}
