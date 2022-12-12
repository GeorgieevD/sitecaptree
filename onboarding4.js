
// counter code that tracks on which page user is

const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
let pageCounter = 0;


nextButton.addEventListener('click', () => {

pageCounter ++;
console.log(pageCounter);
caseInSwitch(pageCounter);

})

previousButton.addEventListener('click', () => {

pageCounter --;
console.log(pageCounter);
caseInSwitch(pageCounter);


})

// variables of timeline components

const circle_step_1 = document.querySelectorAll('.circle1');
const tick_step_1 = document.querySelectorAll('.tickcontainer1');
const circle_step_2 = document.querySelectorAll('.circle2');
const tick_step_2 = document.querySelectorAll('.tickcontainer2');
const circle_step_3 = document.querySelectorAll('.circle3');
const tick_step_3 = document.querySelectorAll('.tickcontainer3');
const circle_step_4 = document.querySelectorAll('.circle4');
const tick_step_4 = document.querySelectorAll('.tickcontainer4');

const circle_progress_1 = document.querySelectorAll('.circleprogress1');
const circle_progress_2 = document.querySelectorAll('.circleprogress2');
const circle_progress_3 = document.querySelectorAll('.circleprogress3');
const circle_progress_4 = document.querySelectorAll('.circleprogress4');
const circle_progress_5 = document.querySelectorAll('.circleprogress5');
const circle_progress_6 = document.querySelectorAll('.circleprogress6');
const circle_progress_7 = document.querySelectorAll('.circleprogress7');
const circle_progress_8 = document.querySelectorAll('.circleprogress8');
const circle_progress_9 = document.querySelectorAll('.circleprogress9');
const circle_progress_10 = document.querySelectorAll('.circleprogress10');
const circle_progress_11 = document.querySelectorAll('.circleprogress11');
const circle_progress_12 = document.querySelectorAll('.circleprogress12');

const text_step_2 = document.querySelectorAll('.textstep2');
const text_step_3 = document.querySelectorAll('.textstep3');
const text_step_4 = document.querySelectorAll('.textstep4');

// switch function that applies different formats to components timeline depending on which page user is

