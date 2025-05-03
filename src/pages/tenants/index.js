import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTenants, deleteTenant } from '@/utils/api';

    
export default function TenantListPage() {
  const [tenants, setTenants] = useState([]);
  const router = useRouter();

  // 📥 Ma’lumotlarni yuklab olish
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTenants();
        setTenants(data);
      } catch (error) {
        console.error("Yuklashda xatolik:", error);
      }
    }
    fetchData();
  }, []);

  // ❌ DELETE funksiyasi
  const handleDelete = async (id) => {
    if (window.confirm('Rostdan ham o‘chirilsinmi?')) {
      try {
        await deleteTenant(id);
        setTenants((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error('O‘chirishda xatolik:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Barcha Tenantlar</h1>

      {/* ➕ Qo‘shish tugmasi */}
      <button
        onClick={() => router.push('/tenants/create')}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ ADDNEW
      </button>

      {/* 🔁 Tenant ro‘yxati */}
      {tenants.map((tenant, index) => (
  <div key={tenant.id} className="border p-4 mb-2" style={{display:'flex', justifyContent:'space-between'}}>
    <strong>{index + 1}. {tenant.name}</strong> — {tenant.email}

    <div className="mt-2 flex gap-3" style={{display:'flex'}}>
      <button
        className="text-blue-600 underline"
        onClick={() => router.push(`/tenants/${tenant.id}`)}
      >
        Check
      </button>
      <button
        className="text-green-600 underline"
        onClick={() => router.push(`/tenants/${tenant.id}/edit`)}
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(tenant.id)}
        className="text-red-600 underline"
      >
        Delete
      </button>
    </div>
  </div>
))}
    </div>
  );
}






// import { useEffect, useState } from 'react';
// import api from '@/utils/api'; // ← yo‘lni kerakli holatda yozing
// import { useRouter } from 'next/router';

// export default function TenantList() {
//     const router = useRouter();

//   const [tenants, setTenants] = useState([]);
//   const handleDelete = async (id) => {
//     if (window.confirm('Rostdan ham o‘chirilsinmi?')) {
//       try {
//         await deleteTenant(id);
//         // Ro‘yxatni yangilash:
//         setTenants((prev) => prev.filter((t) => t.id !== id));
//       } catch (error) {
//         console.error('O‘chirishda xatolik:', error);
//       }
//     }
//   };
//   useEffect(() => {
//     api.get('/tenants/')
//       .then(res => setTenants(res.data))
//       .catch(err => console.error("Xatolik:", err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Barcha Tenantlar</h1>
//       <button
//   onClick={() => router.push('/tenants/create')}
//   className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// >
//   ➕ Yangi Tenant
// </button>
//       <ul className="space-y-2">
//         {tenants.map((t, i) => (
//           <li key={t.id} className="p-4 border rounded bg-white shadow">
//             <p><strong>{i + 1}.</strong> {t.name} — {t.email}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





