
$(document).ready(function () {

    /**
    * FUNÇÕES DE VALIDAÇÃO
    *  2 - Validação de e-mail com regex
    *  1 - Validação de preenchimento do nome
    */

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


    /**
     * ### NOME
     */

    // Validação de nome
    $('body').on('blur', '#nome', function () {

        if (validaNome($(this).val()) == false) {
            $(this).addClass('invalid');
            $('#helpNome').removeClass('text-muted')
        } else {
            $(this).removeClass('invalid')
            $('#helpNome').addClass('text-muted')
        }
    })

    /**
     * ### E-MAIL
     */

    // Validação de e-mail
    $('body').on('blur', '#email', function () {

        if (validaEmail($(this).val()) == false) {
            $(this).addClass('invalid')
            $('#helpEmail').removeClass('text-muted')
        } else {
            $(this).removeClass('invalid')
            $('#helpEmail').addClass('text-muted')
        }
    })

    /**
     * ### TELEFONE
     */

    // Máscara de telefone
    $('body').on('click', '#phone', function (e) {
        $(this).mask('(00)00000-0000')
    })
    // Validação de telefone
    $('body').on('blur', '#phone', function (e) {
        if ($(this).val() < 12) {
            $(this).addClass('invalid')
            $('#helpPhone').removeClass('text-muted')
        } else {
            $(this).removeClass('invalid')
            $('#helpPhone').addClass('text-muted')
        }
    })

    /**
     * DATA
     */
    
    // Adicionar máscara e instanciar o datepicker
    $('body').on('click', '#date', function (e) {
        $(this).datepicker()
        $(this).mask('00/00/0000')
    })

    /**
     * Validação ao fazer o submit 
     */
    $('body').on('submit', '.modal-body .form', function (e) {

        e.preventDefault();

        // Campos obrigatórios
        const inputNome = $('#nome')
        const inputEmail = $('#email')
        const inputTelefone = $('#phone')

        if (inputEmail.hasClass('invalid') || inputNome.hasClass('invalid') || inputTelefone.hasClass('invalid')) {
            alert('Verificar campos obrigatórios')
            return false;
        } else {
            $(this).submit();
        }

    })


});