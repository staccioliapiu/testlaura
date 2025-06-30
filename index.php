<?php
include('config.php');

if($id == 295 || $id == 532 || $id == 529){
	Header( "HTTP/1.1 301 Moved Permanently" );
	header("Location: wildlife-protector-bracconaggio.html");
}
else if($id == 208){
	Header( "HTTP/1.1 301 Moved Permanently" );
	header("Location: https://www.wwf.it/donazioniinmemoria/");
}
else if($id == 21 || $id == 301){
	Header( "HTTP/1.1 301 Moved Permanently" );
	header("Location: iscrizioni.html");
}
else if($destinazione == 7){
	Header( "HTTP/1.1 301 Moved Permanently" );
	header("Location: regali-solidali.html");
}
else if($id == 554){
	Header( "HTTP/1.1 301 Moved Permanently" );
	header("Location: aziende.html");
}
else if($id == 1211) {
    require_once('fpdf/pdf_riepilogo_acquisto.php');
    exit;
}
else if($id == 1365) {
    require_once('fpdf/dichiarazione_donazione.php');
    exit;
}

 if($destinazione == 1){
    Header( "HTTP/1.1 301 Moved Permanently" );
    header("Location: https://sostieni.wwf.it/iscrizioni/");
}
else if($destinazione == 2){
    Header( "HTTP/1.1 301 Moved Permanently" );
    header("Location: https://sostieni.wwf.it/dona-ora/");
}
else if($destinazione == 4){
    Header( "HTTP/1.1 301 Moved Permanently" );
    header("Location: https://shop.wwf.it/c/bomboniere");
}
else if($destinazione == 5){
    Header( "HTTP/1.1 301 Moved Permanently" );
    header("Location: https://shop.wwf.it/");
}


//$og_image = 'https://s3-eu-west-1.amazonaws.com/wwfitassets/static/home_-_sostieni_WWF.jpg';
$og_image = '';
$img_pagina = array();

if(!empty($array_eventi[$destinazione]) && $array_eventi[$destinazione]!= 0 && $id == 6){
	$img_pagina = $conn->get_images($array_eventi[$destinazione], $ln);
	$dati_events = $conn->node_data($array_eventi[$destinazione], $ln);
	$nome_nodo = $dati_events['nome'];
	$meta_description = $dati_events['meta_description'];
	$title_pagina = $dati_events['title'];
}
else{
	$img_pagina = $conn->get_images($id, $ln);
	$nome_nodo = $dati_nodo_corrente['nome'];
	$meta_keywords = $dati_nodo_corrente['meta_keywords'];
	$meta_description = $dati_nodo_corrente['meta_description'];
	$title_pagina = $dati_nodo_corrente['title'];
}

if($title_pagina==''){
	$title_pagina = $nome_nodo." - Aziende WWF Italia";
}else{
	$title_pagina .= " - Aziende WWF Italia";
}


if(isset($img_pagina[0]) && $img_pagina[0]['nome_file']=='' && isset($idp)) $img_pagina = $conn->get_images($idp, $ln);

if(isset($img_pagina[0]) && $img_pagina[0]['nome_file']!='') $og_image = 'https://aziende.wwf.it/uploads/medium/'.$img_pagina[0]['nome_file'];

if(isset($img_pagina[1]) && strpos($og_image, ' ')) $og_image = 'https://aziende.wwf.it/uploads/medium/'.$img_pagina[1]['nome_file'];

if(isset($img_pagina[0]) && ($img_pagina[0]['nome_file']=='' || strpos($og_image, ' ')))
{
	$img_pagina = $conn->get_images($id_home, $ln);
	$og_image = 'https://aziende.wwf.it/uploads/medium/'.$img_pagina[0]['nome_file'];

}
if($id == 907) {
    //$og_image = "https://aziende.wwf.it/uploads/Banner-Adozione-Aziende-Christmas-1200x1200.jpg";
    $og_image = "https://aziende.wwf.it/uploads/Banner-Adozione-Aziende-Christmas-1200x628.jpg";
}

