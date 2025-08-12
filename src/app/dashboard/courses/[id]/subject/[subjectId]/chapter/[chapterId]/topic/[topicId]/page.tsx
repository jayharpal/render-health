import React from 'react';
import { TopicDetailsView } from 'src/sections/course/view';
// sections

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Topic',
};

type Props = {
  params: {
    id: string;
    subjectId: string;
    chapterId: string;
    topicId: string;
  };
};

export default function TopicPage({ params }: Props) {
  const { id, subjectId, chapterId, topicId } = params;

  return (
    <TopicDetailsView courseId={id} subjectId={subjectId} chapterId={chapterId} topicId={topicId} />
  );
}
