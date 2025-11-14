import { PropsWithChildren } from "react";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: string[];
  redirectTo?: string;
};

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const location = useLocation();
  const redirectUrl = `${location.pathname}${location.search}${location.hash}`;
  const { isLoaded, user } = useUser();
  const role = (
    (user?.publicMetadata?.role as string | undefined)?.toLowerCase() || "student"
  ) as string;

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <SignedIn>
        {allowedRoles && !allowedRoles.includes(role) ? (
          <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
        ) : (
          children
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn signInUrl="/login" redirectUrl={redirectUrl} />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;

