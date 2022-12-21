function count_inputs(block_ID) {
	var counter = 0
	var check_block = $("#"+block_ID+" :input"); 
  for (element of check_block ) {
      if (element.type == "checkbox" || element.type == "radio") {
          if(element.checked) { 
              counter = counter + 1}
      } else if (element.type == "text" || element.type == "number" ||  element.type == "select" ||  element.type == "email") {
          if(element.value.length > 0){
              counter = counter + 1
          }    
      }
  }
	return counter 
}



const prev_button = document.getElementById("previous_button")
const p2_prev_mask = document.getElementById("p2_prev_mask")
const p3_prev_mask = document.getElementById("p3_prev_mask")
const p4_prev_mask = document.getElementById("p4_prev_mask")
const p5_prev_mask = document.getElementById("p5_prev_mask")
const p6_prev_mask = document.getElementById("p6_prev_mask")
const p7_prev_mask = document.getElementById("p7_prev_mask")
const p8_prev_mask = document.getElementById("p8_prev_mask")

const next_button = document.getElementById("next_button_slider")
const p1_next_mask = document.getElementById("p1_next_mask")
const p2_next_mask = document.getElementById("p2_next_mask")
const p3_next_mask = document.getElementById("p3_next_mask")
const p4_next_mask = document.getElementById("p4_next_mask")
const p5_next_mask = document.getElementById("p5_next_mask")
const p6_next_mask = document.getElementById("p6_next_mask")
const p7_next_mask = document.getElementById("p7_next_mask")
const p8_next_mask = document.getElementById("p8_next_mask")

var all_next_buttons = [p1_next_mask, p2_next_mask, p3_next_mask, p4_next_mask, p5_next_mask, p6_next_mask, p7_next_mask, p8_next_mask]
var all_prev_buttons = [p2_prev_mask, p3_prev_mask, p4_prev_mask, p5_prev_mask, p6_prev_mask, p7_prev_mask, p8_prev_mask, p9_prev_mask ]

all_next_buttons.forEach((elem) => {
		elem.style.visibility="hidden"
    elem.addEventListener("click", () => { 
      next_button.click()
      page_number = page_number + 1
      QuestionCheck(page_number) 
			window.scrollTo(0, 0.5) } )
});

all_prev_buttons.forEach((elem) => {
    elem.addEventListener("click", () => { 
    prev_button.click()
    page_number = page_number - 1
    QuestionCheck(page_number)
    window.scrollTo(0, 0.5) })

});



var triggers_p1 = Array.from($("#grid_wrapper_p1 :input")); 
var triggers_p2 = Array.from($("#grid_wrapper_p2 :input")); 
var triggers_p3 = Array.from($("#grid_wrapper_p3 :input")); 
var triggers_p4 = Array.from($("#grid_wrapper_p4 :input")); 
var triggers_p5 = Array.from($("#grid_wrapper_p5 :input")); 
var triggers_p6 = Array.from($("#grid_wrapper_p6 :input")); 
var triggers_p7 = Array.from($("#grid_wrapper_p7 :input")); 
var triggers = triggers_p1.concat(triggers_p2, triggers_p3, triggers_p4, triggers_p5, triggers_p6, triggers_p7)
