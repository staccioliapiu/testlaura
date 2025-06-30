$(function() {
	w_width = $( window ).width();

	$('#mod_family').find('.datepicker').each(function() {
		set_datepicker_nascita($(this));
	});

	$(".input-phone").on("change", function (){
		check_phone($(this));
	});

	$(".input-number").on("change", function (){
		check_number($(this));
	});

	$('.datepicker').datepicker({
		minDate:0,
		monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu','Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
    numberOfMonths: 1,
    changeMonth: true,
    dateFormat: 'dd-mm-yy'
	});

	$('a.ancoraggio').click(function(){
	   $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});

	$('#bar_down #wtodo').click(function(){

    	if(w_width >= 768){
			$('#cnt_dwn').toggle("slide", { direction: "left" }, 700);
		}
		else{
			$('#cnt_dwn').toggle("slide",{ direction: "down" }, 700);
		}
	});

	$('#bar_down #xclose').click(function(){
		if(w_width >= 768){
			$('#cnt_dwn').hide("slide", { direction: "left" }, 700);
		}
		else{
			$('#cnt_dwn').hide("slide", { direction: "down" }, 700);
		}
	});

	$('#mail').on("change", function(){
		input_checker = $("#email_checker");
		check_email($(this), input_checker);
	});

	$('#piva').on("change", function(){
		check_piva($(this));
	});

	$('#codice_fiscale').on("change", function(){
		check_codice_fiscale($(this));
	});

	$('#mail_destinatario').on("change", function(){
		input_checker = $("#email_checker_destinatario");
		check_email($(this), input_checker);
	});

	$('#g_mail').on("change", function(){
		input_checker = $("#g_email_checker");
		check_email($(this), input_checker);
	});

	$('#a_mail').on("change", function(){
		input_checker = $("#a_email_checker");
		check_email($(this), input_checker);
	});

	/*$('.regione').change(function(){
		id_regione = $(this).val();

		id_box = $(this).attr('id');
		box = id_box.split('_');
		bx = box[0];
		// Carico la lista delle province nella select province
		$.ajax({
	    	url: "service/getProvince.php",
	      	type: "POST",
	      	data: "id_regione=" + id_regione,
	        success: function(msg) {
		    	$('#'+bx+'_provincia').html(msg);
		    	$('#'+bx+'_comune').html('<option value="">- - - - - - - - - - -</option>');
	      	}
		});
	});

	$('.provincia').change(function(){
		id_provincia = $(this).val();
		id_box = $(this).attr('id');
		box = id_box.split('_');
		bx = box[0];
		// Carico la lista delle province nella select province
		$.ajax({
	    	url: "service/getComuni.php",
	      	type: "POST",
	      	data: "id_provincia=" + id_provincia,
	        success: function(msg) {
		    	$('#'+bx+'_comune').html(msg);
	      	}
		});
	});*/

	$('.regione').change(function(){
		regione = $(this).val();
		id_box = $(this).attr('id');
		box = id_box.split('_');
		bx = box[0];
		// Carico la lista delle province nella select province
		$.ajax({
	    	url: "service/getProvince_name.php",
	      	type: "POST",
	      	data: "regione=" + regione,
	        success: function(msg) {
		    	$('#'+bx+'_provincia').html(msg);
		    	$('#'+bx+'_comune').html('<option value="">- - - - - - - - - - -</option>');
	      	}
		});
	});

	$('.provincia').change(function(){
		provincia = $(this).val();
		id_box = $(this).attr('id');
		box = id_box.split('_');
		bx = box[0];
		// Carico la lista delle province nella select province
		$.ajax({
	    	url: "service/getComuni_name.php",
	      	type: "POST",
	      	data: "provincia=" + provincia,
	        success: function(msg) {
		    	$('#'+bx+'_comune').html(msg);
	      	}
		});
	});

	$('.div-birthdate select').change(function(){
		div_birthdate = $(this).closest('.div-birthdate');
		year_selected = div_birthdate.find(".input-year-birthdate").val();
		day_selected = div_birthdate.find(".input-day-birthdate").val();
		month_selected = div_birthdate.find(".input-month-birthdate").val();
		//alert(year_selected);
		if(year_selected!="" && day_selected!="" && month_selected!=""){

			date_to_check = month_selected+'/'+day_selected+'/'+year_selected;
			//alert(date_to_check);
			result = isDate(date_to_check);
			//alert(result);
			if(result===false) set_null_date(div_birthdate);
			else{
				date_selected = year_selected+'/'+month_selected+'/'+day_selected;

				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;

				var yyyy = today.getFullYear();
				if (dd < 10) dd = '0' + dd;
				if (mm < 10) mm = '0' + mm;

				var today = yyyy + '/' + mm + '/' + dd;
				//alert(date_selected+'>'+today);
				//console.log(date_selected+' - '+today);
				if(date_selected>today || date_selected==today) {
					//alert('qui');
					set_null_date(div_birthdate);
				}

			}
		}
	});

	$('.req').change(function(){
		if($(this).attr('id') != 'codice_fiscale' && !$(this).hasClass('input-phone') && !$(this).hasClass('input-number')){
			if($(this).val().length){
				//$(this).css('border-color', '#dedede');
				$(this).removeClass("field_error");
			}
			else{
				//$(this).css('border-color', '#CF2020');
				$(this).addClass("field_error");
			}
		}

		if($(this).closest('.form-check').hasClass('field_error')){
			$(this).closest('.row_check_radio').find('.form-check').each( function (){
				$(this).removeClass("field_error");
			});
		}
	});

	$('.personalizza_regalo_solidale #messaggio_personalizzato').keyup(function(event) {
		keyup_messaggio_personalizzato($(this).val());
	});

	$('.personalizza_regalo_solidale #lettera_personalizzata').keyup(function(event) {
		keyup_lettera_personalizzata($(this).val());
	});

	$(".personalizza_regalo_solidale input[type='file']").on("change", function() {
		var file = this.files[0];
		click_input_file(file, $(this));
	});

	$(".cnt_preview_logo").on("click", function(){
		$(".personalizza_regalo_solidale input[type='file']").trigger("click");
	});


	jQuery('#invia_mail_contatto').click(function () {
		privacy = 0;
		variabili = "";
		num_errori = 0;

		num_errori = num_errori + check_obbligatorio('.form');

		if (jQuery('#email_checker').val() == 0) {
			jQuery('#mail').addClass("field_error");
			num_errori++;
		} else jQuery('#mail').removeClass("field_error");

		if (jQuery('#privacy').is(':checked')) $('#lab_privacy').removeClass("field_error");
		else {
			jQuery('#lab_privacy').addClass("field_error");
			num_errori++;
		}

		jQuery('.field_error').each(function () {
			num_errori++;
		});

		if (num_errori == 0) {
			var serialize = $('.form').find(':input, select').not('.dont_serialize').serialize();

			$.ajax({
				url: "service/invia_mail_contatto.php",
				type: "POST",
				dataType: "json",
				data: serialize,
				success: function (msg) {
					//alert(msg);
					if (msg > 0) {

						jQuery("#modal_msg .modal-body").html('Grazie per aver compilato il form. Sarai presto ricontattato dal WWF Italia');
						jQuery("#modal_msg").modal({show: true});
						jQuery(".form").find("input, textarea").each(function (index) {
							jQuery(this).val('');
							jQuery(this).text('');
						});
						jQuery('.form select').prop('selectedIndex', 0);

						dataLayer.push({
							'event': 'contatto-aziende'
						});
					} else {
						jQuery("#modal_msg .modal-body").html('Errore di inserimento');
						jQuery("#modal_msg").modal({show: true});
					}
				},
			});
		} else {
			scroll_to('.field_error');
		}
	});

	jQuery('#download_catalogo').click(function(){
		privacy = 0;
		variabili = "";
		num_errori = 0;

		num_errori = num_errori + check_obbligatorio('.form');

		if(jQuery('#email_checker').val()==0){
			jQuery('#mail').addClass("field_error");
			num_errori++;
		}else jQuery('#mail').removeClass("field_error");

		if(jQuery('#privacy').is(':checked')) $('#lab_privacy').removeClass("field_error");
		else{
			jQuery('#lab_privacy').addClass("field_error");
			num_errori++;
		}

		jQuery('.field_error').each(function(){
			num_errori++;
		});

		if(num_errori==0){
			var serialize = $('.form').find(':input, select').not('.dont_serialize').serialize();

			$.ajax({
				url: "service/download_catalogo.php",
				type: "POST",
				dataType: "json",
				data: serialize,
				success: function(msg) {
					if(msg>0){
						jQuery("#modal_msg .modal-body").html('Grazie per aver compilato il form. Riceverai una mail con il catalogo allegato.');
						jQuery("#modal_msg").modal({show: true});
						jQuery(".form").find("input, textarea").each(function( index ) {
							jQuery(this).val('');
							jQuery(this).text('');
						});
					}
					else{
						jQuery("#modal_msg .modal-body").html('Errore di inserimento');
						jQuery("#modal_msg").modal({show: true});
					}
				},
			});
		}
		else{
			scroll_to('.field_error');
		}

	});
});

