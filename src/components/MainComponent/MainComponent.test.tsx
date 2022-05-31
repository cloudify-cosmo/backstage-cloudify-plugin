import React from 'react';
import { MainComponent } from './MainComponent';
import { ThemeProvider } from '@material-ui/core';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  setupRequestMockHandlers,
  renderInTestApp,
} from "@backstage/test-utils";
