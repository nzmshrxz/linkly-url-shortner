import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false)

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = { username: "", email: "", password: "" };
    const trimmed = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    if (!trimmed.email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!trimmed.password) {
      nextErrors.password = "Password is required.";
    } else if (trimmed.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!isLogin && !trimmed.username) {
      nextErrors.username = "Username is required.";
    }

    if (nextErrors.username || nextErrors.email || nextErrors.password) {
      setFieldErrors(nextErrors);
      return;
    }

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const data = isLogin
        ? { email: trimmed.email, password: trimmed.password }
        : { ...trimmed };

      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, data);

      if (res.data.token) {
        login(res.data.token, res.data.user.username);
        toast.success(`Welcome Back, ${res.data.user.username}!`, {
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          }
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <motion.div
      className="max-w-md mx-auto mt-8 rounded-2xl border border-white/10 bg-black/40 px-8 py-10 text-white shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
          {isLogin ? "Welcome Back" : "Join Linkly"}
        </p>
        <h2 className="mt-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-2xl font-extrabold text-transparent">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="mt-2 text-xs text-gray-400">
          {isLogin
            ? "Access your shortened links and analytics."
            : "Takes less than a minute, no card required."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="text-left space-y-1.5">
            <label
              htmlFor="username"
              className="text-xs font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-white/10 bg-[#0b1020]/80 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-[#030303] placeholder:text-gray-500"
            />
            {fieldErrors.username && (
              <p className="pt-1 text-[11px] font-medium text-red-400">
                {fieldErrors.username}
              </p>
            )}
          </div>
        )}

        <div className="text-left space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            value={formData.email}
            className="w-full rounded-lg border border-white/10 bg-[#0b1020]/80 px-3 py-2.5 text-sm text-white outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-[#030303] placeholder:text-gray-500"
          />
          {fieldErrors.email && (
            <p className="pt-1 text-[11px] font-medium text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        
     <div className="text-left space-y-1.5">
  <div className="flex items-center justify-between text-xs">
    <label htmlFor="password" className="font-medium text-gray-300">
      Password
    </label>
    {isLogin && (
      <button
        type="button"
        className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200"
      >
        Forgot password?
      </button>
    )}
  </div>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••"
      onChange={handleChange}
      value={formData.password}
      className="w-full rounded-lg border border-white/10 bg-[#0b1020]/80 px-3 py-2.5 pr-10 text-sm text-white outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-[#030303] placeholder:text-gray-500"
    />

    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>

  {fieldErrors.password && (
    <p className="pt-1 text-[11px] font-medium text-red-400">
      {fieldErrors.password}
    </p>
  )}
</div>

        <button
          className="mt-2 cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
          type="submit"
        >
          {isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-semibold text-indigo-300 hover:text-indigo-200"
          onClick={toggleForm}
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </motion.div>
  );
};

export default Auth;
