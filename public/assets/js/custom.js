$(window).scroll(function(){
    if ($(this).scrollTop() > 80) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});


// **=========== Header Active Class =====
// JavaScript code to handle the active class
$( '#navbar' ).on( 'click', function () {
	$( '#topheader .navbar-nav' ).find( 'li a.active' ).removeClass( 'active' );
	$( this ).parent( 'li' ).addClass( 'active' );
});




// * Client Slider
$('.chatBots').owlCarousel({
    loop:true,
    margin: 20,
    nav:true,
    dots:false,
    // autoplay:true,
    // autoplayTimeout:1200,
    // autoplayHoverPause:true,
    responsive:{
        0:{
            items:1,
            center: true,
        },
        576:{
          items:2
      },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
})

// ** Glight Box
// var lightbox = GLightbox();
// lightbox.on('open', (target) => {
//     console.log('lightbox opened');
// });


