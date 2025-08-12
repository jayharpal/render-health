import { Metadata } from 'next';
import React from 'react';
import { RoadMapCreate } from 'src/sections/roadmap/view';

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Roadmap Edit',
};

export default function RoadMapUpdatePage({ params }: Props) {
  const { id } = params;

  return <RoadMapCreate roadmapId={id} />;
}
