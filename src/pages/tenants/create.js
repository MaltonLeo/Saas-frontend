import { useState } from 'react';
import { useRouter } from 'next/router';
import { createTenant } from '@/utils/api';

export default function CreateTenantPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTenant({ name, email });
      router.push('/tenants');
    } catch (error) {
      console.error('Xatolik:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Yangi Tenant Qo‘shish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nomi" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Qo‘shish</button>
      </form>
    </div>
  );
}



// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function CreateTenant() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !email) return alert('Iltimos, barcha maydonlarni to‘ldiring');

//     // Hozircha mock: API chaqirish o‘rniga console.log qilamiz
//     console.log('Yangi tenant:', { name, email });

//     alert("Tenant qo‘shildi (mock)");
//     router.push('/tenants');
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Yangi Tenant Qo‘shish</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Tenant nomi"
//           className="w-full p-2 border border-gray-300 rounded"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border border-gray-300 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Qo‘shish
//         </button>
//       </form>
//     </div>
//   );
// }
