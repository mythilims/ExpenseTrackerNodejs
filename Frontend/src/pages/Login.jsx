import { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { athuApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AuthPage({ setAuth, setUserId }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setIsLoading(false);
  };

  const handleAuth = async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    if (isLogin) {
      // Login Logic
      if (email && password) {
        let data = await athuApi("/login", { email, password });
          if (data.token) {
        toast.success("Login successfuly");
        setTimeout(() => {
            setAuth(true);
            setUserId(data.userDetails._id);
            navigate("/dashboard");
         
        }, 0);
         }else{
                  toast.success("Login successfuly");

         }
      } else {
        toast.error("Invalid login credentials");
      }
    } else {
      // Signup Logic
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        let data = await athuApi("/register", { email, password, username });
        toast.success("Signup successfuly");
        setTimeout(() => {
          if (data.token) {
            navigate("/login");
          }
        }, 1000);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4DA8DA] to-[#3B82F6] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex justify-around mb-6">
              <button
                className={`w-full py-2 font-semibold rounded-l-lg transition-colors ${
                  isLogin
                    ? "bg-white/30 text-white"
                    : "text-white/60 hover:text-white"
                }`}
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
              >
                Login
              </button>
              <button
                className={`w-full py-2 font-semibold rounded-r-lg transition-colors ${
                  !isLogin
                    ? "bg-white/30 text-white"
                    : "text-white/60 hover:text-white"
                }`}
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
              >
                Signup
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {isLogin ? (
                  <>
                    <LogIn size={32} />
                  </>
                ) : (
                  <UserPlus size={32} />
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-white/80 text-sm sm:text-base">
                {isLogin ? "Login to continue" : "Join the Expense Tracker"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">
                      UserName
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                        size={18}
                      />
                      <input
                        type="text"
                        className="w-full bg-white/20 text-white pl-10 pr-4 py-3 rounded-lg border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                        placeholder="test"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                    size={18}
                  />
                  <input
                    type="email"
                    className="w-full bg-white/20 text-white pl-10 pr-4 py-3 rounded-lg border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-white/20 text-white pl-10 pr-12 py-3 rounded-lg border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for Signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-white/20 text-white pl-10 pr-4 py-3 rounded-lg border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Auth Button */}
              <button
                onClick={handleAuth}
                disabled={
                  isLoading ||
                  !email ||
                  !password ||
                  (!isLogin && !confirmPassword)
                }
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{isLogin ? "Signing in..." : "Creating..."}</span>
                  </>
                ) : (
                  <>
                    {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                    <span>{isLogin ? "Login" : "Sign Up"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Demo Info for Login */}
            {/* {isLogin && (
            <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
              <p className="text-xs text-white/80 mb-2 font-medium">Demo Credentials:</p>
              <div className="text-xs text-white/70 space-y-1">
                <p>Email: admin@example.com</p>
                <p>Password: 1234</p>
              </div>
            </div>
          )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
