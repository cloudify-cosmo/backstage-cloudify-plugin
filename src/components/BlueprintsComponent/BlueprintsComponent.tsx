import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';


const CLOUDIFY_MANAGER_URL = 'http://${CLOUDIFY_MANAGER_IP}';
const BACKSTAGE_BACKEND_URL = 'http://${BACKSTAGE_BACKEND_IP}:7007';


const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type Blueprint = {
  id: string;
  main_file_name: string;
  description: string;
  labels: object[];
}

type Label = {
  key: string;
  value: string;
  created_at: string;
  creator_id: number;
}

type DenseTableProps = {
  blueprints: Blueprint[];
};

let resolveLabels = function (rawLabels: Label[]): string {
  var labels = "";
  for (let label of rawLabels) {
    if (label !== undefined) {
      labels += label?.key + ": " + label?.value + "\n";
    }
  }
  return labels;
};

export const DenseTable = ({ blueprints }: DenseTableProps) => {
  const classes = useStyles();
  const columns: TableColumn[] = [
    { title: 'Icon', field: 'icon', width: '50' },
    { title: 'ID', field: 'id' },
    { title: 'Main file Name', field: 'main_file_name' },
    { title: 'Description', field: 'description' },
    { title: 'Labels', field: 'labels' },
  ];

  const data = blueprints.map(blueprint => {
    var img_src = CLOUDIFY_MANAGER_URL + '/console/ba/image/' + blueprint.id
    var blueprint_url = CLOUDIFY_MANAGER_URL
                      + '/console/page/blueprints_blueprint/' + blueprint.id
                      + '?c=%5B%7B%22context%22%3A%7B%7D%7D%2C%7B%22'
                      + 'context%22%3A%7B%22blueprintId%22%3A%22'
                      + blueprint.id + '%22%7D%2C%22pageName%22%3A%22'
                      + blueprint.id + '%22%7D%5D#!'
    return {
      icon: (
        <a href={blueprint_url} target="_blank">
        <img
          src={img_src}
          className={classes.avatar}
          alt={blueprint.id}
        />
        </a>
      ),
      id: (
        <a href={blueprint_url} target="_blank">{blueprint.id}</a>
      ),
      description: blueprint.description || 'Cloudify Blueprint.',
      main_file_name: blueprint.main_file_name,
      labels: resolveLabels(blueprint.labels),
    };
  });

  return (
    <Table
      title="Cloudify Manager Blueprints"
      options={{ search: true, paging: true, pageSize: 5 }}
      columns={columns}
      data={data}
    />
  );
};

export const BlueprintsComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<Blueprint[]> => {

    const response = await fetch(
      BACKSTAGE_BACKEND_URL + '/api/proxy/cloudify/api/blueprints'
      + '?_include=id,description,main_file_name,labels'
    );

    const data = await response.json();
    return data.items;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable blueprints={value || []} />;
};