import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCustomersByTenant, deleteCustomer } from '@/utils/api';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();
  const tenantId = router.query.tenant;

//   useEffect(() => {
//     if (tenantId) {
//       getCustomersByTenant(tenantId)
//         .then(setCustomers)
//         .catch(err => console.error('Xatolik:', err));
//     }
//   }, []);
useEffect(() => {
    if (tenantId) {
      getCustomersByTenant(tenantId)
        .then(setCustomers)
        .catch(err => console.error("Xatolik:", err));
    }
  }, [tenantId]);

  const handleDelete = async (id) => {
    if (window.confirm("Rostdan ham o‘chirilsinmi?")) {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => router.push('/customers/create')}
      >
        ➕ Add New Customer
      </button>

      <ul className="list-disc ml-6">
  {customers.map((c) => (
    <li key={c.id} className="mb-2">
      {c.name} — {c.email}
      <div className="inline-flex gap-4 ml-4">
        <button
          onClick={() => router.push(`/customers/${c.id}`)}
          className="text-blue-600 underline"
        >
          Check
        </button>
        <button
          onClick={() => router.push(`/customers/${c.id}/edit`)}
          className="text-green-600 underline"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(c.id)}
          className="text-red-600 underline"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}



// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getCustomersByTenant } from '@/utils/api';

// export default function CustomerListPage() {
//   const [customers, setCustomers] = useState([]);
//   const router = useRouter();
//   const tenantId = 5; // vaqtincha qat'iy raqam, keyinchalik dinamik bo'ladi

//   useEffect(() => {
//     if (tenantId) {
//       getCustomersByTenant(tenantId)
//         .then(data => setCustomers(data))
//         .catch(err => console.error('Xatolik:', err));
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Customers</h1>

//       <button
//         className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         onClick={() => router.push('/customers/create')}
//       >
//         ➕ Add New Customer
//       </button>

//       {customers.length === 0 ? (
//         <p>Hozircha hech qanday customer yo'q.</p>
//       ) : (
//         <ul className="list-disc ml-6">
//           {customers.map((c) => (
//             <li key={c.id}>
//               {c.name} — {c.email}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