$sessione_test_criteo = '98cbabfb7d85573c1c1f19b534ff2511';
//if($id != 13 && $destinazione != 0 && $sessione_corrente == $sessione_test_criteo){
if($id != 13 && $destinazione != 0){
	/*ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);*/
	//if($sessione_corrente == $sessione_test_criteo) unset($_SESSION['criteo']);
	$dati_criteo = $conn->iniaSelect("sostieni_criteo", "*", "published = 1");
    //$conn->debug($dati_criteo);
	/*if($sessione_corrente == $sessione_test_criteo){
		echo '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';
		echo count($_SESSION['criteo']['codici_all']).'-'.count($dati_criteo);
		//$conn->debug($_SESSION['criteo']['codici_all']);
	}*/
	if(empty($_SESSION['criteo']) || (!empty($_SESSION['criteo']['codici_all']) && count($_SESSION['criteo']['codici_all']) != count($dati_criteo))){
		//$dati_criteo = $conn->iniaSelect("sostieni_criteo cri left join sostieni_prodotto prod on cri.Product_ID = prod.codice_articolo	left join sostieni_prodotto_varianti var on cri.Product_ID = var.codice", "cri.*, IFNULL(IFNULL(prod.id_prodotto, var.id_prodotto), 0) as id_prodotto", "cri.id_destinazione = 5");
		//echo "SISTEMO LA SESSIONE";
		//unset($_SESSION['criteo']);
		if(!empty($dati_criteo)){
			foreach ($dati_criteo as $key => $value) {
				$_SESSION['criteo']['codici_all'][] = $value['Product_ID'];
				$_SESSION['criteo']['codici'][$value['id_destinazione']][] = $value['Product_ID'];
				$_SESSION['criteo']['prodotti'][$value['id_destinazione']][$value['id_prodotto']][] = $value['Product_ID'];
				$_SESSION['criteo']['pagine'][$value['id_destinazione']][$value['id_nodo']] = $value['Product_ID'];
				if($value['priority'] == 1) $_SESSION['criteo']['priority'][$value['id_destinazione']][] = $value['Product_ID'];
			}
		}
	}

    $array_prodotti_criteo = array();
	/*if($sessione_corrente == $sessione_test_criteo){
		echo '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';
		$conn->debug($_SESSION['criteo']['prodotti'][9]);
	}*/
	//unset($array_codici_criteo);
	if(!empty($_SESSION['criteo']['codici'][$destinazione])) $array_codici_criteo = $_SESSION['criteo']['codici'][$destinazione];
	//unset($array_prodotti_criteo);
	if(!empty($_SESSION['criteo']['prodotti'][$destinazione])) $array_prodotti_criteo = $_SESSION['criteo']['prodotti'][$destinazione];
	if(!empty($_SESSION['criteo']['pagine'][$destinazione])) $array_pagine_criteo = $_SESSION['criteo']['pagine'][$destinazione];
}
else if($id != 13 && $destinazione != 0 && $sessione_corrente != $sessione_test_criteo){
	$array_codici_criteo = array();
	$array_prodotti_criteo = array();
	$array_pagine_criteo = array();
}

if($destinazione == 0 || !isset($destinazione)){
	$last_operazione = $conn->iniaSelect("sostieni_operazione", "email", "session_id = '{$sessione_corrente}'", "id_operazione DESC LIMIT 0,1");
}

