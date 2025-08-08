const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/user/traindata';
const CSV_FILE = 'loan.csv'; // CSV file path — ensure columns match your schema

// Map and convert CSV row to schema-compatible object
function processRow(row) {
  return {
    Age: row.Age !== undefined ? Number(row.Age) : undefined,
    AnnualIncome: row.AnnualIncome !== undefined ? Number(row.AnnualIncome) : undefined,
    Creditscore: row.Creditscore !== undefined ? Number(row.Creditscore) : undefined,
    EmploymentStatus: row.EmploymentStatus || '',
    EducationLevel: row.EducationLevel || '',
    LoanAmount: row.LoanAmount !== undefined ? Number(row.LoanAmount) : undefined,
    LoanDuration: row.LoanDuration !== undefined ? Number(row.LoanDuration) : undefined,
    CreditCardUtilizationRate: row.CreditCardUtilizationRate !== undefined ? Number(row.CreditCardUtilizationRate) : undefined,
    BankruptcyHistory: row.BankruptcyHistory === 'true' || row.BankruptcyHistory === '1',
    PreviousLoanDefaults: row.PreviousLoanDefaults === 'true' || row.PreviousLoanDefaults === '1',
    LengthOfCreditHistory: row.LengthOfCreditHistory !== undefined ? Number(row.LengthOfCreditHistory) : undefined,
    TotalLiabilities: row.TotalLiabilities !== undefined ? Number(row.TotalLiabilities) : undefined,
    NetWorth: row.NetWorth !== undefined ? Number(row.NetWorth) : undefined,
    InterestRate: row.InterestRate !== undefined ? Number(row.InterestRate) : undefined,
    LoanApproved: row.LoanApproved === 'true' || row.LoanApproved === '1',
    RiskScore: row.RiskScore !== undefined ? Number(row.RiskScore) : undefined,
  };
}

async function postCsvData() {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on('data', (row) => rows.push(processRow(row)))
      .on('end', async () => {
        console.log(`Read ${rows.length} rows from CSV.`);

        try {
          for (const [index, userData] of rows.entries()) {
            try {
              const response = await axios.post(SERVER_URL, userData);
              console.log(`Row ${index + 1}: Successfully posted, status: ${response.status}`);
            } catch (error) {
              if (error.response) {
                console.error(`Row ${index + 1}: Failed with status ${error.response.status} -`, error.response.data);
              } else {
                console.error(`Row ${index + 1}: Request error -`, error.message);
              }
            }
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

postCsvData()
  .then(() => {
    console.log('All CSV data posted successfully.');
  })
  .catch((err) => {
    console.error('Error posting CSV data:', err);
  });