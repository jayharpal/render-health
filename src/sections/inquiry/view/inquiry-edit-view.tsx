'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useState } from 'react';
import { getInquiry } from 'src/redux/slices/inquiry';
import { IInquiry } from 'src/types/inquiry';
import { LoadingScreen } from 'src/components/loading-screen';
import InquiryNewEditForm from '../inquiry-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function InquiryEditView({ id }: Props) {
  const dispatch = useDispatch();
  const { inquirys, isLoading } = useSelector((state: RootState) => state.inquiry);
  const [currentInquiry, setCurrentInquiry] = useState<IInquiry>({
    _id: '',
    skills: [],
    is_deleted: false,
    mobile_no: '',
    email: '',
    name: '',
    availability: '',
    status: '',
    role_preference: '',
    experience: '',
    dob: '',
    additional_information: '',
    updatedAt: '',
    createdAt: '',
    __v: 0,
  });

  useEffect(() => {
    dispatch(getInquiry());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = useSettingsContext();

  useEffect(() => {
    const ci = inquirys.find((inquiry) => inquiry._id === id);
    if (ci) {
      setCurrentInquiry(ci);
    }
  }, [inquirys, id]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Edit"
            links={[
              {
                name: 'Dashboard',
                href: paths.dashboard.root,
              },
              {
                name: 'inquiry',
                href: paths.dashboard.inquiry.root,
              },
              { name: currentInquiry?.name },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <InquiryNewEditForm currentInquiry={currentInquiry} />
        </Container>
      )}
    </>
  );
}
