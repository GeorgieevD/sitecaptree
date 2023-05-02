
var quantum_decimals = 0
var range_setting = false

// Currency conversion
function currencyConversion(amount, fromCurrency, toCurrency, conversionRates) {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const conversionRate = conversionRates[fromCurrency][toCurrency];
  return amount * conversionRate;
}


//function to get min or max from an array 
function getMin(arr){
  let minimum = Math.min(...arr);
  let result = minimum; 
  return result;
};

function getMax(arr){
  let maximum = Math.max(...arr);
  let result = maximum; 
  return result;
};


//This function is used to convert the min/max range into a string and also validates the inputs 

function rangeConverter(quantum_range, range, decimals) {
  // Check if quantum_range is not a valid range
  if (!Array.isArray(quantum_range) || quantum_range.length !== 2) {
    return null;
  }

  // Check if any item in quantum_range is null, NaN, or undefined
  const isValidRange = quantum_range.every((item) => item !== null && !isNaN(item) && item !== undefined);

  if (!isValidRange) {
    const validValue = quantum_range.find((item) => item !== null && !isNaN(item) && item !== undefined);
    if (validValue !== undefined) {
      return validValue.toFixed(decimals).toString();
    } else {
      return 'TBD';
    }
  }

  const minQuantum = quantum_range[0];
  const maxQuantum = quantum_range[1];

  if (range && minQuantum === maxQuantum) {
    return minQuantum !== undefined ? minQuantum.toFixed(decimals).toString() : 'TBD';
  }

  const output = range ? `${minQuantum.toFixed(decimals)} - ${maxQuantum.toFixed(decimals)}` : maxQuantum.toFixed(decimals).toString();
  return output;
}

/// Static product data. To be replaced by live database
const productData = {
  "Venture Debt": {
    price_range: [10, 15],
    duration_range: "2 - 4",
    description: "Debt financing for early-stage and scale-up companies",
    dilution: "Low",
    covenants: "None",
    io_period: "6-12 months",
    quantum_range_tooltip: "The maximum amount of venture debt you can raise is driven by a combination of raised equity and ARR",
    ranking: "senior",
    ranking_tooltip: ""		  
  },
  "Growth Debt": {
    price_range: [8, 12],
    duration_range: "3 - 6",
    description: "Debt financing for high-growth companies",
    dilution: "Low",
    covenants: "Moderate",
    io_period: "12-18 months",
    quantum_range_tooltip: "The maximum amount of growth debt you can raise is driven by a combination of raised equity and ARR",
    ranking: "senior",
    ranking_tooltip: ""		  	  
  },
  "Unitranche": {
    price_range: [6, 9],
    duration_range: "5 - 7",
    description: "Single-tranche debt financing combining senior and subordinated debt",
    dilution: "None",
    covenants: "Flexible",
    io_period: "12-24 months",
    quantum_range_tooltip: "The maximum amount of debt you can raise is primarily driven by LTM EBITDA",
    ranking: "senior",
    ranking_tooltip: ""		  	  
  },
  "Revenue Based Financing": {
    price_range: [6, 12],
    duration_range: "0.5 - 2",
    description: "Financing based on a percentage of a company's monthly revenue",
    dilution: "None",
    covenants: "Light",
    io_period: "<6 months",
    quantum_range_tooltip: "The maximum amount of RBF you can raise is primarily driven by current MRR",
    ranking: "junior",
    ranking_tooltip: "Can be raised as stand-alone facility or added on top of existing or newly raised senior debt"		  	  
  },
  "Mezzanine": {
    price_range: [10, 20],
    duration_range: "5 - 8",
    description: "Subordinated debt with sometimes equity-like features",
    dilution: "Possible",
    covenants: "Flexible",
    io_period: "36 months",
    quantum_range_tooltip: "The maximum amount of mezzanine financing is primarily driven by LTM EBITDA",
    ranking: "junior",
    ranking_tooltip: "Typically raised on top of a new bank loan or existing debt"		  	  	  
  },
  "Bank Loan": {
    price_range: [4, 8],
    duration_range: "1 - 5",
    description: "Traditional bank loan for businesses",
    dilution: "None",
    covenants: "Strict",
    io_period: "<12 months",
    quantum_range_tooltip: "The maximum amount of debt is primarily driven by LTM EBITDA",
    ranking: "senior",
    ranking_tooltip: ""		  	  	  	  
  },
  "Asset Backed Loan": {
    quantum_range: [70, 100],
    price_range: [5, 12],
    duration_range: "2 - 5",
    description: "Debt that is secured by your debtor book or fixed assets",
    dilution: "None",
    covenants: "Moderate",
    io_period: "<12 months",
    quantum_range_tooltip: "The maximum amount of financing is primarily driven by the quality and value of the underlying assets", 
    ranking: "senior",
    ranking_tooltip: ""		  	  	  	  	  
  },
  "Growth Bank Loan": {
    price_range: [3, 6],
    duration_range: "1 - 3",
    description: "Bank loan tailored for high-growth start-ups and scale-ups",
    dilution: "None",
    covenants: "Strict",
    io_period: "6-18 months",
    quantum_range_tooltip: "The maximum amount of debt you can raise is primarily driven by ARR",
    ranking: "senior",
    ranking_tooltip: ""		  	  	  	  	  
  },
    "Specialty Financing": {
    price_range: "Variable",
    duration_range: "Variable",
    description: "Our specialty lenders indicated that they want to lend to companies like yours. Select this product if you want to explore a bespoke solution with our funding experts",
    dilution: "Variable",
    covenants: "Variable",
    io_period: "Variable",
    quantum_range: "Variable",
    ranking: "",
    ranking_tooltip: ""		    
  }
};

