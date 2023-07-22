
import MainNavbar from "../Header/MainNavbar";

const RootPage=(props)=>{
    return(
        <>
          <MainNavbar/>
          {props.children}
        </>
    )
}

export default RootPage