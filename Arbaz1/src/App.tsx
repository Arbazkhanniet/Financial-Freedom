import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

// Format number to Indian currency format
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function App() {
  // SIP Calculator states
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipTime, setSipTime] = useState(10);
  const [sipResult, setSipResult] = useState('');

  // Inflation Calculator states
  const [presentValue, setPresentValue] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [inflationYears, setInflationYears] = useState(10);
  const [inflationResult, setInflationResult] = useState('');

  // Step-up SIP Calculator states
  const [stepupAmount, setStepupAmount] = useState(5000);
  const [stepupIncrease, setStepupIncrease] = useState(10);
  const [stepupReturn, setStepupReturn] = useState(12);
  const [stepupTime, setStepupTime] = useState(10);
  const [stepupResult, setStepupResult] = useState('');

  // Calculate SIP
  const calculateSIP = () => {
    const monthlyRate = sipReturn / 12 / 100;
    const months = sipTime * 12;
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = sipAmount * months;
    const totalReturns = futureValue - totalInvestment;

    setSipResult(`
      Total Investment: ${formatCurrency(totalInvestment)}
      Total Returns: ${formatCurrency(totalReturns)}
      Future Value: ${formatCurrency(futureValue)}
    `);
  };

  // Calculate Inflation
  const calculateInflation = () => {
    const futureValue = presentValue * Math.pow(1 + (inflationRate / 100), inflationYears);
    const valueReduction = futureValue - presentValue;

    setInflationResult(`
      Future Value: ${formatCurrency(futureValue)}
      Value Reduction: ${formatCurrency(valueReduction)}
      Purchasing Power Loss: ${((valueReduction / presentValue) * 100).toFixed(2)}%
    `);
  };

  // Calculate Step-up SIP
  const calculateStepupSIP = () => {
    const monthlyRate = stepupReturn / 12 / 100;
    let totalInvestment = 0;
    let futureValue = 0;

    for (let year = 0; year < stepupTime; year++) {
      const yearlyAmount = stepupAmount * Math.pow(1 + stepupIncrease / 100, year);
      for (let month = 0; month < 12; month++) {
        totalInvestment += yearlyAmount;
        futureValue = (futureValue + yearlyAmount) * (1 + monthlyRate);
      }
    }

    const totalReturns = futureValue - totalInvestment;

    setStepupResult(`
      Total Investment: ${formatCurrency(totalInvestment)}
      Total Returns: ${formatCurrency(totalReturns)}
      Future Value: ${formatCurrency(futureValue)}
    `);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Financial Calculators</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SIP Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SIP Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Investment (₹)</label>
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Return (%)</label>
                <input
                  type="number"
                  value={sipReturn}
                  onChange={(e) => setSipReturn(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Period (Years)</label>
                <input
                  type="number"
                  value={sipTime}
                  onChange={(e) => setSipTime(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={calculateSIP}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate
              </button>
              {sipResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-line">
                  {sipResult}
                </div>
              )}
            </div>
          </div>

          {/* Inflation Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Inflation Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Present Value (₹)</label>
                <input
                  type="number"
                  value={presentValue}
                  onChange={(e) => setPresentValue(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Inflation Rate (%)</label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Years</label>
                <input
                  type="number"
                  value={inflationYears}
                  onChange={(e) => setInflationYears(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={calculateInflation}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate
              </button>
              {inflationResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-line">
                  {inflationResult}
                </div>
              )}
            </div>
          </div>

          {/* Step-up SIP Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Step-up SIP Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Investment (₹)</label>
                <input
                  type="number"
                  value={stepupAmount}
                  onChange={(e) => setStepupAmount(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Yearly Increase (%)</label>
                <input
                  type="number"
                  value={stepupIncrease}
                  onChange={(e) => setStepupIncrease(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Return (%)</label>
                <input
                  type="number"
                  value={stepupReturn}
                  onChange={(e) => setStepupReturn(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Period (Years)</label>
                <input
                  type="number"
                  value={stepupTime}
                  onChange={(e) => setStepupTime(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={calculateStepupSIP}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Calculate
              </button>
              {stepupResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-line">
                  {stepupResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;