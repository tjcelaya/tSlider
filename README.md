# tSlider jQuery plugin

## Usage

Include the script anywhere on the page and add a div to put the content into, and use 

        $.fn.tSlider( <target div>, <Array of images to insert> [, options] );
to initialize the plugin.

Then: call 

        $.fn.tSlider.getDistances();

to let the plugin calculate the correct movement distances. Options are supported as 

        options = {
            height: x,
            width: y,
            buttonImages: null
        }

Where `x` and `y` are any value that can be passed to a `jQuery.css({object literal})`

## Obviously you need jQuery.

## Author:

Tomas Celaya
