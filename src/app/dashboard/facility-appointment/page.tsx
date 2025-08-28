// sections
import { Metadata } from 'next';
import { FacilityAppointmentListView } from 'src/sections/facility-appointment/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Facility Dashboard",
};

export default function DashboardPage() {
  return <FacilityAppointmentListView />;
}
