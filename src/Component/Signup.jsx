import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../assets/Context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session, signupNewUser } = UserAuth();
  const navigate = useNavigate();
  console.log(session);

  const handleSignup = async (e) => {
    e.preventDefault(); // Fixed typo

    setLoading(true);
    setError(""); // Clear previous errors before starting

    try {
      const result = await signupNewUser(email, password);

      if (result.success) {
        navigate("/signin"); // Ensure this route exists
      } else {
        setError(result.error.message);
      }
    } catch (e) {
      setError("An error occurred: " + e.message); // Better error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md m-auto pt-24">
      <h2 className="font-bold pb-2 text-white text-center">Sign up today</h2>
      <p className="text-white text-center">
        Already have an account? <Link to="/signin">Sign in!</Link>
      </p>
      <div className="flex flex-col py-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="pt-3 mt-4 bg-black text-white"
          type="email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="pt-3 mt-4 bg-black text-white"
          type="password"
          value={password}
        />
        <button
          className="mt-6 w-full bg-amber-500 text-black font-bold py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </div>
    </form>
  );
}

export default Signup;
