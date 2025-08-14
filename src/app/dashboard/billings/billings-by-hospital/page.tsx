// sections
import { Metadata } from 'next';
import { BillingByHospitalListView } from 'src/sections/billings/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <BillingByHospitalListView />;
}
