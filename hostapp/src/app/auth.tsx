import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { Role, TokenPayload } from './types';

type AuthState = {
  token: string | null;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
};

const AuthCtx = createContext<AuthState>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});

const encode = (obj: unknown) => btoa(JSON.stringify(obj));
const decode = (token: string) => JSON.parse(atob(token)) as TokenPayload;

const createToken = (role: Role) => {
  const payload: TokenPayload = {
    sub: role,
    role,
    exp: Date.now() + 1000 * 60 * 60,
  };
  return encode(payload);
};

export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('jwt')
  );
  const role = useMemo<Role | null>(
    () => (token ? decode(token).role : null),
    [token]
  );

  const login = (r: Role) => {
    const t = createToken(r);
    localStorage.setItem('jwt', t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
  };

  const value: AuthState = { token, role, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
