import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import useQueryParam from 'hooks/useQueryParam';

import Landing from 'content/Landing';
import Resume from 'content/Resume';
import Contact from 'content/Contact';
import Projects from 'content/Projects';

import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';

const LandingPage = () => {
  const [page, setPage] = useQueryParam('page', '0');

  return (
    <MainLayout setPage={setPage} page={page}>
      <Carousel value={page} draggable={false}>
        <Landing />
        <Projects />
        <Resume />
        <Contact />
      </Carousel>
    </MainLayout>
  );
};

export default RenderToRoot(LandingPage);
