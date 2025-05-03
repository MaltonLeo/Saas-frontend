// src/pages/customers/[id]/edit.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCustomerById, updateCustomer, getTenants } from '@/utils/api';

export default function EditCustomerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '', email: '', tenant: '' });
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    if (id) {
      getCustomerById(id).then(data => {
        setForm({
          name: data.name,
          email: data.email,
          tenant: data.tenant,
        });
      });
      getTenants().then(setTenants);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, {
        ...form,
        tenant: parseInt(form.tenant),
      });
      router.push(`/customers?tenant=${form.tenant}`);
    } catch (err) {
      console.error('Tahrirlashda xatolik:', err);
    }
  };

  if (!id || !form.name) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ism"
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
        <select
          name="tenant"
          value={form.tenant}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Choose Tenant</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}