function check_phone(input){
	phone = input.val();
	if (phone == ''){
		if(input.hasClass('req')) input.addClass("field_error");
		else input.removeClass("field_error");
	}
	else{
		var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
		if (filter.test(phone)) {
			input.removeClass("field_error");
			return true;
		}
		else {
			input.addClass("field_error");
			return false;
		}
	}

}

function check_number(input){
	number = input.val();

	if (number == ''){
		if(input.hasClass('req')) input.addClass("field_error");
		else input.removeClass("field_error");
	}
	else{
		if ($.isNumeric(number)){
			input.removeClass("field_error");
			return true;
		}
		else{
			input.addClass("field_error");
			return false;
		}
	}

}

function submit_ajaxForm(filename){
	$("#upload_filename_hidden").val(filename);
	$(".mockup_logo_upload").hide();
	html_img = '<img class="logo_azienda" src="files_order_uploads/'+filename+'"/>';
	$(".cnt_preview_logo .preview_logo").html(html_img);
	$(".cnt_preview_lettera .preview_logo").html(html_img);
}

function click_input_file(file, element){
	check = check_file_upload(file);
	if(check != 0){
		box_file = element.closest('.cnt_upload_file');
		box_file.find(".filename_fake").html(file.name);
		box_file.find(".filename_fake").show();

		$('#FormUpload').trigger("submit");
	}
}

