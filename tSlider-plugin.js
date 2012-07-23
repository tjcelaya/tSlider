(function ($) {
    $.fn.tSlider = function (place,images,options) {

        //check that images has a length, if you supply an object with a length 
        //property just to be a smartass dont be surpised when it breaks
        if (images.length > 0) 
            $.fn.tSlider.images = images;

        //define defaults
        var defaults = {
            height: '400px',
            width: '50%',
            buttonImages: null
        }

        //combine user-supplied options and defaults into a config object
        var config = $.extend({}, defaults, options);

        // console.log(config);

        $.fn.tSlider.outer = $(place);

        $.fn.tSlider.inner = $.fn.tSlider.outer.append('<div id="TSlide-inner"></div>').children();

        $.fn.tSlider.distances = [];

        var imgsrc = 0;

        for (imgsrc in $.fn.tSlider.images) {
            $.fn.tSlider.inner.append('<img src="' + $.fn.tSlider.images[imgsrc] + '"/>');
        }

        $.fn.tSlider.outer.before('<a class="tSlide-button" id="tSlide-b" href="">&lt;</a>')
                            .after('<a class="tSlide-button" id="tSlide-f" href="">&gt;</a>');

        if (config.buttonImages != null) {

            $('#tSlide-b').html('<img src="' + config.buttonImages[0]+'"/>');
            $('#tSlide-f').html('<img src="' + config.buttonImages[1]+'"/>');
            $('.tSlide-button').children()
                .css({
                    position: 'relative',
                    bottom: ($.fn.tSlider.outer)/2,
                    display: 'inline-block',
                    'height':'50px'
                });
        }

        $.fn.tSlider.outer.css({
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            height: config.height,
            width: config.width,
            display: 'inline-block'
        });

        $.fn.tSlider.inner.css({
            display: 'inline-block',
            textAlign: 'center',
            fontSize: '0px',
            margin: 0,
            padding: 0
        })

        $.fn.tSlider.inner.find('img').css({
            display: 'inline',
            maxHeight: '100%'

        })
        
        $.fn.tSlider.current = 0;

        $.fn.tSlider.getDistances = function () {
            $(window).load(function () {
                $.fn.tSlider.inner.children('img').each(function () {
                    // console.log($.fn.tSlider.distances)
                    // console.log($(this).position().left);
                    $.fn.tSlider.distances.push($(this).position().left);
                });
            });
        };

        $.fn.tSlider.slide = function (id) {
            // console.log("id to slide to: ",id);

            var pic = $.fn.tSlider.inner.children('img').eq(id);
            // pic.css({border:'1px solid red'});

            var pos = -(parseInt($.fn.tSlider.distances[id],10)-(parseInt($.fn.tSlider.outer.width(),10)-pic.width())/2);

                $.fn.tSlider.inner.animate({
                        "margin-left": pos + "px"
                    }, function () {
                        // console.log('animate done')
                    }
                ); //end animate
             //end slide
        }

        $('#tSlide-b').click(function (e) {
            // console.log('fw clicked');
            // console.log('current: ',$.fn.tSlider.current);

            if ($.fn.tSlider.current != 0) {
                $.fn.tSlider.slide(--($.fn.tSlider.current));
            } else {
                $.fn.tSlider.current = $.fn.tSlider.distances.length-1;
                $.fn.tSlider.slide($.fn.tSlider.current);
            }
            e.preventDefault();
        });

        $('#tSlide-f').click(function (e) {
            // console.log('fw clicked');
            // console.log('current: ',$.fn.tSlider.current);
            
            if ( $.fn.tSlider.current != $.fn.tSlider.distances.length-1 ) { 
                $.fn.tSlider.slide(++($.fn.tSlider.current));
            } else { 
                $.fn.tSlider.current = 0;
                $.fn.tSlider.slide($.fn.tSlider.current);
            }
            e.preventDefault();
        });

        //TODO: add window.resize

        return this;    

    };
})(jQuery);
