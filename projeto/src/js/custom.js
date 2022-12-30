
$(document).ready(function(){

   /*
   * Instanciação do Owl Carrousel
   */
   $('.owl-carousel').owlCarousel();


   /*
   * Configuração de produtos
   */ 
   $('.featured-item a').addClass('btn btn-dark stretch-link');

   $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')


   /**
    * Event listener .nav-modal-open
    * Chamada dinâmica para os modais
    */
   $('.nav-modal-open').on('click', function(e) {

      e.preventDefault();

      let elem = $(this).attr('rel');

      $('.modal-body').html($('#'+elem).html());
      $('.modal-header h5.modal-title').html($(this).text());

      let myModal = new bootstrap.Modal($('#modalId'));

      myModal.show();
   });

})
