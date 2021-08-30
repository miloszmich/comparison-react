/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

jQuery(document).ready(function($) {
	var age_check = Cookies.get('age_check');

   if ( !age_check ) {
      jQuery( '#rankingpopup' ).fadeIn();
      jQuery( 'html, body' ).addClass( 'noscrolling' );
   }

   jQuery('#age_check_btn').click( function() {
      jQuery( '#rankingpopup' ).fadeOut();
      jQuery( 'html, body' ).removeClass( 'noscrolling' );
      Cookies.set('age_check', true, { expires: 1, path: '' });
      return false;
   });

    // anchor
    jQuery(document).on('click', '[data-anchor]', function(event){
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top
        }, 500);
    });


    // move ad to top
    jQuery('.move-to-top').appendTo('.main-container-top');


    // rating replacements
    jQuery('.post-ratings').each(function(index, el) {
        var area = jQuery(this);
        var post_id = area.closest('[data-id-rank]').attr('data-id-rank');
        area.find('img').attr('title', '').attr('alt', '');
    });
    jQuery('.post-ratings-loading').each(function(index, el) {
        var self = jQuery(this);
        var place = self.prev('.post-ratings').find('.rating-box-btn');
        var rand = Math.floor(Math.random()*100);
        self.html('<div id="floatingCirclesG-'+rand+'"><div class="f_circleG f_circleG_01" id="frotateG_01-'+rand+'"></div><div class="f_circleG f_circleG_02" id="frotateG_02-'+rand+'"></div><div class="f_circleG f_circleG_03" id="frotateG_03-'+rand+'"></div><div class="f_circleG f_circleG_04" id="frotateG_04-'+rand+'"></div><div class="f_circleG f_circleG_05" id="frotateG_05-'+rand+'"></div><div class="f_circleG f_circleG_06" id="frotateG_06-'+rand+'"></div><div class="f_circleG f_circleG_07" id="frotateG_07-'+rand+'"></div><div class="f_circleG f_circleG_08" id="frotateG_08-'+rand+'"></div></div>');
        self.appendTo(place);
    });


    // add to menu
    // jQuery('#main-navbar-collapse').find('ul').first()
    //     .append('<li><a href="#" class="open-search"><i class="fa fa-search"></i></a></li>')
    //     .append('<li><a href="#"><i class="fa fa-envelope-o"></i></a></li>');

    jQuery('#main-navbar-collapse').find('[title="Szukaj"]').first().addClass('open-search').html('<i class="fa fa-search"></i>');
    // jQuery('#main-navbar-collapse').find('[title="Kontakt"]').first().html('<i class="fa fa-envelope-o"></i>');
    // jQuery('#main-navbar-collapse').find('[title="Kontakt"]').first().html('<img style="position: relative; top: -1px; width: 18px; height: 13px;" src="../wp-content/themes/forex/media/contact.svg" />');
    jQuery('#main-navbar-collapse').find('[title="Kontakt"]').first().html('<svg version="1.1" id="menu-contact-svg-wrapper" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 13" style="enable-background:new 0 0 18 13;" xml:space="preserve"><path class="menu-contact-svg" d="M0,0v13h18V0H0z M16,2v0.3l-7,5l-7-5V2H16z M2,11V4.7l7,5l7-5V11H2z"/></svg>');


	jQuery("button.navbar-toggle").unbind("click");

	jQuery("button.navbar-toggle").on("click", function () {
		jQuery("#main-navbar-collapse").toggleClass("in");
		return false;
	});


    // jQuery('.open-search').click(function(event) {
    //     event.preventDefault();
    //     jQuery('.search-wrapper').addClass('search-wrapper-open');
    // });

    // jQuery('.search-close').click(function(event) {
    //     event.preventDefault();
    //     jQuery('.search-wrapper').removeClass('search-wrapper-open');
    // });



    // cookies
    if (!window.localStorage.nucookies) {
        jQuery('.nucookies').show();
        jQuery('.nucookies>span').click(function(e){
    		var bar = jQuery(this).parent('.nucookies');
    		var height = bar.outerHeight();
    		bar.css('bottom', -height);
            window.localStorage.setItem('nucookies', 'read');

    		setTimeout(function(){
    			bar.hide();
    		}, 800);
    	});
    }


    // fake counter number on click
    // jQuery('.rating-box-btn').find('img').not('.post-ratings-image').each(function(index, el) {
    //     jQuery(this).on('click', function(event) {
    //         jQuery('.counter').each(function(index, el) {
    //             var oldNumber = jQuery(this).html();
    //             var newNumber = parseInt(oldNumber) + 1;
    //             jQuery(this).html(newNumber);
    //         });
    //     });
    // });


    // count from 0
    jQuery('.count').each(function () {
        var finish = jQuery(this).text();
        var counting = jQuery(this).hasClass("counting");

        if (!counting) {
        	jQuery(this).addClass("counting");

        	jQuery(this).prop('Counter',0).animate({
	            Counter: finish
	        }, {
	            duration: 2000,
	            easing: 'swing',
	            step: function (now) {
	                jQuery(this).text(Math.ceil(now));
	            }
	        });
        }
    });


    // parallax
    var rellax = new Rellax('.rellax');

});


