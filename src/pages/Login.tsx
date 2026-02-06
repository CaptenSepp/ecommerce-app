import { useState } from "react";

// renders a basic login form (component) using controlled inputs (state)
const LoginPage = () => {
  const [email, setEmail] = useState(""); // track email text (state)
  const [password, setPassword] = useState(""); // track password text (state)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent full page reload (event default)
    // here we would send login request (issuing to auth endpoint) and handle response (payload)
  };

  return (
    <main className="login-wrapper">
      <div className="login-box">
        <div className="flex justify-center mx-auto">
        </div>

        {/* form wrapper binds submit to handler (event) */}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              type="email"
              className="input-field"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)} // update local state from input (controlled)
              required
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm">Password</label>
              <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a>
            </div>
            <input
              type="password"
              className="input-field"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)} // update local state from input (controlled)
              required
            />
          </div>

          <div className="mt-6">
            <button type="submit" className="submit-button">Sign In</button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b lg:w-1/5"></span>
          <a href="#" className="text-xs text-center text-gray-500 uppercase hover:underline">
            or login with Social Media
          </a>
          <span className="w-1/5 border-b lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button type="button" className="social-button">
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>

          <a href="#" className="secondary-button mx-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"></svg>
          </a>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Don't have an account?
          <a href="#" className="font-medium text-gray-700 hover:underline"> Create One</a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
