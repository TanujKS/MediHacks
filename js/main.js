/*  ---------------------------------------------------
    Template Name: Manup
    Description: Manup Event HTML Template
    Author: Colorlib
    Author URI: http://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------------
		Partner Slider
    ----------------------- */
    $(".partner-logo").owlCarousel({
        items: 5,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        margin: 116,
        responsive: {
            320: {
                items: 2,
            },
            480: {
                items: 3,
            },
            768: {
                items: 4,
            },
            992: {
                items: 5,
            },
        }
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 2,
        dots: false,
        autoplay: false,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2
            }
        }
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        CountDown
    --------------------*/
    // var targetDate = new Date('2024-07-07T09:00:00').getTime();

    // console.log(targetDate)

	// $("#countdown").countdown(targetDate, function(event) {
    //     $(this).html(event.strftime("<div class='cd-item'><span>%D</span> <p>Days</p> </div>" + "<div class='cd-item'><span>%H</span> <p>Hrs</p> </div>" + "<div class='cd-item'><span>%M</span> <p>Mins</p> </div>" + "<div class='cd-item'><span>%S</span> <p>Secs</p> </div>"));
    // });

    const data = [
        {
            key: "participants",
            value: 1000,
            suffix: "+"
        },
        {
            key: "judges",
            value: 24,
        },
        {
            key: "sponsors",
            value: 20,
        },
        {
            key: "dollars raised",
            value: 10000,
            suffix: "+"
        }
    ]

    const duration = 2000;

    function animate(obj, index) {
        let startTime = null;

        let currentTime = Date.now();

        const step = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }
    
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const animatedValue = Math.floor(progress * data[index]['value']);
            
            obj.innerHTML = `
                <span>
                    ${progress === 1 
                        ? animatedValue.toLocaleString() + (data[index]['suffix'] || "")
                        : animatedValue
                    }
                </span>
                <p>${data[index]['key']}</p>
            `;
    
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
    

        window.requestAnimationFrame(step);
    }


    const load = () => {

        for (const index in data) {
            animate(
                document.getElementById(`counter-${parseInt(index) + 1}`),
                index
            )
        }
    }
    
    load()

})(jQuery);