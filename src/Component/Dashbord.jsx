import { useNavigate } from "react-router-dom";
import { UserAuth } from "../assets/Context/AuthContext";

function Dashboard() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  console.log(session);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(); // Ensure this function is correctly defined in your AuthContext
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h2 className="text-lg mt-2">
        Welcome, {session?.user?.email || "Guest"}
      </h2>
      <div>
        <p
          onClick={handleSignOut}
          className="hover:cursor-pointer border px-4 py-2 mt-4 inline-block bg-red-500 text-white rounded"
        >
          Sign Out
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
