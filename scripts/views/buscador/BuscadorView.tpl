	<!-- HOME - header -->
<div data-role="header" data-tap-toggle="false" data-id="foo1" id="categorias-header" data-position="fixed">
	<a data-rel="back" href="#categorias"><img src="images/navigation/back.jpg" alt="" /></a>
	<a href="#more" class="ui-btn-right more_button"><img src="images/navigation/more.png" alt="" /></a>
	
	<a class="magma_logo" href="#home"><img src="images/navigation/magma_logo.png" alt=""></a>
	
		<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion"><%= buscador_title %></div></div>
</div>
<!-- FIN: HOME - header -->









<!-- HOME - content -->
<div id="loading_msg" style="margin: 15px 30px"><%= loading %></div>
<div data-role="content" id="categorias-content" style="display:none">
	
	<form id="buscador_form" action="#" method="post" data-ajax="false">
		<div data-role="fieldcontain">
            <fieldset data-role="controlgroup">
                  <label for="searchinput1"> <strong><%= buscador_string_porpalabras %></strong> </label>
                <input name="buscador-field_palabras" id="buscador-field_palabras" placeholder="" value="" type="search">
            </fieldset>
        </div>	
		
		<label for="select-categorias" class="select"> <strong><%= buscador_string_porfiltros %></strong> </label>
		<select name="categorias" id="select-categorias">
			<option value="categoria" data-placeholder="true"><div class="book"><%= buscador_select_categoria %></div></option>
		</select>

		<select name="municipios" id="select-municipios">
			<option value="municipio" data-placeholder="true"><%= buscador_select_municipio %></option>
		</select>

		   <select name="fecha" id="select-fecha">
	      	<!--<option value="fecha"><%= buscador_select_fecha %></option>-->
	      	<option value="todos"><%= buscador_select_fecha_todoslosdias %></option>
	      	<option value="1"><%= dia_lunes %></option>
	      	<option value="2"><%= dia_martes %></option>
	      	<option value="3"><%= dia_miercoles %></option>
	      	<option value="4"><%= dia_jueves %></option>
	      	<option value="5"><%= dia_viernes %></option>
	      	<option value="6"><%= dia_sabado %></option>
	      	<option value="7"><%= dia_domingo %></option>
			</select>
			<select name="precio" id="select-rango_precio">
	      	<!--<option value="precio"><%= buscador_select_precio %></option>-->
	      	<option value="todos"><%= buscador_select_todoslosprecios %></option>
	      	<option value="gratis"><%= buscador_select_gratis %></option>
	      	<option value="10-"><%= buscador_select_menosde10 %></option>
	      	<option value="10-25"><%= buscador_select_10a25 %></option>
	      	<option value="25+"><%= buscador_select_masde25 %></option>
			</select>
			<a href="#" id="buscar" data-mini="true" data-role="button" class="search_button" data-transition="slide" data-inline="true" class="book"><%= buscador_button_buscar %></a>
			</div>
        </form>
	
</div>
<!-- FIN: HOME - content -->











<!-- HOME - footer -->
<div data-role="footer" data-tap-toggle="false" data-id="home-footer" id="home-footer" data-position="fixed">
	<div data-role="navbar" data-iconpos="top">
		<ul>
			<li>
				<a href="#categorias" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_categorias %></a>
			</li>
			
			<li>
				<a href="#favoritos" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_favoritos %></a>
			</li>
			
			<li>
				<a href="#buscador" class="ui-btn-active ui-state-persist" data-transition="slide" data-theme="" data-icon="gear"><%= home_navbar_buscador %></a>
			</li>
		</ul>
	</div>
</div>
<!-- FIN: HOME - footer -->
