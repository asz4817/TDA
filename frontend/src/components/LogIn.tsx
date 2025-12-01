import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    

    const res = await fetch("/handleLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    const data = await res.json();

    if (data.success) {
      navigate("/mailout");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="mt-50 flex">
      <form onSubmit={handleSubmit} className="mx-auto">
        User:
        <input
          name="user"
          className="border-b"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />

        Password:
        <input
          name="password"
          type="password"
          className="border-b"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogIn;
