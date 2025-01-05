import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../utils/fetchProjects"; // Import the createProject function
import "./Project.css";

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        skills: "",
        budget: "",
        duration: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);

        try {
            // Call the createProject function to add the new project
            const result = await createProject(formData);
            console.log("Project created successfully:", result);
            alert("Project submitted successfully!");

            // Redirect to the freelancers page after successful submission
            navigate("/freelancers");
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error occurred while creating the project.");
        }
    };

    return (
        <div className="form-container">
            <h2>Create a New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="Enter project name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter project description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Enter required skills (e.g., React, Node.js)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Budget (₹)</label>
                    <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Enter project budget"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Duration (months)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Enter project duration"
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProjectForm;
