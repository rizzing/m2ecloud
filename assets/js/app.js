$(document).ready(function () {
    $(".country_item_tooltip").hide();

    JS.init();
});

let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    },
};

const $body = $("body");
const $window = $(window);

let JS = {
    clickEvent: "",
    hoverEvent: "",

    init: function () {
        JS.clickEvent = isMobile.any() ? "touchstart" : "click";
        JS.hoverEvent = isMobile.any() ? "touchstart" : "hover";

        JS.headerMenu();
        JS.toggleMenu();
        JS.featuresTabs();
        //JS.topBlockAnimation();
        JS.pFilter();
        JS.faqList();
        JS.togglePlanFeatures();
        JS.spsSlider();
        JS.srbSlider();
        JS.showMoreReviews();
        JS.showMoreStories();

        JS.pageScrollTop();
        JS.pageScrollTopToggle();
        $window.scroll(function () {
            JS.pageScrollTopToggle();
        });
        $window.resize(function () {
            JS.pageScrollTopToggle();
        });

        JS.countryTooltip();
        JS.screenSlider();
        JS.scrollto();

        JS.srrSlider();

        JS.subMenuLvl2();

        JS.pageNavFunc();
        $window.scroll(function () {
            JS.pageNavFunc();
        });
        $window.resize(function () {
            JS.pageNavFunc();
        });

        try{
            lightGallery(document.getElementById("lightgallery_1"));
        }catch(e){}
        try{
            lightGallery(document.getElementById("lightgallery_2"));
        }catch(e){}
        try{
            lightGallery(document.getElementById("lightgallery_3"));
        }catch(e){}
        try{
            lightGallery(document.getElementById("lightgallery_4"));
        }catch(e){}
        try{
            lightGallery(document.getElementById("lightgallery_5"));
        }catch(e){}
        try{
            lightGallery(document.getElementById("lightgallery_6"));
        }catch(e){}

        if($('.section_pricing').length > 0){
            $.get("https://ipinfo.io", function (response) {
                console.log(response);
                if(response.country == 'AT' ||
                    response.country == 'BE' ||
                    response.country == 'IE' ||
                    response.country == 'ES' ||
                    response.country == 'IT' ||
                    response.country == 'LU' ||
                    response.country == 'NL' ||
                    response.country == 'DE' ||
                    response.country == 'PT' ||
                    response.country == 'FI' ||
                    response.country == 'FR'
                ){
                    $('.js_change_currency[data-currency="eur"]').click();
                }
            }, "jsonp");
        }
        $('.js_change_currency[data-currency="eur"]').click();

    },

    scrollto: function () {
        let heh = $(".header").height() * 1;
        let hn = 67;
        /*if($(".js_section_nav").length > 0){
            hn = $(".js_section_nav").height() * 1;
        }
        if($(".js_section_nav_2").length > 0){
            hn = $(".js_section_nav_2").height() * 1;
        }
        if($(".js_section_nav_3").length > 0){
            hn = $(".js_section_nav_3").height() * 1;
        }*/

        $body.on("click", ".scrollto", function (event) {
            event.preventDefault();
            let id = $(this).attr("href"),
                top = $(id).offset().top - hn - heh;
            $("body,html").animate({ scrollTop: top }, 500);
        });

        $body.on("click", ".scroll_to", function (event) {
            event.preventDefault();
            let id = $(this).attr("href"),
                top = $(id).offset().top - heh;
            $("body,html").animate({ scrollTop: top }, 500);
        });
    },

    srrSlider: () => {
        if($('.srr_slider').length > 0){
            $('.srr_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                arrows: true,
                prevArrow: $('.srr_slider_prev'),
                nextArrow: $('.srr_slider_next'),
                dots: true
            });
        }
    },

    pageNavFunc: () => {
        if ($(".js_section_nav").length > 0) {
            let wh = $window.height() * 1;
            let bt = $(".js_section_nav").position().top;
            let hh = $(".header").height() * 1;
            let ws = $window.scrollTop() + hh;

            if (ws < bt) {
                $(".section_nav").removeClass("js_section_nav_fixed");
            } else {
                $(".section_nav").addClass("js_section_nav_fixed");
            }

            let shift = wh / 2 + hh;

            let overview = $("#overview").position().top - shift;
            let screenshots = $("#screenshots").position().top - shift;
            let features = $("#features").position().top - shift;
            let faq = $("#faq").position().top - shift;
            let manual_and_support = $("#manual_and_support").position().top - shift;
            let reviews = $("#reviews").position().top - shift;

            if (overview > ws) {
                $(".btn_snl").removeClass("active");
            }

            if (overview < ws && screenshots > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#overview"]').addClass("active");
            } else if (screenshots < ws && features > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#screenshots"]').addClass("active");
            } else if (features < ws && faq > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#features"]').addClass("active");
            } else if (faq < ws && manual_and_support > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#faq"]').addClass("active");
            } else if (manual_and_support < ws && reviews > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#manual_and_support"]').addClass("active");
            } else if (reviews < ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#reviews"]').addClass("active");
            }
        }

        if ($(".js_section_nav_2").length > 0) {
            let wh = $window.height() * 1;
            let bt = $(".js_section_nav_2").position().top;
            let hh = $(".header").height() * 1;
            let ws = $window.scrollTop() + hh;

            if (ws < bt) {
                $(".section_nav").removeClass("js_section_nav_fixed");
            } else {
                $(".section_nav").addClass("js_section_nav_fixed");
            }

            let shift = wh / 2 + hh;

            let overview = $("#overview").position().top - shift;
            let screenshots = $("#screenshots").position().top - shift;
            let features = $("#features").position().top - shift;
            let manual_and_support = $("#manual_and_support").position().top - shift;
            let faq = $("#faq").position().top - shift;
            let reviews = $("#reviews").position().top - shift;

            if (overview > ws) {
                $(".btn_snl").removeClass("active");
            }

            if (overview < ws && screenshots > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#overview"]').addClass("active");
            } else if (screenshots < ws && features > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#screenshots"]').addClass("active");
            } else if (features < ws && manual_and_support > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#features"]').addClass("active");
            } else if (manual_and_support < ws && faq > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#manual_and_support"]').addClass("active");
            } else if (faq < ws && reviews > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#faq"]').addClass("active");
            } else if (reviews < ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#reviews"]').addClass("active");
            }
        }

        if ($(".js_section_nav_3").length > 0) {
            let wh = $window.height() * 1;
            let bt = $(".js_section_nav_3").position().top;
            let hh = $(".header").height() * 1;
            let ws = $window.scrollTop() + hh;

            if (ws < bt) {
                $(".section_nav").removeClass("js_section_nav_fixed");
            } else {
                $(".section_nav").addClass("js_section_nav_fixed");
            }

            let shift = wh / 2 + hh;

            let overview = $("#overview").position().top - shift;
            let screenshots = $("#screenshots").position().top - shift;
            let features = $("#features").position().top - shift;
            let faq = $("#faq").position().top - shift;
            let reviews = $("#reviews").position().top - shift;

            if (overview > ws) {
                $(".btn_snl").removeClass("active");
            }

            if (overview < ws && screenshots > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#overview"]').addClass("active");
            } else if (screenshots < ws && features > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#screenshots"]').addClass("active");
            } else if (features < ws && faq > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#features"]').addClass("active");
            } else if (faq < ws && reviews > ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#faq"]').addClass("active");
            } else if (reviews < ws) {
                $(".btn_snl").removeClass("active");
                $('.btn_snl[href="#reviews"]').addClass("active");
            }
        }
    },

    screenSlider: function () {
        $body.on("click", ".js_screen_slider", function () {
            const $this = $(this);
            let num = $this.attr("data-slide");
            let activeClass = "screens_slider screens_slider_mode_" + num;
            $(".screens_slider").attr("class", activeClass);

            $(".js_screen_slider").removeClass("active");
            $this.addClass("active");

            return false;
        });

        $body.on('click', '.js_screen_slider_2', function(){
            const $this = $(this);
            let num = $this.attr('data-slide');
            let activeClass = 'screens_slider screens_slider_eaw screens_slider_mode_'+num;
            $('.screens_slider').attr('class', activeClass);

            $('.js_screen_slider_2').removeClass('active');
            $this.addClass('active');

            return false;
        });
    },

    countryTooltip: () => {
        $body.on("mouseenter", ".js_country_item_with_tooltip", function () {
            const $this = $(this);
            $this.find(".country_item_tooltip").show();
        });

        $body.on("mouseleave", ".js_country_item_with_tooltip", function () {
            const $this = $(this);
            $this.find(".country_item_tooltip").hide();
        });
    },

    showMoreReviews: function () {
        $body.on("click", ".js_review_sm", function () {
            const $this = $(this);
            const block = $this.closest(".js_review_sm_block");

            if (block.hasClass("show_full")) {
                block.removeClass("show_full");
            } else {
                $(".js_review_sm_block").removeClass("show_full");
                block.addClass("show_full");
            }

            return false;
        });
    },

    showMoreStories: function () {
        $body.on("click", ".js_showmore_stories", function () {
            $(".s3_list_hidden").show();
            $(".s3_btn_hide").show();
            $(".s3_btn_show").hide();

            return false;
        });

        $body.on("click", ".js_hide_stories", function () {
            $(".s3_list_hidden").hide();
            $(".s3_btn_show").show();
            $(".s3_btn_hide").hide();

            return false;
        });
    },

    srbSlider: function () {
        if ($(".slider_srb").length > 0) {
            $(".slider_srb").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                arrows: false,
                dots: true,
            });
        }

        if ($(".srbm_slider").length > 0) {
            $(".srbm_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                arrows: false,
                dots: true,
            });
        }
    },

    pageScrollTopToggle: function () {
        let ws = $window.scrollTop();
        let wh = $window.height();

        if (ws > wh) {
            $(".js_scroll_up").show();
        } else {
            $(".js_scroll_up").hide();
        }
    },

    pageScrollTop: function () {
        $body.on("click", ".js_scroll_up", function (e) {
            e.preventDefault();
            $("body,html").animate({ scrollTop: 0 }, 400);
        });
    },

    spsSlider: function(){
        if($('.sps_slider').length > 0){
            $('.sps_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                arrows: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            arrows: false,
                            dots: true,
                        },
                    }
                ]
            });
        }
    },

    togglePlanFeatures: () => {
        $body.on("click", ".js_toggle_plan_features", function () {
            $("#comparePlanFeatures").toggleClass("active");

            return false;
        });

        $body.on("click", ".js_togle_ttf_cbl", function () {
            const block = $(this).closest(".ttf_collapse_block");
            block.toggleClass("_show");
            return false;
        });
    },

    faqList: function () {
        $body.on("click", ".js_toggle_faq", function () {
            let block = $(this).closest(".js_toggle_faq_block");
            if (block.hasClass("open")) {
                block.removeClass("open");
                block.find(".faq_answer_block").slideUp();
            } else {
                $(".js_toggle_faq_block").removeClass("open");
                $(".js_toggle_faq_block").find(".faq_answer_block").slideUp();
                block.addClass("open");
                block.find(".faq_answer_block").slideDown();
            }

            return false;
        });
    },

    pFilter: function () {
        JS.checkSupport();

        $body.on("click", ".js_change_currency", function () {
            const $this = $(this);
            let currency = $this.attr("data-currency");

            $(".js_change_currency").removeClass("active");
            $this.addClass("active");

            $(".p_tarifs__var_p").removeClass("active");
            $('.p_tarifs__var_p[data-ptarif="' + currency + '"]').addClass("active");

            $(".btn_tarif__amount_n").removeClass("active");
            $('.btn_tarif__amount_n[data-ptarif="' + currency + '"]').addClass("active");

            return false;
        });

        $body.on("click", ".js_change_period", function () {
            const $this = $(this);
            let period = $this.attr("data-period");

            $(".js_change_period").removeClass("active");
            $this.addClass("active");

            $(".subtitle_p_tarif_t").removeClass("active");
            $('.subtitle_p_tarif_t[data-pperiod="' + period + '"]').addClass("active");

            $(".p_tarifs__var_item").removeClass("active");
            $('.p_tarifs__var_item[data-pperiod="' + period + '"]').addClass("active");

            if (period == "annually") {
                $(".p_tarifs__var_price_an_ins").show();
            } else {
                $(".p_tarifs__var_price_an_ins").hide();
            }

            return false;
        });

        $body.on("click", ".js_select_variant", function () {
            const $this = $(this);

            const tarif_item = $this.closest(".js_select_tarif_item");
            $(".js_select_tarif_item").removeClass("p_tarif_item_active");
            tarif_item.addClass("p_tarif_item_active");

            if ($this.hasClass("disabled")) return false;

            let variant = $this.attr("data-variant");
            let tarif = $this.closest(".p_tarifs__var_list");

            console.log(variant);

            tarif.find(".p_tarif__period_var").removeClass("active");
            tarif.find('.p_tarif__period_var[data-pvariant="' + variant + '"]').addClass("active");

            JS.checkSupport();

            return false;
        });

        $body.on("click", ".js_select_tarif_item", function () {
            const $this = $(this);
            $(".js_select_tarif_item").removeClass("p_tarif_item_active");
            $this.addClass("p_tarif_item_active");

            JS.checkSupport();
        });

        $body.on("click", ".js_l_pricing_item", function () {
            const $this = $(this);
            $(".js_l_pricing_item").removeClass("l_pricing_item_active");
            $this.addClass("l_pricing_item_active");

        });
    },

    checkSupport: function () {
        const p_tarif_item_active = $(".p_tarif_item_active").attr("data-tarif");
        const f_month = $(".js_change_period.active").attr("data-period");
        let active_tarif_0 = $(
            '.js_select_tarif_item[data-tarif="1"] .p_tarifs__var_item.active .p_tarif__period_var.active'
        ).attr("data-pvariant");

        if (p_tarif_item_active == 1 && f_month == "monthly" && active_tarif_0 == 1) {
            $(".tarif_0_y").show();
            $(".tarif_0_n").hide();
        } else {
            $(".tarif_0_y").hide();
            $(".tarif_0_n").show();
        }

        if (p_tarif_item_active == 3) {
            $(".tarif_3_y").show();
            $(".tarif_3_n").hide();
        } else {
            $(".tarif_3_y").hide();
            $(".tarif_3_n").show();
        }
    },

    featuresTabs: function () {
        $body.on("click", ".js_sfh_collapse_nav_item", function () {
            const $this = $(this);
            let id = $this.attr("href");

            $(".sfh_collapse_nav_item").removeClass("active");
            $this.addClass("active");
            $(".sfh_collapse_img_item").removeClass("show");
            $(id).addClass("show");
            id = id.replace("#", "");
            $('.sfh_collapse_img_item[data-id="' + id + '"]').addClass("show");

            return false;
        });
    },

    topBlockAnimation: () => {
        $("#a_full").addClass("a_start");

        JS.chartAnimation(".a_chart_1", 504, 504, 478, 3500, "M322.894 @H295.277V504H322.894V478.422Z");
        JS.chartAnimation(".a_chart_11", 504, 504, 478, 3500, "M302.772 @H295V504H302.772V478.422Z");

        setTimeout(function () {
            JS.chartAnimation(".a_chart_2", 504, 504, 456, 3500, "M363.002 @H335.385V503.862H363.002V456.282Z");
            JS.chartAnimation(".a_chart_21", 504, 504, 456, 3500, "M343.018 @H335.246V503.862H343.018V456.282Z");
        }, 100);

        setTimeout(function () {
            JS.chartAnimation(".a_chart_3", 504, 504, 434, 3500, "M406.023 @H378.406V503.862H406.023V434.142Z");
            JS.chartAnimation(".a_chart_31", 504, 504, 434, 3500, "M386.039 @H378.268V503.862H386.039V434.142Z");
        }, 100);

        setTimeout(function () {
            JS.chartAnimation(".a_chart_4", 504, 504, 412, 3500, "M448.212 @H420.595V504H448.212V412.14Z");
            JS.chartAnimation(".a_chart_41", 504, 504, 412, 3500, "M428.228 @H420.457V504H428.228V412.14Z");
        }, 100);

        setTimeout(function () {
            JS.chartAnimation(".a_chart_5", 504, 504, 390, 3500, "M488.32 @H460.703V504H488.32V390Z");
            JS.chartAnimation(".a_chart_51", 504, 504, 390, 3500, "M468.474 @H460.703V503.862H468.474V390Z");
        }, 100);

        setTimeout(function () {
            $(".a_service_3").attr("transform", "matrix(1 0 0 1 1 1)").css("opacity", "1");
        }, 1500);
        setTimeout(function () {
            $(".a_service_4").attr("transform", "matrix(1 0 0 1 1 1)").css("opacity", "1");
        }, 1900);
        setTimeout(function () {
            $(".a_service_1").attr("transform", "matrix(1 0 0 -1 411 163)").css("opacity", "1");
        }, 2300);
        setTimeout(function () {
            $(".a_service_2").attr("transform", "matrix(1 0 0 1 283 38)").css("opacity", "1");
        }, 2700);
        setTimeout(function () {
            $(".a_service_5").attr("transform", "matrix(1 0 0 1 1 1)").css("opacity", "1");
        }, 3100);
        setTimeout(function () {
            $(".a_service_6").attr("transform", "matrix(1 0 0 1 1 1)").css("opacity", "1");
        }, 3500);
        setTimeout(function () {
            $(".a_service_7").attr("transform", "matrix(1 0 0 1 120 220)").css("opacity", "1");
        }, 3900);
        setTimeout(function () {
            $(".a_service_8").attr("transform", "matrix(1 0 0 1 300 190)").css("opacity", "1");
        }, 4300);
    },

    chartAnimation: (chart, start, path, finish, time, str) => {
        const interval = time / 100;
        const shift = (start - finish) / 100;
        let value = path - shift;
        let d = str.replace("@", value);
        setTimeout(function () {
            if (value > finish) {
                $(chart).attr("d", d);
                JS.chartAnimation(chart, start, value, finish, time, str);
            }
        }, interval);
    },

    // toggleMenu: function () {
    //     function closeMobileMenu(obj) {
    //         if ($window.width() * 1 < 1500) {
    //             $(".js_toggle_menu").removeClass("show");
    //             $body.removeClass("body_fixed");
    //             $(".header_nav").hide();
    //         }
    //     }
    //
    //     $body.on("click", ".js_toggle_menu", function () {
    //         const $this = $(this);
    //         const menu = $(".header_nav");
    //         if ($this.hasClass("show")) {
    //             closeMobileMenu($this);
    //         } else {
    //             $this.addClass("show");
    //             $body.addClass("body_fixed");
    //             $(".header_nav").show();
    //         }
    //
    //         return false;
    //     });
    //
    //     $body.on("click", ".js_header_nav a", function () {
    //         const obj = $(".js_toggle_menu");
    //         closeMobileMenu(obj);
    //     });
    //
    //     /*
    //     var header = $('.header'),
    //         scrollPrev = 0;
    //
    //     $window.scroll(function() {
    //         let scrolled = $window.scrollTop();
    //
    //         if ( scrolled > 100 && scrolled > scrollPrev ) {
    //             header.addClass('out');
    //         } else {
    //             header.removeClass('out');
    //         }
    //         scrollPrev = scrolled;
    //     });
    //      */
    // },
    //
    // headerMenu: function () {
    //     $body.on("click", ".hfm_item__has_dd > a", function () {
    //         const $this = $(this);
    //         const hfm_item = $this.closest(".hfm_item__has_dd");
    //         const sub_menu = hfm_item.find(".sub-menu");
    //         if (!hfm_item.hasClass("show")) {
    //             $(".hfm_item__has_dd").removeClass("show");
    //             $(".sub-menu").slideUp(100);
    //
    //             hfm_item.addClass("show");
    //             sub_menu.slideDown(100);
    //         } else {
    //             hfm_item.removeClass("show");
    //             sub_menu.slideUp(100);
    //         }
    //
    //         return false;
    //     });
    //     $(".hfm_item__has_dd_sub").on("click", function () {
    //         const $this = $(this);
    //         const hfm_item = $this.closest(".hfm_item__has_dd_sub");
    //         const sub_menu = hfm_item.find(".sub-menu_sub");
    //         if (!hfm_item.hasClass("show")) {
    //             $(".hfm_item__has_dd_sub").removeClass("show");
    //             $(".sub-menu").slideUp(100);
    //
    //             hfm_item.addClass("show");
    //             sub_menu.slideDown(100);
    //         } else {
    //             hfm_item.removeClass("show");
    //             sub_menu.slideUp(100);
    //         }
    //
    //         return false;
    //     });
    //
    //     $body.on("click", function () {
    //         $(".hfm_item__has_dd").removeClass("show");
    //         $(".sub-menu").slideUp(100);
    //     });
    //
    //     $body.on("click", ".js_toggle_menu", function () {
    //         return false;
    //     });
    // },
    toggleMenu: function(){
        function closeMobileMenu(obj){
            if($(window).width()*1 < 1500){
                $('.js_toggle_menu').removeClass('show');
                $('body').removeClass('body_fixed');
                $('.header_nav').hide();
            }
        }

        $('body').on('click', '.js_toggle_menu', function(){
            const $this = $(this);
            const menu = $('.header_nav');
            if($this.hasClass('show')){
                closeMobileMenu($this);
            }else{
                $this.addClass('show');
                $('body').addClass('body_fixed');
                $('.header_nav').show();
            }

            return false;
        });

        $('body').on('click', '.js_header_nav a', function(){
            const obj = $('.js_toggle_menu');
            closeMobileMenu(obj);
        });

        /*
        var header = $('.header'),
            scrollPrev = 0;

        $(window).scroll(function() {
            let scrolled = $(window).scrollTop();

            if ( scrolled > 100 && scrolled > scrollPrev ) {
                header.addClass('out');
            } else {
                header.removeClass('out');
            }
            scrollPrev = scrolled;
        });
         */
    },

    subMenuLvl2: () => {
        if($(window).width()*1 > 991){
            $('body').on('mouseenter', '.hfm_item__has_dd2', function(){
                const $this = $(this);
                const block = $this.find('.sub-menu-2');
                $('.hfm_item__has_dd2').find('.sub-menu-2').hide();
                block.fadeIn();

                return false;
            });

            $('body').on('mouseleave', '.hfm_item__has_dd2', function(){
                const $this = $(this);
                const block = $this.find('.sub-menu-2');
                block.hide();
                return false;
            });

            $('body').on('click', '.footer_nav_link_dd', function(){
                return false;
            })
        }else{
            $('body').on('click', '.hfm_item__has_dd2 > a', function(){
                const $this = $(this);
                const wrapper = $this.closest('.hfm_item__has_dd2');
                const block = wrapper.find('.sub-menu-2');
                if(wrapper.hasClass('opened')){
                    $('.sub-menu-2').hide();
                    wrapper.removeClass('opened');
                }else{
                    $('.hfm_item__has_dd2').find('.sub-menu-2').hide();
                    wrapper.addClass('opened');
                    block.fadeIn();
                }



                return false;
            });
        }


    },

    headerMenu: function(){
        $('body').on('click', '.hfm_item__has_dd > a', function(){
            const $this = $(this);
            const hfm_item = $this.closest('.hfm_item__has_dd');
            const sub_menu = hfm_item.find('.sub-menu');
            if(!hfm_item.hasClass('show')){
                $('.hfm_item__has_dd').removeClass('show');
                $('.sub-menu').slideUp(100);

                hfm_item.addClass('show');
                sub_menu.slideDown(100);
            }else{
                hfm_item.removeClass('show');
                sub_menu.slideUp(100);
            }

            return false;
        });

        $('body').on('click', function(){
            $('.hfm_item__has_dd').removeClass('show');
            $('.sub-menu').slideUp(100);
        });

        $('body').on('click', '.js_toggle_menu', function(){
            const $this = $(this);

            return false;
        });
    }


};
function initHideYears() {
    $(".pay_yearly").hide();
    $(".pay_monthly").show();
}

initHideYears();

const $watchVideo = $("#watchVideo");
const $video = $("#video");
let $videoSrc = "";
$(".video-btn").on("click", function () {
    $videoSrc = $(this).data("src");
    $video.attr("src", $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
});

$watchVideo.on("hide.bs.modal", () => {
    $video.attr("src", "#");
});

window.fwSettings = { widget_id: 9000000743 };
!(function () {
    if ("function" != typeof window.FreshworksWidget) {
        let n = function () {
            n.q.push(arguments);
        };
        n.q = [];
        window.FreshworksWidget = n;
    }
})();

$(".open-fcWidget").on("click", function (e) {
    e.preventDefault();
    FreshworksWidget("open", "ticketForm");
});
