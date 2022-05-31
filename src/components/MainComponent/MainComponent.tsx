import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { BlueprintsComponent } from '../BlueprintsComponent';

export const MainComponent = () => (
  <Page themeId="website">
    <Header title="Cloudify" subtitle="Backstage Cloudify plugin developed by Cloudify">
      <HeaderLabel label="Owner" value="Cloudify" />
    </Header>
    <Content>
      <ContentHeader title="Cloudify Backstage dashboard">
        <SupportButton>Cloudify Plugin provides a list of all blueprints from Cloudify Manager.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Cloudify plugin">
            <Typography variant="body1">
              Cloudify Plugin provides a list of all blueprints from Cloudify Manager.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <BlueprintsComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);