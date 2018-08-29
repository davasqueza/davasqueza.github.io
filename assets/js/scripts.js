(function () {
    "use strict";

    var activeAccordion = false;

    function initialize() {
        initializeShelfs();
        initializeStaticLinks();
        initializeMenu();
    }

    function initializeShelfs() {
        setSlick();
        setTabs();
    }

    function setSlick() {
        $('.banner-principal').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        arrows:false
                    }
                }
            ]
        });
        $('#sugeridos-ofertas,#nuevos-ofertas,#oportunidades-ofertas, #sugeridos-novedades, #nuevos-novedades, #oportunidades-novedades').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            centerMode: true,
            centerPadding: '20px',
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        arrows:false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows:false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('.banners-secundarios').slick({
            dots: true,
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: Infinity,
                    settings: "unslick"
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
        $('.banners-promos').slick({
            dots: true,
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    function setTabs() {
        $('.tabs-nav .tab-header').click(function(){
            $(this).parent().siblings('.tabs-content').find('.tab-content').hide();
            $(this).parent().find('.tab-header').removeClass('active');
            $(this).addClass('active');

            var activeTab = $(this).find('a').attr('href');
            $(activeTab).show();

            $('#sugeridos-ofertas,#nuevos-ofertas,#oportunidades-ofertas, #sugeridos-novedades, #nuevos-novedades, #oportunidades-novedades').slick('setPosition');

            return false;
        });
    }

    function initializeStaticLinks() {
        var icons = {
            header: "icon-icon__arrow-down",
            activeHeader: "icon-icon__arrow-up"
        };
        var linksContainer = $( ".static-links" );
        var setAccordion = function () {
            var currentSize = $(window).width();
            if(currentSize < 768 && !activeAccordion){
                linksContainer.accordion({
                    header: ".links-container > .links-section > :first-child",
                    icons: icons,
                    heightStyle: "content"
                });
                activeAccordion = true;
            }
            if(currentSize > 768 && activeAccordion){
                linksContainer.accordion("destroy");
                activeAccordion = false;
            }
        };

        setAccordion();
        $(window).resize(setAccordion);
    }

    function initializeMenu() {
        initializeMobileMenu();
        initializeDesktopMenu();

    }

    function initializeMobileMenu(){
        $('#mainMenuContainer .closeMenu').click(function() {
            $('.subMenuContiner').removeClass('showSubMenu');
            $('#mainMenuContainer').removeClass();
        });
        $('.menu-icon-container').click(function() {
            $('#mainMenuContainer').toggleClass('openMenu');
        });
        $('.subMenuContiner, .departments').each(function() {
            var delayAmount = 3;
            $(this).find('a').each(function() {
                $(this).attr('style','transition-delay:'+(delayAmount / 10)+'s;');
                delayAmount ++;
            });
        });
        $('#mainMenuBody a:not(.redirect)').click(function() {
            var submenuId = $(this).attr('data-submenu');
            if($(this).parent().hasClass('subMenuContiner')) {
                $('#mainMenuContainer').addClass('openMenuSubCats');
            } else {
                $('#mainMenuContainer').addClass('openSubMenu');
            }
            $('.subMenuContiner[data-submenu="'+submenuId+'"]').addClass('showSubMenu');
        });
        $('.subMenuContiner a:not(.redirect)').click(function() {
            var submenuTerId = $(this).attr('data-submenu');
            $(this).parent('.subMenuContiner').addClass('prevMenu');
            $('.subMenuTer[data-submenu="'+submenuTerId+'"]').addClass('showSubMenu');
        });
        $('.titleBackBtn').click(function() {
            $(this).parent('.subMenuContiner').removeClass('showSubMenu');
            if($(this).parent('.subMenuContiner').hasClass('subMenuTer')) {
                $('.prevMenu').removeClass('prevMenu');
                $('#mainMenuContainer').removeClass('openMenuSubCats');
            } else {
                $('#mainMenuContainer').removeClass('openSubMenu');
            }
        });
    }

    function initializeDesktopMenu(){
        var desktopMenuButton = $(".desktop-menu");
        var menuIcon = desktopMenuButton.find(".arrow");
        var menuContainer = $("#desktop-menu-container");


        desktopMenuButton.hover(function () {
            menuContainer.removeClass("anim--panUp").addClass("anim--panDown");
            menuIcon.removeClass("icon-icon__arrow-down").addClass("icon-icon__arrow-up");
            $("body").addClass("noScroll");
        }, function () {
            menuContainer.removeClass("anim--panDown").addClass("anim--panUp");
            menuIcon.removeClass("icon-icon__arrow-up").addClass("icon-icon__arrow-down");
            $("body").removeClass("noScroll");
        });


        // var showMenu = false;
        // desktopMenuButton.click(function () {
        //     showMenu = !showMenu;
        //     menuContainer.toggleClass("anim--panUp", !showMenu);
        //     menuContainer.toggleClass("anim--panDown", showMenu);
        //     menuIcon.toggleClass("icon-icon__arrow-down icon-icon__arrow-up");
        //     $("body").toggleClass("noScroll", showMenu);
        // });
    }

    initialize();
})();