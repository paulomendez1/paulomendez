$(document).ready(function() {
  // MODAL
  var modalText = {
    movies: {
      title: 'My Movies',
      tag: '',
      detail:
        'A website about Movies Information (Rating, Actors, Movie Theaters where they will be shown, etc.) It contains a Security Logic (login, roles, interceptors, etc.).',
      link: 'https://github.com/paulomendez1/MyMovies'
    },
    socialnetwork: {
      title: 'My Social Network V2',
      tag: '',
      detail:
        'A classic social network website (including posts, comments, likes, profile, etc.) It contains an IdentityServer4 security layer (including Database store). API covers nearly all REST architecture limits (Data Shaping, HATEOAS, Cache, etc.)',
      link: 'https://github.com/paulomendez1/MySocialNetworkV2'
    },
    cities: {
      title: 'WorldCities',
      tag: 'APPLICATION PERFORMANCE MONITORING.',
      detail:
        'A World Cities/Countries PWA with Security (Login, Roles, etc), CRUD & Unit Testing.',
      link: 'https://github.com/paulomendez1/WorldCities'
    },
    socialnetworkapi: {
      title: 'My Social Network API',
      tag: '',
      detail:
        'socialnetworkapi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.',
      link: 'http://www.socialnetworkapi.com'
    },
    school: {
      title: 'School Management System',
      tag: '',
      detail:
        'A desktop application for students, teachers and finance management.',
      link: 'https://github.com/paulomendez1/SistemaGestionEscolar'
    },
    ecommerce: {
      title: 'E-Commerce',
      tag: '',
      detail:
        'Full E-Commerce system with Log-In and Session Management',
      link: 'https://github.com/paulomendez1/SistemadeVentasOnline'
    },
    agenda: {
      title: 'ProAgenda',
      tag: '',
      detail:
        'Simple Mobile Application to schedule medical appointments',
      link: 'https://github.com/paulomendez1/proagenda'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
