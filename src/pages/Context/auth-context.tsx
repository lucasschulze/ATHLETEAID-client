import { createContext, ReactNode, useEffect, useState } from 'react';
import { getUserLocalStorage, setUserLocalStorage, signIn } from '@/api/sign-in';
import { signOut } from '@/api/logout';
import { useNavigate } from 'react-router-dom';

export interface IUser {
  tipo?: string;
  email?: string;
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, senha: string) {
    try {
      const response = await signIn({ email, senha });
      if (!response.ok) null

      const payload = { token: response.token, email, tipo: response.tipo };

      setUser(payload);
      setUserLocalStorage(payload);

      if (response.tipo === 'atleta') {
        navigate('/campanhas')
      } else if (response.tipo === 'doador'){
        navigate('/campanha-donor')
      }

    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  }

  async function logout() {
    try {
      await signOut();
      setUser(null);
      setUserLocalStorage(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
