// sections
import { Metadata } from 'next';
import { RecordViewListView } from 'src/sections/health-record/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <RecordViewListView />;
}
