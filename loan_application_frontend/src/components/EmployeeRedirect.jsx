import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeRedirect = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is an employee
    const token = localStorage.getItem('authToken');
    const employeeData = localStorage.getItem('employeeData');
    
    if (token && employeeData) {
      try {
        const employee = JSON.parse(employeeData);
        if (employee.role === 'employee') {
          // Redirect employee to dashboard immediately
          navigate('/employee-dashboard', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error parsing employee data:', error);
      }
    }
  }, [navigate]);

  return children;
};

export default EmployeeRedirect;
