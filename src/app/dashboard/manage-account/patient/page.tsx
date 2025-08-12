// sections
import { Metadata } from 'next';
import { ManageMembersListView } from 'src/sections/manage-account/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <ManageMembersListView />;
}
