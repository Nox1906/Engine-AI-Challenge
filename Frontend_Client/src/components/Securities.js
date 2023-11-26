import * as React from 'react';
import clsx from 'clsx';
import Link from '@mui/material/Link';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { colors } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'ticker',
    headerName: 'Symbol',
    width: 120,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <Link href={`/securities/${params.value}`} underline='none'>{params.value}</Link>
    )
  },
  { field: 'securityName', headerName: 'Name', minWidht: 200, flex: 1, headerClassName: 'super-app-theme--header' },
  { field: 'sector', headerName: 'Sector', width: 200, headerClassName: 'super-app-theme--header' },
  { field: 'country', headerName: 'Country', width: 200, headerClassName: 'super-app-theme--header' },
  {
    field: 'trend',
    headerName: 'Trend',
    type: 'number',
    width: 90,
    headerClassName: 'super-app-theme--header',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('super-app', {
        low: params.value < -0.20,
        medium: params.value >= -0.20 && params.value <= 0.20,
        high: params.value > 0.20,
      });
    },
  }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function getPageSizeOptions (f, t) { 
  const pageSizeOptions = Array.from({ length: t / f }, (_, i) =>  f * (i + 1));
  pageSizeOptions.push(t);
  return pageSizeOptions;
}

export default function Securities({ securities }) {

  return (
    <React.Fragment>
      <Box   
        sx={{
          width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(39, 71, 245, 0.8)',
          color: colors.common.white
        },
        '& .super-app.low' : {
          color: 'red'
        },
        '& .super-app.medium' : {
          color: 'green'
        },
        '& .super-app.high' : {
          color: 'blue'
        }
      }}
    >
      <DataGrid
        slots={{ toolbar: CustomToolbar }}
        columnVisibilityModel={{
          id: false,
        }}
        rows={securities}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={getPageSizeOptions(5,securities.length)}
      />
      </Box>
    </React.Fragment>
  );
}
