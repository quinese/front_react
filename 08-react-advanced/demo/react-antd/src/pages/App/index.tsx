import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import Home from "../Home";
import Login from "../Login";

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" exact />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}
