import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "https://mern-advanced-auth-production.up.railway.app/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // ========================= SIGNUP =========================
  signup: async ({ email, password, name }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });

      set({
        message: response.data.message,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Signup failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // ========================= LOGIN =========================
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
    }
  },

  // ========================= LOGOUT =========================
  logout: async () => {
    set({ isLoading: true });

    try {
      await axios.get(`${API_URL}/logout`);

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        isLoading: false,
      });
    }
  },

  // ========================= VERIFY EMAIL =========================
  verifyEmail: async (verificationToken) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        verificationToken,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // ========================= CHECK AUTH =========================
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isCheckingAuth: false,
        error: error.response?.data?.message || null,
      });
    }
  },

  // ========================= FORGOT PASSWORD =========================
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });

      set({
        message: response.data.message,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error sending reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  // ========================= RESET PASSWORD =========================
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });

      set({
        message: response.data.message,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
