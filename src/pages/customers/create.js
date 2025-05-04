import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createCustomer, getTenants } from "@/utils/api";
import { toast } from 'react-toastify';

export default function CreateCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", tenant: "" });
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    getTenants()
      .then(setTenants)
      .catch((err) => console.error("Tenantlarni olishda xatolik:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(form);
      toast.success("Customer muvaffaqiyatli qo‘shildi!");
      router.push("/customers?tenant=" + form.tenant);
    } catch (err) {
      console.error("Yaratishda xatolik:", err);
      toast.error("Xatolik yuz berdi!");
    }
  };
  




  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AddNewCustomer</h1>
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
