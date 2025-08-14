// sections
import { Metadata } from 'next';
import { ViewAllBillingsListView } from 'src/sections/billings/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <ViewAllBillingsListView />;
}
