// sections
import { Metadata } from 'next';
import { OverdraftsListView } from 'src/sections/savings-card/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <OverdraftsListView />;
}
