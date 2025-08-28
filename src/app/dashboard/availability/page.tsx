// sections
import { Metadata } from 'next';
import { AvailabilityListView } from 'src/sections/availability/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <AvailabilityListView />;
}
