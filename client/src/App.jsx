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
import ToastProvider from "./components/ToastProvider";
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
    <div className="min-w-[100vw] min-h-[100vh] bg-black/40 flex justify-center items-center overflow-hidden">
      <BrowserRouter>
        <div className="flex justify-center items-center max-w-[1800px] w-full min-w-[330px]">
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
        </div>
        <ToastProvider />
      </BrowserRouter>
    </div>
  );
}

export default App;