$ordine_acquisto = 0;
if($date_today > '2023-01-01 00:00:00'){
    if($destinazione == 4 || $destinazione == 5){
        $ordine_acquisto = 1;
    }
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ita">
<head>

    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){
            dataLayer.push(arguments);
        }
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'security_storage': 'granted',
            'functionality_storage': 'granted'
        });
    </script>

    <?php if(empty($deploy)): ?>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P6D56M2');</script>
    <!-- End Google Tag Manager -->
    <?php endif;?>

    <script type="text/javascript">
        var _iub = _iub || [];
        _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"floatingPreferencesButtonDisplay":"bottom-right","perPurposeConsent":true,"siteId":3488587,"whitelabel":false,"cookiePolicyId":89091536,"lang":"it", "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#0073CE","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","closeButtonRejects":true,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-center","showTitle":false,"textColor":"#000000" },
            "callback": {
                onPreferenceExpressedOrNotNeeded: function(preference) {
                    dataLayer.push({
                        iubenda_ccpa_opted_out: _iub.cs.api.isCcpaOptedOut()
                    });
                    if (!preference) {
                        dataLayer.push({
                            event: "iubenda_preference_not_needed"
                        });
                    } else {
                        if (preference.consent === true) {
                            dataLayer.push({
                                event: "iubenda_consent_given"
                            });
                        } else if (preference.consent === false) {
                            dataLayer.push({
                                event: "iubenda_consent_rejected"
                            });
                        } else if (preference.purposes) {
                            for (var purposeId in preference.purposes) {
                                if (preference.purposes[purposeId]) {
                                    dataLayer.push({
                                        event: "iubenda_consent_given_purpose_" + purposeId
                                    });
                                }
                            }
                        }
                    }
                }
            }
        };
    </script>
    <script type="text/javascript" src="//cs.iubenda.com/sync/3488587.js"></script>
    <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php echo $title_pagina;?></title>
	<meta name="robots" content="<?php echo $index_pagina;?>"/>
	<meta name="description" content="<?php echo $meta_description;?>"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta property="og:title" content="<?php echo $title_pagina?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo strlen($dati_nodo_corrente['url'])>0 ? 'https://aziende.wwf.it/'.$dati_nodo_corrente['url'] : 'https://aziende.wwf.it/';?>" />
	<meta property="og:image" content="<?php echo $og_image;?>" />
	<meta property="og:description" content="<?php echo $meta_description;?>" />
	<meta name="google-site-verification" content="Sz3XZ_wtgV1L1GqHxH01656jZjGLxzFyDQzG9HXKx0g" />
	<link rel="shortcut icon" type="image/png" href="https://aziende.wwf.it/img/pandaWWF.png"/>

    <?php if ($destinazione == 1): ?>
    <!-- anti-flicker snippet (recommended)  -->
    <style>.async-hide { opacity: 0 !important} </style>
    <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
            h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
            (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
            {'GTM-PGGKVV':true});</script>
    <?php endif; ?>

	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,300italic,600,600italic,700,800,700italic,800italic' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="css/normalize.css" type="text/css" media="screen" />

	<link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="css/jquery-ui.css" />
	<link rel="stylesheet" href="assets/jsnav/jsnav.css">
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/flexslider.css" />

    <link href="css/styles_repare.css?v=1" rel="stylesheet">

	<link href="css/wwf_styles.css?v=46" rel="stylesheet">

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"></script>

	<script type="text/javascript" src="js/modernizr.js"></script>
	<script type="text/javascript" src="js/min/jquery.easing.1.3-min.js"></script>
	<script type="text/javascript" src="js/scrollreveal.min.js"></script>
	<script type="text/javascript" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
	<script type="text/javascript" src="assets/jsnav/js/menu.js"></script>
    <script type="text/javascript" src="js/jquery.form.js"></script>
    <script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.flexslider-min.js"></script>
    <script type="text/javascript" src="fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>

    <script type="text/javascript" src="js/wwf_functions.js?v=24"></script>

    <script type="text/javascript" src="js/wwf_functions_add.js?v=1"></script>

    <script type="text/javascript" src="autocomplete/js/autocompletejs.js"></script>

	<script src='https://www.google.com/recaptcha/api.js'></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4SZrDGAm5XcsjlyKgXy5VI4PQMZEHSt4&libraries=places&v=weekly" async></script>

    <meta name="facebook-domain-verification" content="uglbb4ne2ug8by9s2syx5ku8wfmg7x" />