function check_file_upload(file){
	if(file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/jpg"){
		alert('Formato non valido');
		return 0;
	}
	else if (file.size > 1000000) {
		alert('Max Size: 1MB');
		return 0;
	}
}

function check_email(input_mail, input_checker){
	email = input_mail.val();
	input_mail.removeClass("field_error");
	email = email.replace(' ', '');
	input_mail.val(email);

	$.ajax({
		url: "service/check_email.php",
		type: "POST",
		data: "email=" + email,
		success: function(msg) {
			//alert(msg);
			if(msg==0){
				input_checker.val(0);
				input_mail.addClass("field_error");
			}else{
				input_checker.val(1);
			}
		}
	});
}

function check_piva(input_piva){
	piva = input_piva.val();
	input_piva.removeClass("field_error");

	$.ajax({
		async: true,
		url: "service/check_piva.php",
		type: "POST",
		data: "piva=" + piva,
		success: function(msg) {
			if(msg==0){
				input_piva.addClass("field_error");
				console.log(msg);
				return msg;
			}
		}
	});
}

function check_codice_fiscale(input_codice_fiscale){
	codice_fiscale = input_codice_fiscale.val();
	//input_codice_fiscale.removeClass("field_error");
	codice_fiscale = codice_fiscale.replace(" ", "");
	if(codice_fiscale == ''){
		if(input_codice_fiscale.hasClass('req')){
			input_codice_fiscale.addClass("field_error");
			//msg = 0;
		}
		else{
			input_codice_fiscale.removeClass("field_error");
			//msg = 1;
		}
	}
	else{
		input_codice_fiscale.val(codice_fiscale.toUpperCase());
		if(codice_fiscale.length < 16 ){
			input_codice_fiscale.addClass("field_error");
		}
		else{
			$.ajax({
				async: false,
				url: "service/check_codice_fiscale.php",
				type: "POST",
				data: "codice_fiscale=" + codice_fiscale,
				success: function(msg) {
					if(msg=='0' || msg == 0){
						input_codice_fiscale.addClass("field_error");
					}
					else input_codice_fiscale.removeClass("field_error");
				}
			});
		}


	}

}

