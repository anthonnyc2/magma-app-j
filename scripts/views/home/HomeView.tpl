<!-- HOME - header -->
<style>
    .lugar{
        display:inline-block;
        width:210px;
        white-space: nowrap;
        overflow:hidden !important;
        text-overflow: ellipsis;
    }
</style>
<div data-role="header" data-id="home-header" id="home-header" data-position="fixed">
	<!--<a data-rel="back" href="#"><img src="images/navigation/back.jpg" alt="" /></a>-->
	<a href="#more" class="ui-btn-right more_button"><img src="images/navigation/more.png" alt="" /></a>
	<a href="#home" class="magma_logo"><img src="images/navigation/magma_logo.png" alt="" /></a>
	
	<div class="barra_titulo_seccion"><div class="date"><%= fecha %></div><div class="titulo_seccion"><%= destacados_title %></div></div>
</div>
<!-- FIN: HOME - header -->









<!-- HOME - content -->
<div data-role="content" id="home-content">
</div>
<!-- FIN: HOME - content -->











<!-- HOME - footer -->
<div data-role="footer" data-id="home-footer" id="home-footer" data-position="fixed">
	<div data-role="navbar" data-iconpos="top">
		<ul>
			<li>
				<a href="#categorias" data-transition="slide" data-theme="" data-icon="gear"><div class="text"><%= home_navbar_categorias %></div></a>
			</li>
			
			<li>
				<a href="#favoritos" data-transition="slide" data-theme="" data-icon="gear"><div class="text"><%= home_navbar_favoritos %></div></a>
			</li>
			
			<li>
				<a href="#buscador" data-transition="slide" data-theme="" data-icon="gear"><div class="text"><%= home_navbar_buscador %></div></a>
			</li>
		</ul>
	</div>
</div>
<!-- FIN: HOME - footer -->
