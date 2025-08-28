// sections
import { Metadata } from 'next';
import PharmacyView from 'src/sections/pharmacy/pharmacy-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Facility Dashboard",
};

export default function DashboardPage() {
  return <PharmacyView />;
}
