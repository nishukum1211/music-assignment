declare module 'musicapp/Module' {
  import { ComponentType } from 'react';
  export type Role = 'admin' | 'user';
  const MusicContainer: ComponentType<{ role: Role; token: string }>;
  export default MusicContainer;
}
