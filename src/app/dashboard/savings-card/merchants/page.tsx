// sections
import { Metadata } from 'next';
import { DealListView } from 'src/sections/manage-account/view';
import { MerchantsListView } from 'src/sections/savings-card/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <MerchantsListView />;
}
