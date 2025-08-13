// sections
import { Metadata } from 'next';
import { AppointmentListView } from 'src/sections/appointment/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <AppointmentListView />;
}
