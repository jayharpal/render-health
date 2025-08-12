import { Metadata } from 'next';
import React from 'react';
import { QuestionCreate } from 'src/sections/community/view';

export const metadata: Metadata = {
  title: "Ask Question",
};

function Community() {
  return <QuestionCreate />;
}

export default Community;
