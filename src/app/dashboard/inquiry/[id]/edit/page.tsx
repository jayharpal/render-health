'use client';

// hooks
import { useParams } from 'src/routes/hook';
// sections
import React, { useEffect, useState } from 'react';
import { InquiryEditView } from '../../../../../sections/inquiry/view';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Inquiry Edit | Render Health',
// };

export default function UserEditPage() {
  const [inquiryId, setInquiryId] = useState<string>();
  const router = useParams();

  useEffect(() => {
    const { id } = router;
    setInquiryId(id as string);
  }, [router]);

  return <InquiryEditView id={inquiryId as string} />;
}
