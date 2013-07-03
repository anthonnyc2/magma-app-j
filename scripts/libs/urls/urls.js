define(function() {
	var URLs = {
		eventos			: 'http://www.publicaenmagma.com/api/eventos',
		eventos_cat		: 'http://www.publicaenmagma.com/api/eventosCategoria/<id_cat>',
		eventos_subcat          : 'http://www.publicaenmagma.com/api/eventos/<id_subcat>',
		destacados		: 'http://www.publicaenmagma.com/api/destacados/',
		//destacados		: 'search.json',
		detalle_evento          : 'http://www.publicaenmagma.com/api/detalleEvento/',
		img_evento		: 'http://www.publicaenmagma.com/data/img/',
		categorias		: 'http://www.publicaenmagma.com/api/categorias/',
		subcategorias           : 'http://www.publicaenmagma.com/api/subcategorias/<id_cat>',
		busqueda		: 'http://www.publicaenmagma.com/?p=api&m=search&a=<string_busqueda>',
		//busqueda		: 'search.json',
		publicidad		: 'http://www.publicaenmagma.com/api/publicidad/',
		municipios		: 'http://www.publicaenmagma.com/api/municipios'
                
		/*eventos			: 'http://localhost/produccion/web/api/eventos',
		eventos_cat		: 'http://localhost/produccion/web/api/eventosCategoria/<id_cat>',
		eventos_subcat          : 'http://localhost/produccion/web/api/eventos/<id_subcat>',
		destacados		: 'http://localhost/produccion/web/api/destacados/',
		//destacados		: 'search.json',
		detalle_evento          : 'http://localhost/produccion/web/api/detalleEvento/',
		img_evento		: 'http://localhost/produccion/web/data/img/',
		categorias		: 'http://localhost/produccion/web/api/categorias/',
		subcategorias           : 'http://localhost/produccion/web/api/subcategorias/<id_cat>',
		busqueda		: 'http://localhost/produccion/web/?p=api&m=search&a=<string_busqueda>',
		//busqueda		: 'search.json',
		publicidad		: 'http://localhost/produccion/web/api/publicidad/',
		municipios		: 'http://localhost/produccion/web/api/municipios'*/
	};
	
	return URLs;
});
