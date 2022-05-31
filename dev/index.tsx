import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { cloudifyPlugin, CloudifyPage } from '../src/plugin';

createDevApp()
  .registerPlugin(cloudifyPlugin)
  .addPage({
    element: <CloudifyPage />,
    title: 'Root Page',
    path: '/cloudify'
  })
  .render();
