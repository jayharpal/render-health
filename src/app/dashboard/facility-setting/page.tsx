// sections
import { Metadata } from 'next';
import { FacilitySettingsView } from 'src/sections/facility-setting/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <FacilitySettingsView />;
}
