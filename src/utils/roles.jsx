import { useUser } from '@clerk/clerk-react';

export const checkRole = (role) => {
  const { user } = useUser();
  return user?.publicMetadata?.role === role;
};
