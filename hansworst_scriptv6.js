
// Currency conversion
function currencyConversion(amount, fromCurrency, toCurrency, conversionRates) {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const conversionRate = conversionRates[fromCurrency][toCurrency];
  return amount * conversionRate;
}

/// Static product data. To be replaced by live database
const productData = {
  "Venture Debt": {
    price_range: "10 - 15",
    duration_range: "2 - 4",
    description: "Debt financing for early-stage and scale-up companies.",
    dilution: "Dilution: Low",
    covenants: "Covenants: Light",
    io_period: "IO period: 12 months"
  },
  "Growth Debt": {
    price_range: "8 - 12",
    duration_range: "3 - 6",
    description: "Debt financing for high-growth companies.",
    dilution: "Dilution: Low",
    covenants: "Covenants: Moderate",
    io_period: "IO period: 18 months"
  },
  "Unitranche": {
    price_range: "6 - 9",
    duration_range: "5 - 7",
    description: "Single-tranche debt financing combining senior and subordinated debt.",
    dilution: "Dilution: None",
    covenants: "Covenants: Flexible",
    io_period: "IO period: 24 months"
  },
  "Revenue Based Financing": {
    price_range: "6 - 12",
    duration_range: "0.5 - 2",
    description: "Financing based on a percentage of a company's monthly revenue.",
    dilution: "Dilution: None",
    covenants: "Covenants: Light",
    io_period: "IO period: 6 months"
  },
  "Mezzanine": {
    price_range: "10 - 20",
    duration_range: "5 - 10",
    description: "Subordinated debt with equity-like features.",
    dilution: "Dilution: Medium",
    covenants: "Covenants: Flexible",
    io_period: "IO period: 36 months"
  },
  "Bank Loan": {
    price_range: "4 - 8",
    duration_range: "3 - 10",
    description: "Traditional bank loan for businesses.",
    dilution: "Dilution: none",
    covenants: "Covenants: Strict",
    io_period: "IO period: 12 months"
  },
  "Asset Backed": {
    price_range: "5 - 12",
    duration_range: "1 - 10",
    description: "Loans backed by company assets.",
    dilution: "Dilution: None",
    covenants: "Covenants: Moderate",
    io_period: "IO period: 12 months"
  },
  "Growth Bank Loan": {
    price_range: "6 - 10",
    duration_range: "5 - 7",
    description: "Bank loan tailored for high-growth start-ups and scale-ups.",
    dilution: "Dilution: None",
    covenants: "Covenants: Moderate",
    io_period: "IO period: 18 months"
  },
    "Structured Products": {
    price_range: "Variable",
    duration_range: "Variable",
    description: "Customized financing products tailored to specific needs.",
    dilution: "Variable",
    covenants: "Variable",
    io_period: "Variable",
    quantum_range: "Variable"
  }
};

// Filtering Algorithm
function filterLendingProducts(company, conversionRates, outputCurrency, productData) {
  const {
    LTM_revenue,
    LTM_EBITDA,
    ticket_size,
    growth,
    company_type,
    UoF,
    reporting_currency,
    ticket_currency,
    equity_raised
  } = company;

  const LTM_revenue_converted = currencyConversion(LTM_revenue, reporting_currency, outputCurrency, conversionRates);
  const LTM_EBITDA_converted = currencyConversion(LTM_EBITDA, reporting_currency, outputCurrency, conversionRates);
  const ticket_size_converted = currencyConversion(ticket_size, ticket_currency, outputCurrency, conversionRates);

  const products = {
    "Venture Debt": ticket_size_converted >= 1. && (company_type === "start_up" || company_type === "scale_up"),
    "Growth Debt": ticket_size_converted >= 15. && (company_type === "start_up" || company_type === "scale_up"),
    "Unitranche": ticket_size_converted >= 1. && LTM_EBITDA_converted >= 1.,
    "Revenue Based Financing": (company_type === "start_up" || company_type === "scale_up") && LTM_revenue_converted >= 0.1,
    "Mezzanine": ticket_size_converted >= 1. && LTM_EBITDA_converted >= 0.25,
    "Bank Loan": ticket_size_converted >= 1. && LTM_EBITDA_converted >= 0.33,
    "Growth Bank Loan": (company_type === "start_up" || company_type === "scale_up") && growth >= 30 && LTM_revenue_converted >= 10,
    "Asset Backed": Array.isArray(UoF) ? UoF.includes("asset_financing") : UoF === "asset_financing",
    "Structured Products": true
  };

  const filteredProducts = {};

  for (const product in products) {
    if (products[product]) {
      const quantum_range = calculateQuantumRange(product, company, conversionRates, outputCurrency);
      filteredProducts[product] = { ...productData[product], quantum_range };
    }
  }

  return filteredProducts;
}

/// Quantum range calculator
function calculateQuantumRange(product, company, conversionRates, ticketCurrency) {
  const { equity_raised, LTM_revenue, LTM_EBITDA, reporting_currency } = company;

  let quantumRange = "";

  switch (product) {
    case "Venture Debt":
    case "Growth Debt":
      const equityRaisedConverted = currencyConversion(equity_raised, reporting_currency, ticketCurrency, conversionRates);
      const revenueConverted = currencyConversion(LTM_revenue, reporting_currency, ticketCurrency, conversionRates);
      const minQuantum = Math.min(equityRaisedConverted, revenueConverted);
      const maxQuantum = Math.max(equityRaisedConverted, revenueConverted);
      console.log(maxQuantum - minQuantum)
      if (maxQuantum - minQuantum > 1.) {
        quantumRange = `${minQuantum.toFixed(0)} - ${maxQuantum.toFixed(0)}`;
      } else {
        quantumRange = `${minQuantum.toFixed(0)}`;
      }
      break;
    case "Revenue Based Financing":
      const quantum = 0.5 * LTM_revenue;
      const quantumConverted = currencyConversion(quantum, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${quantumConverted.toFixed(0)}`;
      break;
    case "Unitranche":
      const minEBITDA = 3 * LTM_EBITDA;
      const maxEBITDA = 5 * LTM_EBITDA;
      const minEBITDAConverted = currencyConversion(minEBITDA, reporting_currency, ticketCurrency, conversionRates);
      const maxEBITDAConverted = currencyConversion(maxEBITDA, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minEBITDAConverted.toFixed(0)} - ${maxEBITDAConverted.toFixed(0)}`;
      break;
    case "Mezzanine":
      const minMezzanine = 3 * LTM_EBITDA;
      const maxMezzanine = 6 * LTM_EBITDA;
      const minMezzanineConverted = currencyConversion(minMezzanine, reporting_currency, ticketCurrency, conversionRates);
      const maxMezzanineConverted = currencyConversion(maxMezzanine, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minMezzanineConverted.toFixed(0)} - ${maxMezzanineConverted.toFixed(0)}`;
      break;
    case "Bank Loan":
      const minBankLoan = 1 * LTM_EBITDA;
      const maxBankLoan = 3 * LTM_EBITDA;
      const minBankLoanConverted = currencyConversion(minBankLoan, reporting_currency, ticketCurrency, conversionRates);
      const maxBankLoanConverted = currencyConversion(maxBankLoan, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minBankLoanConverted.toFixed(0)} - ${maxBankLoanConverted.toFixed(0)}`;
      break;
    case "Growth Bank Loan":
      const revenueGrowthBankLoan = LTM_revenue;
      const revenueGrowthBankLoanConverted = currencyConversion(revenueGrowthBankLoan, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${revenueGrowthBankLoanConverted.toFixed(0)}`;
      break;
    default:
      break;
  }

  return quantumRange;
}


