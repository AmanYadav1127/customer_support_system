import { useState } from "react";

export default function LoginPage({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>

      <div className="relative z-10 w-full max-w-[420px] p-10 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6 text-indigo-600 shadow-sm border border-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-3 border border-red-100">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition-all active:scale-[0.98] mt-4"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
