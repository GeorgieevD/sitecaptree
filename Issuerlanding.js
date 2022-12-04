// creating a couple variables to save writing it out many times


const product = document.querySelector('.product')
const cta_button_landing = document.querySelector('.cta-button.landing')
const product_inventory = document.querySelector('.product.inventory')
const product_bank = document.querySelector('.product.bank')
const product_line = document.querySelector('.product.line')
const product_project = document.querySelector('.product.project')
const product_workingcapital = document.querySelector('.product.workingcapital')


const check_acquisition = document.querySelector('.custom-checkbox.acquisition')
const check_refi = document.querySelector('.custom-checkbox.refi')
const check_runway = document.querySelector('.custom-checkbox.runway')
const check_assets = document.querySelector('.custom-checkbox.assets')
const check_workingcapital = document.querySelector('.custom-checkbox.workingcapital')
const check_other = document.querySelector('.custom-checkbox.other')



cta_button_landing.classList.add('whitebackground');


// if .product is clicked, then couple of commands start playing:
// if class "change" already exists then it gets removed
// the void line does a very quick calculation so the class gets actually removed; if you dive straight to next line then the animation that is part of the class doesnt have time to play ; https://betterprogramming.pub/how-to-restart-a-css-animation-with-javascript-and-what-is-the-dom-reflow-a86e8b6df00f
// next line adds the class "change" which includes an animation of the button (increases in size for 1s)

// next if statement is for the border color to change when .product is clicked. 
// if statement checks if .clicked class is asigned to .product. if so, it gets removed (2nd click)
// if not, it gets added (first click)

// acquisition code

product.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth; 
    cta_button_landing.classList.add('change');

	
    if(product.classList.contains('clicked')) {
	product.classList.remove('clicked');
  check_acquisition.classList.remove('opacitycheck');
}
else {
	product.classList.add('clicked');
  check_acquisition.classList.add('opacitycheck');
}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }

})

// each product box needs it own code (similar set-up to previous box)

// refi code

product_inventory.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth;
		cta_button_landing.classList.add('change');
    
    if(product_inventory.classList.contains('clickedinventory')) {
	product_inventory.classList.remove('clickedinventory');
  check_refi.classList.remove('opacitycheck');

}
else {
	product_inventory.classList.add('clickedinventory');
	check_refi.classList.add('opacitycheck');
}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }
  
})

// bank term loan code
// runway

product_bank.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth;
		cta_button_landing.classList.add('change');
    
    if(product_bank.classList.contains('clickedbank')) {
	product_bank.classList.remove('clickedbank');
  check_runway.classList.remove('opacitycheck');

}
else {
	product_bank.classList.add('clickedbank');
  check_runway.classList.add('opacitycheck');

}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }
  
})

// line of credit code
// fixed assets


product_line.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth;
		cta_button_landing.classList.add('change');
    
    if(product_line.classList.contains('clickedline')) {
	product_line.classList.remove('clickedline');
  check_assets.classList.remove('opacitycheck');
}
else {
	product_line.classList.add('clickedline');
  check_assets.classList.add('opacitycheck');

}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }
  
})


// working capital

product_workingcapital.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth;
		cta_button_landing.classList.add('change');
    
    if(product_workingcapital.classList.contains('clickedworkingcapital')) {
	product_workingcapital.classList.remove('clickedworkingcapital');
  check_workingcapital.classList.remove('opacitycheck');

}
else {
	product_workingcapital.classList.add('clickedworkingcapital');
   check_workingcapital.classList.add('opacitycheck');
}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }
  
})

// project code
// other


product_project.addEventListener('click', () => {
    cta_button_landing.classList.remove('change');
    void cta_button_landing.offsetWidth;
		cta_button_landing.classList.add('change');
    
    if(product_project.classList.contains('clickedproject')) {
	product_project.classList.remove('clickedproject');
  check_other.classList.remove('opacitycheck');

}
else {
	product_project.classList.add('clickedproject');
   check_other.classList.add('opacitycheck');
}

if(product.classList.contains('clicked')||product_inventory.classList.contains('clickedinventory')||product_bank.classList.contains('clickedbank')||product_line.classList.contains('clickedline')||product_project.classList.contains('clickedproject')||product_workingcapital.classList.contains('clickedworkingcapital')){
    cta_button_landing.classList.remove('whitebackground')
    }
  else {
      cta_button_landing.classList.add('whitebackground')
  }
  
})
