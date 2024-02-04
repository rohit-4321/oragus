import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../../containers/home/index.tsx';
import Chat from '../../containers/chat/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
