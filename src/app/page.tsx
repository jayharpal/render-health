'use client';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Minimal: The starting point for your next project',
// };

export default function HomePage() {
  return (
    <GuestGuard>
      <AuthClassicLayout>
        {' '}
        <JwtLoginView />
      </AuthClassicLayout>
    </GuestGuard>
  );
}
