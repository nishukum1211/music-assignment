export type Role = 'admin' | 'user';

export type TokenPayload = {
  sub: string;
  role: Role;
  exp: number;
};
