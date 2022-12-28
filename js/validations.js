
$(document).ready(function () {
    
    /**
    * FUNÇÕES DE VALIDAÇÃO
    *  1 - Validação de creenchimento
    *  2 - Validação de e-mail com regex
    */
    
    // Valida se os campos estão preenchidos
    function validate(elem) {
        if (elem.val() == '') {
    
            console.log('O campo ' + elem.attr('name') + ' é obrigatório')
    
            elem.addClass('invalid')
    
            return false;
        } else {
            elem.removeClass('invalid');
        }
    }
    
    // validar se o email tem pelo menos um @ e um . após o @
    function validaEmail(email) {
    
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        return regex.test(String(email).toLowerCase())
    }
    
    //Valida o tamanho do nome, se é maior de 2 caracteres
    function validaNome(nome) {
    
        if (nome.length < 2) {
            return false
        } else {
            return true
        }
    }

    /**
    * Validação + animação para cadastro de e-mail 
    */

    const duracao = 1000 // equivale a 1 segundo.

    $('#form-submit').on('click', function (e) {

        e.preventDefault();

        if (validaEmail($('#email').val()) == false) {
            $('#email').addClass('invalid')
            $('#helpSEmail').removeClass('text-muted')
        } else {
            $('#email').animate({
                opacity: "toggle",
                top: '-50'
            }, duracao, function () {
                $('#email').submit()
                $('#email').addClass('visually-hidden')
            })

            $('#helpSEmail').addClass('text-muted')
        }

    })




    $('body').on('blur', '#nome', function () {

        if (validaNome($(this).val()) == false) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid')
        }
    })

    $('body').on('blur', '#email', function () {

        if (validaEmail($(this).val()) == false) {
            $(this).addClass('invalid')
        } else {
            $(this).removeClass('invalid')
        }
    })

    $('body').on('submit', '.modal-body .form', function (e) {

        e.preventDefault();

        const inputNome = $('#nome')
        const inputEmail = $('#email')

        if (inputEmail.hasClass('invalid') || inputNome.hasClass('invalid')) {
            alert('Verificar campos obrigatórios')
            return false;
        } else {
            $(this).submit();
        }

    })


});