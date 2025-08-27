// sections
import { Metadata } from 'next';
import { FacilityDashboardList } from 'src/sections/facility-dashboard/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Facility Dashboard",
};

export default function DashboardPage() {
  return <FacilityDashboardList />;
}
