import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Xush kelibsiz, Admin 👋</h1>
      <p className="mb-6 text-gray-600">Bu sizning boshqaruv panelingiz</p>
      <button
        onClick={() => router.push('/tenants')}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        ➕ Barcha Tenantlar
      </button>
    </div>
  );
}
