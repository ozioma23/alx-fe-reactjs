import { Outlet, Link } from "react-router-dom";

function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
            <nav>
                <Link to="details">Profile Details</Link> | 
                <Link to="settings">Profile Settings</Link>
            </nav>
            <Outlet /> {/* This will render nested routes */}
        </div>
    );
}

export default Profile;