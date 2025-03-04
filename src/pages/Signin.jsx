import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the sign-in starts

    const { session, error } = await signInUser(email, password);

    setLoading(false); // Set loading to false when the sign-in process ends

    if (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      navigate("/dashboard");
    }

    if (session) {
      setError(""); // Reset the error when there's a session
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h2 className="f-size">Sign In</h2>
          <p>Please sign in to continue</p>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <span className="underline"></span>
          </div>
          <div className="input-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <span className="underline"></span>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div> // Show loader when loading
            ) : (
              "Sign In"
            )}
          </button>
          <div className="social-login mt">
            <p>
              Don't have an account yet?{" "}
              <Link className="font-bold" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </form>
      </div>
      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin: 0 auto; // Center the loader
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Signin;
