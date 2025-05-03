// pages/tenants/[id]/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTenantById } from '@/utils/api';

export default function TenantDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    if (id) {
      getTenantById(id).then((data) => setTenant(data));
    }
  }, [id]);

  if (!tenant) return <p>Yuklanmoqda...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tenant Ma’lumotlari</h1>
      <p><strong>ID:</strong> {tenant.id}</p>
      <p><strong>Nomi:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
    </div>
  );
}
