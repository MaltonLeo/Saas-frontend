// src/pages/customers/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCustomerById } from '@/utils/api';

export default function CustomerDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      getCustomerById(id)
        .then(setCustomer)
        .catch((err) => console.error('Xatolik:', err));
    }
  }, [id]);

  if (!customer) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Tafsilotlari</h1>
      <p><strong>Ism:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Tenant ID:</strong> {customer.tenant}</p>
      <p><strong>Yaratilgan sana:</strong> {customer.created_at}</p>

      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ortga
      </button>
    </div>
  );
}
