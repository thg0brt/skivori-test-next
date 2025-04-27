import { create } from 'zustand'

interface Store {
  api_key: string | null;
  fetchApiKey: () => Promise<void>
}

const useStore = create<Store>((set) => ({
  api_key: null,
  fetchApiKey: async () => {
    try {
      const res = await fetch('/api/env');
      console.log(res);
      const data = await res.json();
      set({api_key: data.api_key});
    }catch (error) {
      console.error('Erro ao buscar a chave:', error);
    }
  }
}))

export default useStore;