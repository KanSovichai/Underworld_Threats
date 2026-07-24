import Navbar from "../components/Navbar";
import "../styles/HomeVergil.css";
const HomeVergil = (props) => {
    return(
        <div className="vergil_container">
            <div className="navbar_wrapper">
				<Navbar status={props.status} ></Navbar>
            </div>
            
        </div>
    );
}


export default HomeVergil;