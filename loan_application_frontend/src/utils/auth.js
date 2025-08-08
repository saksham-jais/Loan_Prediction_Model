// Authentication utility functions

// Check if user is authenticated with a valid JWT token
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  const employeeData = localStorage.getItem('employeeData');
  
  return !!(token && (userData || employeeData));
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  const employeeData = localStorage.getItem('employeeData');
  
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  if (employeeData) {
    try {
      const employee = JSON.parse(employeeData);
      return { ...employee, role: 'employee' };
    } catch (error) {
      console.error('Error parsing employee data:', error);
      return null;
    }
  }
  
  return null;
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('employeeData');
};

export const verifyToken = async () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await fetch('https://loan-prediction-model-eight.vercel.app/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};
