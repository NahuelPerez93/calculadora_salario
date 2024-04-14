function calcularSalario() {
    var salarioPorHora = parseFloat(document.getElementById('hourly-salary').value);
    var horasTrabajadas = parseFloat(document.getElementById('hours-worked').value);
    var horasExtras = parseFloat(document.getElementById('extra-hours').value);
    var descuentos = parseFloat(document.getElementById('descuentos').value);
    var diasFaltados = parseFloat(document.getElementById('dias-faltados').value);

    // Ajustar las horas trabajadas si hay días faltados
    horasTrabajadas -= diasFaltados * 9;

    var salarioBasico = salarioPorHora * horasTrabajadas;
    var salarioExtra = salarioPorHora * 1.5 * horasExtras;
    var salarioTotal = salarioBasico + salarioExtra - descuentos;

    var resultado = "Horas normales trabajadas: " + (horasTrabajadas > 0 ? horasTrabajadas : 0) + "<br>";
    resultado += "Horas extras trabajadas: " + horasExtras + "<br>";
    resultado += "Días faltados: " + diasFaltados + "<br>";
    resultado += "Descuentos: $" + descuentos.toFixed(2) + "<br>";
    resultado += "Salario quincenal total: $" + salarioTotal.toFixed(2);

    document.getElementById('result').innerHTML = resultado;
}