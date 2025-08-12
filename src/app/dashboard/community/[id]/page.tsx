import { Metadata } from 'next';
import React from 'react';
import CommunityQuestionAnswerView from 'src/sections/community/view/community-question-answer-view';
// sections
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Community Answers",
};

type Props = {
  params: {
    id: string;
  };
};

export default function CommunityPage({ params }: Props) {
  const { id } = params;
  return <CommunityQuestionAnswerView questionId={id} />;
}
