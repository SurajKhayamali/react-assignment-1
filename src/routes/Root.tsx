import { Outlet } from 'react-router-dom';

import Navbar from '../compoments/Navbar';

const Root = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default Root;
