/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */


define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/more/MoreView', 'views/categorias/CategoriasView', 'views/favoritos/FavoritosView', 'views/buscador/BuscadorView', 'views/eventos/DetalleEventoView', 'text!views/home/HomeView.tpl'],
    function (urls, lang, $, _, Backbone, MoreView, CategoriasView, FavoritosView, BuscadorView, DetalleEventoView, ViewTemplate) {
		var View = Backbone.View.extend({
			destacadosList: [],
			loading: true,

            events:{
            	'pagebeforeshow' : 'redrawView',
            	'click .more_button' : 'More_clickHandler',
            	'click .ui-header a.magma_logo' : 'Home_clickHandler',
            	'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
            	'click .ui-content div.destacados_home a' : 'detalleEvento_clickHandler'
            },
            
            initialize:function()
            {  
            	var $this = this;
            	$this.destacadosList = [];
            	$this.loading = true;
            	
            	var DestacadosModel = Backbone.Model.extend({
            		defaults: {
            			id: 0,
            			accountsId: 0,
            			destacado: 0,
            			titulo_esp : '',
            			titulo_cat : '',
            			categoriasId: -1,
            			subcategoriasId: -1,
            			descripcion_esp : '',
            			descripcion_cat : '',
            			imagen: '',
            			lugar: '',
            			direccion: '',
            			municipio : '',
            			fecha_inicio: '0000-00-00',
            			fecha_fin: '0000-00-00',
            			dias_semana: null,
            			hora_inicio: '00:00:00',
            			hora_final: '00:00:00',
            			precio: 0,
            			telf: '',
            			email: '',
            			web: '',
            			publicado: 0,
            			fecha_registro: '0000-00-00 00:00:00',
            			fecha_publicado: '0000-00-00 00:00:00',
            			categoria_esp : '',
            			categoria_cat : '',
            			subcategoria_esp : '',
            			subcategoria_cat : '',
                              bandera_destacados: 0
            		}
            	});
            	
            	var DestacadosCollection = Backbone.Collection.extend({
            		model	: DestacadosModel,
            		url		: urls.destacados,
            		
            		parse:function(resp)
            		{
            			$this.destacadosList = resp;
            			
            			$this.destacadosList.sort(function(a,b) {
            				var A = new Date(a.fecha_inicio + " " + a.hora_inicio);
            				var B = new Date(b.fecha_inicio + " " + b.hora_inicio);
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Cargar lista de eventos en el HTML
            			$this.loading = false;
            			$this.refreshEventsHTML();
            			
            			//alert('[DEBUG]\nSe ha almacenado y ordenado ' + $this.destacadosList.length + ' eventos destacados.');
            		}
            	});
            	
            	var destacados = new DestacadosCollection();
            	destacados.fetch();
            },
            
            render:function () {
            	this.$el.html( _.template( ViewTemplate, lang.getStringList() ) );
                return this;
            },
            
            Home_clickHandler:function(evt)
            {
            	$.mobile.jqmNavigator.popToFirst();
            },
            
            navBar_clickHandler:function(event)
            {
            	event.preventDefault();
            	var itemHref = $(event.currentTarget).attr('href');
            	var dstClassName = itemHref.charAt(1).toUpperCase() + itemHref.substring(2, itemHref.length) + "View";
            	var dstClass = eval(dstClassName);
            	
            	var newView = new dstClass();
            	
            	if (dstClass !== undefined) $.mobile.jqmNavigator.pushView(newView);
            	else alert('Aún no implementado.');
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            redrawView:function() // Solo en la HomeView, que se carga antes de la selección de idioma y queda en background
            {
            	// Refrescar el t�tulo y fecha de la secci�n
            	// Refrescar el título y fecha de la sección
            	$(".barra_titulo_seccion .titulo_seccion").html(lang.getString("destacados_title"));
            	$(".barra_titulo_seccion .date").html(lang.getDate());
            	
            	// Refrescar la barra de navegación
            	var navBarLinks = $(".ui-footer .ui-navbar ul li a");
            	navBarLinks.each(function() {
            		var hrefText = $(this).attr('href').substring(1, $(this).attr('href').length);
            		var langString = lang.getString("home_navbar_" + hrefText.toLowerCase());
            		
            		$("div.text", this).text(langString);
            	});
            	
            	// Redibujar destacados, en caso de requerirse cambio de idioma o algo
            	this.refreshEventsHTML();
            },
            
            refreshEventsHTML:function()
            {
            	var container = $("#home-content");
            	var list = this.destacadosList;
            	//container.html( this.destacadosList.length > 0 ? '' : 'No hay eventos destacados.' );
            	container.html( this.loading ? lang.getString('loading') : ( list.length > 0 ? "" : lang.getString('destacados_noevents') ) );
            	
            	for (var i = 0; i < list.length; i++)
            	{
            		var obj = list[i];
            		
            		var id_evento = obj['id'];
            		var categorias = obj["categoria_" + lang.getString('language_suffix')];
            		var titulo = obj["titulo_" + lang.getString('language_suffix')];
            		var lugar = obj['lugar'];
                        var cancelado = obj['cancelado']; 
            		
            		// Formatear precio del evento
            		var precio_raw = obj['precio'];
                        var precio_raw=Math.round(precio_raw*100);
                        
            		var precio = precio_raw == 0 ?
            			lang.getString('eventos_detalle_precio_gratis') // Evento gratuito
            			:
            			lang.getString('eventos_detalle_precio_simple').replace('<precio>', precio_raw) // Evento pagado
            		;
                        
                        if(precio_raw != 0){
                            var decimal = precio.substring(precio.length-4,precio.length);
                            var entero = precio.substring(0,precio.length-4);
                            precio = entero+","+decimal;
                        }
                        precio = precio.replace(/ /g,'');
            		
            		// Formatear fecha de la forma DD/MM/AAAA
            		var fechaTempInicio = obj['fecha_inicio'].split("-");
            		var fecha = fechaTempInicio[2] + "/" + fechaTempInicio[1] + "/" + fechaTempInicio[0];
            		var fechaTempFin = obj['fecha_fin'].split("-");
            		var fechaFin = fechaTempFin[2] + "/" + fechaTempFin[1] + "/" + fechaTempFin[0];
            		
            		
            		var HTML = "<div class=\"destacados_home\"><a href=\"#detalleEvento\" class=\"ui-btn\" id=\"evento-" + i + "\">";
            		HTML += "<div class=\"categorias\">" + "<div class=\"lista_categorias\">" + categorias + "</div></div>";
            		HTML += "<div class=\"titulo\">" + titulo + "</div>";
            		HTML += "<img src=\"images/navigation/forward.jpg\" alt=\"\" />";
            		HTML += "<div class=\"lugar\">" + lugar + "</div>"
                        if(cancelado == '1')
                            HTML += "<div class=\"fecha\">" + lang.getString('eventos_detalle_cancelado') + "</div>";
                        else if(fecha != fechaFin)
                            HTML += "<div class=\"fecha\">" + lang.getString('eventos_title_varios_dias_1') + " " + fecha + " " + lang.getString('eventos_title_varios_dias_2') + " " + fechaFin + "</div>";
                        else
                            HTML += "<div class=\"fecha\">" + fecha + "</div>";
            		HTML += "<div class=\"precio\">" + precio + "</div>"
            		HTML += "</a></div>";
            		
            		container.append(HTML);
            	}
            },
            
            detalleEvento_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var id_DOM = $(evt.currentTarget).attr('id');
            	var index_evento = id_DOM.substring(7, id_DOM.length);
            	
            	var info_evento = this.destacadosList[index_evento];
                  bandera_destacados = 1;

                $.mobile.silentScroll(0);
                setTimeout(function() {
                    var detalleEventoView = new DetalleEventoView(info_evento);
                    $.mobile.jqmNavigator.pushView(detalleEventoView, { transition : 'slide' });
                }, 20);
            }
        });
        return View;
    });