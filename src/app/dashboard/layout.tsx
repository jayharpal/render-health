
import { Metadata } from 'next';
import MainLayout from './main-layout';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | TOFORZERO',
    default: 'TOFORZERO',
  },
  description:
    'Efficient project management with our intuitive taskboard. Organize tasks, collaborate seamlessly & boost productivity. Try today!',
  keywords:
    'task, project, management, collaboration, productivity, tool, app, tracker, organizer, kanban, board, workflow, teamwork, planner, agile, schedule, prioritization, progress, dashboard, admin, organization, planning, coordination, assignment, scheduling, project management, task tracking, team coordination, online taskboard, task assignment, task scheduling, project teamwork, agile task, kanban board, productivity app, collaboration tool, task organizer',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

export default function Layout({ children }: Props) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
