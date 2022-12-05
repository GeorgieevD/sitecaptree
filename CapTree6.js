// INVESTOR PAGE JS

// LANDING PAGE ANIMATION

// creating a couple variables to save writing it out many times


const investor_startup = document.querySelector('.investor.startup')
const cta_button_landinginvestor2 = document.querySelector('.cta-button.landinginvestor2')
const investor_scaleup = document.querySelector('.investor.scaleup')
const investor_smes = document.querySelector('.investor.smes')
const investor_all = document.querySelector('.investor.all')
const investor_enterprise = document.querySelector('.investor.enterprise')
const investor_other = document.querySelector('.investor.other')
const check_startup = document.querySelector('.custom-checkbox.startup')
const check_scaleup = document.querySelector('.custom-checkbox.scaleup')
const check_sme = document.querySelector('.custom-checkbox.sme')
const check_enterprise = document.querySelector('.custom-checkbox.enterprise')
const check_all = document.querySelector('.custom-checkbox.all')
const check_other = document.querySelector('.custom-checkbox.other')


cta_button_landinginvestor2.classList.add('whitebackground');

investor_startup.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_startup.classList.toggle("testcolor");
    check_startup.classList.toggle("opacitycheck");

    
    if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})

investor_scaleup.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_scaleup.classList.toggle('clickedscaleup');
    check_scaleup.classList.toggle('opacitycheck');

    
     if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})

investor_smes.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_smes.classList.toggle('clickedsmes');
    check_sme.classList.toggle("opacitycheck");
    
     if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})

investor_enterprise.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_enterprise.classList.toggle('clickedenterprise');
    check_enterprise.classList.toggle("opacitycheck");
    
     if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})


investor_all.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_all.classList.toggle('clickedallinvestor');
    check_all.classList.toggle("opacitycheck");
    
    if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})

investor_other.addEventListener('click', () => {
    cta_button_landinginvestor2.classList.remove('change');
    void cta_button_landinginvestor2.offsetWidth; 
    cta_button_landinginvestor2.classList.add('change');

		investor_other.classList.toggle('clickedotherinvestor');
    check_other.classList.toggle("opacitycheck");
    
     if(investor_startup.classList.contains('testcolor')||investor_scaleup.classList.contains('clickedscaleup')||investor_smes.classList.contains('clickedsmes')||investor_enterprise.classList.contains('clickedenterprise')||investor_other.classList.contains('clickedotherinvestor')||investor_all.classList.contains('clickedallinvestor')){
    cta_button_landinginvestor2.classList.remove('whitebackground')
    }
  else {
      cta_button_landinginvestor2.classList.add('whitebackground')
  }
   
})


//SOURCINGBLOCK ANIMATION
                 
const sourcingBlock = document.querySelector('.sourcingblock');
const sourcingBlockOptions = {
  rootMargin: "-200px 0px 0px 0px",
  threshold: 0.75
};

const sourcingBlockObserver = new IntersectionObserver(function(
entries,
sourcingBlockObserver
){
    entries.forEach(entry => {
      if(!entry.isIntersecting){
          myStopFunction();
    } else{
        timeout();
    }
  })

},
sourcingBlockOptions);

sourcingBlockObserver.observe(sourcingBlock);

var counter;
var myVar;
var myVar2;
var myVar3;
var myVar4;
var myVar5;
var myVar6;
var myVar7;
var myVar8;
var myVar9;         				

// Stop function that is called when sourcingblock is not in viewport

function myStopFunction(){
  clearTimeout(myVar);
  clearTimeout(myVar2);
  clearTimeout(myVar3);
  clearTimeout(myVar4);
  clearTimeout(myVar5);
  clearTimeout(myVar6);
  clearTimeout(myVar7);
  clearTimeout(myVar8);
  clearTimeout(myVar9);
  clearInterval(counter);
  ticket_line.classList.remove('increasewidth');
  tickstartup.classList.remove('increaseopacity');
  tickscaleup.classList.remove('increaseopacity');
  industrybuttonind.classList.remove('increaseopacity');
  industrybuttonfin.classList.remove('increaseopacity');
  construction.classList.remove('increaseopacity');
  payments.classList.remove('increaseopacity');
  document.getElementById('output').textContent = 30;
  sourcingBlock.classList.add('sourcing'); // adds opacity
}

 
// Start function that is called when sourcingblock is in viewport
          
  const ticket_line = document.querySelector('.ticket_line');
  const industrybuttonind = document.querySelector('.industrybuttonind');
  const industrybuttonfin = document.querySelector('.industrybuttonfin');
  const construction = document.querySelector('.construction');
  const payments = document.querySelector('.payments');
  const tickstartup = document.querySelector('.tickstartup');
  const tickscaleup = document.querySelector('.tickscaleup');
         
function timeout() {
    myVar = setTimeout(function(){
 
    sourcingBlock.classList.remove('sourcing'); 
    tickstartup.classList.remove('increaseopacity');
    tickscaleup.classList.remove('increaseopacity');
    industrybuttonind.classList.remove('increaseopacity');
    industrybuttonfin.classList.remove('increaseopacity');
    construction.classList.remove('increaseopacity');
    payments.classList.remove('increaseopacity');
    void industrybuttonind.offsetWidth;
  
    myVar2 = setTimeout(function(){
      tickstartup.classList.add('increaseopacity');
    },1000)
  
    myVar3 = setTimeout(function(){
      tickscaleup.classList.add('increaseopacity');
    },2000)
  
    myVar4 = setTimeout(function(){
      industrybuttonind.classList.add('increaseopacity');
    },3500)
  
    myVar5 = setTimeout(function(){
      industrybuttonfin.classList.add('increaseopacity');
    },4500)
  
    myVar6 = setTimeout(function(){
      construction.classList.add('increaseopacity');
    },6000)
  
    myVar7 = setTimeout(function(){
      payments.classList.add('increaseopacity');
    },7000)

    myVar8 = setTimeout(function(){ticketsize()},7500)

},100);
}
 
// Function for ticket size counter (this is called as part of the start function)

function ticketsize(){

    ticket_line.classList.add('increasewidth');
            
    let from = 30;
    let to = 80;
    let step = to > from ? 1 : -1;
    let interval = 60;
      
    if (from == to){
      document.getElementById('output').textContent = from;
      return;
    }
 
    counter = setInterval(function(){
        from += step;
        document.getElementById('output').textContent = from;
    
        if (from == to){
            // stop counter
            clearInterval(counter);
          
            // when counter is done, wait 3 secs to restart
            myVar9 = setTimeout(function(){
            ticket_line.classList.remove('increasewidth');
            void ticket_line.offsetWidth;
            document.getElementById('output').textContent = 30;
            timeout();
            },3000); 
      }
    }, interval);

}






