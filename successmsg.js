submit_button_click.addEventListener('click', () => {

    document.getElementById("form1").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("next_button_slider").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("timelinebegin").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    
    
    setTimeout(startwait,100);
    
    
    })
    
    function startwait() { 
    
    var anim = bodymovin.loadAnimation({
          container: document.getElementById('animContainer'),
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: 'https://raw.githubusercontent.com/GeorgieevD/sitecaptree/main/lf30_editor_makgz2pe.json' // lottie file path
      })
      
    
      anim.setSpeed(1.5);
    
        setTimeout(ending,3000);
    
    }
    
    function ending() {
    document.getElementById("finallender").setAttribute("style","opacity:1.0; -moz-opacity:1.0; filter:alpha(opacity=100)");
    document.getElementById("exitbutton").setAttribute("style","opacity:1.0; -moz-opacity:1.0; filter:alpha(opacity=100)");
    
    }
    