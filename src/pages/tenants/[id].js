import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTenantById, deleteTenant, getCustomersByTenant } from '@/utils/api';
import Spinner from "@/components/spinner";
export default function TenantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tenant, setTenant] = useState(null);
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    if (id) {
      getTenantById(id)
        .then(data => setTenant(data))
        .catch(error => console.error("Xatolik:", error));
    }
  }, [id]);

useEffect(() => {
    if (id) {
      getCustomersByTenant(id)
        .then(setCustomers)
        .catch((err) => console.error("Xatolik:", err));
    }
  }, [id]);

  if (!tenant) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tenant Details</h1>
      <p><strong>Name:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Date of Issue:</strong> {tenant.created_at}</p>
      <h2 className="text-xl font-bold mt-6 mb-2">Customers</h2>
      <ul className="list-disc ml-6">
      {customers.map((customer) => (
       <li key={customer.id}>
         {customer.name} — {customer.email}
       </li>
  ))}
</ul>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => router.back()}
      >
        Ortga
      </button>
      <button
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
  onClick={async () => {
    if (window.confirm("Rostdan ham o‘chirilsinmi?")) {
      await deleteTenant(id);
      router.push("/tenants");
    }
  }}
>
  Delete
</button>

    </div>
  );
}



