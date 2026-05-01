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
  const userRole = (
    user?.publicMetadata?.role as string | undefined
  )?.toLowerCase();
  const role = userRole || "student";

  // For development: allow access for testing (bypass role check in dev mode)
  const isDevelopment = import.meta.env.DEV;
  const hasAccess =
    !allowedRoles ||
    allowedRoles.includes(role) ||
    (isDevelopment && !userRole); // Allow if in dev mode and no role is explicitly set in metadata

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <SignedIn>
        {!hasAccess ? (
          <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-slate-200">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-4">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Access Restricted
                </h2>
                <p className="text-slate-600 mb-4">
                  You don't have permission to access this page.
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Your current role:{" "}
                  <span className="font-semibold text-slate-700 capitalize">
                    {role}
                  </span>
                  <br />
                  Required roles:{" "}
                  <span className="font-semibold text-slate-700">
                    {allowedRoles?.join(", ")}
                  </span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-left">
                  <p className="text-xs text-blue-800 font-medium mb-1">
                    To access this page:
                  </p>
                  <p className="text-xs text-blue-700">
                    Set your role to{" "}
                    <span className="font-semibold">"{allowedRoles?.[0]}"</span>{" "}
                    in your Clerk dashboard under User → Public Metadata → role
                  </p>
                </div>
                <button
                  onClick={() => window.history.back()}
                  className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
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
