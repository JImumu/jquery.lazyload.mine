/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            timeout         : options && options.timeout || 1000,
            errorholder     : options && options.errorholder || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAKACAMAAAD0PQ3SAAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0MzQkQ4M0ZBQUExMUU4QkM3RUY5RDk3RTBCOUFDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0MzQkQ4NEZBQUExMUU4QkM3RUY5RDk3RTBCOUFDQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRDQzNCRDgxRkFBQTExRThCQzdFRjlEOTdFMEI5QUNCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRDQzNCRDgyRkFBQTExRThCQzdFRjlEOTdFMEI5QUNCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0Zv+YAAAAC1QTFRFR3BMUVFRXV1dYWFhXV1dZmZmZmZmZmZmMzMzMzMzZmZmZmZmMzMz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",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAKACAMAAAD0PQ3SAAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0EzMUFDQUZBQUIxMUU4QkM3RUY5RDk3RTBCOUFDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0EzMUFDQkZBQUIxMUU4QkM3RUY5RDk3RTBCOUFDQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRDQzNCRDg5RkFBQTExRThCQzdFRjlEOTdFMEI5QUNCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRDQzNCRDhBRkFBQTExRThCQzdFRjlEOTdFMEI5QUNCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6n6i7gAAADxQTFRFR3BMZmZmMzMzMzMzdnZ2aGhoWVlZMzMzMzMzmZmZZmZmmZmZmZmZ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"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                appearHanddler(this)
            });

            function appearHanddler (_this) {
                var timer
                if (!_this.loaded) {
                    timer = setTimeout(function () {
                        $self.attr('src', settings.errorholder)                        
                        tempImg.unbind('load')
                        $self.one("click", function() {
                            $self.attr('src', settings.placeholder)
                            appearHanddler(_this)
                        })
                    }, settings.timeout)

                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    var tempImg = $("<img />")
                        .bind("load", function() {
                            clearTimeout(timer)
                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            }

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
