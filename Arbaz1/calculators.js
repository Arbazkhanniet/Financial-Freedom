// Format number to Indian currency format
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Show result with animation
function showResult(elementId, result) {
    const resultElement = document.getElementById(elementId);
    resultElement.style.display = 'block';
    resultElement.innerHTML = result;
}

// Calculate SIP
function calculateSIP() {
    const amount = parseFloat(document.getElementById('sipAmount').value);
    const returnRate = parseFloat(document.getElementById('sipReturn').value);
    const time = parseFloat(document.getElementById('sipTime').value);

    const monthlyRate = returnRate / 12 / 100;
    const months = time * 12;
    
    const futureValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = amount * months;
    const totalReturns = futureValue - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(futureValue)}
    `;

    showResult('sipResult', result);
}

// Calculate Inflation
function calculateInflation() {
    const presentValue = parseFloat(document.getElementById('presentValue').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);
    const years = parseFloat(document.getElementById('inflationYears').value);

    const futureValue = presentValue * Math.pow(1 + (inflationRate / 100), years);
    const valueReduction = futureValue - presentValue;

    const result = `
        <strong>Results:</strong><br>
        Future Value: ${formatCurrency(futureValue)}<br>
        Value Reduction: ${formatCurrency(valueReduction)}<br>
        Purchasing Power Loss: ${((valueReduction / presentValue) * 100).toFixed(2)}%
    `;

    showResult('inflationResult', result);
}

// Calculate Step-up SIP
function calculateStepupSIP() {
    const initialAmount = parseFloat(document.getElementById('stepupAmount').value);
    const yearlyIncrease = parseFloat(document.getElementById('stepupIncrease').value);
    const returnRate = parseFloat(document.getElementById('stepupReturn').value);
    const time = parseFloat(document.getElementById('stepupTime').value);

    const monthlyRate = returnRate / 12 / 100;
    let totalInvestment = 0;
    let futureValue = 0;

    for (let year = 0; year < time; year++) {
        const yearlyAmount = initialAmount * Math.pow(1 + yearlyIncrease / 100, year);
        for (let month = 0; month < 12; month++) {
            totalInvestment += yearlyAmount;
            futureValue = (futureValue + yearlyAmount) * (1 + monthlyRate);
        }
    }

    const totalReturns = futureValue - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(futureValue)}
    `;

    showResult('stepupResult', result);
}

// Calculate Lumpsum
function calculateLumpsum() {
    const amount = parseFloat(document.getElementById('lumpsumAmount').value);
    const returnRate = parseFloat(document.getElementById('lumpsumReturn').value);
    const time = parseFloat(document.getElementById('lumpsumTime').value);

    const futureValue = amount * Math.pow(1 + (returnRate / 100), time);
    const totalReturns = futureValue - amount;

    const result = `
        <strong>Results:</strong><br>
        Investment Amount: ${formatCurrency(amount)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(futureValue)}<br>
        Return on Investment: ${((totalReturns / amount) * 100).toFixed(2)}%
    `;

    showResult('lumpsumResult', result);
}

// Calculate Marriage Plan
function calculateMarriagePlan() {
    const amount = parseFloat(document.getElementById('marriageAmount').value);
    const years = parseFloat(document.getElementById('marriageYears').value);
    const returnRate = parseFloat(document.getElementById('marriageReturn').value);

    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    
    const monthlyInvestment = (amount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = amount - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Monthly Investment: ${formatCurrency(monthlyInvestment)}<br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(amount)}
    `;

    showResult('marriageResult', result);
}

// Calculate Retirement Plan
function calculateRetirementPlan() {
    const monthlyExpense = parseFloat(document.getElementById('retirementAmount').value);
    const years = parseFloat(document.getElementById('retirementYears').value);
    const returnRate = parseFloat(document.getElementById('retirementReturn').value);

    const yearlyExpense = monthlyExpense * 12;
    const corpusNeeded = yearlyExpense * 25; // 25 years of expenses
    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    
    const monthlyInvestment = (corpusNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = corpusNeeded - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Required Corpus: ${formatCurrency(corpusNeeded)}<br>
        Monthly Investment: ${formatCurrency(monthlyInvestment)}<br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}
    `;

    showResult('retirementResult', result);
}

// Calculate Vacation Plan
function calculateVacationPlan() {
    const amount = parseFloat(document.getElementById('vacationAmount').value);
    const years = parseFloat(document.getElementById('vacationYears').value);
    const returnRate = parseFloat(document.getElementById('vacationReturn').value);

    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    
    const monthlyInvestment = (amount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = amount - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Monthly Investment: ${formatCurrency(monthlyInvestment)}<br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(amount)}
    `;

    showResult('vacationResult', result);
}

// Calculate Car Plan
function calculateCarPlan() {
    const amount = parseFloat(document.getElementById('carAmount').value);
    const years = parseFloat(document.getElementById('carYears').value);
    const returnRate = parseFloat(document.getElementById('carReturn').value);

    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    
    const monthlyInvestment = (amount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = amount - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Monthly Investment: ${formatCurrency(monthlyInvestment)}<br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}<br>
        Future Value: ${formatCurrency(amount)}
    `;

    showResult('carResult', result);
}

// Calculate Emergency Fund
function calculateEmergencyFund() {
    const monthlyExpense = parseFloat(document.getElementById('emergencyAmount').value);
    const months = parseFloat(document.getElementById('emergencyMonths').value);
    const returnRate = parseFloat(document.getElementById('emergencyReturn').value);

    const targetAmount = monthlyExpense * months;
    const monthlyRate = returnRate / 12 / 100;
    
    const monthlyInvestment = (targetAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = targetAmount - totalInvestment;

    const result = `
        <strong>Results:</strong><br>
        Target Amount: ${formatCurrency(targetAmount)}<br>
        Monthly Investment: ${formatCurrency(monthlyInvestment)}<br>
        Total Investment: ${formatCurrency(totalInvestment)}<br>
        Total Returns: ${formatCurrency(totalReturns)}
    `;

    showResult('emergencyResult', result);
}