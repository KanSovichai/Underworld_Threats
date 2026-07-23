import Navbar from "../components/Navbar";
import "../styles/HomeDante.css";
const Home = (props) => {
    return(
        <div className="container">
            <div className="nav_wrapper">
                <Navbar status={props.status}></Navbar>
            </div>
            <div className="hero_text_container">
                <h1>The devil Hunter</h1>
            </div>
        </div>
    );
}
export default Home;