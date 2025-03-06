import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { LoadSpinner } from "../ui/load-spinner";

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center pt-40">
        <LoadSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
