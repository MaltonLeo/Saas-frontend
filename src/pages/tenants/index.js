import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTenants, deleteTenant } from "@/utils/api";
import { toast } from "react-toastify";
import axios from "axios";

export default function TenantListPage() {
  const [tenants, setTenants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      toast.error("Ma'lumotlarni yuklashda xatolik");
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      try {
        await deleteTenant(id);
        toast.success("Tenant o‘chirildi");
        setTenants((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error("O‘chirishda xatolik:", error);
        toast.error("O‘chirishda xatolik yuz berdi");
      }
    }
  };

  return (
    <div className="min-h-screen bg-animated p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏢 Tenantlar</h1>
        <button
          onClick={() => router.push("/tenants/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ NewTenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenants.map((tenant, index) => (
          <div
            key={tenant.id}
            className="bg-white/90 text-black p-4 shadow rounded-lg"
          >
            <h2 className="text-xl font-semibold">{index + 1}. {tenant.name}</h2>
            <p className="text-gray-700">{tenant.email}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.push(`/tenants/${tenant.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Check
              </button>
              <button
                onClick={() => router.push(`/tenants/${tenant.id}/edit`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tenant.id)}
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



// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import {
//   getCustomersByTenant,
//   deleteCustomer,
//   getTenants,
// } from "@/utils/api";
// import axios from "axios";

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState([]);
//   const [tenantId, setTenantId] = useState("");
//   const [tenants, setTenants] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       router.push("/login");
//     } else {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       loadTenants();
//     }
//   }, []);

//   const loadTenants = async () => {
//     try {
//       const tenantData = await getTenants();
//       setTenants(tenantData);

//       const defaultTenantId = router.query.tenant || tenantData[0]?.id;
//       if (defaultTenantId) {
//         setTenantId(defaultTenantId);
//         loadCustomers(defaultTenantId);
//       }
//     } catch (err) {
//       console.error("Tenantlarni olishda xatolik:", err);
//     }
//   };

//   const loadCustomers = async (id) => {
//     try {
//       const data = await getCustomersByTenant(id);
//       setCustomers(data);
//     } catch (err) {
//       console.error("Customersni olishda xatolik:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Rostdan ham o‘chirmoqchimisiz?")) {
//       try {
//         await deleteCustomer(id);
//         setCustomers((prev) => prev.filter((c) => c.id !== id));
//       } catch (err) {
//         console.error("O‘chirishda xatolik:", err);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-animated p-6 text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Tenants</h1>
//         <button
//           onClick={() => router.push("/customers/create")}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           ➕ Yangi Customer Qo‘shish
//         </button>
//       </div>

//       <select
//         className="border px-3 py-2 rounded mb-6 text-black"
//         value={tenantId}
//         onChange={(e) => {
//           setTenantId(e.target.value);
//           loadCustomers(e.target.value);
//         }}
//       >
//         {tenants.map((t) => (
//           <option key={t.id} value={t.id}>
//             {t.name}
//           </option>
//         ))}
//       </select>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {customers.map((customer) => (
//           <div
//             key={customer.id}
//             className="bg-white/90 text-black p-4 shadow rounded-lg"
//           >
//             <h2 className="text-xl font-semibold">{customer.name}</h2>
//             <p className="text-gray-700">{customer.email}</p>

//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => router.push(`/customers/${customer.id}`)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//               >
//                 Check
//               </button>
//               <button
//                 onClick={() => router.push(`/customers/${customer.id}/edit`)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(customer.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


