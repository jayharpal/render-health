import { Metadata } from 'next';
import React from 'react';
import { RoadMapView } from 'src/sections/roadmap/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Roadmap List',
};

export default function RoadMapPage() {
  return <RoadMapView />;
}