/////////////////////////////////////////////////////////////////////////////////
// Tabs

jQuery(document).ready(function ($) {

	jQuery("body").on("click", ".tabs > div.navi > a", function () {

		// zakładki
		jQuery(this).addClass("active").siblings().removeClass("active");
		var ind = jQuery(this).index();

		// treść
		jQuery(this).closest(".tabs").find("div.panes").children().eq(ind).addClass("active").siblings().removeClass("active");

		// do wykresów Google
		window.dispatchEvent(new Event('resize'));
/*
		google.load('visualization', '1', {
	        packages: ['timeline'],
	        callback: drawChart
	    });

	    google.load('visualization', '1', {
	        packages: ['timeline'],
	        callback: drawChart2
	    });
*/
		if ($(this).hasClass("pass-thru")) {
			return true;
		}
		return false;
	});


	jQuery("body").on("click", "ul.list-rank a.btn", function () {
		if (gtag) {
			gtag('event', "Kliknięcie w pomarańczowy button", {
			  'event_category': "NB - Ranking",
			  'event_label': jQuery(this).text(),
			  'value': 1
			});
		}
	});

});


function copyText (id) {
  var copyText = document.getElementById(id);

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
  // console.log(copyText.value);

  var button = document.getElementById(id+'-button');
  var button_text = button.innerHTML;

  button.innerHTML = '<span style="color: #1fb325;"><i class="fa fa-check"></i> Skopiowano</span>';

  setTimeout(function(){ button.innerHTML = button_text; }, 3000);
}



/////////////////////////////////////////////////////////////////////////////////////////////////
// Sortowanie

function sort_desc_li (a, b) {
	return ($(b).attr('data-val')) > ($(a).attr('data-val')) ? 1 : -1;
}

function sort_asc_li (a, b) {
	return ($(b).attr('data-val')) < ($(a).attr('data-val')) ? 1 : -1;
}

function sort_numbers_desc_li (a, b) {
	return (parseFloat($(b).attr('data-val'))) > (parseFloat($(a).attr('data-val'))) ? 1 : -1;
}

function sort_numbers_asc_li (a, b) {
	return (parseFloat($(b).attr('data-val'))) < (parseFloat($(a).attr('data-val'))) ? 1 : -1;
}

