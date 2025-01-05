import axios from "axios";

const BASE_URL = "http://localhost:5217";

// Function to fetch projects from the backend API
const fetchProjects = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/project/getAll`, {
            withCredentials: true,
        });
        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        throw error; // Propagate the error for handling
    }
};

// Function to create a new project by sending data to the backend API
const createProject = async (projectData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/project`, // Endpoint for creating a project
            projectData,
            { withCredentials: true } // Include credentials (if necessary)
        );
        return response.data; // Return response data or success message
    } catch (error) {
        console.error("Error creating project:", error.message);
        throw error; // Propagate the error for handling
    }
};

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const postUserDetails = async (formData) => {
    try {
        const response = await axios.post("https://localhost:44338/api/User", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data; // Return the response data or success message
    } catch (error) {
        console.error("Error posting user details:", error.message);
        throw error; // Propagate the error for handling
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `https://localhost:44338/api/User/login`,
            credentials,
            {
                withCredentials: true,
            }
        );
        return response.data; // Return the response data (e.g., user details or success message)
    } catch (error) {
        // Extract error message from response or default to a generic message
        const errorMessage =
            error.response?.data?.message || "Invalid credentials";
        throw new Error(errorMessage);
    }
};

export { fetchProjects, createProject, fetchUsers, loginUser };
