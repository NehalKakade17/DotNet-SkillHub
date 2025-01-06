import axios from "axios";

const BASE_URL = "https://localhost:44338";

// Function to fetch projects from the backend API
const fetchProjects = async () => {
    try {
        const response = await axios.get(`https://localhost:44338/api/User/login`, {
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
        const response = await axios.post(`${BASE_URL}/api/User`, formData, {
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
        // Sending POST request to the backend login API
        const response = await axios.post(
            `${BASE_URL}/api/User/login`, // URL for the backend login endpoint
            credentials, // The login credentials (email & password)
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        // If login is successful, return the response data (e.g., user details)
        return response.data;
    } catch (error) {
        // Handle errors from the request
        // If the error has a response (meaning the server responded with an error)
        const errorMessage = error.response?.data?.message || "Invalid credentials";
        console.error(errorMessage);
        // Throw a new error with the extracted message
        throw new Error(errorMessage);
    }
};


export { fetchProjects, createProject, fetchUsers, loginUser };
