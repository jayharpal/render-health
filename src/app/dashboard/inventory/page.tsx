// sections
import { Metadata } from 'next';
import { InventoryListView } from 'src/sections/inventory/view';
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <InventoryListView />;
}
