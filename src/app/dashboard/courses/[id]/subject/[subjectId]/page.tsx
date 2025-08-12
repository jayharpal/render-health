import React from 'react';
import { ChapterView } from 'src/sections/course/view';
// sections

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Subject',
};

type Props = {
  params: {
    id: string;
    subjectId: string;
  };
};

export default function SubjectPage({ params }: Props) {
  const { subjectId, id } = params;

  return <ChapterView courseId={id} subjectId={subjectId} />;
}
