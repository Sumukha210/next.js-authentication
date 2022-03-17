import { useRouter } from "next/router";
import { useEffect } from "react";
import useStore from "../context/store";

const useAuthGuard = () => {
  const isAuthenticated = useStore(s => s.isAuthenticated);
  const loading = useStore(s => s.loading);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loading]);

  const ProtectedComponent: React.FC = ({ children }) => {
    if (loading) {
      return <p>Loading...</p>;
    }
    return <div>{isAuthenticated ? children : <></>}</div>;
  };

  return [ProtectedComponent];
};

export default useAuthGuard;
