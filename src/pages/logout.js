// src/pages/logout.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("access_token");
    router.push("/login");
  }, []);

  return <p className="p-6">Chiqilmoqda...</p>;
}