function keyup_messaggio_personalizzato(messaggio){
	num_chars = 0;
	num_chars = messaggio.length;

	reset = 0;

	messaggio = messaggio.replace(/\n/g,"<br>");

	var count_break = (messaggio.match(/<br>/g) || []).length;
	console.log(count_break);
	msg_split = messaggio.split("<br>");
	$.each(msg_split, function( index, value ) {
		if(value.length>100 && count_break>1) reset = 1;
	  else if(value.length>40 && count_break>3) reset = 1;
	});

	if(num_chars > 200) reset = 1;

	if(count_break>4) reset = 1;
	else if(count_break>3 && num_chars > 140) reset = 1;
	else if(count_break>2 && num_chars > 180) reset = 1;
	//console.log(num_chars);

	if(reset == 1){
		messaggio = $("#preview_cartolina").html();
		messaggio = messaggio.replace(/<p>/g,"");
		messaggio = messaggio.replace("</p>","");
		messaggio = messaggio.replace(/<br>/g,"\n");
		$('#messaggio_personalizzato').val(messaggio);
	}
	else{
		$("#preview_cartolina").html(messaggio);
	}
}

function keyup_lettera_personalizzata(messaggio){
	num_chars = messaggio.length;
	reset = 0;
	//console.log(num_chars);

	messaggio = messaggio.replace(/\n/g,"<br>");

	var count_break = (messaggio.match(/<br>/g) || []).length;
	//console.log(count_break);
	/*msg_split = messaggio.split("<br>");
	$.each(msg_split, function( index, value ) {
		if(value.length>100 && count_break>1) reset = 1;
	  else if(value.length>40 && count_break>3) reset = 1;
	});*/

	if(num_chars > 1300) reset = 1;

	if(count_break>9) reset = 1;
	//else if(count_break>3 && num_chars > 140) reset = 1;
	//else if(count_break>2 && num_chars > 180) reset = 1;
	//console.log(num_chars);

	if(reset == 1){
		messaggio = $("#preview_lettera").html();
		messaggio = messaggio.replace(/<p>/g,"");
		messaggio = messaggio.replace("</p>","");
		messaggio = messaggio.replace(/<br>/g,"\n");
		$('#lettera_personalizzata').val(messaggio);
	}
	else{
		$("#preview_lettera").html(messaggio);
	}
}


function checkSocioJunior(anno_nascita){
	var today = new Date();
	var yyyy = parseInt(today.getFullYear());
	var anno_to_check = 14 + parseInt(anno_nascita);
	anno_to_check = parseInt(anno_to_check);
	//console.log(anno_to_check+' < '+yyyy);
	if(anno_to_check<yyyy) return 1;
	else return 0;
}

function set_null_date(div){
	div.find(".input-day-birthdate").val('');
	div.find(".input-month-birthdate").val('');
	div.find(".input-year-birthdate").val('');
}

