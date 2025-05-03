import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const createTenant = (tenantData) => api.post('/tenants/', tenantData);
export const deleteTenant = (id) => api.delete(`/tenants/${id}/`);

// Qo‘shiladigan yangi funksiyalar:
export async function getTenantById(id) {
    const response = await api.get(`/tenants/${id}/`);
    return response.data;
  }

  export async function updateTenant(id, data) {
    const response = await api.put(`/tenants/${id}/`, data);
    return response.data;
  }
  
  export async function getCustomersByTenant(tenantId) {
    const res = await api.get(`/customers/?tenant=${tenantId}`);
    return res.data;
  }
  
  export async function createCustomer(customerData) {
    const response = await api.post("/customers/", customerData);
    return response.data;
  }
  
  export async function getTenants() {
    const response = await api.get("/tenants/");
    return response.data;
  }

  export async function getCustomerById(id) {
    const res = await api.get(`/customers/${id}/`);
    return res.data;
  }

  export async function updateCustomer(id, data) {
    const res = await api.put(`/customers/${id}/`, data);
    return res.data;
  }

  export async function deleteCustomer(id) {
    const res = await api.delete(`/customers/${id}/`);
    return res.data;
  }
  
  
export default api;
