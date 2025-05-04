import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCustomersByTenant, deleteCustomer, getTenants } from "@/utils/api";
import axios from "axios";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [tenantId, setTenantId] = useState("");
  const [tenants, setTenants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadTenants();
    }
  }, []);

  const loadTenants = async () => {
    try {
      const tenantData = await getTenants();
      setTenants(tenantData);

      const defaultTenantId = router.query.tenant || tenantData[0]?.id;
      if (defaultTenantId) {
        setTenantId(defaultTenantId);
        loadCustomers(defaultTenantId);
      }
    } catch (err) {
      console.error("Tenantlarni olishda xatolik:", err);
    }
  };

  const loadCustomers = async (id) => {
    try {
      const data = await getCustomersByTenant(id);
      setCustomers(data);
    } catch (err) {
      console.error("Customersni olishda xatolik:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      try {
        await deleteCustomer(id);
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-animated p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">👥 Customers</h1>
        <button
          onClick={() => router.push("/customers/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ New Customer
        </button>
      </div>

      <select
        className="border px-3 py-2 rounded mb-4"
        value={tenantId}
        onChange={(e) => {
          setTenantId(e.target.value);
          loadCustomers(e.target.value);
        }}
      >
        {tenants.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow p-4 rounded border"
          >
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p className="text-gray-600">{customer.email}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => router.push(`/customers/${customer.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Check
              </button>
              <button
                onClick={() => router.push(`/customers/${customer.id}/edit`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





