import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Frame from './components/frame/Index'
import 'antd/dist/antd.css';
import {dashboardRoutes} from "./routes";
import './App.css';
import {isLogined} from './utils/auth'


function App(){
  return isLogined() ? ( 
      <Frame>
      <Switch>
          {dashboardRoutes.map(route => {
          return(
            <Route 
            key={route.path} 
            path={route.path} 
            exact = {route.exact}
            render={routeProps=>{
              return <route.component{...routeProps}/>
            }
          }
            />
          );
        })}
          <Redirect to ={dashboardRoutes[0].path} from="/dashboard"/>
          <Redirect to ="/404" />
        </Switch>
        </Frame>
  ):(
    <Redirect to ="/login" />
  );
}

export default App;