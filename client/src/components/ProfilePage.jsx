import { Button, Container } from "react-bootstrap";
import "../profile.css";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    return (
        <Container>
            {/* only change below this line */}

            <h2>Profile Section</h2>
            <div>profile page</div>
            <p>profile details</p>

            <Button as={Link} to="/createProject">
                Create Project
            </Button>

            {/* only change above this line */}
        </Container>
    );
};

export default ProfilePage;
