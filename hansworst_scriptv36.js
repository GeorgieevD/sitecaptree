var quantum_decimals = 0

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
    dilution: "Low",
    covenants: "None",
    io_period: "6-12 months",
    quantum_range_tooltip: "The maximum amount of venture debt you can raise is driven by a combination of raised equity and ARR" 
  },
  "Growth Debt": {
    price_range: "8 - 12",
    duration_range: "3 - 6",
    description: "Debt financing for high-growth companies.",
    dilution: "Low",
    covenants: "Moderate",
    io_period: "12-18 months",
    quantum_range_tooltip: "The maximum amount of growth debt you can raise is driven by a combination of raised equity and ARR" 
  },
  "Unitranche": {
    price_range: "6 - 9",
    duration_range: "5 - 7",
    description: "Single-tranche debt financing combining senior and subordinated debt.",
    dilution: "None",
    covenants: "Flexible",
    io_period: "12-24 months",
    quantum_range_tooltip: "The maximum amount of debt you can raise is primarily driven by LTM EBITDA" 
  },
  "Revenue Based Financing": {
    price_range: "6 - 12",
    duration_range: "0.5 - 2",
    description: "Financing based on a percentage of a company's monthly revenue.",
    dilution: "None",
    covenants: "Light",
    io_period: "<6 months",
    quantum_range_tooltip: "The maximum amount of RBF you can raise is primarily driven by current MRR" 
  },
  "Mezzanine": {
    price_range: "10 - 20",
    duration_range: "5 - 10",
    description: "Subordinated debt with equity-like features.",
    dilution: "Medium",
    covenants: "Flexible",
    io_period: "36 months",
    quantum_range_tooltip: "The maximum amount of mezzanine financing you can raise is primarily driven by LTM EBITDA" 
  },
  "Bank Loan": {
    price_range: "4 - 8",
    duration_range: "3 - 10",
    description: "Traditional bank loan for businesses.",
    dilution: "None",
    covenants: "Strict",
    io_period: "<12 months",
    quantum_range_tooltip: "The maximum amount of debt you can raise is primarily driven by LTM EBITDA"  
  },
  "Asset Backed Loan": {
    quantum_range: "70 - 100",
    price_range: "6 - 12",
    duration_range: "1 - 10",
    description: "Loans backed by company assets.",
    dilution: "None",
    covenants: "Moderate",
    io_period: "<12 months",
    quantum_range_tooltip: "The maximum amount of financing you can raise to finance long-term assets is primarily driven by the quality of the underlying assets" 
  },
  "Growth Bank Loan": {
    price_range: "3 - 6",
    duration_range: "1 - 3",
    description: "Bank loan tailored for high-growth start-ups and scale-ups.",
    dilution: "None",
    covenants: "Strict",
    io_period: "6-18 months",
    quantum_range_tooltip: "The maximum amount of debt you can raise is primarily driven by ARR" 
  },
    "Structured Products": {
    price_range: "Variable",
    duration_range: "Variable",
    description: "Our specialty lenders provide a wide range of products that fall outside of traditional, well-defined products. Select this product if you want to explore a more bespoke financing solution with one of our funding experts.",
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
    "Growth Bank Loan": (company_type === "start_up" || company_type === "scale_up") && growth >= 0.3 && LTM_revenue_converted >= 10,
    "Asset Backed Loan": Array.isArray(UoF) ? UoF.includes("asset_financing") : UoF === "asset_financing",
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
  const { equity_raised, LTM_revenue, LTM_EBITDA, reporting_currency, asset_size } = company;

  let quantumRange = "";

  switch (product) {
    case "Venture Debt":
    case "Growth Debt":
      const equityRaisedConverted = equity_raised ? currencyConversion(equity_raised, reporting_currency, ticketCurrency, conversionRates) : null;
      const revenueConverted = LTM_revenue ? currencyConversion(LTM_revenue, reporting_currency, ticketCurrency, conversionRates) : null;

      if (equityRaisedConverted !== null && revenueConverted !== null) {
        const minQuantum = Math.min(0.4 * equityRaisedConverted, revenueConverted);
        const maxQuantum = Math.max(0.4 * equityRaisedConverted, revenueConverted);
        if (maxQuantum - minQuantum > 1) {
          quantumRange = `${minQuantum.toFixed(quantum_decimals)} - ${maxQuantum.toFixed(quantum_decimals)}`;
        } else {
          quantumRange = `${minQuantum.toFixed(quantum_decimals)}`;
        }
      } else if (equityRaisedConverted !== null) {
        quantumRange = `${equityRaisedConverted.toFixed(quantum_decimals)}`;
      } else if (revenueConverted !== null) {
        quantumRange = `${revenueConverted.toFixed(quantum_decimals)}`;
      } else {
        quantumRange = "TBD"; // You can set this to any placeholder value if both values are null
      }
      break;
    case "Revenue Based Financing":
      const quantum = 0.5 * LTM_revenue;
      const quantumConverted = currencyConversion(quantum, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${quantumConverted.toFixed(quantum_decimals)}`;
      break;
      
    case "Unitranche":
      const minEBITDA = 3 * LTM_EBITDA;
      const maxEBITDA = 5 * LTM_EBITDA;
      const minEBITDAConverted = currencyConversion(minEBITDA, reporting_currency, ticketCurrency, conversionRates);
      const maxEBITDAConverted = currencyConversion(maxEBITDA, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minEBITDAConverted.toFixed(quantum_decimals)} - ${maxEBITDAConverted.toFixed(quantum_decimals)}`;
      break;
    case "Mezzanine":
      const minMezzanine = 3 * LTM_EBITDA;
      const maxMezzanine = 6 * LTM_EBITDA;
      const minMezzanineConverted = currencyConversion(minMezzanine, reporting_currency, ticketCurrency, conversionRates);
      const maxMezzanineConverted = currencyConversion(maxMezzanine, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minMezzanineConverted.toFixed(quantum_decimals)} - ${maxMezzanineConverted.toFixed(quantum_decimals)}`;
      break;
    case "Bank Loan":
      const minBankLoan = 1 * LTM_EBITDA;
      const maxBankLoan = 3 * LTM_EBITDA;
      const minBankLoanConverted = currencyConversion(minBankLoan, reporting_currency, ticketCurrency, conversionRates);
      const maxBankLoanConverted = currencyConversion(maxBankLoan, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${minBankLoanConverted.toFixed(quantum_decimals)} - ${maxBankLoanConverted.toFixed(quantum_decimals)}`;
      break;
    case "Growth Bank Loan":
      const revenueGrowthBankLoan = LTM_revenue;
      const revenueGrowthBankLoanConverted = currencyConversion(revenueGrowthBankLoan, reporting_currency, ticketCurrency, conversionRates);
      quantumRange = `${revenueGrowthBankLoanConverted.toFixed(quantum_decimals)}`;
      break;
     case "Asset Backed Loan":
      const assetSize = asset_size;
      const minLTV = 0.7 * assetSize;
      const maxLTV = 0.9 * assetSize;
      if (isNaN(assetSize)){
        quantumRange = "TBD"
      } else { 
        quantumRange = `${minLTV.toFixed(quantum_decimals)} - ${maxLTV.toFixed(quantum_decimals)}`;
      };
      break;     
    default:
      break;
  }

  return quantumRange;
}

function convertCurrencyToSymbol(currency) {
  if (currency === 'EUR') {
    return '€';
  } else if (currency === 'USD') {
    return '$';
  } else if (currency === 'GBP') {
    return '£';
  } else {
    return null;
  }
}

function createCopiesFromDict(inputDict) {
	
  // Get the template element to copy
  var templateElement = document.querySelector(".product-template");
  console.log(document.querySelectorAll(".product-template"))	
	
  // Remove all existing copies of the product_box element
  var copiedElements = document.querySelectorAll(".product-box-copy");
  if (copiedElements.length > 0) {
    copiedElements.forEach(function(copiedElement) {
      copiedElement.remove();
    });
  }
  console.log(templateElement)
  // Define the number of copies to make
  var number_of_elements = Object.keys(inputDict).length;
	document.getElementById("text_products").innerHTML = String(number_of_elements)+" lending products";

  // Loop through the number of copies to make
  for (var i = 0; i < number_of_elements; i++) { // subtract 1 for the original element

    // Clone the original element and its children
    var copiedElement = templateElement.cloneNode(true);
    
    // Get the product name for this copy
    var productName = Object.keys(inputDict)[i];

    // Add the 'product-box-copy' class to the copied element
    copiedElement.classList.add("product-box-copy");
	  
    // Modify the ID names and textbox content of the copied elements
    var elementsToModify = copiedElement.querySelectorAll("*[id]");
    elementsToModify.forEach(function(element) {
      var oldId = element.getAttribute("id");
      var newId = oldId + "-" + productName;
      element.setAttribute("id", newId);

      // If this element is a textbox with content that should change,
      // update its content based on the input dictionary
      if (oldId === "product_name") {
        element.innerHTML = productName;
      } else if (oldId === "product_quantum") {
        element.innerHTML = inputDict[productName].quantum_range;
      } else if (oldId === "product_apr") {
        element.innerHTML = inputDict[productName].price_range;
      } else if (oldId === "product_maturity") {
        element.innerHTML = inputDict[productName].duration_range;
      } else if (oldId === "product_description") {
        element.innerHTML = inputDict[productName].description;       
      } else if (oldId === "product_dilution") {
        element.innerHTML = inputDict[productName].dilution;
      } else if (oldId === "product_covenants") {
        element.innerHTML = inputDict[productName].covenants;            
      } else if (oldId === "product_io_period") {
        element.innerHTML = inputDict[productName].io_period;            
      } else if (oldId === "product_check") {
        element.setAttribute('name', productName);
        element.setAttribute('data-name', productName);
      } else if (oldId === "tooltip_rate") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Estimated annual interest rate on the loan, excluding any entry/exit fees, prepayment penalties, or any equity dilution" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"
      } else if (oldId === "tooltip_duration") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Estimated time until maturity in years" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"    
      } else if (oldId === "tooltip_dilution") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Some loan products include a return component that is dilutive to the equity, such as a warrant or call option" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"        
      } else if (oldId === "tooltip_covenants") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Covenants are restrictive rules that prohibit the issuer from taking certain financial actions until maturity or repayment to protect the lender" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"        
        
      } else if (oldId === "quantum_unit") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = inputDict[productName].quantum_range_tooltip 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"
        
      } else if (productName == "Structured Products"){
      	if (oldId === "product_terms") {       	
        	element.style.display = "none"
        }
      }
    });

    // Insert the copied element directly after the template element
    templateElement.insertAdjacentElement('beforebegin', copiedElement);
  }	  
}


function orderDict(inputDict, order_setting, direction) {
  var orderedKeys = Object.keys(inputDict);
  
  if (order_setting === "quantum") {
    orderedKeys.sort(function(a, b) {
      var quantumA = inputDict[a].quantum_range.split("-")[1];
      var quantumB = inputDict[b].quantum_range.split("-")[1];
      if (direction === "ascending") {
        return quantumA - quantumB;
      } else {
        return quantumB - quantumA;
      }
    });
  } else if (order_setting === "rate") {
    orderedKeys.sort(function(a, b) {
      var priceA = inputDict[a].price_range.split("-")[0];
      var priceB = inputDict[b].price_range.split("-")[0];
      if (direction === "ascending") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  } else {
    // default to alphabetical order
    orderedKeys.sort();
  }

  var structuredProductsIndex = orderedKeys.indexOf("Structured Products");
  if (structuredProductsIndex !== -1) {
    orderedKeys.splice(structuredProductsIndex, 1);
    orderedKeys.push("Structured Products");
  }

  var orderedDict = {};
  for (var i = 0; i < orderedKeys.length; i++) {
    orderedDict[orderedKeys[i]] = inputDict[orderedKeys[i]];
  }
  
  return orderedDict;
}