'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { RootState, useSelector } from 'src/redux/store';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import InternNewEditForm from '../intern-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function InternEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { interns } = useSelector((state: RootState) => state.interns);

  const currentIntern = interns.find((user) => user._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Intern',
            href: paths.dashboard.intern.root,
          },
          { name: currentIntern?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InternNewEditForm currentIntern={currentIntern as any} />
    </Container>
  );
}
