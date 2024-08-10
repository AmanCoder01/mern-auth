import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, currentUser } = useSelector(state => state.user);

    if (!isAuthenticated) {
        return <Navigate to='/signin' replace />;
    }

    if (!currentUser.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
};