/*function set_null_date(){
	$("#day_birthdate").val('');
	$("#month_birthdate").val('');
	$("#year_birthdate").val('');
}*/

function isDate(txtDate)
{
	var currVal = txtDate;
	if(currVal == '') return false;
	//Declare Regex
	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
	var dtArray = currVal.match(rxDatePattern); // is format OK?

	if (dtArray == null) return false;

	//Checks for mm/dd/yyyy format.

	dtMonth = dtArray[1];
	dtDay= dtArray[3];
	dtYear = dtArray[5];

	if (dtMonth < 1 || dtMonth > 12) return false;
	else if (dtDay < 1 || dtDay> 31) return false;
	else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) return false;
	else if (dtMonth == 2)
	{
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay> 29 || (dtDay ==29 && !isleap)) return false;
	}
	return true;
}


function scroll_to(dest){
	//alert(dest);
	$('html, body').animate({
		scrollTop:$(dest).offset().top-150
	}, 1500);
}

function get_variabili(id_box){
	var variabili = "";
	$(id_box+" input").each(function( index ) {
		id = $(this).attr('id');
		variabili = variabili + id +"=" + encodeURIComponent($(this).val()) + "&";
		//console.log('REQ #'+id);
	});
	$(id_box+" select").each(function( index ) {
		id = $(this).attr('id');
		variabili = variabili + id +"=" + encodeURIComponent($(this).val()) + "&";
		//console.log('REQ #'+id);
	});
	$(id_box+" textarea").each(function( index ) {
		id = $(this).attr('id');
		variabili = variabili + id +"=" + encodeURIComponent($(this).val()) + "&";
		//console.log('REQ #'+id);
	});
	return variabili;
}

function check_obbligatorio(id_box){
	//alert(id_box);
	errori = 0;
	$(id_box+" .req").not('.dont_serialize').each(function( index ) {
		//console.log( index + ": " + $( this ).attr('id') );
		current_id = $( this ).attr('id');
		//alert($(id_box+" #"+current_id).val().replace(/^\s+|\s+$/g, "").length);
		if (!$(id_box+" #"+current_id).val() || $(id_box+" #"+current_id).val().replace(/^\s+|\s+$/g, "").length == 0){
		//if(!$(id_box+" #"+current_id).val()){ // Il campo non è stato compilato
			$(id_box+" #"+current_id).addClass("field_error");
			errori ++;
			//console.log(current_id);
			//console.log(id_box+" #"+current_id);
		}
		else if ($(id_box+" #"+current_id).hasClass('input-phone')) {
			check_phone($(id_box+" #"+current_id));
		}
		else if ($(id_box+" #"+current_id).hasClass('input-number')) {
			check_number($(id_box+" #"+current_id));
		}
		else{
			$(id_box+" #"+current_id).removeClass("field_error");
			//$(id_box+" #"+current_id).css("border-color", "#dedede !important");
		}
	});

	return errori;
}

function minimize_menu(){
    $("#submenu .c_sx").slideUp(500);
    $("#submenu .c_dx").animate({
        bottom: '12px'
    }, 200);
}

function maximize_menu(){
	$("#submenu .c_sx").fadeIn(500);
	$("#submenu .c_dx").animate({
        bottom: '17px'
    }, 200);
}
// SLIDER PAGE

tolerance = 0;
$(window).scroll(function(){
	w_width = $( window ).width();
	if(w_width > 992) {
		if ($(window).scrollTop() > 35) {
			jQuery("#menu").addClass('menu-fixed');
			jQuery("#submenu").addClass('submenu-fixed');
		} else {
			jQuery("#menu").removeClass('menu-fixed');
			jQuery("#submenu").removeClass('submenu-fixed');
		}
	}

});

