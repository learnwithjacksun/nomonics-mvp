import { useAuthStore } from "@/store";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth";

const useAuth = () => {
  const { user, token, setUser, setToken, setLoginInfo, loginInfo } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
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

  const registerUser = async (
    data: RegisterSchema,
    sendEmail: boolean,
    role: string
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role,
        sendEmail,
      };
      const response = await api.post("/auth/register", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.data);
        setToken(response.data.token);
        navigate(`/verify?email=${data.email}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/verify", {
        otp,
      });
      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resentOtp = async (email: string) => {
    setIsResendLoading(true);
    try {
      const response = await api.post("/auth/resend", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsResendLoading(false);
    }
  };

  const login = async (data: LoginSchema) => {
    setLoginInfo(data);
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        setUser(response.data.data);
        setToken(response.data.token);
        toast.success(response.data.message);
        if (response.data.data.isEmailVerified) {
          navigate("/");
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
    toast.success("Logged out successfully")
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
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      console.error(error);
    } finally {
      setIsCheckAuth(false);
    }
  }, [setUser, setToken]);

  return {
    user,
    token,
    isLoading,
    login,
    logout,
    getUser,
    registerUser,
    verifyOtp,
    resentOtp,
    isResendLoading,
    isCheckAuth,
    setLoginInfo,
    loginInfo,
  };
};

export default useAuth;
