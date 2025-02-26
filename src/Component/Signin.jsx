import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../assets/Context/AuthContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();
  console.log(session);

  const handleSignin = async (e) => {
    e.preventDefault(); // Fixed typo

    setLoading(true);
    setError(""); // Clear previous errors before starting

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/dashboard"); // Ensure this route exists
      } else {
        setError(result.error?.message || "Login failed. Try again.");
      }
    } catch (e) {
      setError("An error occurred: " + e.message); // Better error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignin} className="max-w-md m-auto pt-24">
      <h2 className="font-bold pb-2 text-white text-center">Sign in</h2>
      <p className="text-white text-center">
        Do not have an account? <Link to="/signup">Sign up!</Link>
      </p>
      <div className="flex flex-col py-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="pt-3 mt-4 bg-black text-white border border-gray-500 px-3 py-2"
          type="email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="pt-3 mt-4 bg-black text-white border border-gray-500 px-3 py-2"
          type="password"
          value={password}
        />
        <button
          className="mt-6 w-full bg-amber-500 text-black font-bold py-2 rounded hover:bg-amber-600 transition duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </div>
    </form>
  );
}

export default Signin;
