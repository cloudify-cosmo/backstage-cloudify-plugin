import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

export const cloudifyPlugin = createPlugin({
  id: 'cloudify',
  routes: {
    root: rootRouteRef,
  },
});

export const CloudifyPage = cloudifyPlugin.provide(
  createRoutableExtension({
    name: 'CloudifyPage',
    component: () =>
      import('./components/MainComponent').then(m => m.MainComponent),
    mountPoint: rootRouteRef,
  }),
);
