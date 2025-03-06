import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { LoadSpinner } from "../ui/load-spinner";

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
