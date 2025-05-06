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
      <h1 className="text-2xl font-bold mb-4">AddNewTenant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nomi" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">AddNewTenant</button>
      </form>
    </div>
  );
}



