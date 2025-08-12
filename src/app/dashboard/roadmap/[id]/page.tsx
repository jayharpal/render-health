import React from 'react';
// sections
import RoadMapTaskBoardView from 'src/sections/roadmap/view/roadmap-taskboard-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'RoadMap',
};

type Props = {
  params: {
    id: string;
  };
};

export default function RoadMapPage({ params }: Props) {
  const { id } = params;
  return <RoadMapTaskBoardView roadmapId={id} />;
}