jQuery(function(){
	jQuery('.menu-mobile__opener').on('click', function(){
		let menu_mobile = jQuery('#menu-mobile');
		if(!menu_mobile.hasClass('menu-open')) {
			menu_mobile.addClass('menu-open');
		}
		else{
			menu_mobile.removeClass('menu-open');
			menu_mobile.find('.nav-submenu').each(function( index ) {
				jQuery(this).removeClass('submenu-open');
			});
		}
	});

	jQuery('#menu-mobile .submenu-panel__opener').on('click', function(){
		id_panel = jQuery(this).attr('data-panel');

		jQuery('.nav-submenu#'+id_panel).addClass('submenu-open');
	});

	jQuery('.submenu-panel__closer').on('click', function(){
		jQuery(this).closest('.nav-submenu').removeClass('submenu-open');
	});
});

$(document).ready(function(){

	window.sr = ScrollReveal();
	sr.reveal('.sr-icons', {
			duration: 600,
			scale: 0.3,
			distance: '0px'
	}, 200);
	sr.reveal('.sr-button', {
			duration: 1000,
			delay: 200
	});
	sr.reveal('.sr-contact', {
			duration: 600,
			scale: 0.3,
			distance: '0px'
	}, 300);
	sr.reveal('.sr-img', {
			duration: 1000,
			delay: 200
	}, 300);
});


function script_ga_event_click_adozioni(url, label, deploy = 0){
	window.dataLayer = window.dataLayer || [];
	dataLayer.push({
		'event': 'eventTracking',
		'category': 'Adotta Specie',
		'action': 'Click',
		'label': label
	});
	//if (deploy == 0) window.location.href = "https://aziende.wwf.it/"+url;
}

function script_ga_impressions_click(id_nodo) {
	//dataLayer.push({"script_ga_impressions_click":APiuCookieConsent.instance.settings.data.current.analytics_storage});

	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted"){
		div = $("#box_" + id_nodo);
		if (div.attr('data-list') != null) var list = div.attr('data-list');
		else var list = div.attr('data-categoria');
		//alert(" window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'eec.impressionClick', ecommerce: { click: {	actionField: {list: '"+list+"'},products: [{id: '"+div.attr('data-id')+"',name: '"+div.attr('data-nome')+"',price: '"+div.attr('data-prezzo')+"',category: '"+div.attr('data-categoria')+"',position: "+div.attr('data-position')+",}]}}});");

		//script = " window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'eec.impressionClick', ecommerce: { click: {	actionField: {list: '"+list+"'},products: [{id: '"+div.attr('data-id')+"',name: '"+div.attr('data-nome')+"',";
		//if(div.attr('data-prezzo')!=null) script += "price: '"+div.attr('data-prezzo')+"',";
		//script += "category: '"+div.attr('data-categoria')+"',position: "+div.attr('data-position')+",}]}}});";
		//alert(script);
		var price = 0;
		if (div.attr('data-prezzo') != null) price = parseFloat(div.attr('data-prezzo')).toFixed(2);

		dataLayer.push({ ecommerce: null });
		dataLayer.push({
			event: "select_item",
			ecommerce: {
				item_list_name: list,
				items: [
					{
						item_id: div.attr('data-id'),
						item_name: addslashes(div.attr('data-nome')),
						currency: "EUR",
						index: div.attr('data-position'),
						item_category: div.attr('data-categoria'),
						affiliation: "aziende",
						price: price,
						quantity: 1
					}]
			}
		});
	}
}

function script_ga_eec_add_to_cart(array_response){
	//console.log(APiuCookieConsent.instance.settings.data.current);
	//return false;
	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted"){
		if(array_response['actionField']==null) array_response['actionField'] = array_response['list'];
		//alert("window.dataLayer = window.dataLayer || [];window.dataLayer.push({event: 'eec.add',ecommerce: {add: {actionField: {list: '"+array_response['actionField']+"'},products: [{id: '"+array_response['codice_articolo']+"',name: '"+array_response['nome_prodotto']+"',price: '"+array_response['prezzo']+"', category: '"+array_response['categoria']+"', quantity: "+array_response['quantita']+"}]}}});");

		console.log(array_response);
		dataLayer.push({ ecommerce: null });
		dataLayer.push({
			event: "add_to_cart",
			ecommerce: {
				currency: "EUR",
				value: parseFloat(array_response['prezzo']).toFixed(2),
				items: [
					{
						item_id: array_response['codice_articolo'],
						item_name: array_response['nome_prodotto'],
						index: 1,
						item_category: array_response['item_category'],
						affiliation: "aziende",
						price: parseFloat(array_response['prezzo']).toFixed(2),
						quantity: array_response['quantita']
					}]
			}
		});
	}
}

