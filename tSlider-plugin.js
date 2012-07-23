(function ($) {
    $.fn.tSlider = function (place,images) {
        $.fn.tSlider.images = images;

        $.fn.tSlider.outer = $(place);

        $.fn.tSlider.inner = $.fn.tSlider.outer.append('<div id="TSlide-inner"></div>').children();

        $.fn.tSlider.distances = [];

        var imgsrc = 0;

        for (imgsrc in $.fn.tSlider.images) {
            $.fn.tSlider.inner.append('<img src="' + $.fn.tSlider.images[imgsrc] + '"/>');
        }

        $.fn.tSlider.outer.before('<a id="tSlide-b" href="#">&lt;</a>').after('<a id="tSlide-f" href="#">&gt;</a>');

        $.fn.tSlider.outer.css({
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            height: '200px',
            width: '50%',
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

        $.fn.tSlider.getDs = function () {
            $(window).load(function () {
                $('img').each(function () {
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

        $('#tSlide-b').click(function () {
            // console.log('fw clicked');
            // console.log('current: ',$.fn.tSlider.current);

            if ($.fn.tSlider.current != 0) {
                $.fn.tSlider.slide(--($.fn.tSlider.current));
            } else {
                $.fn.tSlider.current = $.fn.tSlider.distances.length-1;
                $.fn.tSlider.slide($.fn.tSlider.current);
            }
            return false;
        });

        $('#tSlide-f').click(function () {
            // console.log('fw clicked');
            // console.log('current: ',$.fn.tSlider.current);
            
            if ( $.fn.tSlider.current != $.fn.tSlider.distances.length-1 ) { 
                $.fn.tSlider.slide(++($.fn.tSlider.current));
            } else { 
                $.fn.tSlider.current = 0;
                $.fn.tSlider.slide($.fn.tSlider.current);
            }

        //     return false;
        });

        return this;    

    };
})(jQuery);