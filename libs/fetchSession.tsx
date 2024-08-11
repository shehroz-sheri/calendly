'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { setUser, clearUser } from '../redux/slices/sessionSlice';

const FetchSession = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session && session.user) {
        dispatch(setUser({
          id: session?.user?.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image || null,
        }));
      }
    } else if (status === 'unauthenticated') {
      dispatch(clearUser());
    }
  }, [dispatch, session, status]);

  return <>{children}</>;
};

export default FetchSession;
