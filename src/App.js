import Signup from "./Components/Login/SignUp";
import Home from './Components/Home/Home'
import { Route } from "react-router-dom";
import RootPage from "./Components/RootPage/Root";
import Login from './Components/Login/Login'
import Gmail from "./Components/Gmail/Gmail";

const App = () => {
  return (
    <RootPage>
      <Route path='/' exact><Home/></Route>
      <Route path='/signup'><Signup/></Route>
      <Route path='/login'><Login/></Route>
      <Route path='/gmail'><Gmail/></Route>
    </RootPage>
  );
}

export default App;
