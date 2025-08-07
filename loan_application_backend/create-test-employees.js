const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Employee = require('./models/employeeLoginModel.js');
require('dotenv').config();

async function createTestEmployees() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test employees
    const testEmployees = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        password: "Password123!",
        userid: "emp001", // Optional: for backward compatibility
        bank: "Wells Fargo"
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "Admin123!",
        userid: "admin",
        bank: "Chase Bank"
      },
      {
        name: "Manager Brown",
        email: "manager@example.com",
        password: "Manager123!",
        userid: "manager",
        bank: "Bank of America"
      },
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: "Sarah123!",
        userid: "emp002",
        bank: "Citibank"
      }
    ];

    for (const empData of testEmployees) {
      // Check if employee already exists (by email or userid)
      const existingEmp = await Employee.findOne({
        $or: [
          { email: empData.email },
          { userid: empData.userid }
        ]
      });
      
      if (existingEmp) {
        console.log(`Employee ${empData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(empData.password, saltRounds);

      // Create employee
      const employee = new Employee({
        name: empData.name,
        email: empData.email,
        password: hashedPassword,
        userid: empData.userid,
        bank: empData.bank,
        role: 'employee'
      });

      await employee.save();
      console.log(`✅ Created employee: ${empData.name} (${empData.email})`);
      console.log(`   Login with email: ${empData.email} or userid: ${empData.userid}`);
      console.log(`   Password: ${empData.password}`);
    }

    console.log('\n🎉 Test employees created successfully!');
    console.log('\nYou can now login with email or userid:');
    console.log('- Email: john.smith@example.com or UserID: emp001, Password: Password123!');
    console.log('- Email: admin@example.com or UserID: admin, Password: Admin123!');
    console.log('- Email: manager@example.com or UserID: manager, Password: Manager123!');
    console.log('- Email: sarah.johnson@example.com or UserID: emp002, Password: Sarah123!');
    console.log('\nExample employee login object:');
    console.log('{ "email": "john.smith@example.com", "password": "Password123!" }');

  } catch (error) {
    console.error('Error creating test employees:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestEmployees();
