$(function (){
    $('.form-container').slick({
        arrows: false,
        draggable: false,
        speed: 0,
        dots: true
    });
    $('[data-action]').click(function() {
        var target = $(this).attr('data-action');
        if (target == 'prev') {
            $('.form-container').slick('prev');
        }
        else  {
            $('.form-container').slick('next');
        }
    });
});
$(function() {
    $('.form-container').each(function() {
        //объявляем переменные и кнопка отправки
        var section = $(this),
            btn  = section.find('btn');
        //добавляем  каждому проверяемому полю указание, что поле пустое
        section.find('input').addClass('emptyField');

        //функция проверки формы полей
        function checkInput() {
            section.find('input').each(function() {
                if ($(this).val()!='') {
                    $(this).removeClass('emptyField')
                }
                else {
                    $(this).addClass('emptyField');
                }
            });
        }

        //функция подстветки нехаполненных полей
        function lightEmpty () {
            section.find('.emptyField').css({
                'border-color': '#ff0'
            });
            setTimeout(function() {
                section.find('.emptyField').removeAtter('style');
            }, 500);
        }

        //проверка в режиме реального времени
        setInterval(function() {
            //Запускаем функцию проверки полей на заполненность
            checkInput();
            var sizeEmpty = section.find('.emptyField').size();
            //считаем количество заполненных полей
            if(sizeEmpty > 0) {
                if (btn.hasClass('.pull-right')){
                    return false
                } else {
                    btn.addClass('.pull-right')
                    }
                } else {
                    btn.removeClass('.pull-right')
                }
            }, 500);

            //событие клика по кнопке отправить
            btn.click(function() {
                if($(this).hasClass('.pull-right')) {
                    lightEmpty();
                    return false
            } else {
                $('.form-container').submit();
            }
        });
    });
});
