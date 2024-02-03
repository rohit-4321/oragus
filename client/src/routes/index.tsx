import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../containers/home/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <h1>Chat</h1>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
