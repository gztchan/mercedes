import React from 'react';
import { Redirect } from 'react-router-dom';
import AsyncComponent from '@components/dashboard/AsyncComponent';

export default [
  {
    path: '/snippet-list/:cid',
    main: () => <AsyncComponent importComponent={import(/* webpackChunkName: "snippet-list" */ '@components/dashboard/SnippetList')} />
  },
  // {
  //   path: '*',
  //   main: () => <AsyncComponent importComponent={import(/* webpackChunkName: "not-found" */ './pages/NotFound')} />,
  // }
];
