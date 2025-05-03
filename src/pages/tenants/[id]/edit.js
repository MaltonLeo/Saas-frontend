import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTenantById, updateTenant } from '@/utils/api';
export default function EditTenantPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTenantById(id).then((tenant) => {
        setForm({ name: tenant.name, email: tenant.email });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTenant(id, form);
    router.push('/tenants');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tenantni Tahrirlash</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nomi"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
}




// // src/pages/tenants/[id]/edit.js
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { getTenantById, updateTenant } from "@/utils/api";

// export default function EditTenantPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [form, setForm] = useState({ name: "", email: "" });

//   useEffect(() => {
//     if (id) {
//       getTenantById(id).then((tenant) => {
//         setForm({ name: tenant.name, email: tenant.email });
//       });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateTenant(id, form);
//     router.push("/tenants");
//   };

//   return (
//     <div>
//       <h1>Edit Tenant</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Nomi"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }
