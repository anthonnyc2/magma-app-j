/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['urls', 'languages', 'jquery', 'underscore', 'Backbone', 'views/buscador/BuscadorResultsView', 'views/more/MoreView', 'text!views/buscador/BuscadorView.tpl'],
    function (urls, lang, $, _, Backbone, BuscadorResultsView, MoreView, ViewTemplate) {
		var View = Backbone.View.extend({
			lista_categorias: [],
			lista_subCategorias: [],
			lista_municipios : [],
			
            events:{
            	'pagebeforeshow' : 'redrawView',
                'click .ui-header a.magma_logo' : 'Home_clickHandler',
                'click .more_button' : 'More_clickHandler',
                'click .ui-footer .ui-navbar ul li a' : 'navBar_clickHandler',
                'click a[data-rel=back]' : 'Home_clickHandler',
                'click #buscar' : 'searchButton_clickHandler',
                'submit form' : 'searchButton_clickHandler'
            },
            
            More_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	var moreView = new MoreView();
            	$.mobile.jqmNavigator.pushView(moreView, { transition: 'pop' });
            },
            
            initialize: function()
            {
            	this.loadListaCategorias();
            	this.loadListaMunicipios();
                $subCatCatId = new Array();
                $subCatArray = [];
                $pos = 0;
            },
            
            redrawView: function()
            {
            	var HTML = "";
                if ( typeof this.lista_subCategorias != 'undefined' && this.lista_subCategorias.length > 0 ){
                    var listSub = this.lista_subCategorias;
                    for (var i in listSub){
                        var nombre_subcat = listSub[i]["subcategoria_" + lang.getString('language_suffix')];
                        $subCatArray.push({ id: listSub[i]['id'], categoriasId:listSub[0]['categoriasId'], nombre: nombre_subcat });
                    }
                    var listSub = this.lista_subCategorias;
                    $subCatCatId[$pos] = listSub[0]['categoriasId'];
                    $pos++;
                }
            	if ( typeof this.lista_categorias != 'undefined' && this.lista_categorias.length > 0 )
            	{
	            	var obj_cat = $("#select-categorias");
	            	var obj_mun = $("#select-municipios");
	            	
	            	$(":not(option[value=categoria])", obj_cat).each(function() {
	            		$(this).remove();
	            	});
	            	
	            	$(":not(option[value=municipio])", obj_mun).each(function() {
	            		$(this).remove();
	            	});
            		// Cargar categorías
            		var list = this.lista_categorias;
            		for (var i in list)
            		{
                            if ( typeof this.lista_subCategorias != 'undefined' && this.lista_subCategorias.length > 0 )
                            {
                                var tieneSub = "no";
                                for(var j = 0; j < $subCatCatId.length; j++){
                                    if($subCatCatId[j] == list[i]['id']){
                                        tieneSub = "si";
                                        for (var j = 0; j < $subCatArray.length; j++) {
                                            if(list[i]['id'] == $subCatArray[j].categoriasId)
                                                obj_cat.append("<option value=\"sub" + $subCatArray[j].id + "\">" + $subCatArray[j].nombre + "</option>");
                                        }
                                        break;
                                    }
                                }
                                if(tieneSub == "no"){
                                    var id_cat = list[i]['id'];
                                    var nombre_cat = list[i]["categoria_" + lang.getString('language_suffix')];
                                    obj_cat.append("<option value=\"cat" + id_cat + "\">" + nombre_cat + "</option>");
                                    //HTML += "<option value=\"" + id_cat + "\">" + nombre_cat + "</option>\n";
                                }
                            }
            		}
            		
            		// Cargar municipios
            		var muns = this.lista_municipios;
            		for (var i in muns)
            		{
            			var id_mun = muns[i]['id'];
            			var nombre_mun = muns[i]["municipio_" + lang.getString('language_suffix')];
            			
            			obj_mun.append("<option value=\"" + id_mun + "\">" + nombre_mun + "</option>");
            		}
            		
            		//obj.html(HTML).selectmenu('refresh', true);
            	}
            },

            render:function () {
            	this.$el.html( _.template( ViewTemplate, lang.getStringList() ) );
            	return this;
            },
            
            Home_clickHandler:function(evt)
            {
            	evt.preventDefault();
            	$.mobile.jqmNavigator.popToFirst();
            },
            
            navBar_clickHandler:function(event)
            {
            	event.preventDefault();
            	var itemHref = $(event.currentTarget).attr('href');
            	var ClaseVista = null;
            	
            	var moduleFile = itemHref == "#categorias" ? "views/categorias/CategoriasView" : ( itemHref == "#favoritos" ? "views/favoritos/FavoritosView" : null );
                
            	if (moduleFile)
            	{
            		ClaseVista = require(moduleFile);
            		var newView = new ClaseVista();
            		$.mobile.jqmNavigator.popToFirst({ transition : 'none' });
            		$.mobile.jqmNavigator.pushView(newView);
            	}
            },
            
            loadListaCategorias:function()
            {
            	var $this = this;
            	
            	var Category = Backbone.Model.extend({
            		defaults: {
            			id : null,
            			categoria_esp : null,
            			categoria_cat : null
            		}
            	});
            	
            	var Categories = Backbone.Collection.extend({
            		model : Category,
            		url: urls.categorias,
            		parse:function(resp) {
            			$this.lista_categorias = resp;
            			$this.lista_categorias.sort(function(a,b) {
            				var text = "categoria_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			// Agregar elemento "Todas las categorías"
		    			/*var allCategoriesEl = {
		    				id: -1
		    			};
		    			allCategoriesEl["categoria_" + lang.getString('language_suffix')] = lang.getString('categorias_allcategories');
		    			$this.lista_categorias.unshift(allCategoriesEl);*/
                                //$this.redrawView();
            		}
            	});
            	
            	var cats = new Categories();
            	cats.fetch();
                
                setTimeout(function() {$this.loadSubCategorias();}, 100);
            },
            
            loadSubCategorias:function()
            {
            	var $this = this;
            	var HTML = "";
            	
            	if ( typeof this.lista_categorias != 'undefined' && this.lista_categorias.length > 0 )
            	{
                    var list = this.lista_categorias;
                    for (var i in list)
                    {
                        var Subcategory = Backbone.Model.extend({
                                defaults: {
                                    id: null,
                                    categoriasId: null,
                                    subcategoria_esp: null,
                                    subcategoria_cat: null
                                }
                        });
                        
                        var id_cat = list[i]['id'];
                        var url = urls.subcategorias.replace("<id_cat>", id_cat);

                        var Subcategories = Backbone.Collection.extend({
                            model: Subcategory,
                            url: url,
                            parse:function(resp)
                            {
                                if(resp != ""){
                                    $this.lista_subCategorias = resp;
                                    $this.lista_subCategorias.sort(function(a,b) {
                                        var text = "subcategoria_" + lang.getString('language_suffix');
                                        var A = a[text], B = b[text];

                                        return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
                                    });
                                    $this.redrawView();
                                }
                            }
                        });

                        var subcats = new Subcategories();
                        subcats.fetch();
                    }
            	}
            },
            
            loadListaMunicipios:function()
            {
            	var $this = this;
            	
            	var Municipio = Backbone.Model.extend({
            		defaults: {
            			id : null,
            			municipio_esp : null,
            			municipio_cat : null
            		}
            	});
            	
            	var Municipios = Backbone.Collection.extend({
            		model : Municipio,
            		url: urls.municipios,
            		
            		parse:function(resp) {
            			$this.lista_municipios = resp;
            			$this.lista_municipios.sort(function(a,b) {
            				var text = "municipio_" + lang.getString('language_suffix');
            				var A = a[text], B = b[text];
            				
            				return (A < B) ? -1 : ( (A > B) ? 1 : 0 );
            			});
            			
            			//$this.redrawView();
            		}
            	});
            	
            	var muns = new Municipios();
            	muns.fetch();
            },
            
            searchButton_clickHandler:function(evt)
            {
                evt.preventDefault();
           	var string_busqueda = $("#buscador-field_palabras").val();
           	var id_cat = $("#select-categorias").val();
                var cat_subcat = id_cat.substring(0,3);
                if(id_cat != "categoria")
                    id_cat = id_cat.substring(3,id_cat.length);
           	var municipio = $("#select-municipios").val();
           	var dias = $("#select-fecha").val();
           	var rango_precio = $("#select-rango_precio").val();
           		
           	/*if (string_busqueda.length == 0)
           	{
                    if (navigator.notification) // Corriendo sobre PhoneGap
                    {
           		navigator.notification.alert( lang.getString('buscador_error_sin_texto'), (function() {}), lang.getString('buscador_error_alert_title') );
                    }
                    else // Corriendo en navegador
                    {
	           	alert( lang.getString('buscador_error_sin_texto') );
           		}
                    }
                    else
                    {*/
           		var newView = new BuscadorResultsView(string_busqueda, id_cat, cat_subcat, municipio, dias, rango_precio);
           		$.mobile.jqmNavigator.pushView(newView, { transition : 'slide' });
                    //}
           	}
        });
        return View;
    });