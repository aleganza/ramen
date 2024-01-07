import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ramen.ramen',
  appName: 'ramen',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
