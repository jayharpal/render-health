'use client';

import React from 'react'
import { AuthGuard } from 'src/auth/guard'
import DashboardLayout from 'src/layouts/dashboard'

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => (
    <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
)

export default MainLayout