function script_ga_eec_remove_from_cart(array_response){
	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted") {
		//alert("window.dataLayer = window.dataLayer || [];window.dataLayer.push({event: 'eec.remove',ecommerce: {remove: {actionField: {list: 'Cart'},products: [{id: '"+array_response['codice_articolo']+"',name: '"+array_response['nome_prodotto']+"',price: '"+array_response['prezzo']+"', category: '"+array_response['categoria']+"',quantity: "+array_response['quantita']+"}]}}});");

		dataLayer.push({ ecommerce: null });
		dataLayer.push({
			event: "remove_from_cart",
			ecommerce: {
				currency: "EUR",
				value: array_response['prezzo'],
				items: [
					{
						item_id: array_response['codice_articolo'],
						item_name: array_response['nome_prodotto'],
						index: 0,
						item_category: array_response['item_category'],
						affiliation: "aziende",
						price: array_response['prezzo'],
						quantity: array_response['quantita']
					}]
			}
		});


		/*window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'eec.remove',
			ecommerce: {
				remove: {
					actionField: {
						list: 'Cart'
					},
					products: [{
						id: array_response['codice_articolo'],
						name: array_response['nome_prodotto'],
						price: array_response['prezzo'],
						category: array_response['categoria'],
						quantity: array_response['quantita'],
					}]
				}
			}
		});*/
	}
}

function script_ga_add_payment_info(array_response, metodo_pagamento){
	//console.log(APiuCookieConsent.instance.settings.data.current);
	//return false;
	//console.log(array_response);
	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted"){

		var items = [];

		jQuery.each( array_response, function( key, value ) {
			item = {
				item_id: value['codice_articolo'],
				item_name: value['dettaglio_prodotto'],
				currency: "EUR",
				index: key,
				item_category: value['item_category'],
				affiliation: "aziende",
				price: parseFloat(value['quota']).toFixed(2),
				quantity: value['quantita']
			};
			totale_ordine = value['totale_ordine'];
			donazione_aggiuntiva = value['donazione_aggiuntiva'];
			index = parseInt(key);
			items.push(item);
		});


		if(donazione_aggiuntiva != 0 && donazione_aggiuntiva > 0){
			item = {
				item_id: 'DONADD01',
				item_name: 'Donazione aggiuntiva',
				currency: "EUR",
				index: index+1,
				item_category: 'donazione aggiuntiva',
				affiliation: "aziende",
				price: parseFloat(donazione_aggiuntiva).toFixed(2),
				quantity: 1
			};
			items.push(item);
		}

		dataLayer.push({ ecommerce: null });

		dataLayer.push({
			event: "add_payment_info",
			ecommerce: {
				currency: "EUR",
				value: parseFloat(totale_ordine).toFixed(2),
				payment_type: metodo_pagamento,
				items: items
			}
		});
		//console.log(dataLayer);

	}
}