// Filtering Algorithm
function filterLendingProducts(company, productData) {
  const {
    LTM_revenue,
    LTM_EBITDA,
    ticket_size,
    growth,
    company_type,
    reporting_currency,
    ticket_currency,
    equity_raised,
    asset_size,
    ABL_RE,
    ABL_inventory,
    ABL_AR,
    ABL_equipment	      		 
  } = company;

  const products = {
    "Venture Debt": ticket_size >= 1. && ((company_type === "start_up" || company_type === "scale_up") || growth >= 0.25),
    "Growth Debt": ticket_size >= 15. && ((company_type === "start_up" || company_type === "scale_up") || growth >= 0.25),
    "Unitranche": ticket_size >= 1. && LTM_EBITDA >= 1.,
    "Revenue Based Financing": (company_type === "start_up" || company_type === "scale_up") && LTM_revenue >= 0.1,
    "Mezzanine": ticket_size >= 1. && LTM_EBITDA >= 0.25,
    "Bank Loan": ticket_size >= 1. && LTM_EBITDA >= 0.33,
    "Growth Bank Loan": (company_type === "start_up" || company_type === "scale_up") && growth >= 0.3 && LTM_revenued >= 10,
    "Asset Backed Loan": asset_size >= 1.,
    "Specialty Financing": true
  };

  const filteredProducts = {};

  for (const product in products) {
    if (products[product]) {
      const quantum_range = calculateQuantumRange(product, company);
      const quantum_met = (quantum_range[1]>=ticket_size)    
      filteredProducts[product] = { ...productData[product], quantum_range, quantum_met };
    }
  }

  return filteredProducts;
}

