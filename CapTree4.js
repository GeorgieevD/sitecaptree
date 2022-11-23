               
                 
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
  sourcingBlock.classList.add('sourcing');
}

 


//  JS counter
          
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
  var myVar10;
  const slides = document.getElementById('slides-2') 
  const slidesInner = slides.querySelector('.slides-inner')
  const images = slidesInner.querySelectorAll('img') 
  const slidesHeight = slides.clientHeight/2+24 
  
  const matchingBlock = document.querySelector('.matchingblock');
  
  const matchingBlockOptions = {
      rootMargin: "-200px 0px 0px 0px",
    threshold: 0.75
  }
  
  const matchingBlockObserver = new IntersectionObserver(function(
      entries,
      matchingBlockObserver
  ) {
      entries.forEach(entry =>{
          if(!entry.isIntersecting){
            myStopFunction2();
        }
              else {
            makeSlideshow('slides-2');
          matchingBlock.classList.remove('sourcing');
          
        }
  
          })
     },
  matchingBlockOptions);
  
  matchingBlockObserver.observe(matchingBlock);


  function myStopFunction2(){
    clearTimeout(myVar10);
  matchingBlock.classList.add('sourcing');
  slidesInner.style.transition = '0ms';
  index = 0;
  slidesInner.style.transform = `translate3d(0,${index*-slidesHeight}px,0)`;
  }
  
          function makeSlideshow(slidesId){
      

      let index = -1 
              

      function f1() {
          index += 1
          void slides.offsetWidth; 
          if(index===5){
              slidesInner.style.transition = '0ms';
              index = 0;
              t=0;
             
          }
          else{
              slidesInner.style.transition = '1000ms';
              t=3000;
          }
          

          slidesInner.style.transform = `translate3d(0,${index*-slidesHeight}px,0)`

          myVar10 = setTimeout(f1,t)
      }


      f1();
      
  }