function script_ga_begin_checkout(array_response, donazione_aggiuntiva){
	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted") {
		//console.log(array_response);
		var items = [];

		jQuery.each( array_response, function( key, value ) {
			item = {
				item_id: value['codice_articolo'],
				item_name: value['dettaglio_prodotto'],
				currency: "EUR",
				index: key,
				item_category: value['item_category'],
				affiliation: "aziende",
				price: parseFloat(value['quota']).toFixed(2),
				quantity: value['quantita']
			};
			totale_ordine = value['totale_ordine'];
			index = parseInt(key);
			items.push(item);
		});

		if(donazione_aggiuntiva != 0 && donazione_aggiuntiva > 0){
			item = {
				item_id: 'DONADD01',
				item_name: 'Donazione aggiuntiva',
				currency: "EUR",
				index: index+1,
				item_category: 'donazione aggiuntiva',
				affiliation: "aziende",
				price: parseFloat(donazione_aggiuntiva).toFixed(2),
				quantity: 1
			};
			items.push(item);
			totale_ordine = parseInt(totale_ordine+donazione_aggiuntiva);
		}

		dataLayer.push({ ecommerce: null });
		dataLayer.push({
			event: "begin_checkout",
			ecommerce: {
				currency: "EUR",
				value: parseFloat(totale_ordine).toFixed(2),
				items: items
			}
		});

	}
}

function script_ga_eec_checkout_onClick(data_array, step){
	if (typeof APiuCookieConsent !== 'undefined' && APiuCookieConsent.instance.settings.data.current.analytics_storage == "granted") {
		string_product = '';
		//string_product = 'products: [';
		//script = "window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'eec.checkout', ecommerce: { checkout: { actionField: { step: "+step+" }, products: [";
		/*$.each(data_array, function( index, array_response ) {
            //script += "{ id: '"+array_response['codice_articolo']+"', name: '"+array_response['nome_prodotto']+"', category: '"+array_response['categoria']+"', quantity: '"+array_response['quantita']+"', price: '"+array_response['prezzo']+"',},";
            string_product += "{ id: '"+array_response['codice_articolo']+"', name: '"+array_response['nome_prodotto']+"', category: '"+array_response['categoria']+"', quantity: '"+array_response['quantita']+"', price: '"+array_response['prezzo']+"',},";
        });*/

		donazione_aggiuntiva = new Array();
		if (data_array[0]['donazione_aggiuntiva'] != null && data_array[0]['donazione_aggiuntiva'] > 0) {
			donazione_aggiuntiva['id'] = 'DONADD01';
			donazione_aggiuntiva['name'] = 'Donazione aggiuntiva';
			donazione_aggiuntiva['category'] = 'donazione aggiuntiva';
			donazione_aggiuntiva['quantity'] = '1';
			donazione_aggiuntiva['price'] = data_array[0]['donazione_aggiuntiva'];
			//script += "{ id: 'DONADD01', name: 'Donazione aggiuntiva', category: 'Donazione aggiuntiva', price: '"+data_array[0]['donazione_aggiuntiva']+"', quantity: 1, }";
			//string_product += "{ id: 'DONADD01', name: 'Donazione aggiuntiva', category: 'Donazione aggiuntiva', price: '"+data_array[0]['donazione_aggiuntiva']+"', quantity: 1, }";
		} else {
			donazione_aggiuntiva['id'] = '';
			donazione_aggiuntiva['name'] = '';
			donazione_aggiuntiva['category'] = '';
			donazione_aggiuntiva['quantity'] = '';
			donazione_aggiuntiva['price'] = 0;
		}
		//string_product += "],";

		//script = script + ", } } } );	";
		//alert(script);
		array_response = new Array();
		array_response = data_array[0];
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'eec.checkout',
			ecommerce: {
				checkout: {
					actionField: {
						step: step
					},
					//string_product,
					products: [
						{
							id: array_response['codice_articolo'],
							name: array_response['nome_prodotto'],
							category: array_response['categoria'],
							quantity: array_response['quantita'],
							price: array_response['prezzo'],
						},
						{
							id: donazione_aggiuntiva['id'],
							name: donazione_aggiuntiva['name'],
							category: donazione_aggiuntiva['category'],
							price: donazione_aggiuntiva['price'],
							quantity: donazione_aggiuntiva['quantity'],
						}
					],
				}
			}
		});
	}
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}
