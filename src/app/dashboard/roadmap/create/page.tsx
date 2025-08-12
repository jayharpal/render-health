import { Metadata } from 'next';
import React from 'react';
import { RoadMapCreate } from 'src/sections/roadmap/view';

export const metadata: Metadata = {
  title: 'Roadmap Create',
};

function RoadMap() {
  return <RoadMapCreate />;
}

export default RoadMap;
