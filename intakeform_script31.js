
	
var page_number = 0;
/* page 1 elements */

const raise_wrapper = document.getElementById("raise_wrapper")
const Raise_currency_wrapper = document.getElementById("Raise_currency_wrapper")
const Ticket_EUR = document.getElementById("Ticket_EUR")
const Ticket_GBP = document.getElementById("Ticket_GBP")
const Ticket_USD = document.getElementById("Ticket_USD")
const uof_assets = document.getElementById("uof_assets")

Raise_currency_wrapper.style.display="none"


/* page 2 elements */
const p2_first_block = document.getElementById("p2_first_block")
const funding_timing = document.getElementById("funding_timing_block")
funding_timing.style.visibility="hidden"

/* page 3 elements */

const grid_wapper_p3 = document.getElementById("grid_wrapper_p3")
const Reporting_currency_wrapper = document.getElementById("Reporting_currency_wrapper")
const Reporting_EUR = document.getElementById("Reporting_EUR")
const Reporting_GBP = document.getElementById("Reporting_GBP")
const Reporting_USD = document.getElementById("Reporting_USD")
Reporting_currency_wrapper.style.visibility="hidden"

/* page 4 elements */
const year_wrapper = document.getElementById("year_wrapper")
const company_size_wrapper = document.getElementById("company_size_wrapper")
const ct_other_button = document.getElementById("company_type_other")
const ct_other_div = document.getElementById("company_type_other_div")
company_size_wrapper.style.visibility="hidden"
ct_other_div.style.visibility="hidden"

/* page 5 elements */
const p5_first_block = document.getElementById("p5_first_block")
const rev_recurring = document.getElementById("rev_recurring")
const churn_wrapper = document.getElementById("churn_wrapper")
const Recurring_20 = document.getElementById("Recurring_20")
const Recurring_20_50 = document.getElementById("Recurring_20-50")
const Recurring_50_80 = document.getElementById("Recurring_50-80")
const Recurring_80 = document.getElementById("Recurring_80")
const Recurring_NA = document.getElementById("Recurring_NA")

rev_recurring.style.visibility="hidden"
churn_wrapper.style.display="none"

/* page 6 elements */
const p6_first_block = document.getElementById("p6_first_block")
const EBITDA_wrapper_1 = document.getElementById("EBITDA_wrapper_1")
const EBITDA_wrapper_2 = document.getElementById("EBITDA_wrapper_2")
const prof_yes_button = document.getElementById("prof_yes_button")
EBITDA_wrapper_1.style.display="none"
EBITDA_wrapper_2.style.display="none"

/* page 7elements */
const p7_first_block = document.getElementById("p7_first_block")
const cf_negative = document.getElementById("cf_negative")
const cf_positive = document.getElementById("cf_positive")
const cf_not_sure = document.getElementById("cf_not_sure")
const cashflow_wrapper = document.getElementById("cashflow_wrapper")
const runway_wrapper = document.getElementById("runway_wrapper")

cashflow_wrapper.style.display="none"
runway_wrapper.style.display="none"


/* page 8 elements */
const p8_first_block = document.getElementById("p8_first_block")
const equity_wrapper = document.getElementById("equity_wrapper")
const cap_wrapper = document.getElementById("cap_wrapper")
cap_wrapper.style.visibility="hidden"
equity_wrapper.style.visibility="hidden"

/* page 9 elements */
const p9_first_block = document.getElementById("p9_first_block")
const asset_type_NA = document.getElementById("asset_type_NA")
const asset_wrapper = document.getElementById("asset_wrapper")
asset_wrapper.style.display="none"


