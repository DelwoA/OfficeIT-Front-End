import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedLayout = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner message="Authenticating..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/officeit-admin/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
