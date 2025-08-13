// sections
import { Metadata } from 'next';
import { RenderEmployeesListView } from 'src/sections/manage-account/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <RenderEmployeesListView/>;
}
