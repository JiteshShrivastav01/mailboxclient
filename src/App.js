import Signup from "./Components/Login/SignUp";
import Home from './Components/Home/Home'
import { Route } from "react-router-dom";
import RootPage from "./Components/RootPage/Root";
import Login from './Components/Login/Login'

const App = () => {
  return (
    <RootPage>
      <Route path='/' exact><Home/></Route>
      <Route path='/signup'><Signup/></Route>
      <Route path='/login'><Login/></Route>
    </RootPage>
  );
}

export default App;
