// sections
import { Metadata } from 'next';
import PendingWithdrawalRequestsListView from 'src/sections/savings-card/view/pending-withdrawal-requests-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <PendingWithdrawalRequestsListView />;
}
