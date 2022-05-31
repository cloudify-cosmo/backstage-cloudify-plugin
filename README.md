# Backstage Cloudify Plugin

Backstage plugin that connects with the Cloudify Manager instance and pulls all available blueprints.  
Blueprints are listed in a table and accesible via a link to the Cloudify Manager.


## Setup

1. Install the Backstage Cloudify Plugin
2. Change following lines in the files to match your credentials:
```ts
// src/components/BlueprintsComponent/BlueprintsComponent.tsx
const CLOUDIFY_MANAGER_URL = 'http://${CLOUDIFY_MANAGER_IP}';
const BACKSTAGE_BACKEND_URL = 'http://${BACKSTAGE_BACKEND_IP}:7007';
```
3. Launch the Backstage app

## Components

### MainComponent

The Main Component displays information about Backstage Cloudify Plugin.  
It also generates and displays a Support Button where you can find following information:
- [Backstage GitHub Issues](https://github.com/backstage/backstage/issues)
- [Cloudify Homepage](https://cloudify.co/)
- [Cloudify Documentation](https://docs.cloudify.co/latest/)
- [Cloudify Contact](https://cloudify.co/contact/)

### BlueprintsComponent

The Blueprints component displays a table with all blueprints available in the connected Cloudify Manager.  
It displays blueprint's icon, ID, main file name, description, and its labels.  
Each element (blueprint) is a direct link to the blueprint's Cloudify Manager page where you can deploy it.
