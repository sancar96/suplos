$(document).ready(function() {

    $("#tabs").tabs();

    function printData(json) {
        var datos = json;
        if (datos.length > 0) {
            $("#resultTitle").html("Resultados de la búsqueda: <b>" + datos.length + "</b>");
            for (i in datos) {
                $(".appendSearch").append('<div class="searchResult">' +
                    '<div style="display: flex;">' +
                    '<div style="width: 40%;"><img src="img/home.jpg" alt="" style="width: 100%;" width="100%"></div>' +
                    '<div style="width: 60%;padding: 15px;">' +
                    '<span class="description"><b>Direccion: </b>' + datos[i].Direccion + '</span><br>' +
                    '<span class="description"><b>Ciudad: </b>' + datos[i].Ciudad + '</span><br>' +
                    '<span class="description"><b>Telefono: </b>' + datos[i].Telefono + '</span><br>' +
                    '<span class="description"><b>Codigo Postal: </b>' + datos[i].Codigo_Postal + '</span><br>' +
                    '<span class="description"><b>Tipo: </b>' + datos[i].Tipo + '</span><br>' +
                    '<span class="description"><b>Precio: </b>' + datos[i].Precio + '</span><br>' +
                    '<button class="saveButton" data-id="' + datos[i].Id + '">GUARDAR</button>' +
                    '</div></div></div><div class="divider"></div>');
            }
            //EVENTO QUE SE EJECUTA CADA QUE OPRIMIMOS EL BOTON "GUARDAR"
            $(".saveButton").click(function(e) {
                e.preventDefault();
                //EXTRAEMOS EL ID JSON DE LA POSICION SELECCIONADA
                var id = $(this).attr("data-id");
                //OBTENEMOS LA POSICION DENTRO DEL JSON DEL ID SELECCIONADO
                var index = datos.findIndex(datos => datos.Id == id);
                //OBTENEMOS EL JSON QUE CORRESPONDE A LA POSICION SELECCIONADA
                var dataJson = datos[index];
                $.ajax({
                    url: "controllers/wish.php",
                    data: { action: "insert", data: dataJson },
                    type: 'post',
                    dataType: 'json',
                    success: function(response) {
                        alert(response.msg);
                    }
                });
            });
        } else {
            $(".appendSearch").append('<h3>Busqueda Sin Resultados <a onclick="location.reload();" style="color: blue;text-decoration: underline;">volver a cargar</a></h3>');
        }
    }

    function printWishes(json) {
        var datos = json;
        if (datos.length > 0) {
            $("#wishTitle").html("Bienes guardados: <b>" + datos.length + "</b>");
            for (i in datos) {
                $(".appendWishes").append('<div class="searchResult">' +
                    '<div style="display: flex;">' +
                    '<div style="width: 40%;"><img src="img/home.jpg" alt="" style="width: 100%;" width="100%"></div>' +
                    '<div style="width: 60%;padding: 15px;">' +
                    '<span class="description"><b>Direccion: </b>' + datos[i].Direccion + '</span><br>' +
                    '<span class="description"><b>Ciudad: </b>' + datos[i].Ciudad + '</span><br>' +
                    '<span class="description"><b>Telefono: </b>' + datos[i].Telefono + '</span><br>' +
                    '<span class="description"><b>Codigo Postal: </b>' + datos[i].Codigo_Postal + '</span><br>' +
                    '<span class="description"><b>Tipo: </b>' + datos[i].Tipo + '</span><br>' +
                    '<span class="description"><b>Precio: </b>' + datos[i].Precio + '</span><br>' +
                    '<button class="deleteButton" data-id="' + datos[i].Id + '">ELIMINAR</button>' +
                    '</div></div></div><div class="divider"></div>');
            }
            //EVENTO QUE SE EJECUTA CADA QUE OPRIMIMOS EL BOTON "GUARDAR"
            $(".deleteButton").click(function(e) {
                e.preventDefault();
                //EXTRAEMOS EL ID JSON DE LA POSICION SELECCIONADA
                var id = $(this).attr("data-id");
                $.ajax({
                    url: "controllers/wish.php",
                    data: { action: "delete", id: id },
                    type: 'post',
                    dataType: 'json',
                    success: function(response) {
                        alert(response.msg);
                        location.reload();
                    }
                });
            });
        } else {
            $(".appendSearch").append('<h3>Aun no tienes bienes guardados</h3>');
        }
    }

    //LEER EL ARCHIVO JSON
    function init() {
        $.getJSON("data-1.json", function(json) {
            var datos = json;

            //INSERTAMOS LA DATA PRINCIPAL EN EL DIV appendSearch
            printData(datos);

            //LLENAMOS EL ARREGLO CITIES PARA 
            var arrCities = [];
            for (i in datos) {
                if (!arrCities.includes(datos[i].Ciudad)) {
                    arrCities.push(datos[i].Ciudad);
                    $("#selectCiudad").append('<option value="' + datos[i].Ciudad + '">' + datos[i].Ciudad + '</option>');
                    $("#selectCiudadReport").append('<option value="' + datos[i].Ciudad + '">' + datos[i].Ciudad + '</option>');
                }
            }

            //LLENAMOS EL ARREGLO CITIES PARA 
            var arrTypeHouse = [];
            for (i in datos) {
                if (!arrTypeHouse.includes(datos[i].Tipo)) {
                    arrTypeHouse.push(datos[i].Tipo);
                    $("#selectTipo").append('<option value="' + datos[i].Tipo + '">' + datos[i].Tipo + '</option>');
                    $("#selectTipoReport").append('<option value="' + datos[i].Tipo + '">' + datos[i].Tipo + '</option>');
                }
            }

        });
    }

    //EVENTO QUE SE EJECUTA AL DAR CLIC EN EL BOTON BUSCAR
    $('#formulario').submit(function(e) {
        e.preventDefault();
        var city = $("#selectCiudad").val();
        var type = $("#selectTipo").val();
        var priceRange = $("#rangoPrecio").val();
        $(".appendSearch").html(""); //LIMPIAMOS LOS RESULTADOS DE LA BUSQUEDA ANTERIOR
        $.getJSON("data-1.json", function(json) {
            var datos = json;
            var arrDataFiltred = [];
            //FILTRAMOS POR CIUDAD
            if (city) {
                datos = datos.filter(datos => datos.Ciudad == city);
            }
            //FILTRAMOS POR TIPO
            if (type) {
                datos = datos.filter(datos => datos.Tipo == type);
            }
            //FILTRAMOS POR PRECIO
            var split = priceRange.split(";");
            var min = split[0];
            var max = split[1];
            //LIMPIAMOS LOS VALORES (QUITAMOS "$" Y ","), Y FILTRAMOS POR PRECIO
            datos = datos.filter(
                datos => parseInt(datos.Precio.replace('$', '').replace(',', '').replace('.', '')) >= min
            );
            datos = datos.filter(
                datos => parseInt(datos.Precio.replace('$', '').replace(',', '').replace('.', '')) <= max
            );
            arrDataFiltred = datos;
            //ENVIAMOS LA DATA A MOSTRAR EN EL RESULTADO DE BUSQUEDA SEGUN EL FILTRO
            printData(arrDataFiltred);
        });
    });

    //EVENTO QUE SE EJECUTA AL DAR CLIC EN EL GENERAR REPORTE
    $('#formularioReport').submit(function(e) {
        e.preventDefault();
        var city = $("#selectCiudadReport").val();
        var type = $("#selectTipoReport").val();
        $.getJSON("data-1.json", function(json) {
            var datos = json;
            //FILTRAMOS POR CIUDAD
            if (city) {
                datos = datos.filter(datos => datos.Ciudad == city);
            }
            //FILTRAMOS POR TIPO
            if (type) {
                datos = datos.filter(datos => datos.Tipo == type);
            }
            dataExcel = datos;
            //ENVIAMOS LA DATA A MOSTRAR EN EL RESULTADO DE BUSQUEDA SEGUN EL FILTRO
            $.ajax({
                url: "controllers/wish.php",
                data: { action: "report", data: dataExcel },
                type: 'post',
                dataType: 'json',
                success: function(response) {
                    window.open(response.msg, '_blank');
                }
            });
        });
    });

    init();

    $(".listWishes").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "controllers/wish.php",
            data: { action: "select" },
            type: 'post',
            dataType: 'json',
            success: function(response) {
                var arrTemp = [];
                for (i in response.arr) {
                    arrTemp.push(JSON.parse(response.arr[i]));
                }
                printWishes(arrTemp);
            }
        });
    });

});