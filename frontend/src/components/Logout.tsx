import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      // After logout, redirect to login page
      navigate("/login");
      window.location.reload(); // optional, forces page reload
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-[30%] mx-auto">
    <button
      onClick={handleLogout}
        className="mx-auto flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      Logout
    </button>
    </div>
  );
};

export default Logout;
