import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import useQueryParam from 'hooks/useQueryParam';

import Landing from 'content/Landing';
import Resume from 'content/Resume';
import Contact from 'content/Contact';
import Projects from 'content/Projects';

const LandingPage = () => {
  const [page, setPage] = useQueryParam('page', 'home');

  return (
    <MainLayout setPage={setPage} page={page}>
      {page === 'home' && <Landing />}
      {page === 'resume' && <Resume />}
      {page === 'projects' && <Projects />}
      {page === 'contact' && <Contact />}
    </MainLayout>
  );
};

export default RenderToRoot(LandingPage);
