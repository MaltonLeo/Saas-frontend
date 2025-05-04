import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">SaaS Admin</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/tenants" className="hover:underline">Tenants</Link>
        <Link href="/customers" className="hover:underline">Customers</Link>
        <Link href="/login" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</Link>
      </div>
    </nav>
  );
}