function obliczBonus (random, plus_1) {
	var tar = jQuery("#kalkulator-bonusowy-"+random);
	var depozyt = parseFloat(jQuery("#kalkulator-bonusowy-"+random+" input#depozyt-"+random).val().replace(",","."));
	var wynik = jQuery("#kalkulator-bonusowy-"+random+" input#wynik-"+random);
	var typ = jQuery("#kalkulator-bonusowy-"+random).attr("data-id");
	var out = 0;
	var li = jQuery("#kalkulator-bonusowy-"+random).closest("li");


	switch (typ) {
		case "fortuna":
			out = obliczBonusFortuna(depozyt);
		break;

		case "betfan":
			out = obliczBonusBetfan(depozyt);
		break;

		case "sts":
			out = obliczBonusSts(depozyt);
		break;

		case "forbet":
			out = obliczBonusForbet(depozyt);
		break;

		case "etoto":
			out = obliczBonusEtoto(depozyt);
		break;

		case "betclic":
			out = obliczBonusBetclic(depozyt);
		break;

		case "totolotek":
			out = obliczBonusTotolotek(depozyt);
		break;

		case "lvbet":
			out = obliczBonusLvbet2(depozyt);
		break;

		case "totalbet":
			out = obliczBonusTotalbet(depozyt);
		break;

		case "milenium":
			out = obliczBonusMilenium(depozyt);
		break;

		case "betx":
			out = obliczBonusBetx(depozyt);
		break;

		case "pzbuk":
			out = obliczBonusPzbuk(depozyt);
		break;
	}


	if (isNaN(out)) {
		out = 0;
	}

	out = out.toFixed(2);

	wynik.val(out);
	li.attr("data-val", out);

	// +1
	if (plus_1 == true) {
		kalkulator_bonusowy_plus_1();
	}
}

function obliczBonusBetx (depozyt) {
	var freebet = 30;
	var bonus = 0;
	var cashback = 0;

	if (depozyt >= 5) {
		bonus = depozyt;
		if (bonus > 5000) {
			bonus = 5000;
		}

		cashback = depozyt;
		if (cashback > 200) {
			cashback = 200;
		}
	} else {
		depozyt = 0;
	}

	return depozyt + bonus + cashback + freebet;
}

function obliczBonusPzbuk (depozyt) {
	var freebet = 0;
	var cashback = 0;

	if (depozyt >= 50) {
		freebet = 200;
	}

	if (depozyt >= 5) {
		cashback = depozyt;
		if (cashback > 200) {
			cashback = 200;
		}
	} else {
		depozyt = 0;
	}

	return depozyt + cashback + freebet;
}

function obliczBonusFortuna (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = (depozyt < 1000) ? depozyt : 1000;
	var cashback = 0;

	if (depozyt == 0) { return 60; }

	if (depozyt < 1) {
		depozyt = 0;
		bonus = 0;
	}

	if (bonus > 1000) {
		bonus = 1000;
	}

	if (depozyt >= 2) {
		cashback = (depozyt * 0.88 < 210) ? depozyt * 0.88 : 210;
	}

	var freebet = 20;

	bonus = depozyt + bonus + cashback + freebet;

	return bonus;
}


function obliczBonusBetfan (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = (depozyt < 777) ? depozyt : 777;
	var cashback = 0;
	var kupony = 0;

	if (depozyt < 1) {
		depozyt = 0;
	}

	if (depozyt < 20) {
		bonus = 0;
	}

	if (depozyt >= 20) {
		kupony = 10;
		cashback = depozyt * 0.88;

		if (cashback > 100) {
			cashback = 100;
		}
	}

	bonus = depozyt + bonus + cashback + kupony;

	return bonus;
}


function obliczBonusSts (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = (depozyt < 1200) ? depozyt : 1200;
	var cashback = 0;
	var cashback2 = 0;

	if (depozyt < 1) {
		bonus = 0;
	}

	if (depozyt >= 2) {
		cashback = (depozyt * 0.88 < 30) ? depozyt * 0.88 : 30;
	}

	if (depozyt >= 37) {
		cashback2 = ((depozyt - 35)* 0.88 < 20) ? (depozyt - 35)* 0.88 : 20;
	}

	var freebet = 29;

	bonus = depozyt + bonus + cashback + cashback2 + freebet;

	return bonus;
}


function obliczBonusForbet (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = (depozyt <= 2000) ? depozyt : 2000;
	var extra = 0;

	if (depozyt < 1) {
		return 0;
	}

	if (depozyt < 20) {
		return depozyt;
	}

	if (depozyt >= 100) {
		extra = 50;
	}

	bonus = depozyt + bonus + extra;

	return bonus;
}


