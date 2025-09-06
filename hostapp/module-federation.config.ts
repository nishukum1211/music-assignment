import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'hostapp',
  remotes: ['musicapp'],
  shared: (lib, config) => {
    // Keep React singletons
    if (lib === 'react' || lib === 'react-dom') {
      config.singleton = true;
      config.strictVersion = true;
    }
    return config;
  },
};

export default config;
