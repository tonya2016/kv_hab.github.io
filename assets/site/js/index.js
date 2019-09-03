// Params
var mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

// Main Slider
var mainSliderOptions = {
	  zoom: true,
      loop: true,
      speed:1000,
      autoplay:{
        delay:3000
      },
      loopAdditionalSlides: 10,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          this.autoplay.start();
        },
        slideChangeTransitionEnd: function(){
          var swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (var i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
			  
			swiper.slides[i].querySelector("img").style.display = 'none'/////////////////////
          }
	      swiper.autoplay.start();
         // swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
        },
        progress: function(){
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            var slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        },
        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed + "ms";
			swiper.slides[i].querySelector("img").style.opacity = 0;//////////////////////////
          }
        },doubleTap: function(speed) {//////////////////////////
			const swiper = this;
			const zoom = swiper.zoom;

			if (zoom.scale && zoom.scale !== 1) {
				swiper.autoplay.start();
				swiper.slides[swiper.activeIndex].querySelector("img").style.opacity = 0;
			
			} else {
				swiper.autoplay.stop();
				swiper.slides[swiper.activeIndex].querySelector("img").style.display = 'block';
				swiper.slides[swiper.activeIndex].querySelector("img").style.opacity = 1;
				swiper.slides[swiper.activeIndex].querySelector("img").style.transition = speed + "ms";
			}//////////////////////////////////////////////////////////
		}
      }
    };
var mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

if(typeof mainSlider.controller !== 'undefined') {
	// Navigation Slider
	var navSliderOptions = {
		loop: true,
		loopAdditionalSlides: 10,
		speed:1000,
		spaceBetween: 5,
		slidesPerView: 5,
		centeredSlides : true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		direction: 'vertical',
		on: {
			imagesReady: function(){
				this.el.classList.remove('loading');
			},
			click: function(){
				mainSlider.autoplay.stop();
			}
		}
	};
	var navSlider = new Swiper(navSliderSelector, navSliderOptions);

	// Matching sliders

	mainSlider.controller.control = navSlider;
	navSlider.controller.control = mainSlider;
}

