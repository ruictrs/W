function detectIE() {
    let ua = window.navigator.userAgent;
// Test values; Uncomment to check result …
// IE 10
// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
// IE 11
// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
// Edge 12 (Spartan)
    /* ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)
    Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';*/
// Edge 13
    /*ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
    Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';*/
    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
// IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
// IE 11 => return version number
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
// Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
// other browser
    return false;
}

let isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
let afterResizeWindow = (function () {
    let timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            if (timers[uniqueId] % 5 === 0) {
                callback();
            }
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

const JlETV_APPLICATION = {
    el: {
        existingIDs: []
    }
    , init() {
        this.slick();
        this.adListner();
        this.needSplit();
        this.checkGray();
        this.checkForeignCarousel();
        this.listenLinks();
    }

    , listenLinks() {
        let that = this, followLinks = '.follow-links';
        if ($(followLinks + ' .close').length) {
            $(followLinks + ' .close').click(function (e) {
                if ($(this).parent().is('.item')) {
                    $(this).parent().fadeOut(1000, function () {
                        $(this).remove();
                    });
                }
            });
        }
    }

    , checkForeignCarousel() {
        let foreignObj = '[data-foreign=".carousel-main"]';
        if ($(foreignObj).length) {
            let objSyncHeight = () => {
                let foreignClass = $(foreignObj).data('foreign');
                if ($(foreignClass).length && $(foreignClass).find('.flickity-viewport').length) {
                    $(foreignObj).height($(foreignClass).find('.flickity-viewport').outerHeight());
                }
            };

            $(window).bind('resize', () => {
                afterResizeWindow(objSyncHeight, 200, 'objSyncHeight')
            }).trigger('resize');
        }
    }

    , checkGray() {
        let footerId = '#footer';
        if ($(footerId).length && parseInt($(footerId).data('gray')) === 1) {
            $('body').addClass('body-gray');
        }
    }

    , needSplit() {
        let nSplitClass = '.n-split';
        if ($(nSplitClass).length) {
            $(nSplitClass).each(function () {
                let that = $(this);
                let text = that.text();
                that.html('');
                $.each(text.split(''), function (i, v) {
                    $('<span>' + v + '</span>').appendTo(that);
                });
            });
        }
    }

    , adListner() {
        let that = this, homeAdObj = '#home-ad';
        if ($(homeAdObj).length) {
            imgStatus.watch('#home-ad img', function (items) {
                if (items.isDone()) {
                    $(homeAdObj).css('height', $(homeAdObj + ' img').height());

                    setTimeout(function () {
                        $(homeAdObj + ' .iconfont').trigger('click');
                    }, 5000);
                }
            });
            $(homeAdObj).on('click', '.iconfont', function () {
                $(homeAdObj).addClass('close');
            })
        }
    }

    , slick() {
        let slickClass = '.carousel', that = this;
        if ($(slickClass).length) {
            $(slickClass).each(function () {
                let options = $(this).data('flickity-options');
                if (options !== undefined) {
                    $(slickClass).flickity(options);
                }
            });
        }
    }

    , getId() {
        let that = this;
        let getRandomLetters = (length = 1) => Array(length).fill().map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
        let getRandomDigits = (length = 1) => Array(length).fill().map(e => Math.floor(Math.random() * 10)).join('');
        let generateUniqueID = () => {
            let id = getRandomLetters(3) + getRandomDigits(4);
            while (that.el.existingIDs.includes(id)) id = getRandomLetters(3) + getRandomDigits(4);
            return id;
        };
        return generateUniqueID();
    }
};

(function ($) {
    $(function () {
        JlETV_APPLICATION.init();
    })
})(jQuery);