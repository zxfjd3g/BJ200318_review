import  React, {lazy, Suspense} from 'react'
import {Route, NavLink, Redirect, Switch} from 'react-router-dom'
// import RouteComp1 from './pages/RouteComp1'
// import RouteComp2 from './pages/RouteComp2'
import './App.css'


const RouteComp1 = lazy(() => import('./pages/RouteComp1'))
const RouteComp2 = lazy(() => import('./pages/RouteComp2'))


class App extends React.Component {
  
  render(){
    return (
      <div>
        <NavLink to='/rc1/2?count2=3'>RC111</NavLink>&nbsp;&nbsp;
        <NavLink to='/rc2'>RC222</NavLink>

        <hr/>
        <Suspense fallback={<h2>loading...</h2>}>
          <Switch>
            <Route path="/rc1/:count" component={RouteComp1} exact></Route>
            <Route path="/rc2" render={() => <RouteComp2 count3={4}/>}></Route>
            <Redirect to="/rc2"/>
          </Switch>
        </Suspense>
        
      </div>
    )
  }
}


export default App