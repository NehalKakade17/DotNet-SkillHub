import { useState, useEffect } from "react";
import { fetchProjects } from "../utils/fetchProjects"; // Import fetch function
import "../style.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Projects = () => {
    // State for projects, loading, and errors
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [skillFilter, setSkillFilter] = useState(""); // State for search input

    // Fetch projects on component mount
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects(); // Call the fetch function
                setProjects(data); // Update state with fetched projects
            } catch (err) {
                setError(err.message); // Capture any error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        loadProjects();
    }, []); // Empty dependency array ensures fetch happens only once

    // Filtered projects based on the skill filter
    const filteredProjects = projects.filter((project) => {
        const projectData = `${project.projectName ?? ""} ${
            project.description
        } ${project.skills} ${project.budget} ${
            project.duration
        }`.toLowerCase();

        return !skillFilter || projectData.includes(skillFilter.toLowerCase());
    });

    if (loading) return <p>Loading projects...</p>; // Show loading message
    if (error) return <p>Error: {error}</p>; // Show error message

    return (
        <div className="app-container">
            {/* Skill Filter */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Projects"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Projects List */}
            <div>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id} className="job-card">
                            {/* Project Details */}
                            <div className="job-details">
                                <h3>
                                    {project.projectName || "Untitled Project"}
                                </h3>
                                <p>{project.description}</p>
                                <p>
                                    <div className="skills mb-2">
                                        {project.skills
                                            .split(",")
                                            .map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="skill"
                                                >
                                                    {skill.trim()}
                                                    {idx <
                                                        project.skills.split(
                                                            ","
                                                        ).length -
                                                            1 && " • "}
                                                </span>
                                            ))}
                                    </div>
                                </p>
                                <p>
                                    <strong>Bidding Duration:</strong>{" "}
                                    {project.duration} days
                                </p>
                            </div>

                            {/* Price and Bid Button */}
                            <div className="job-actions">
                                <p className="job-price">₹{project.budget}</p>
                                <Button
                                    className="bid-button btn btn-primary"
                                    as={Link}
                                    to="/payment"
                                >
                                    Bid Now
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-jobs">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
