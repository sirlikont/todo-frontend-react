import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kustuta token
    localStorage.removeItem("apiToken");

    // Suuna login lehele
    navigate("/login", { replace: true }); // replace: true, et back nuppu vajutades ei läheks logouti
  }, [navigate]);

  return null; // ei renderda midagi
}