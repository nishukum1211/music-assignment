import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'musicapp',
  exposes: { './Module': './src/remote-entry.ts' },
};
export default config;
