import React from 'react';
import './App.css';
import { HashRouter,Route,Switch } from 'react-router-dom'
import './static/config'
import 'antd/dist/antd.css';
import loadable from "./static/util/loadbale";
import MainFrame from './pages'

//const Login = loadable(()=>import('./pages/ljh/login'));
const Login = loadable(()=>import('./pages/dzh/login'));
const ForgetPassword = loadable(()=>import('./pages/dzh/forgetPassword'));
const Register = loadable(()=>import('./pages/ljh/register'));


//exact是精确匹配
function App() {
  return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact strict path="/" component={Login} />
            <Route strict path="/sys" component={MainFrame}/>
            <Route strict path="/forgetPassword" component={ForgetPassword}/>
            <Route strict path="/register" component={Register}/>
          </Switch>
        </div>
      </HashRouter>
  );
}

export default App;