</head>

<body class=" <?php if($christmas_active==1) echo 'christmas'; ?>
	<?php if($st_valentine_active==1) echo 'event_style valentine_style';?>"
	<?php if($id!=13){ ?>style="height: auto; <?php if($destinazione==2) echo 'background: #fff;'; ?>" <?php } ?>
	>

    <?php if(empty($deploy)): ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6D56M2"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php endif; ?>


    <?php require_once('menu.php');?>
	<?php

    switch($destinazione){

		case(3):
			require_once('adozione/index.php');
		break;

		case(8):
		case(9):
        case(12):
        case(13):
			require_once('regali_solidali/index.php');
		break;

		default:

			switch($id_nonno){

				case(972):
					require_once('pagine_esterne/index.php');
				break;

				case(973):
				case(1006):
					require_once('pagine_esterne/index.php');
				break;

				default:

					switch($idp){
                        case(943):
                            require_once('pagine_esterne/index.php');
                            break;

						default:
							switch($id){

                                case(1211):
                                    require_once('pagine_esterne/riepilogo_acquisto_pdf.php');
                                    break;

								case(292):
									require_once('sezione_generica_text.php');
								break;

								case(10):
									require_once('faq.php');
								break;

								case(91):
								case(99):
								case(996):
									require_once('sezione_generica_text.php');
								break;

                                case(1367):
                                case(1368):
                                case(1407):
                                    $destinazione = 9;
                                    require_once('pagine_esterne/index.php');
                                    break;

                                case(1206):
                                case(1321):
                                case(1323):
                                    require_once('pagine_esterne/index.php');
                                    break;

                                case(943):
                                    require_once('pagine_esterne/index.php');
                                    break;

								default:
									$id = 907;
                                    require_once('home.php');
								break;
							}
						break;
					}
				break;
			}
		break;
	}
	?>

	<?php if($id!=13)	require_once('footer.php'); ?>


<?php if($id_events!=666 && $id_events>0 && $destinazione != 2 && $destinazione != 4 && $id!=6 && $utm_campaign=='' && $destinazione!=3){
	$events_images = $conn->get_images_by_layout($id_events, $ln, 2);

	$link_popup = $url_events;

	if(!empty($events_images[0])){ ?>
	<!-- Modal -->
	<div class="modal modal_event" id="modal_events" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button id="btnClose" type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<a href="<?php echo $link_popup;?>?utm_source=sostieni&utm_medium=popup&utm_campaign=<?php echo $events_utm_campaign;?>">
					<img class="tb_dsk" src="uploads/<?php echo $events_images[0]['nome_file']?>"/>
					<img class="mobile" src="uploads/<?php echo $events_images[1]['nome_file']?>"/>
				</a>
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function() {
			$("#btnClose").click(function (e)
			{
				sessionStorage["PopupShown"] = 'yes'; //Save in the sessionStorage if the modal has been shown
			});

			$("#modal_events a").click(function (e)
			{
				sessionStorage["PopupShown"] = 'yes'; //Save in the sessionStorage if the modal has been shown
			});

			if(sessionStorage["PopupShown"] != 'yes'){
				$("#modal_events").modal({show: true});
			}
		});
	</script>
	<?php } ?>
<?php } ?>

<script type="text/javascript">
var importo_totale = '<?php echo (isset($importo_totale)) ? $importo_totale : 0;?>';
var order_id = '<?php echo (isset($id_ordine)) ? $id_ordine : 0;?>';

var ievs = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
if (ievs){
    var iev=new Number(RegExp.$1);
    if (iev < 9){
        window.location.href = "http://browsehappy.com/";
    }
}
</script>

</body>
</html>
