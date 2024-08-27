// hooks/useUserRole.js
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure the path is correct

function useUserRole() {
  const { user } = useUser();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.id);
      getDoc(docRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          setRole(docSnapshot.data().role);
        }
      }).catch(error => {
        console.error('Error fetching user role:', error);
      });
    }
  }, [user]);

  return role;
}

export default useUserRole;
