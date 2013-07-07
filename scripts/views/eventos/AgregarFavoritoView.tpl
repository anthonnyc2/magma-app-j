<%
	var evento_titulo = detalles_evento["titulo_" + language_suffix];
	var evento_categoria = detalles_evento["categoria_" + language_suffix];
	
	var texto_boton = operacion_agregar ? favoritos_button_agregarfavorito : favoritos_button_eliminarfavorito;

	//Modificacion info del evento.
	var evento_lugar = detalles_evento["lugar"];
	var evento_direccion = detalles_evento["direccion"];
	var evento_municipio = detalles_evento["municipio_" + language_suffix];

	/*
	 * FECHAS
	 */

	var temp_fechainicio = detalles_evento['fecha_inicio'].split("-"), temp_fechafin = detalles_evento['fecha_fin'].split("-");
	temp_fechainicio.reverse();
	temp_fechafin.reverse();
	var evento_fechainicio = temp_fechainicio.join("/");
	var evento_fechafin = temp_fechafin.join("/"); 
	var evento_fechafin = temp_fechafin.join("/");
	var evento_fechafin = temp_fechafin.join("/"); 
	var evento_fechafin = temp_fechafin.join("/");
	 
	var evento_string_fechas;
	if (evento_fechainicio == evento_fechafin && detalles_evento['cancelado'] != '1') // Una sola fecha
	{
            evento_string_fechas = eventos_detalle_cuando_fecha_simple.replace("<fecha_inicio>", evento_fechainicio);
	}
	else if(detalles_evento['cancelado'] != '1') // Fecha de inicio y final diferentes
	{
            evento_string_fechas = eventos_detalle_cuando_fecha_doble.replace("<fecha_inicio>", evento_fechainicio).replace("<fecha_fin>", evento_fechafin);
	}
        else{
            if(language_suffix == "esp")
                evento_string_fechas = "CANCELADO";
            else if(language_suffix == "cat")
                evento_string_fechas = "CANCEL&middot;LAT";
        }
    
    /*
	 * HORAS
	*/
        
	var evento_hora_inicio = detalles_evento['hora_inicio'];
	var evento_hora_final = detalles_evento['hora_final'];
	var evento_hora_string = eventos_detalle_cuando_horas_simple.replace("<hora_inicio>", evento_hora_inicio).replace("<hora_final>", evento_hora_final);
        
	var DIAS_SEMANA = [ "", "L", "M", "X", "J", "V", "S", "D" ];
	var dias_semana = detalles_evento['dias_semana'].length ? detalles_evento['dias_semana'].split(",") : new array();
	var dias_semana_html = "";
	for(var i = 1; i <= 7; i++)
	{
		dias_semana_html += "<div class=\"dia";
		for(var j in dias_semana)
		{
			if (i == dias_semana[j]) dias_semana_html += " dia_selected";
		}
		dias_semana_html += "\"><p>";

		dias_semana_html += DIAS_SEMANA[i];

		dias_semana_html += "</p></div>";
	}

	/*
	 * PRECIO
	 */

	var evento_precio = detalles_evento['precio'];
        evento_precio=Math.round(evento_precio*100);
	var evento_precio_string;
	if (evento_precio == 0) // Evento gratuito
	{
		evento_precio_string = eventos_detalle_precio_gratis.replace('<precio>', evento_precio);
	}
	else // Evento pagado
	{
		evento_precio_string = eventos_detalle_precio_simple.replace('<precio>', evento_precio);
	}
                        
        if(evento_precio != 0){
            var decimal = evento_precio_string.substring(evento_precio_string.length-4,evento_precio_string.length);
            var entero = evento_precio_string.substring(0,evento_precio_string.length-4);
            evento_precio_string = entero+","+decimal;
        }
        evento_precio_string = evento_precio_string.replace(/ /g,'');

    var evento_telefono = detalles_evento['telf'];
	var evento_email = detalles_evento['email'];	
	var evento_web = detalles_evento['web'];
	
%>
<!-- HOME - header -->
<div data-role="header" data-tap-toggle="false" data-id="foo1" id="detalleEvento-header" data-position="fixed">
	<a data-rel="back" href="#detalleEvento"><img src="images/navigation/back.jpg" alt="" /></a>
	<a data-transition="slide" href="#more"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt=""></a>
	
	<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion">Favoritos</div></div>
</div>
<!-- FIN: HOME - header -->

<div data-role="content" id="detalleEvento-content">
	<div class="evento_titulo"><%= evento_titulo %></div>
	<div class="evento_categoria">- <%= evento_categoria %> -</div>
	
	<div class="evento_masinfo">
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_donde %></div>
			<div class="info info_donde table_cell">
				<span class="info_donde_lugar"></span><%= evento_lugar %>
				<br />
				<span class="info_donde_direccion"></span><%= evento_direccion %>
				<br />
				<span class="info_donde_municipio"></span><%= evento_municipio %>
			</div>
		</div>
		
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_cuando %></div>
			<div class="info info_cuando table_cell">
				<span class="info_cuando_fechas"><%= evento_string_fechas %></span>
				
				<br />
				
				<div class="dias_semana">
					<%= dias_semana_html %>
				</div>
				
				<div class="horas_evento">
					<%= evento_hora_string %>
				</div>
			</div>
		</div>

		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_precio %></div>
			<div class="info table_cell">
				<%= evento_precio_string %>
			</div>
		</div>
		
		<div class="evento">
			<div class="titulo table_cell"><%= eventos_detalle_masinfo %></div>
			<div class="info info_donde table_cell">
				<%= evento_telefono %>
				<br />
				<%= evento_email %>
				<br />
				<a href="<%= evento_web %>" target="_blank"><%= evento_web %></a>
			</div>
		</div>

	</div>
	
	<div class="menuCompartir">
		<div class="mensaje">
			<a href="#" data-role="button" id="button-agregarfavorito"><%= texto_boton %></a>
		</div>
		<br />
		<a href="#detalleEvento" class="button" data-transition="" data-role="button" id="favoritos_cerrar"><%= eventos_compartir_button_cancelar %></a>
	</div>
</div>