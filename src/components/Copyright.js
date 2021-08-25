import React from 'react';

const Copyright = () => {
  const currentDate = new Date().getFullYear();

  return <>All content Copyright © 2020-{currentDate} Gwen Dekker</>;
};

export default Copyright;
