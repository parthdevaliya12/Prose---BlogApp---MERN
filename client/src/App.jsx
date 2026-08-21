import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Explore from "./pages/Exlpore";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/Profile"));
const PostDetails = React.lazy(() => import("./pages/PostDetails"));
const CreateBlog = React.lazy(() => import("./pages/CreateBlog"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Cannot access if logged in */}
          <Route
            path="/register"
            element={
              <AuthRedirect>
                <Register />
              </AuthRedirect>
            }
          />

          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/index"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/postdetails/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
