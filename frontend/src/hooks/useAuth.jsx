import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {

    const { user } = useSelector((state) => state.auth);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if(user){

          if(localStorage.getItem('miniblog_user')) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } else {
          setAuth(false);
        }

        setLoading(false);

    }, [user])

    return { auth, loading };
}
