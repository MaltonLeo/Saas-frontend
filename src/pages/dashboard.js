import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTenants, getCustomersByTenant } from "@/utils/api";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadData();
    }
  }, []);

  async function loadData() {
    try {
      const tenantList = await getTenants();
      setTenants(tenantList);

      let totalCustomers = 0;
      for (const tenant of tenantList) {
        const customers = await getCustomersByTenant(tenant.id);
        totalCustomers += customers.length;
      }
      setCustomerCount(totalCustomers);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  }

  return (
    <div className="min-h-screen bg-animated p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">👋 Xush kelibsiz, Admin!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">🧩 Tenantlar soni</h2>
          <p className="text-2xl font-bold">{tenants.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">👥 Customers soni</h2>
          <p className="text-2xl font-bold">{customerCount}</p>
        </div>
      </div>
    </div>
  );
}




