import React from 'react';
import TopicView from 'src/sections/course/view/topic-view';
// sections

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Chapter',
};

type Props = {
  params: {
    id: string;
    subjectId: string;
    chapterId: string;
  };
};

export default function ChapterPage({ params }: Props) {
  const { id, subjectId, chapterId } = params;

  return <TopicView courseId={id} subjectId={subjectId} chapterId={chapterId} />;
}
