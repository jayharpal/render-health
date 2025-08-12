import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

// locales
import { LocalizationProvider } from 'src/locales';
// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
// sections
// import { CheckoutProvider } from 'src/sections/checkout/context';
// auth
import { AuthProvider } from 'src/auth/context/jwt';
// import { AuthProvider } from 'src/auth/context/auth0';
// import { AuthProvider } from 'src/auth/context/amplify';
// import { AuthProvider } from 'src/auth/context/firebase';
// import { AuthProvider } from 'src/auth/context/supabase';
import ClientLayoutProviders from './layoutClientProvider';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// export const metadata = {
//   title: 'Project List | TOFORZERO',
//   description:
//     'Efficient project management with our intuitive taskboard. Organize tasks, collaborate seamlessly & boost productivity. Try today!',
//   keywords: 'task, project, management, collaboration, productivity, tool, app, tracker, organizer, kanban, board, workflow, teamwork, planner, agile, schedule, prioritization, progress, dashboard, admin, organization, planning, coordination, assignment, scheduling, project management, task tracking, team coordination, online taskboard, task assignment, task scheduling, project teamwork, agile task, kanban board, productivity app, collaboration tool, task organizer',
//   themeColor: '#000000',
//   manifest: '/manifest.json',
//   icons: [
//     {
//       rel: 'icon',
//       url: '/favicon/favicon.ico',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '16x16',
//       url: '/favicon/favicon-16x16.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '32x32',
//       url: '/favicon/favicon-32x32.png',
//     },
//     {
//       rel: 'apple-touch-icon',
//       sizes: '180x180',
//       url: '/favicon/apple-touch-icon.png',
//     },
//   ],
// };

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                      <ClientLayoutProviders>
                        <SettingsDrawer />
                        <ProgressBar />
                        {children}
                      </ClientLayoutProviders>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
