// Configurar el Datepicker de jQuery UI
$( function() {
    // Configuración para que el calendario siempre se muestre
    $( "#calendario-container" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd-mm-yy", // Formato de fecha: día-mes-año
        yearRange: "c-100:c+100" // Rango de años (-100 a +100 años del año actual)
    });

    // Cambiar el idioma a español
    $.datepicker.regional['es'] = {
        prevText: 'Anterior',
        nextText: 'Siguiente',
        currentText: 'Hoy',
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
        'Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

document.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Ajusta la opacidad del contenido principal basado en la posición de scroll
    // 1 cuando el scroll está en la parte superior, 0 cuando se ha desplazado 100px
    var opacity = 1 - Math.min(1, scrollTop / 100);

    document.querySelector('main').style.opacity = opacity;
});


