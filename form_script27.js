function count_inputs(block_ID) {
	var counter = 0
	var check_block = $("#"+block_ID+" :input"); 
  for (element of check_block ) {
      if (element.type == "checkbox" || element.type == "radio") {
          if(element.checked) { 
              counter = counter + 1}
      } else if (element.type == "text" || element.type == "number" ||  element.type == "select" ||  element.type == "email" || element.type == "select-one" ||  element.type == "textarea" ) {
          if(element.value.length > 0){
              counter = counter + 1
          }    
      }
  }
	return counter 
}

function UpdatePGHeight(page_number) {
	const checked_elements = ['.funding_goals_1', '.funding_goals_2', '.issuer_info_1', '.issuer_info_2', '.issuer_info_3', '.finfo', '.finfo_2', '.finfo_3', '.finfo_4']
  if (window.innerWidth < 600) {
		height = document.querySelector(checked_elements[page_number]).offsetHeight;
    document.querySelector('.step_paginator_issuer').style.height = height+"px";
    }  	
}

function TicketCurrencyMasks(currency) {
   $("#ticket_size").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency,  allowMinus: false, "clearMaskOnLostFocus": true});
   $("#asset_size").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency,  allowMinus: false, "clearMaskOnLostFocus": true});   
   document.getElementById("raise_sub").innerHTML = "Please enter amount in " + currency + "mn";	
   document.getElementById("asset_sub").innerHTML = "Please enter amount in " + currency + "mn";
}

function ReportingCurrencyMasks(currency) {
   $("#revenue_input").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency,  allowMinus: false, "clearMaskOnLostFocus": true});
   $("#EBITDA_field").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency,  allowMinus: false, "clearMaskOnLostFocus": true});
   $("#CF_field").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency, allowMinus: false, "clearMaskOnLostFocus": true});
   $("#equity_field").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency, allowMinus: false, "clearMaskOnLostFocus": true});
   $("#cash_field").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency, allowMinus: false, "clearMaskOnLostFocus": true});
   $("#gross_debt_field").inputmask({alias: "currency", digits: 5, digitsOptional: true, suffix: " mn", rightAlign: false, placeholder: '', prefix: currency, allowMinus: false, "clearMaskOnLostFocus": true});
   document.getElementById("revenue_sub").innerHTML = "LTM in " + currency + "mn, estimate is ok";
   document.getElementById("EBITDA_sub").innerHTML = "LTM in " + currency + "mn, estimate is ok";
   document.getElementById("FCF_sub").innerHTML = "LTM in " + currency + "mn, estimate is ok";
   document.getElementById("equity_sub").innerHTML = "Please enter in " + currency + "mn";
   document.getElementById("cash_sub").innerHTML = "Cash in " + currency + "mn";
   document.getElementById("debt_sub").innerHTML = "Gross long term debt in " + currency + "mn";
   document.getElementById("SME_sub").innerHTML = "SMEs (<" + currency + "25mn rev.)";
   document.getElementById("enterprise_sub").innerHTML = "Enterprise (>" + currency + "25mn rev.)";
}

const prev_button = document.getElementById("previous_button")
const next_button = document.getElementById("next_button_slider")
const fake_next_button = document.getElementById("fake_next_button")
const submit_button = document.getElementById("Submit_button")

next_button.style.visibility="hidden"
submit_button.style.display="none"

next_button.addEventListener("click", () => { 
	page_number = page_number + 1
	UpdatePGHeight(page_number)
	QuestionCheck(page_number) 
	window.scrollTo(0, 0.5) } )

prev_button.addEventListener("click", () => { 
    page_number = page_number - 1
    UpdatePGHeight(page_number)
    QuestionCheck(page_number)
    window.scrollTo(0, 0.5) })



var triggers_p1 = Array.from($("#grid_wrapper_p1 :input")); 
var triggers_p2 = Array.from($("#grid_wrapper_p2 :input")); 
var triggers_p3 = Array.from($("#grid_wrapper_p3 :input")); 
var triggers_p4 = Array.from($("#grid_wrapper_p4 :input")); 
var triggers_p5 = Array.from($("#grid_wrapper_p5 :input")); 
var triggers_p6 = Array.from($("#grid_wrapper_p6 :input")); 
var triggers_p7 = Array.from($("#grid_wrapper_p7 :input")); 
var triggers_p8 = Array.from($("#grid_wrapper_p8 :input")); 
var triggers_p9 = Array.from($("#grid_wrapper_p9 :input")); 
var triggers_p10 = Array.from($("#grid_wrapper_p10 :input")); 

var triggers = triggers_p1.concat(triggers_p2, triggers_p3, triggers_p4, triggers_p5, triggers_p6, triggers_p7,triggers_p8,triggers_p9,triggers_p10)
