$(function() {
	$('select').on('click', function(){
		if($(this).val() != '') $(this).removeClass('select_empty');
	});

	$('select').on('change', function(){
		if($(this).val() == '') $(this).addClass('select_empty');
		else $(this).removeClass('select_empty');
	});

	$('.btn_choice .btn_option .btn').on('click', function(e){
		e.preventDefault();
		function_btn_choice($(this));
	});

	$('#dati_gift').find( ".datepicker" ).datepicker({
		minDate:0,
		monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu','Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
      numberOfMonths: 1,
      changeMonth: true,
      dateFormat: 'dd-mm-yy'
	});

	$('#donazione_aggiuntiva').on('change', function(){
		if($("#totale_importo").length){
			var quota = $('#totale_importo').val();
		}
		else if($('#quota').length){
			var quota = $('#quota').val();
		}
		else{
			$('input[name="quota"]').each(function(){
				if($(this).is(':checked')) quota = $(this).val();
			});
		}

		if($("#spese_spedizione").length){
			spese_spedizione = $("#spese_spedizione").val();
		}
		else{
			spese_spedizione = 0;
		}

		var donazione_aggiuntiva = $(this).val();

		totale = parseFloat(quota) + parseFloat(spese_spedizione) + parseFloat(donazione_aggiuntiva);
		//alert(quota + '' + donazione_aggiuntiva + ' = '+totale);
		$('.sticky_col .box_price .price').text(parseFloat(totale).toString().replace(".", ","));
		$('.sticky_col .text_donazione_aggiuntiva').text(parseFloat(donazione_aggiuntiva).toString().replace(".", ","));
		$('.sticky_col .text_totale_importo').text(parseFloat(quota).toString().replace(".", ","));
	});

	/*
	*
	* $('#donazione_aggiuntiva').on('change', function(){
		if($("#totale_scontato").length && $("#totale_scontato").val()>0) var quota = $('#totale_scontato').val();
		else{
			if($("#totale_importo").length)	var quota = $('#totale_importo').val();
			else if($('#quota').length)	var quota = $('#quota').val();
			else{
				$('input[name="quota"]').each(function(){
					if($(this).is(':checked')) quota = $(this).val();
				});
			}
			$('.sticky_col .text_totale_importo').text(quota);
		}
		//alert(quota);
		spese_spedizione = 0;
		totale = parseFloat(quota);
		//alert(totale);
		if($("#spese_spedizione").length) var spese_spedizione = $('#spese_spedizione').val();
		if(spese_spedizione>0) totale = totale + parseInt(spese_spedizione);
		//alert(totale);
		var donazione_aggiuntiva = $(this).val();
		//alert(parseInt(donazione_aggiuntiva));
		//alert(parseFloat(totale));
		if(donazione_aggiuntiva>0) totale = parseFloat(totale) + parseFloat(donazione_aggiuntiva);
		//alert(totale);
		//alert(quota + '' + donazione_aggiuntiva + ' = '+totale);
		totale = totale.toString();
		totale = totale.replace(".",",");
		$('.sticky_col .box_price .price').text(totale);
		$('.sticky_col .text_donazione_aggiuntiva').text(parseInt(donazione_aggiuntiva));
		//$('.sticky_col .text_totale_importo').text(parseInt(quota));
	});
	* */
});

