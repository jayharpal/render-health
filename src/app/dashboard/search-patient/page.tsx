// sections
import { Metadata } from 'next';
import SearchPatientListView from 'src/sections/search-patient/search-patient-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <SearchPatientListView />;
}
