// instancia jquery e evita conflitos
// jQuery( function($){
$(document).ready(function(){

   $('.owl-carousel').owlCarousel();

   let titulos = $('h4') // tag
   
   let itens = $('.featured-item') // class
    
   let destaques = $('#featured') // id

   console.log(titulos.first());

   // Configuração de produtos

   $('.featured-item a').addClass('btn btn-dark stretch-link');

   $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').addClass('active')
   // $('.featured-item:first h4').removeClass('active')
   // $('.featured-item:first h4').toggleClass('active')
   // $('.featured-item:first h4').hide()
   // $('.featured-item:first h4').show()
   // $('.featured-item:first h4').fadeIn(2000)
   // $('.featured-item:first h4').fadeOut()
   //  $('.featured-item:first h4').css('color', '#f00')
   
   $('.featured-item h4').dblclick( function(){

      $(this).css({
         'color': '#f00',
         'background': '#ff0',
         'font-weight': '100',
      });

   });

   /*
   * Manipulação de eventos
   */
   $('.featured-item a').on('blur', function(event){

      event.preventDefault();

      alert('Produto esgotado');

   })

   /*
   * Callback
   * entendendo ações que começam ao termino de outra
   */
   $('.featured-item:nth(1)').hide(2000, function(){
      // este é o callback
      console.log($(this).find('h4').text() + ' Esgotado');
   }).show(0, function(){
      console.log($(this).find('h4').text() + ' Em estoque');
   });

   /*
   * Animações
   */
   const duracao = 1000 // equivale a 1 segundo.

   $('.featured-item:nth(0)')
      .hide(duracao)
      .show(duracao)
      .fadeOut(duracao)
      .fadeIn(duracao)
      .toggle(duracao)
      .toggle(duracao);

   $('#form-submit').on('click', function(e) {

      e.preventDefault();

      if($('#email').val() != ''){
         $('#email').animate({
            opacity: "toggle",
            top: '-50'            
         }, duracao, function() {
            console.log($(this).val())
         })
      }

   })

   /**
    * Event listener .nav-modal-open
    */
   $('.nav-modal-open').on('click', function(e) {

      e.preventDefault();

      let elem = $(this).attr('rel');

      $('.modal-body').html($('#'+elem).html());
      $('.modal-header h5.modal-title').html($(this).text());

      let myModal = new bootstrap.Modal($('#modalId'));

      myModal.show();
   });

   /**
    * Validações de nome e e-mail
    */

   // Valida se os campos estão preenchidos
   function validate(elem){
      if(elem.val() == ''){

         console.log('O campo ' + elem.attr('name') + ' é obrigatório')

         elem.addClass('invalid')

         return false;
      }else {
         elem.removeClass('invalid');
      }
   }

   // validar se o email tem pelo menos um @ e um . após o @
   function validaEmail(email) {

      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regex.test(String(email).toLowerCase())
   }
   
   //Valida o tamanho do nome, se é maior de 2 caracteres
   function validaNome(nome){
      
      if(nome.length < 2){
         return false
      } else {
         return true
      }
   }

   $('body').on('blur',  '#nome', function(){

      if(validaNome($(this).val()) == false){
         $(this).addClass('invalid');
      } else {
         $(this).removeClass('invalid')
      }
   })

   $('body').on('blur',  '#email', function(){     

      if(validaEmail($(this).val()) == false){
         $(this).addClass('invalid')
      } else {
         $(this).removeClass('invalid')
      }
   })

   $('body').on('submit', '.modal-body .form', function(e){

      e.preventDefault();

      const inputNome = $('#nome')
      const inputEmail = $('#email')

      if(inputEmail.hasClass('invalid') || inputNome.hasClass('invalid')){
         alert('Verificar campos obrigatórios')
         return false;
      } else {
         $(this).submit();
      }

   }) 
})
