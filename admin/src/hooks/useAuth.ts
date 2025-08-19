import { useAuthStore } from "@/store";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import type { LoginSchema } from "@/schemas/auth";

const useAuth = () => {
  const { user, token, setUser, setToken, setLoginInfo, loginInfo } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckAuth, setIsCheckAuth] = useState(false);
  const navigate = useNavigate();

  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const login = async (data: LoginSchema) => {
    setLoginInfo(data);
    setIsLoading(true);
    try {
      const response = await api.post("/auth/admin/login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        setUser(response.data.data);
        setToken(response.data.token);
        toast.success(response.data.message);
        if (response.data.data.isEmailVerified) {
          navigate("/overview");
        } else {
          navigate(`/verify?email=${response.data.data.email}`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    getUser();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const getUser = useCallback(async () => {
    setIsCheckAuth(true);
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.data);
        setToken(response.data.token);
      } else {
        setUser(null);
        setToken(null);
        navigate("/");
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      navigate("/");
      console.error(error);
    } finally {
      setIsCheckAuth(false);
    }
  }, [setUser, setToken, navigate]);

  return {
    user,
    token,
    isLoading,
    login,
    logout,
    getUser,
    isCheckAuth,
    setLoginInfo,
    loginInfo,
  };
};

export default useAuth;
