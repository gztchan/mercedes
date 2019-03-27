const { remote, clipboard } = window.require('electron')

import Database from '@database';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom'

import { Layout, Row, Modal, Button, Form } from 'antd';

import 'antd/dist/antd.css';
import style from './style.less';

import Sidebar from '@components/dashboard/Sidebar';
import SnippetForm from '@components/dashboard/SnippetForm';

import routes from './routes';

const { Content, Sider } = Layout;

export default class Dashboard extends React.Component {
  render() {
    return (
      <Layout style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 20, background: 'white', boxSizing: 'border-box', display: 'flex' }}>
        <Sider width={250} style={{ zIndex: 1 }}>
          <Sidebar />
        </Sider>
        <Layout style={{ position: 'relative', overflow: 'hidden', height: '100%', padding: 20, background: 'white' }}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={() => {
                const Component = route.main;
                return <Component />;
              }}
            />
          ))}
        </Layout>
      </Layout>
    )
  }
}

Database.init().then(() => {
  ReactDOM.render(
    <HashRouter>
      <Dashboard />
    </HashRouter>,
    document.getElementById('dashboard')
  );
})
