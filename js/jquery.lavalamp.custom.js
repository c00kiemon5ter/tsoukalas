(function ($) {
	
	var query = window.location.search;
	if (query.substring(0, 1) == '?') {
		query = query.substring(1);
	}
	if(query === undefined)
		query = 0;
		
    $.fn.lavaLamp = function (o) {
        o = $.extend({
            fx: "linear",
            speed: 500,
            click: function () {}
        }, o || {});
        return this.each(function () {
            var b = $(this),
                noop = function () {},
                $back = $('<li class="back"><div class="left"></div></li>').appendTo(b),
                $li = $("li", this),
                curr = $("li.current", this)[query] || $($li[query]).addClass("current")[0];
            $li.not(".back").hover(function () {
                move(this)
            }, noop);
            $(this).hover(noop, function () {
                move(curr)
            });
            $li.click(function (e) {
                setCurr(this);
                return o.click.apply(this, [e, this])
            });
            setCurr(curr);

            function setCurr(a) {
                $back.css({
                    "left": a.offsetLeft + "px",
                    "width": a.offsetWidth + "px"
                });
                curr = a
            };

            function move(a) {
                $back.each(function () {
                    $(this).dequeue()
                }).animate({
                    width: a.offsetWidth,
                    left: a.offsetLeft
                }, o.speed, o.fx)
            }
        })
    }
})(jQuery);
