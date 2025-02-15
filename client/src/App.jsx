import Auth from "@/pages/Auth/index.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/apiClient";
import { GET_USER_INFO } from "./utils/constants";
import { AuthFormProvider } from "./context/authFormContext";
import { ProfileUIProvider } from "./context/ProfileUIContext";
import { ToastContainer } from "react-toastify";
function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.user.id) {
          setUserInfo(res.data.user);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserInfo();
    }
    console.log(userInfo);
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    if (userInfo?.themePreference) {
      document.documentElement.classList.toggle(
        "dark",
        userInfo.themePreference === "dark"
      );
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [userInfo?.themePreference]);

  if (loading) {
    return (
      <div className="w-full h-full bg-black/50 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
  };

  const AuthRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? (
      userInfo.profileSetup ? (
        <Navigate to="/chat" />
      ) : (
        <Navigate to="/profile" />
      )
    ) : (
      children
    );
  };

  return (
    <div className="w-full min-h-[100vh] bg-black/40 flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth/:formType"
            element={
              <AuthRoute>
                <AuthFormProvider>
                  <Auth />
                </AuthFormProvider>
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileUIProvider>
                  <Profile />
                </ProfileUIProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
