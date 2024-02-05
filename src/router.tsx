import { Link, Outlet, createBrowserRouter } from 'react-router-dom';

const Profile = () => (
  <>
    <h2>Profile</h2>
  </>
);

const Account = () => (
  <>
    <h2>Account</h2>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <h1>Hello</h1>
        <Link to="next-route">Take me to the next route</Link>
        <br />
        <a href="next-route">Take me to the next route</a>
      </>
    ),
  },
  {
    path: '/next-route',
    element: <h1>I ma a new route</h1>,
  },
  {
    path: '/user',
    element: (
      <>
        <h1>User</h1>

        <nav>
          <Link to="profile">Profile</Link>
          <Link to="account">Account</Link>
        </nav>

        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        Component: Profile,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'account',
        Component: Account,
      },
    ],
  },
]);

export default router;
