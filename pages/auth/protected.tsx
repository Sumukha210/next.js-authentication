import React from "react";
import useAuthGuard from "../../src/customHooks/useAuthGuard";

const ProtectedPage = () => {
  const [AuthGuard] = useAuthGuard();

  return (
    <AuthGuard>
      <h1>ProtectedPage</h1>
      <h3>
        It is a protected page, it will redirect you to login if you are not
        authenticated
      </h3>
    </AuthGuard>
  );
};

export default ProtectedPage;