function QuestionCheck(page_number) {
	if (page_number == 0){
    if (count_inputs("p1_first_block") > 0) {
      Raise_currency_wrapper.style.display="flex"}
    if (count_inputs("p1_first_block") == 0) {
      Raise_currency_wrapper.style.display="none"
      next_button.style.visibility="hidden"}
    if (Ticket_EUR.checked){
    	ticket_currency = '€'
      }
    if (Ticket_USD.checked){
    	ticket_currency = '$'
      }      
    if (Ticket_GBP.checked){
    	ticket_currency = '£'
      } 
    if (count_inputs("Raise_currency_wrapper") > 0) {
      TicketCurrencyMasks(ticket_currency)
      next_button.style.visibility="visible"
      }
  }    
	if (page_number == 1){
    prev_button.style.visibility="visible"
    if (count_inputs("raise_wrapper") > 0) {
    	funding_timing.style.visibility="visible"}
    if (count_inputs("raise_wrapper") == 0) {
      funding_timing.style.visibility="hidden"
      next_button.style.visibility="hidden"}
    if (count_inputs("funding_timing_block") > 0) {
      next_button.style.visibility="visible"}
    if (count_inputs("funding_timing_block") == 0) {
      next_button.style.visibility="hidden"} 
	}
	if (page_number == 2){
    if (count_inputs("company_name_wrapper") + count_inputs("country_wrapper") == 2 ) {
      Reporting_currency_wrapper.style.visibility="visible"}
    if (count_inputs("company_name_wrapper") + count_inputs("country_wrapper") < 2 ) {
			next_button.style.visibility="hidden"
      Reporting_currency_wrapper.style.visibility="hidden"
      }
    if (Reporting_EUR.checked){
    	reporting_currency = '€'
      }
    if (Reporting_USD.checked){
    	reporting_currency = '$'
      }      
    if (Reporting_GBP.checked){
    	reporting_currency = '£'
      } 
    if (count_inputs("Reporting_currency_wrapper") > 0) {
      ReportingCurrencyMasks(reporting_currency)
      next_button.style.visibility="visible"
      }      
  }      
  
	if (page_number == 3){
    if (count_inputs("year_wrapper") > 0) {
      company_size_wrapper.style.visibility="visible"}
    if (count_inputs("year_wrapper") == 0) {
      company_size_wrapper.style.visibility="hidden"}
    if (count_inputs("company_size_wrapper") > 0 && ct_other_button.checked == false) {
      next_button.style.visibility="visible"}
    if (count_inputs("company_size_wrapper") <= 0) {
      next_button.style.visibility="hidden"} 
    if (ct_other_button.checked) {
      ct_other_div.style.visibility="visible";
      if (count_inputs("company_type_other_div") > 0){
      next_button.style.visibility="visible"}
      else {next_button.style.visibility="hidden"}
    }  
    else { 
    ct_other_div.style.visibility="hidden"}   
	} 
	if (page_number == 4){
    if (count_inputs("p4_first_block") > 0) {
      next_button.style.visibility="visible"}
    if (count_inputs("p4_first_block") == 0) {
      next_button.style.visibility="hidden"}
	}
	if (page_number == 5){
    if (Recurring_20.checked || Recurring_NA.checked) {
    	next_button.style.visibility="visible"
      churn_wrapper.style.display="none"
    }
   
    if (Recurring_20_50.checked || Recurring_50_80.checked || Recurring_80.checked ) {
    	next_button.style.visibility="hidden"
      churn_wrapper.style.display="flex"
  
    }
    if (count_inputs("churn_wrapper") > 0) {
      next_button.style.visibility="visible"}    
    if (count_inputs("p5_first_block") > 1) {
      rev_recurring.style.visibility="visible"}
    if (count_inputs("p5_first_block") <= 1) {
      rev_recurring.style.visibility="hidden"
      next_button.style.visibility="hidden"
      churn_wrapper.style.display="none"
      }
	}
  
	if (page_number == 6){
    if (count_inputs("p6_first_block") > 0) {
      EBITDA_wrapper_1.style.display="flex"
      }
  	if (prof_yes_button.checked) {
      EBITDA_wrapper_2.style.display="flex"
      }
  	else {EBITDA_wrapper_2.style.display="none"}
    if (count_inputs("EBITDA_wrapper_1") > 0 && prof_yes_button.checked == false) {
      next_button.style.visibility="visible"}
    if (count_inputs("EBITDA_wrapper_1") <= 0) {
      next_button.style.visibility="hidden"}
    if (count_inputs("EBITDA_wrapper_2") > 0) {
      next_button.style.visibility="visible"}
    if (count_inputs("EBITDA_wrapper_2") <= 0 && prof_yes_button.checked) {
      next_button.style.visibility="hidden"}   
	}
	if (page_number == 7){
  	fake_next_button.style.visibility="visible"
    if (cf_positive.checked) {
      cashflow_wrapper.style.display="flex" 
      runway_wrapper.style.display="none" 
      if (count_inputs("cashflow_wrapper") > 0) {
        next_button.style.visibility="visible"}
      if (count_inputs("cashflow_wrapper") <= 0) {
        next_button.style.visibility="hidden"}
        }
    if (cf_negative.checked) {
      cashflow_wrapper.style.display="none" 
      runway_wrapper.style.display="flex" 
      if (count_inputs("runway_wrapper") > 0) {
        next_button.style.visibility="visible"}
      if (count_inputs("runway_wrapper") <= 0) {
        next_button.style.visibility="hidden"}      	
        }     
    if (cf_not_sure.checked) {
      cashflow_wrapper.style.display="none"
      runway_wrapper.style.display="none"
      next_button.style.visibility="visible"
      }
	} 
  
	if (page_number == 8){
    if (count_inputs("p8_first_block") > 0) {
      equity_wrapper.style.visibility="visible"}
    if (count_inputs("p8_first_block") <= 0) {
      equity_wrapper.style.visibility="hidden"
      cap_wrapper.style.visibility="hidden"}
    if (count_inputs("equity_wrapper") > 0) {
      cap_wrapper.style.visibility="visible"}
    if (count_inputs("equity_wrapper") <= 0) {
      cap_wrapper.style.visibility="hidden"}
    if (count_inputs("cap_wrapper") > 0) {
      next_button.style.visibility="visible"}
    if (count_inputs("cap_wrapper") <= 0) {
      next_button.style.visibility="hidden"} 
	}
	
	if (page_number == 9){
		fake_next_button.style.visibility="hidden"
    if (count_inputs("p9_first_block") > 0 & !asset_type_NA.checked ) {
      asset_wrapper.style.display="flex"}
    if (count_inputs("p9_first_block") <= 0 | asset_type_NA.checked ) {
      asset_wrapper.style.display="none"}
    if (count_inputs("asset_wrapper") > 0 | asset_type_NA.checked) {
      submit_button.style.display="block"
    if ((count_inputs("asset_wrapper") <= 0 & !asset_type_NA.checked) | count_inputs("p9_first_block") <= 0) {
      submit_button.style.display="none"} 
	} 
	
UpdatePGHeight(page_number)
} 
