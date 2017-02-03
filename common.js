var slider = (function () {
    
    //private
    
    return {
        init: function () {

            var _this = this;

            $('.slider__controls-button').on('click', function (e) {
                e.preventDefault();

                var
                    $this = $(this),
                    slides = $this.closest('.slider').find('.slider__item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    prevSlide = activeSlide.prev(),
                    firstSlide = slides.first(),
                    lastSlide = slides.last();

                if ($('.slider__controls-button_next')){

                    _this.moveSlide(nextSlide, 'forward')
                }

            })
            
        },
        
        moveSlide: function (slide, direction) {

            var
                container = slide.closest('.slider'),
                slides = container.find('.slider__item'),
                activeSlide = slides.filter('.active'),
                slideWidth = slides.width(),
                duration = 500,
                reqCssPosition = 0,
                reqSlideStrafe = 0;

            if (direction === 'forward'){
                reqCssPosition = slideWidth;
                reqSlideStrafe = -slideWidth;
            }else if (direction === 'backward'){
                reqCssPosition = -slideWidth;
                reqSlideStrafe = slideWidth;
            }

            slide.css('left', reqCssPosition).addClass('inslide');

            var movableSlide = slides.filter('.inslide');

            activeSlide.animate( {left: reqSlideStrafe}, duration);
            // пишет что не функция
            movableSlide.animate({left: 0}, duration, function () {
                var $this = $(this);
                slides.css('left', '0').removeClass('active');
                $this.toggleClass('inslide', 'active');
            });

        }
    }
}());
$(document).ready(function () {
    if($('.slider').length){
        slider.init();
    }
});