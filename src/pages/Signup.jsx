import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser(email, password); // Call context function

      if (result.success) {
        navigate("/notification", { state: { email } });
      } else {
        setError(result.error.message); // Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h2 className="f-size">Sign Up</h2>
          <p>Please sign up here to continue</p>
        </div>
        <form onSubmit={handleSignUp}>
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
          <button type="submit" className="btn">
            Sign Up
          </button>
          <div className="social-login mt">
            <p>
              Don't have an account yet?{" "}
              <Link className="font-bold" to="/signin">
                Sign in
              </Link>
            </p>
          </div>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Signup;