/// Quantum range calculator
function calculateQuantumRange(product, company) {
  const { equity_raised, LTM_revenue, LTM_EBITDA, reporting_currency, asset_size, ABL_RE, ABL_AR, ABL_inventory, ABL_equipment } = company;
  
  let quantumRange = "";
  let minQ = 0
  let maxQ = 0
  switch (product) {
    case "Venture Debt":
    case "Growth Debt":
      minQ = Math.min(0.4 * equity_raised, LTM_revenue);
      maxQ = Math.max(0.4 * equity_raised, LTM_revenue);
      quantumRange = [minQ, maxQ]
      break;
    case "Revenue Based Financing":
      maxQ = 0.5 * LTM_revenue;
      quantumRange = [maxQ, maxQ];
      break;
    case "Unitranche":
      minQ = 3 * LTM_EBITDA;
      maxQ = 5 * LTM_EBITDA;
      quantumRange = [minQ, maxQ];
      break;
    case "Mezzanine":
      minQ = 1 * LTM_EBITDA;
      maxQ = 2 * LTM_EBITDA;
      quantumRange = [minQ, maxQ];
      break;
    case "Bank Loan":
      minQ = 1 * LTM_EBITDA;
      maxQ = 3 * LTM_EBITDA;
      quantumRange = [minQ, maxQ];
      break;
    case "Growth Bank Loan":
      maxQ = LTM_revenue;
      quantumRange = [maxQ, maxQ];
      break;
     case "Asset Backed Loan":
      const LTVlist = [];
      let minLTV = 0
      let maxLTV = 0
      if (ABL_RE == true){LTVlist.push(0.75)};
      if (ABL_AR == true){LTVlist.push(0.9)};
      if (ABL_equipment == true){LTVlist.push(0.85)};
      if (ABL_inventory == true){LTVlist.push(0.75)};
      if (LTVlist.length >=2){
       maxLTV = getMax(LTVlist)
       minLTV = getMin(LTVlist)
       } else {
	  maxLTV = LTVlist[0]
	  minLTV = maxLTV
	  };
      minQ = minLTV * asset_size;
      maxQ = maxLTV * asset_size;
      quantumRange = [minQ, maxQ];  
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
  var templateElement = document.getElementById("product_template");		
	
  // Remove all existing copies of the product_box element
  var copiedElements = document.querySelectorAll(".product-box-copy");
  if (copiedElements.length > 0) {
    copiedElements.forEach(function(copiedElement) {
      copiedElement.remove();
    });
  }
  // Define the number of copies to make
  var number_of_elements = Object.keys(inputDict).length;
	if (number_of_elements >=2) {
	 document.getElementById("text_products").innerHTML = String(number_of_elements)+" loan products"} 
	else {document.getElementById("text_products").innerHTML = String(number_of_elements)+" loan product"};		

  // Loop through the number of copies to make
  for (var i = 0; i < number_of_elements; i++) { // subtract 1 for the original element

    // Clone the original element and its children
    var copiedElement = templateElement.cloneNode(true);
    
    // Get the product name for this copy
    var productName = Object.keys(inputDict)[i];
	
    // change the ID of the copied element  
    var newId = "copied product " + productName;
    copiedElement.setAttribute("id", newId);      
	  
    // Add the 'product-box-copy' class to the copied element
    copiedElement.classList.add("product-box-copy");
    	  
    // Check for accolades to be displayed or not
    var quantumAccolade = document.getElementById("quantum_accolade");		
    var rateAccolade = document.getElementById("rate_accolade");		
    var rankingAccolade = document.getElementById("ranking_accolade");		
	 	  
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
      } else if (oldId === "quantum_accolade") {
        	element.style.display = 'none'
		if (inputDict[productName].quantum_met){
	  		element.style.display = "flex"
		        element.style.zIndex = "0"} 		      
      } else if (oldId === "rate_accolade") {
        	element.style.display = 'none'
	        element.style.zIndex = "0" 
	        if (findLowestRateRow(inputDict) === productName){
	      		element.style.display = "flex"} 		      
      } else if (oldId === "ranking_accolade") {
        	element.style.display = 'none'
	        element.style.zIndex = "0"
	        if (inputDict[productName].ranking == 'junior'){
	      		element.style.display = "flex"}
      } else if (oldId === "product_quantum") {
        element.innerHTML = rangeConverter(inputDict[productName].quantum_range, range_setting, quantum_decimals);	      
      } else if (oldId === "product_apr") {
        element.innerHTML = rangeConverter(inputDict[productName].price_range, true, 0)
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
				quantum_tooltip_text.innerHTML = "The period between the first drawdown of the loan and repayment of the loan in full" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"    
      } else if (oldId === "tooltip_dilution") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Some loans include a return component that dilutes equity, such as warrants or call options" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"        
      } else if (oldId === "tooltip_covenants") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = "Financial covenants require the borrower to maintain specified credit ratios, such as a minimum cash balance or leverage ratio" 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"        
        
      } else if (oldId === "quantum_unit") {
				var quantum_tooltip_text = document.createElement('span')
				quantum_tooltip_text.innerHTML = inputDict[productName].quantum_range_tooltip 
        element.appendChild(quantum_tooltip_text);
        quantum_tooltip_text.className ="tooltiptext"
	      
      } else if (oldId === "ranking_tooltip") {
				var tooltip_text = document.createElement('span')
				tooltip_text.innerHTML = inputDict[productName].ranking_tooltip 
        element.appendChild(tooltip_text);
        tooltip_text.className ="tooltiptext"        
      } else if (productName == "Specialty Financing"){
      	if (oldId === "product_terms") {       	
        	element.style.display = "none"
        }
      }
    });

    // Insert the copied element directly after the template element
    templateElement.insertAdjacentElement('beforebegin', copiedElement);
  }	  
}

function findLowestRateRow(inputDict) {
  var lowestRateKey = null;

  for (var key in inputDict) {
    var row = inputDict[key];
    var price = row.price_range[0]; // Get the minimum value of the price range

    if (lowestRateKey === null || price < inputDict[lowestRateKey].price_range[0]) {
      lowestRateKey = key;
    }
  }

  return lowestRateKey;
}

function orderDict(inputDict, order_setting) {
  var orderedKeys = Object.keys(inputDict);

  if (order_setting === "quantum") {
    orderedKeys.sort(function(a, b) {
      var quantumA = inputDict[a].quantum_range[1];
      var quantumB = inputDict[b].quantum_range[1];
      return quantumB - quantumA; // Descending order based on the top of the range
    });
  } else if (order_setting === "price") {
    orderedKeys.sort(function(a, b) {
      var priceA = inputDict[a].price_range[0];
      var priceB = inputDict[b].price_range[0];
      return priceA - priceB; // Ascending order based on the lowest point of the range
    });
  } else {
    orderedKeys.sort();
  }

  var orderedDict = {};
  var specialtyFinancingRow = null;

  for (var i = 0; i < orderedKeys.length; i++) {
    var key = orderedKeys[i];
    var row = inputDict[key];

    if (key === "Specialty Financing") {
      specialtyFinancingRow = row;
    } else {
      orderedDict[key] = row;
    }
  }

  if (specialtyFinancingRow !== null) {
    orderedDict["Specialty Financing"] = specialtyFinancingRow;
  }

  return orderedDict;
}
