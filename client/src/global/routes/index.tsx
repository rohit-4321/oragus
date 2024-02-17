/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
// import Home from '../../containers/home/index.tsx';
// import Chat from '../../containers/chat/index.tsx';
const Chat = lazy(() => import('../../containers/chat/index.tsx'));
const Home = lazy(() => import('../../containers/home/index.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/chat',
    element: (
      <Suspense fallback={<div />}>
        <Chat />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
