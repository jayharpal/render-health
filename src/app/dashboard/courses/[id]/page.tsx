import React from 'react';
import { SubjectView } from 'src/sections/course/view';
// sections

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Subject',
};

type Props = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: Props) {
  const { id } = params;

  return <SubjectView courseId={id} />;
}