function function_btn_choice(button){
	btn_choice =  button.closest('.btn_choice');
	btn_option = button.closest('.btn_option');

	btn_choice.find('input').each(function(){
		$(this).removeAttr('checked');
	});
	btn_choice.find('.btn_option').each(function(){
		if($(this).hasClass('active')) $(this).removeClass('active');
	});

	btn_choice.find('.btn').each(function(){
		if($(this).hasClass('active')) $(this).removeClass('active');
		if($(this).hasClass('field_error')) $(this).removeClass('field_error');
	});

	button.find('input').prop("checked", true);
	button.find('input').prop("checked", "checked");
	button.find('input').attr("checked", "checked");
	//console.log(button.find('input'));
	btn_option.addClass('active');

	id = button.attr('id');
	name_input = button.find('input').attr('name');
	data_div = button.find('input').attr('data-div');

	if(data_div != '' && typeof data_div != 'undefined'){
		//alert(data_div);
		btn_choice.find('input').each(function(){
			data = $(this).attr('data-div');
			//alert(data+" != "+data_div);
			if(data != data_div){
				$('#'+data).addClass('hidden');
				$('#'+data).find('input,select,textarea').each(function(){
					$(this).addClass('dont_serialize');
					$(this).removeClass('field_error');
				});
			}
		});

		$('#'+data_div).removeClass('hidden');
		$('#'+data_div).find('input,select,textarea').each(function(){
			$(this).removeClass('dont_serialize');
		});

		if(name_input == 'paperfree'){
			set_email_beneficiario_required();
		}
	}
	else if ($("#dati_spedizione_beneficiario").length>0 && (name_input == 'regala' || name_input == 'paperfree')){
		//var paperfree = $("input[name='paperfree']:checked").val();
		if($("input:radio[name='paperfree']").length) var paperfree = $("input[name='paperfree']:checked").val();
		else var paperfree = $("#paperfree").val();

		var regala = $("input[name='regala']:checked").val();
		//alert('regala '+regala + ' - paperfree'+ paperfree);

		if (regala == 1){
			show_block("#dati_gift");
		}
		else{
			hidden_block("#dati_gift");
		}

		if (id == 'btn_regala_2'){
			hidden_block("#dati_pergamena");
		}
		else if (id == 'btn_regala_1' || id == 'btn_regala_0'){
			if ($("#dati_pergamena").length>0){
				show_block("#dati_pergamena");
				compone_dedica_pergamena();
				if ($("#input_quota_libera").val()!='') check_importo_cartaceo($("#input_quota_libera").val());
			}
		}

		if (regala == 2) hidden_block(".row_choice_invio");
		else show_block(".row_choice_invio");

		if (regala == 2){
			hidden_block("#dati_spedizione_beneficiario");
			hidden_block("#dati_spedizione");
			hidden_block("#dati_pergamena");
		}
		else if (regala == 1 && paperfree == 1){
			hidden_block("#dati_spedizione_beneficiario");
			hidden_block("#dati_spedizione");

			if (regala == 2){
				hidden_block("#dati_pergamena");
			}
		}
		else if (regala == 1 && paperfree == 0){
			show_block("#dati_spedizione_beneficiario");
			hidden_block("#dati_spedizione");
		}
		else if (regala == 0 && paperfree == 1){
			hidden_block("#dati_spedizione_beneficiario");
			hidden_block("#dati_spedizione");
		}
		else {
			hidden_block("#dati_spedizione_beneficiario");
			show_block("#dati_spedizione");
		}
		set_email_beneficiario_required();
	}
	else if(name_input == 'regala'){
		if(id == 'btn_regala_1'){
			show_block("#dati_gift");

			$("#btn_continuita_1").closest(".btn_option").removeClass('active');
			$("#continuita_1").removeAttr('checked');
			$("#btn_continuita_1").closest(".btn_option").hide();

			$("#btn_continuita_2").closest(".btn_option").addClass('active');
			$("#continuita_2").attr('checked');

			function_btn_choice($("#btn_continuita_2"));
		}
		else{
			hidden_block("#dati_gift");

			$("#btn_continuita_1").closest(".btn_option").addClass('active');
			$("#continuita_1").attr('checked');
			$("#btn_continuita_1").closest(".btn_option").show();

			$("#btn_continuita_2").closest(".btn_option").removeClass('active');
			$("#continuita_2").removeAttr('checked');
			function_btn_choice($("#btn_continuita_1"));
		}
		set_email_beneficiario_required();
	}
	else if(name_input == 'paperfree'){
		if(id == 'btn_paperfree_0') paperfree = 0;
		else paperfree = 1;

		if(paperfree == 0) show_block("#dati_spedizione");
		else hidden_block("#dati_spedizione");

		set_email_beneficiario_required();
	}


	if (name_input == 'continuita'){
		//alert('id '+id);
		if(id == 'btn_continuita_1'){
			$("#row_payment_one_off").addClass('hidden');
			$('#row_payment_one_off').find('input,select,textarea').each(function(){
				$(this).addClass('dont_serialize');
				$(this).removeClass('req');
				$(this).removeAttr('checked');
			});
			$('#row_payment_one_off').find('.form-check').each(function(){
				$(this).removeClass('field_error');
			});

			$("#row_payment_recurring").removeClass('hidden');
			$('#row_payment_recurring').find('input,select,textarea').each(function(){
				$(this).removeClass('dont_serialize');
				$(this).addClass('req');
			});

		}
		else if(id == 'btn_continuita_2'){
			$("#row_payment_recurring").addClass('hidden');
			$('#row_payment_recurring').find('input,select,textarea').each(function(){
				$(this).addClass('dont_serialize');
				$(this).removeClass('req');
				$(this).removeAttr('checked');
			});
			$('#row_payment_recurring').find('.form-check').each(function(){
				$(this).removeClass('field_error');
			});

			$("#row_payment_one_off").removeClass('hidden');
			$('#row_payment_one_off').find('input,select,textarea').each(function(){
				$(this).removeClass('dont_serialize');
				$(this).addClass('req');

			});

		}
	}
}


