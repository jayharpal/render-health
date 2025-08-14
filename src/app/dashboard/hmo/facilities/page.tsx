// sections
import { Metadata } from 'next';
import { FacilitiesListView } from 'src/sections/hmo/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <FacilitiesListView />;
}
