import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/token/`,
            form
          );
          
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      router.push("/dashboard");
    } catch (err) {
      setError("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 Kirish</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Parol"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/token/`,
//         form
//       );
      
//       const { access, refresh } = response.data;
//       localStorage.setItem("access_token", access);
//       localStorage.setItem("refresh_token", refresh);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Login yoki parol noto‘g‘ri!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-animated">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
//         <h1 className="text-2xl font-bold mb-6 text-center">🔐 Kirish</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="border border-gray-300 p-2 rounded w-full"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Parol"
//             className="border border-gray-300 p-2 rounded w-full"
//             required
//           />
//           {error && (
//             <p className="text-red-600 text-sm text-center">{error}</p>
//           )}
//           <button
//             type="submit"
//             className="bg-blue-500 w-full text-white py-2 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






