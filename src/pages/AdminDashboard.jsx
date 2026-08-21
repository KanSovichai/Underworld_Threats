import "../styles/AdminDashboard.css";
import UsersDashboardData from "../components/UsersDashboardData";
import ProductsDashboardData from "../components/ProductsDashboardData";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("users"); // default active

    return (
        <div className="dashboard_container">
            <div className="admin_nav">
                <h2 id="dashboard_text">Dashboard</h2>
                <ul className="dashboard_ul">
                    <li 
                        id="users_li"
                        className={activeTab === "users" ? "active" : ""}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </li>
                    <li 
                        id="products_li"
                        className={activeTab === "products" ? "active" : ""}
                        onClick={() => setActiveTab("products")}
                    >
                        Products
                    </li>
                </ul>
            </div>

            {activeTab === "users" && <UsersDashboardData />}
            {activeTab === "products" && <ProductsDashboardData />}
        </div>
    );
}

export default Dashboard;