function caseInSwitch(val) {
    switch(val) {
        case 0:
            // remove page 1 classes

            removeClasses1();

            function removeClasses1(){
            clearTimeout(Time1);
            clearTimeout(Time2); 
            circle_progress_1.forEach(circleprogress1 => {
       	 		 		circleprogress1.classList.remove('onbackground');
    					});
              
              circle_progress_2.forEach(circleprogress2 => {
       	 		 		circleprogress2.classList.remove('onbackground');
    					});
            }

            break; // at end of case statement, go to end of switch statement, end dont evaluate anything else
        case 1: 
            // add page 1 classes
             	
              var Time1 = setTimeout(progress1, 500);
              var Time2 = setTimeout(progress2, 1000);
    
                  function progress1(){
                    	circle_progress_1.forEach(circleprogress1 => {
       	 		 					circleprogress1.classList.add('onbackground');
    									});
                  }
                  
                  function progress2(){
                    	circle_progress_2.forEach(circleprogress2 => {
       	 		 					circleprogress2.classList.add('onbackground');
    									});
                  }
                              
            // remove page 2 classes 
            
            removeClasses2();

            function removeClasses2(){

            clearTimeout(Time3);
            clearTimeout(Time4); 
            clearTimeout(Time5);
             
        	circle_step_2.forEach(circle2 => {
        		circle2.classList.remove('activecircle');
    			});
          
          text_step_2.forEach(textstep2 => {
        			textstep2.classList.remove('activefont');
    			});
                
          tick_step_1.forEach(tickcontainer1 => {
        		tickcontainer1.classList.remove('onopacity');
   				});
          
          circle_step_1.forEach(circlestep1 => {
        		circlestep1.classList.remove('offopacity');
   				});
          
          circle_progress_3.forEach(circleprogress3 => {
             circleprogress3.classList.remove('onbackground');
          });
          
          circle_progress_4.forEach(circleprogress4 => {
             circleprogress4.classList.remove('onbackground');
          });
          
        }
            break;
        case 2: 
            // add page 2 classes
        
         
          tick_step_1.forEach(tickcontainer1 => {
        		tickcontainer1.classList.add('onopacity');
   				});
          
          circle_step_1.forEach(circlestep1 => {
        		circlestep1.classList.add('offopacity');
   				});
          
            var Time3 = setTimeout(progress3, 333);
            var Time4 = setTimeout(progress4, 667);
            var Time5 = setTimeout(startstep2, 1000);

              function progress3(){
                circle_progress_3.forEach(circleprogress3 => {
                  circleprogress3.classList.add('onbackground');
                });
              }

              function progress4(){
                circle_progress_4.forEach(circleprogress4 => {
                  circleprogress4.classList.add('onbackground');
                });
              }
              
              function startstep2(){
                circle_step_2.forEach(circle2 => {
        					circle2.classList.add('activecircle');
    						});
                
                 text_step_2.forEach(textstep2 => {
        					textstep2.classList.add('activefont');
    						});
              }
    
    			
          // remove page 3 classes


          removeClasses3();
            
          function removeClasses3(){

            clearTimeout(Time6);
            clearTimeout(Time7); 
            clearTimeout(Time8);
            clearTimeout(Time9);
            clearTimeout(Time10); 
            
              
          
              tick_step_2.forEach(tickcontainer2 => {
                tickcontainer2.classList.remove('onopacity');
              });

              circle_step_2.forEach(circlestep2 => {
                circlestep2.classList.remove('offopacity');
              });
          
              circle_progress_5.forEach(circleprogress5 => {
                circleprogress5.classList.remove('onbackground');
              });

              circle_progress_6.forEach(circleprogress6 => {
                circleprogress6.classList.remove('onbackground');
              });

              circle_progress_7.forEach(circleprogress7 => {
                circleprogress7.classList.remove('onbackground');
              });

              circle_progress_8.forEach(circleprogress8 => {
                circleprogress8.classList.remove('onbackground');
              });

              circle_step_3.forEach(circle3 => {
                circle3.classList.remove('activecircle');
              });

              text_step_3.forEach(textstep3 => {
                textstep3.classList.remove('activefont');
              });     
            } 
          break;
          
        case 3: 
            // add page 3 classes
         
    				tick_step_2.forEach(tickcontainer2 => {
        		tickcontainer2.classList.add('onopacity');
   				});
          
          circle_step_2.forEach(circlestep2 => {
        		circlestep2.classList.add('offopacity');
   				});
          
                   var Time6 = setTimeout(progress5, 200);
                   var Time7 = setTimeout(progress6, 400);
                   var Time8 = setTimeout(progress7, 600);
                   var Time9 = setTimeout(progress8, 800);
                   var Time10 = setTimeout(startstep3, 1000);

              function progress5(){
                circle_progress_5.forEach(circleprogress5 => {
                  circleprogress5.classList.add('onbackground');
                });
              }

              function progress6(){
                circle_progress_6.forEach(circleprogress6 => {
                  circleprogress6.classList.add('onbackground');
                });
              }
              
              function progress7(){
                circle_progress_7.forEach(circleprogress7 => {
                  circleprogress7.classList.add('onbackground');
                });
              }
              
              function progress8(){
                circle_progress_8.forEach(circleprogress8 => {
                  circleprogress8.classList.add('onbackground');
                });
              }
              
              function startstep3(){
                circle_step_3.forEach(circle3 => {
        					circle3.classList.add('activecircle');
    						});
                
                 text_step_3.forEach(textstep3 => {
        					textstep3.classList.add('activefont');
    						});
              }
            
            
            // remove page 4 classes
            
            removeClasses4();
            
            function removeClasses4(){

                clearTimeout(Time11);
                clearTimeout(Time12); 
                clearTimeout(Time13);
                clearTimeout(Time14);
                clearTimeout(Time15); 
            
        	    tick_step_3.forEach(tickcontainer3 => {
                    tickcontainer3.classList.remove('onopacity');
                });
          
                circle_step_3.forEach(circlestep3 => {
                    circlestep3.classList.remove('offopacity');
                });
          
                circle_progress_9.forEach(circleprogress9 => {
                  circleprogress9.classList.remove('onbackground');
                });

                circle_progress_10.forEach(circleprogress10 => {
                  circleprogress10.classList.remove('onbackground');
                });
              
                circle_progress_11.forEach(circleprogress11 => {
                  circleprogress11.classList.remove('onbackground');
                });
              
                circle_progress_12.forEach(circleprogress12 => {
                  circleprogress12.classList.remove('onbackground');
                });
              
                circle_step_4.forEach(circle4 => {
                    circle4.classList.remove('activecircle');
                });
                
                 text_step_4.forEach(textstep4 => {
                    textstep4.classList.remove('activefont');
                });
            
              }
              
            break;
        case 4: 
        
        		// add page 4 classes
            
            	tick_step_3.forEach(tickcontainer3 => {
                    tickcontainer3.classList.add('onopacity');
                       });
              
              circle_step_3.forEach(circlestep3 => {
                    circlestep3.classList.add('offopacity');
                       });
              
                       var Time11 = setTimeout(progress9, 200);
                       var Time12 = setTimeout(progress10, 400);
                       var Time13 = setTimeout(progress11, 600);
                       var Time14 = setTimeout(progress12, 800);
                       var Time15 = setTimeout(startstep4, 1000);
    
                  function progress9(){
                    circle_progress_9.forEach(circleprogress9 => {
                      circleprogress9.classList.add('onbackground');
                    });
                  }
    
                  function progress10(){
                    circle_progress_10.forEach(circleprogress10 => {
                      circleprogress10.classList.add('onbackground');
                    });
                  }
                  
                  function progress11(){
                    circle_progress_11.forEach(circleprogress11 => {
                      circleprogress11.classList.add('onbackground');
                    });
                  }
                  
                  function progress12(){
                    circle_progress_12.forEach(circleprogress12 => {
                      circleprogress12.classList.add('onbackground');
                    });
                  }
                  
                  function startstep4(){
                    circle_step_4.forEach(circle4 => {
                                circle4.classList.add('activecircle');
                                });
                    
                     text_step_4.forEach(textstep4 => {
                                textstep4.classList.add('activefont');
                                });
                  }


            // remove page 5 classes
            
            
        default:
            break;
    }
}

