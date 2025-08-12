import React from 'react';
// sections
import TaskBoardView from 'src/sections/projects/view/taskboard-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Taskboard',
};

type Props = {
  params: {
    id: string;
  };
};

export default function TaskBoardPage({ params }: Props) {
  const { id } = params;
  return <TaskBoardView projectId={id} />;
}
