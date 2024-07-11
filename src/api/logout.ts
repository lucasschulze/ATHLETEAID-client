import { api } from "@/lib/axios";

export async function signOut() {
  try {
    const { data } = await api.post(`/logout`);
    return data;
  } catch (error) {
    console.error('Erro ao fazer logout na API:', error);
    throw error; 
  }
}