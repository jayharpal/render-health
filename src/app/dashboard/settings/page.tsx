// sections
import { Metadata } from 'next';
import { SettingsView } from 'src/sections/settings/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <SettingsView />;
}
