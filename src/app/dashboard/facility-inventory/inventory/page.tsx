// sections
import { Metadata } from 'next';
import { FacilityInventoryListView } from 'src/sections/facility-inventory/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <FacilityInventoryListView />;
}