function obliczBonusBetclic (kwota) {
	var bonus = 0;
	var depozyt = parseFloat(kwota);

	if (depozyt < 1) {
		return 0;
	}

	var cashback = (depozyt * 0.88 < 550) ? depozyt * 0.88 : 550;

	bonus = depozyt + cashback;

	return bonus;
}


function obliczBonusEtoto (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = 0;

	if (depozyt < 1) {
		return 0;
	}

// 	bonus = (2 * depozyt < 200) ? 2 * depozyt : 200;

	return depozyt + bonus;
}


function obliczBonusTotolotek (kwota) {
	var depozyt = parseFloat(kwota);
	var bonusStart = 20;
	var bonus = 0;

	if (depozyt >= 20) {
		bonus = (depozyt <= 500) ? depozyt : 500;
	}

	return depozyt + bonus + bonusStart;
}


function obliczBonusLvbet (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = 0;
	var freebet = 20;

	if (depozyt < 10) {
		depozyt = 0;
	}

	if (depozyt >= 20) {
		bonus = depozyt * 0.1;
	}

	if (depozyt >= 50) {
		bonus = depozyt;
	}

	if (bonus > 1000) {
		bonus = 1000;
	}

	return depozyt + bonus + freebet;
}

function obliczBonusLvbet2 (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = 0;

	if (depozyt < 10) {
		return 0;
	}

	if (depozyt >= 10) {
		bonus = depozyt;
	}

	if (bonus > 2000) {
		bonus = 2000;
	}

	return depozyt + bonus;
}

function obliczBonusTotalbet (kwota) {
	var depozyt = parseFloat(kwota);
	var bonus = 0;
	var freebet = 25;
	var dodatkowyFreebet = 0;

	if (depozyt < 1) {
		depozyt = 0;
	}

	if (depozyt >= 10) {
		bonus = depozyt;
		dodatkowyFreebet = 5;
	}

	if (bonus > 5000) {
		bonus = 5000;
	}

	return depozyt + bonus + freebet + dodatkowyFreebet;
}

function obliczBonusMilenium (kwota) {
	var depozyt = parseFloat(kwota);
	var cashback = 0;
	var freebet = 0;
	var bonus = 0;

	if (depozyt < 1) { depozyt = 0; }

	if (depozyt >= 1) { cashback = depozyt; }
	if (cashback > 100) { cashback = 100; }

	if (depozyt >= 1) { bonus = depozyt; }
	if (bonus > 1500) { bonus = 1500; }

	if (depozyt >= 50) { freebet = 20; }

	return depozyt + bonus + cashback + freebet;
}


// Obsługa okna

jQuery(document).ready(function ($) {
	$(".window-controller").click(function () {
		var id = $(this).attr("data-window");

		$(".window").removeClass("open");
		$(".window[data-window='"+id+"']").addClass("open");

		return false;
	});


	$("body").on("click", ".window a.close", function () {
		$("body").removeClass("windowOpen");
		return false;
	});


	$(document).keyup(function(e) {
		// esc
		if (e.keyCode == 27) {
			$("body").removeClass("windowOpen");
		}
	});
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Obsługa cookies

function getCookie (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return false;
}

function setCookie (cname, cvalue, secs) {
    var d = new Date();
    d.setTime(d.getTime() + (secs*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function kalkulator_bonusowy_plus_1 () {
	if (!getCookie("kalkulator-bonusowy-counted")) {
		$.ajax({url: "https://najlepsibukmacherzy.pl/wp-content/themes/najlepsibukmacherzy/logic/kalkulator-bonusowy-counter.php", async: true, type: "POST", data: {"pass":"QwarQQaz45"}});
		setCookie("kalkulator-bonusowy-counted", true, 5);
	}
}

function comparisonResultUpdate ()  {
	// console.log('Request')
  if (!getCookie("porownywarka-counted")) {
	$.ajax({url:"https://najlepsibukmacherzy.pl/wp-content/themes/najlepsibukmacherzy/logic/kalkulator-bonusowy-counter.php", async: true, type: "POST", data: { "pass": 'DSF6YVjmKy' }})
    setCookie("porownywarka-counted", true, 5)
  }
}
