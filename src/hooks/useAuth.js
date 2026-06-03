

import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    
    const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(logoutAction());
    };

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        logout
    };
};

export default useAuth;