function hidden_block(id_block){
	$(id_block).addClass('hidden');
	$(id_block).find('input,select,textarea').each(function(){
		$(this).addClass('dont_serialize');
		$(this).removeClass('field_error');
	});
}

function show_block(id_block){
	$(id_block).removeClass('hidden');
	$(id_block).find('input,select,textarea').each(function(){
		$(this).removeClass('dont_serialize');
	});
}

function set_email_beneficiario_required(){
	//alert('test');
	if($("input:radio[name='regala']").length) var regala = $("input[name='regala']:checked").val();
	else var regala = $("#regala").val();

	if($("input:radio[name='paperfree']").length) var paperfree = $("input[name='paperfree']:checked").val();
	else var paperfree = $("#paperfree").val();

	if(regala == 1 && paperfree == 1){
		$("#g_mail").addClass("req");
		$(".desc_inviomail_paperfree").fadeIn();
		$(".desc_inviomail").hide();
	}
	else{
		$("#g_mail").removeClass("req");
		$("#g_mail").removeClass("field_error");
		$(".desc_inviomail_paperfree").hide();
		$(".desc_inviomail").fadeIn();
	}
}

$(window).scroll(function(){
  if($('#cnt_sticky_col').length && $(window).width() > 900){
    var col_sticky_col = $('.col_sticky_col').first().offset().top;

    if(document.documentElement.scrollTop > col_sticky_col && !$("#cnt_sticky_col").hasClass("visibility")){
      $('.col_sticky_col .sticky_col').each(function(){
        $(this).hide();
      });
      document.getElementById("cnt_sticky_col").classList.add("visibility");
    }
    else if(document.documentElement.scrollTop < col_sticky_col && $("#cnt_sticky_col").hasClass("visibility")){
      $('.col_sticky_col .sticky_col').each(function(){
        $(this).show();
      });
      document.getElementById("cnt_sticky_col").classList.remove("visibility");
    }
  }
});


if($('#box_fixed_on_scroll').length){
  var form = $(".form").first();
  var offset_form = form.offset();
  div_form_end = offset_form.top + $('.form').height();
  console.log(div_form_end);

  if(document.documentElement.scrollTop > offset_form.top && document.documentElement.scrollTop < div_form_end-230){
    document.getElementById("box_fixed_on_scroll").classList.add("fixed");
  }
  else{
    document.getElementById("box_fixed_on_scroll").classList.remove("fixed");
  }
}
