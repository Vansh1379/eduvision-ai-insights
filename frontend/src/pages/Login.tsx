
import React from "react";
import { Brain } from "lucide-react";
import { SignIn, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const { isLoaded, user } = useUser();
  const role = (
    (user?.publicMetadata?.role as string | undefined)?.toLowerCase() || "student"
  ) as string;
  const defaultRouteMap: Record<string, string> = {
    student: "/student",
    teacher: "/teacher",
    admin: "/college/evaluation",
  };
  const roleRedirect = defaultRouteMap[role] || "/college/evaluation";
  const redirectTo =
    (location.state as { from?: string } | undefined)?.from || roleRedirect;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduVision
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <SignedIn>
          {isLoaded ? <Navigate to={roleRedirect} replace /> : null}
        </SignedIn>

        <SignedOut>
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/signup"
            fallbackRedirectUrl={redirectTo}
            redirectUrl={redirectTo}
          />
        </SignedOut>
      </div>
    </div>
  );
};

export default Login;
