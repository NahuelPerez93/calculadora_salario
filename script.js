function actualizarSalarioPorHora() {
    var categoria = document.getElementById('categoria');
    var salarioPorHoraInput = document.getElementById('hourly-salary');
    var salario = categoria.options[categoria.selectedIndex].getAttribute('data-salario');
    salarioPorHoraInput.value = salario;
}

function agregarDescuento() {
    var descuentosContainer = document.getElementById('descuentos-container');
    var input = document.createElement('input');
    input.type = 'number';
    input.step = '0.01';
    input.placeholder = 'Descuento';
    descuentosContainer.appendChild(input);
}

function calcularSalario() {
    var salarioPorHora = parseFloat(document.getElementById('hourly-salary').value);
    var horasTrabajadas = parseFloat(document.getElementById('hours-worked').value);
    var horasExtras = parseFloat(document.getElementById('extra-hours').value);
    var diasFaltados = parseFloat(document.getElementById('dias-faltados').value);

    // Descuento de horas extras por cada día de falta
var horasExtrasDescuento = diasFaltados * 9;
if (horasExtras >= horasExtrasDescuento) {
    // Aplicar descuento total de horas extras
    horasExtras -= horasExtrasDescuento;
} else {
    // Aplicar descuento parcial de horas extras
    horasExtrasDescuento = horasExtras;
    horasExtras = 0;
    // Calcular horas normales a descontar
    var horasNormalesDescuento = (horasExtrasDescuento * 2) + ((horasExtrasDescuento - horasExtras) * 0.5);
    // Descontar horas normales
    horasTrabajadas -= horasNormalesDescuento;
}

    
    var descuentosInputs = document.querySelectorAll('#descuentos-container input');
    var descuentos = 0;
    for (var i = 0; i < descuentosInputs.length; i++) {
        descuentos += parseFloat(descuentosInputs[i].value);
    }

    var salarioBasico = salarioPorHora * horasTrabajadas;
    var salarioExtra = salarioPorHora * 1.5 * horasExtras;
    var salarioTotal = salarioBasico + salarioExtra - descuentos;

    var resultado = "Horas normales trabajadas: " + (horasTrabajadas > 0 ? horasTrabajadas : 0) + "<br>";
    resultado += "Horas extras trabajadas: " + horasExtras + "<br>";
    resultado += "Horas extras descontadas por días faltados: " + horasExtrasDescuento + "<br>";
    resultado += "Días faltados: " + diasFaltados + "<br>";
    resultado += "Descuentos: $" + descuentos.toFixed(2) + "<br>";
    resultado += "Salario quincenal total: $" + salarioTotal.toFixed(2);

    document.getElementById('result').innerHTML = resultado;
}
function limpiarFormulario() {
    var inputs = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    var descuentosContainer = document.getElementById('descuentos-container');
    descuentosContainer.innerHTML = ''; // Limpiar contenedor de descuentos
    document.getElementById('result').innerHTML = ''; // Limpiar resultado
}
$(function() {
    var selectedDays = [];

    $("#datepicker").datepicker({
        onSelect: function(date) {
            var selectedDate = new Date(date);
            var dateString = $.datepicker.formatDate('yy-mm-dd', selectedDate);
            var index = selectedDays.indexOf(dateString);
            if (index === -1) {
                selectedDays.push(dateString);
            } else {
                selectedDays.splice(index, 1);
            }
            actualizarCalendario();
        },
        beforeShowDay: function(date) {
            var day = date.getDay();
            var dateString = $.datepicker.formatDate('yy-mm-dd', date);
            var selected = (selectedDays.indexOf(dateString) !== -1);
            var isSaturday = (day === 6);
            return [day >= 1 && day <= 5, selected ? 'ui-state-highlight' : '', isSaturday ? 'disabled' : ''];
        }
    });

    function actualizarCalendario() {
        var hoursPerDay = 9;
        var totalHours = selectedDays.filter(function(dateString) {
            return new Date(dateString).getDay() !== 6;
        }).length * hoursPerDay;
        document.getElementById('hours-worked').value = totalHours;
    }

    $('#datepicker').on('click', '.disabled', function() {
        $(this).css('background-color', 'red');
    });
});
