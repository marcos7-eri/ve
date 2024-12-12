var cont = 0;
var total = 0;
var seleccionados = [];

function seleccionar(id_fila) {
    console.log(id_fila);
    let i = seleccionados.indexOf(id_fila);
    if ($("#" + id_fila).hasClass("seleccionada")) {
        $("#" + id_fila).removeClass("seleccionada");
        seleccionados.splice(i, 1);
    } else {
        $("#" + id_fila).addClass("seleccionada");
        seleccionados.push(id_fila);
    }
}

function eliminar(id_filas) {
    for (let i = 0; i < id_filas.length; i++) {
        let precio = Number($("#" + id_filas[i] + " .total-precio").text());
        total -= precio;
        $("#total").text(total.toFixed(2));
        $("#" + id_filas[i]).remove();
    }
    seleccionados = []; 
}

function agregar(nombre, precio) {
    cont++;
    $("#contador").text(cont);
    var fila = '<tr id="fila' + cont + '" class="selected" onclick="seleccionar(this.id)">' +
        '<td>' + cont + '</td>' +
        '<td>' + nombre + '</td>' +
        '<td>' + precio + '</td>' +
        '<td><input type="number" class="quantity-input" value="1" min="1" onchange="actualizarTotal(this)"></td>' +
        '<td class="total-precio">' + precio + '</td></tr>';
    $("#tabla tbody").append(fila);
    total += Number(precio);
    $("#total").text(total.toFixed(2));
}

for (let i = 1; i <= 80; i++) {
    $("#btnag" + i).click(function () { 
        let nombre = $("#nombre" + i).text();
        let precio = $("#precio" + i).text();
        console.log("Has hecho clic al botón " + i);
        console.log(nombre, precio);
        agregar(nombre, precio);
    });
}

$("#btndel").click(function () { 
    eliminar(seleccionados);
});

$("#btncomprar").click(function () {
    if (total > 0) {
        alert("Compra realizada con éxito. Total: " + total.toFixed(2) + " Bs.");
        $("#tabla tbody").empty();
        total = 0;
        $("#total").text(total.toFixed(2));
        cont = 0;
        $("#contador").text(cont);
        seleccionados = [];
    } else {
        alert("El carrito está vacío.");
    }
});
function actualizarTotal(input) {
    var fila = input.closest('tr');
    var precio = parseFloat(fila.cells[2].textContent);
    var cantidad = parseInt(input.value);
    var totalFila = precio * cantidad;
    fila.querySelector('.total-precio').textContent = totalFila.toFixed(2);
    var totalGeneral = 0;
    document.querySelectorAll('.total-precio').forEach(function (td) {
        totalGeneral += parseFloat(td.textContent);
    });
    document.getElementById('total').textContent = totalGeneral.toFixed(2);
}
