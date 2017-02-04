var slider = (function () {
    var
        flag = true;
    //private
    return {
        init: function () {
            var _this = this;
            //dots
            _this.createDots();


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
                if ($this.hasClass('slider__controls-button_next')) {
                    if (nextSlide.length) {
                        _this.moveSlide(nextSlide, 'forward')
                    } else {
                        _this.moveSlide(firstSlide, "forward")
                    }
                } else {
                    if (prevSlide.length) {
                        _this.moveSlide(prevSlide, 'backward')
                    } else {
                        _this.moveSlide(lastSlide, "backward")
                    }
                }
            });
            //onDotsClick
            $('.slider__dots-link').on('click', function(e){
                e.preventDefault();
                var
                    $this = $(this),
                    dots = $this.closest('.slider__dots').find('.slider__dots-item'),
                    activeDot = dots.filter('.active'),
                    dot = $this.closest('.slider__dots-item'),
                    curDotNum = dot.index(),
                    direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
                    reqSlide = $this.closest('.slider').find('.slider__item').eq(curDotNum);

                _this.moveSlide(reqSlide, direction);

            });
            //onThumbClick
            $('.thumbnail-item').on('click',function (e) {
                e.preventDefault();
                var
                    $this = $(this),
                    thumbs = $this.closest('.thumbnail-list').find('.thumbnail-item'),
                    activeThumb = thumbs.filter('.active'),
                    thumb = $this.closest('.thumbnail-item'),
                    curThumbNum = thumb.index(),
                    direction = (activeThumb.index() < curThumbNum) ? 'forward' : 'backward',
                    reqSlide = $this.closest('.slider').find('.slider__item').eq(curThumbNum);
                _this.moveSlide(reqSlide, direction);
            });
        },
        moveSlide: function (slide, direction) {
            var
                _this = this,
                container = slide.closest('.slider'),
                slides = container.find('.slider__item'),
                activeSlide = slides.filter('.active'),
                slideWidth = slides.width(),
                duration = 500,
                reqCssPosition = 0,
                reqSlideStrafe = 0;
            if (flag){

                flag = false;

                if (direction === 'forward'){
                    reqCssPosition = slideWidth;
                    reqSlideStrafe = -slideWidth;
                }else if (direction === 'backward'){
                    reqCssPosition = -slideWidth;
                    reqSlideStrafe = slideWidth;
                }
                slide.css('left', reqCssPosition).addClass('inslide');
                var movableSlide = slides.filter('.inslide');
                activeSlide.animate({left: reqSlideStrafe}, duration);
                movableSlide.animate({left: 0}, duration, function () {
                    var $this = $(this);
                    slides.css('left', '0').removeClass('active');
                    $this.toggleClass("inslide active");
                    _this.setActiveDot(container.find('.slider__dots'));
                    _this.setActiveThumb(container.find('.thumbnail-list'));
                    flag = true;
                });
            }

        },

        createDots: function () {
            var
                _this = this,
                container = $('.slider');
            var
                dotMarkup = '<li class="slider__dots-item">\
                                <a class="slider__dots-link" href="#"></a>\
                              </li>';
            container.each(function () {
                var
                    $this = $(this),
                    slides = $this.find('.slider__item'),
                    dotContainer = $this.find('.slider__dots');
                for(var i=0; i<slides.size(); i++){
                    dotContainer.append(dotMarkup);
                }
                _this.setActiveDot(dotContainer);
            });
        },
        setActiveDot: function (container) {
            var
                slides = container.closest('.slider__list-wrap').find('.slider__item');
            container
                .find('.slider__dots-item')
                .eq(slides.filter('.active').index())
                .addClass('active')
                .siblings()
                .removeClass('active');
        },
        setActiveThumb: function (container) {
            var
                slides = container.closest('.slider__list-wrap').find('.slider__item');
            container
                .find('.thumbnail-item')
                .eq(slides.filter('.active').index())
                .addClass('active')
                .siblings()
                .removeClass('active');
        }
    }
}());
$(document).ready(function () {
    if($('.slider').length){
        slider.init();
    }
    $('.gallery-item').on('click', function () {
        $('.modal-wrapper').css('display', 'block');
        slider.setActiveThumb();
    });
    $('.close').on('click', function () {
        $('.modal-wrapper').css('display', 'none');
    })
});
