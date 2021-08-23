import React from 'react';

import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ContactedPage = () => {
  return (
    <MainLayout>
      <h4 className="pt-3 centered">Success!</h4>
      <p className="centered">We've recieved your form submission, and will get back to you when we can.</p>
    </MainLayout>
  );
};

export default RenderToRoot(ContactedPage);
