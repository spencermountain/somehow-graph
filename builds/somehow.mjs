var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var fitAspectRatio = createCommonjsModule(function (module, exports) {
!function(e){module.exports=e();}(function(){return function a(o,s,d){function c(t,e){if(!s[t]){if(!o[t]){var i="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&i)return i(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=s[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,a,o,s,d);}return s[t].exports}for(var l="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<d.length;e++)c(d[e]);return c}({1:[function(e,t,i){var n=[{names:["square","1:1","instagram"],description:"Square",decimal:1,orientation:"landscape"},{names:["4:3","fullscreen","four three","1.33:1","ipad","pythagorean"],description:"Traditional TVs",decimal:1.333333,orientation:"landscape"},{names:["a4","√2:1","paper","lichtenberg","1:1.41"],description:"A4 paper",decimal:1.41},{names:["imax","1.43:1"],description:"IMAX film",decimal:1.43,orientation:"landscape"},{names:["3:2","35mm","photo","1.5:1","1.5"],description:"35mm photos",decimal:1.5,orientation:"landscape"},{names:["business card","bank card","1.58:1"],description:"Bank Cards",decimal:1.58577,orientation:"landscape"},{names:["golden","kepler","1.618","1.6:1"],description:"Golden ratio",decimal:1.61803,orientation:"landscape"},{names:["16:9","hd","hdtv","fhd","tv","computer","iphone","4k","8k","1.78:1"],description:"HD video",decimal:1.77777,orientation:"landscape"},{names:["widescreen","1.85:1"],description:"Movie-theatres",decimal:1.85,orientation:"landscape"},{names:["2:1","univisium","mobile","18:9"],description:"2:1",decimal:2,orientation:"landscape"},{names:["cinemascope","widescreen","wide","2.35:1","2.39:1"],description:"Widescreen",decimal:2.35,orientation:"landscape"},{names:["silver","1 + √2","2.41:1"],description:"Silver ratio",decimal:2.41,orientation:"landscape"}],r=n.map(function(e){return (e=Object.assign({},e)).decimal=1/e.decimal,e.orientation="portrait",e}),a={};n.forEach(function(t){t.names.forEach(function(e){a[e]=t;});}),t.exports={lookup:a,portraits:r,list:n};},{}],2:[function(e,t,i){var n=e("./aspects");t.exports=function(e,t){var i=e/t;return (i=parseInt(100*i,10)/100)<1?function(e,t){for(var i=0;i<t.length;i+=1)if(e>t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.portraits):function(e,t){for(var i=0;i<t.length;i+=1)if(e<=t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.list)};},{"./aspects":1}],3:[function(e,t,i){var n=function(e,t){var i=1/t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.width*i;return r=Math.round(r),{closest:t,width:e.width,height:r,orientation:n,original:e}},r=function(e,t){var i=t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.height*i;return {closest:t,width:r=Math.round(r),height:e.height,orientation:n,original:e}};t.exports={both:function(e,t){var i=r(e,t);return i.width>e.width?n(e,t):i},width:r,height:n};},{}],4:[function(i,n,e){(function(e){var o=i("./find-best-ratio"),s=i("./parse-ratio"),d=i("./fit"),t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!e.aspect&&!e.ratio){var t=o(e.width,e.height),i=1/t.decimal,n=e.width*i,r=(n-e.height)/e.height;return r=parseInt(1e3*r,10)/10,n=Math.round(n),{closest:t,percent_change:r,width:e.width,height:n}}var a=s(e.aspect||e.ratio||"");return null===a?(console.error("find-aspect-ratio error: Could not find a given aspect ratio."),e):"number"==typeof e.width&&"number"==typeof e.height?d.both(e,a):"number"==typeof e.width?d.height(e,a):"number"==typeof e.height?d.width(e,a):(console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."),e)};"undefined"!=typeof self?self.nlp=t:"undefined"!=typeof window?window.nlp=t:void 0!==e&&(e.nlp=t),void 0!==n&&(n.exports=t);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{"./find-best-ratio":2,"./fit":3,"./parse-ratio":5}],5:[function(e,t,i){var n=e("./aspects"),r=/^[0-9\.]+:[0-9\.]+$/;t.exports=function(e){if(e=(e=(e=(e=e.toLowerCase()).trim()).replace(" ratio","")).replace("-"," "),!0===n.lookup.hasOwnProperty(e))return n.lookup[e];if(!0!==r.test(e))return null;var t=e.split(":");return {description:"custom",decimal:parseFloat(t[0])/parseFloat(t[1])}};},{"./aspects":1}]},{},[4])(4)});
});

var n=function(t,r,u,e){for(var p=1;p<r.length;p++){var s=r[p],h="number"==typeof s?u[s]:s,a=r[++p];1===a?e[0]=h:3===a?e[1]=Object.assign(e[1]||{},h):5===a?(e[1]=e[1]||{})[r[++p]]=h:6===a?e[1][r[++p]]+=h+"":e.push(a?t.apply(null,n(t,h,u,["",null])):h);}return e},t=function(n){for(var t,r,u=1,e="",p="",s=[0],h=function(n){1===u&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||e,0):3===u&&(n||e)?(s.push(n||e,1),u=2):2===u&&"..."===e&&n?s.push(n,3):2===u&&e&&!n?s.push(!0,5,e):u>=5&&((e||!n&&5===u)&&(s.push(e,u,r),u=6),n&&(s.push(n,u,r),u=6)),e="";},a=0;a<n.length;a++){a&&(1===u&&h(),h(a));for(var f=0;f<n[a].length;f++)t=n[a][f],1===u?"<"===t?(h(),s=[s],u=3):e+=t:4===u?"--"===e&&">"===t?(u=1,e=""):e=t+e[0]:p?t===p?p="":e+=t:'"'===t||"'"===t?p=t:">"===t?(h(),u=1):u&&("="===t?(u=5,r=e,e=""):"/"===t&&(u<5||">"===n[a][f+1])?(h(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(h(),u=2):e+=t),3===u&&"!--"===e&&(u=4,s=s[0]);}return h(),s},r="function"==typeof Map,u=r?new Map:{},e=r?function(n){var r=u.get(n);return r||u.set(n,r=t(n)),r}:function(n){for(var r="",e=0;e<n.length;e++)r+=n[e].length+"-"+n[e];return u[r]||(u[r]=t(n))};function htm(t){var r=n(this,e(t),arguments,[]);return r.length>1?r:r[0]}

var vhtml = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	 module.exports = factory() ;
}(commonjsGlobal, (function () {
var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));

});

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace$1 (n) {
	return n && n['default'] || n;
}

var fns = createCommonjsModule$1(function (module, exports) {
//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
exports.isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// unsurprisingly-nasty `typeof date` call
exports.isDate = d => Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
exports.isArray = input => Object.prototype.toString.call(input) === '[object Array]';
exports.isObject = input => Object.prototype.toString.call(input) === '[object Object]';

exports.zeroPad = (str, len = 2) => {
  let pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
};

exports.titleCase = str => {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
};

exports.ordinal = i => {
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
};

//strip 'st' off '1st'..
exports.toCardinal = str => {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
  return parseInt(str, 10)
};

//used mostly for cleanup of unit names, like 'months'
exports.normalize = (str = '') => {
  str = str.toLowerCase().trim();
  str = str.replace(/ies$/, 'y'); //'centuries'
  str = str.replace(/s$/, '');
  str = str.replace(/-/g, '');
  if (str === 'day') {
    return 'date'
  }
  return str
};

exports.getEpoch = tmp => {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime()
  }
  if (tmp.epoch) {
    return tmp.epoch
  }
  return null
};

//make sure this input is a spacetime obj
exports.beADate = (d, s) => {
  if (exports.isObject(d) === false) {
    return s.clone().set(d)
  }
  return d
};

exports.formatTimezone = (offset, delimiter = '') => {
  const absOffset = Math.abs(offset);
  const sign = offset > 0 ? '+' : '-';
  return `${sign}${exports.zeroPad(absOffset)}${delimiter}00`
};
});
var fns_1 = fns.isLeapYear;
var fns_2 = fns.isDate;
var fns_3 = fns.isArray;
var fns_4 = fns.isObject;
var fns_5 = fns.zeroPad;
var fns_6 = fns.titleCase;
var fns_7 = fns.ordinal;
var fns_8 = fns.toCardinal;
var fns_9 = fns.normalize;
var fns_10 = fns.getEpoch;
var fns_11 = fns.beADate;
var fns_12 = fns.formatTimezone;

const zeroPad = fns.zeroPad;

const toString = d =>
  zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (epoch, start, end, defaultOffset) => {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(epoch);
  //(try to mediate this a little?)
  let bias = d.getTimezoneOffset() || 0;
  let shift = bias + defaultOffset * 60; //in minutes
  shift = shift * 60 * 1000; //in ms
  d = new Date(epoch + shift);

  let current = toString(d);
  //eg. is it after ~november?
  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true
    }
  }
  return false
};
var summerTime = shouldChange;

// this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.js, but speeds up spacetime considerably
const quickOffset = s => {
  let zones = s.timezones;
  let obj = zones[s.tz];
  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0
  }
  if (obj.dst === undefined) {
    return obj.offset
  }

  //get our two possible offsets
  let jul = obj.offset;
  let dec = obj.offset + 1; // assume it's the same for now
  if (obj.hem === 'n') {
    dec = jul - 1;
  }
  let split = obj.dst.split('->');
  let inSummer = summerTime(s.epoch, split[0], split[1], jul);
  if (inSummer === true) {
    return jul
  }
  return dec
};
var quick = quickOffset;

var _build = {
	"9|s": "2/dili,2/jayapura",
	"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
	"9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
	"9.5|s": "4/darwin,4/north",
	"8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
	"8|n|03/25:03->09/29:23": "2/ulan_bator",
	"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
	"8.75|s": "4/eucla",
	"7|s": "12/davis,2/jakarta,9/christmas",
	"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
	"6|s": "12/vostok",
	"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
	"6.5|n": "2/rangoon,9/cocos",
	"5|s": "12/mawson,9/kerguelen",
	"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
	"5.75|n": "2/kathmandu,2/katmandu",
	"5.5|n": "2/calcutta,2/colombo,2/kolkata",
	"4|s": "9/reunion",
	"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
	"4.5|n|03/22:00->09/21:24": "2/tehran",
	"4.5|n": "2/kabul",
	"3|s": "12/syowa,9/antananarivo",
	"3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
	"3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
	"3|n|03/31:00->10/26:24": "2/beirut",
	"3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
	"3|n|03/29:00->10/25:01": "2/amman",
	"3|n|03/29:00->10/24:24": "2/damascus",
	"3|n|03/23:01->10/26:01": "2/gaza,2/hebron",
	"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
	"2|s|03/31:02->10/27:02": "12/troll",
	"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
	"2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
	"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
	"1|s|04/02:01->09/03:03": "0/windhoek",
	"1|s": "0/kinshasa,0/luanda",
	"1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
	"1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
	"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
	"14|n": "11/kiritimati",
	"13|s|04/07:04->09/29:03": "11/apia",
	"13|s|01/15:02->11/05:03": "11/tongatapu",
	"13|n": "11/enderbury,11/fakaofo",
	"12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
	"12|s|01/13:03->11/03:02": "11/fiji",
	"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
	"12.75|s|04/07:03->04/07:02": "11/chatham",
	"11|s": "12/macquarie,11/bougainville",
	"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
	"11.5|n": "11/norfolk",
	"10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
	"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
	"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
	"10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
	"0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
	"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
	"-9|n|03/10:02->11/03:02": "1/adak,1/atka",
	"-9|n": "11/gambier",
	"-9.5|n": "11/marquesas",
	"-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
	"-8|n": "11/pitcairn",
	"-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
	"-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
	"-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
	"-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
	"-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
	"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
	"-5|s": "1/lima,1/rio_branco,5/acre",
	"-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
	"-5|n|03/12:03->11/05:01": "1/north_dakota",
	"-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
	"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
	"-4|s|05/13:23->08/13:01": "12/palmer",
	"-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
	"-4|s|03/23:24->10/06:00": "1/asuncion",
	"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
	"-4|s": "1/la_paz,1/manaus,5/west",
	"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
	"-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
	"-4|n|03/10:00->11/03:01": "1/havana",
	"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
	"-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
	"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
	"-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
	"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
	"-2|s": "5/denoronha",
	"-2|n|03/30:22->10/26:23": "1/godthab",
	"-2|n|03/10:02->11/03:02": "1/miquelon",
	"-2|n": "1/noronha,3/south_georgia",
	"-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
	"-1|n": "3/cape_verde",
	"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
	"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
};

var _build$1 = /*#__PURE__*/Object.freeze({
	'default': _build
});

//prefixes for iana names..
var _prefixes = [
  'africa',
  'america',
  'asia',
  'atlantic',
  'australia',
  'brazil',
  'canada',
  'chile',
  'europe',
  'indian',
  'mexico',
  'pacific',
  'antarctica',
  'etc'
];

var data = getCjsExportFromNamespace$1(_build$1);

let all = {};
Object.keys(data).forEach(k => {
  let split = k.split('|');
  let obj = {
    offset: Number(split[0]),
    hem: split[1]
  };
  if (split[2]) {
    obj.dst = split[2];
  }
  let names = data[k].split(',');
  names.forEach(str => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      num = Number(num);
      return _prefixes[num] + '/'
    });
    all[str] = obj;
  });
});

all['utc'] = {
  offset: 0,
  hem: 'n' //(sorry)
};

//add etc/gmt+n
for (let i = -13; i <= 13; i += 0.5) {
  let num = i;
  if (num > 0) {
    num = '+' + num;
  }
  let name = 'etc/gmt' + num;
  all[name] = {
    offset: i * -1, //they're negative!
    hem: 'n' //(sorry)
  };
  name = 'utc/gmt' + num; //this one too, why not.
  all[name] = {
    offset: i * -1,
    hem: 'n'
  };
}
// console.log(all)

// console.log(Object.keys(all).length)
var unpack = all;

//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'utc'; //

//this Intl object is not supported often, yet
const safeIntl = () => {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null
  }
  let format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null
  }
  let timezone = format.resolvedOptions().timeZone;
  if (!timezone) {
    return null
  }
  return timezone.toLowerCase()
};

const guessTz = () => {
  let timezone = safeIntl();
  if (timezone === null) {
    return fallbackTZ
  }
  return timezone
};
//do it once per computer
var guessTz_1 = guessTz;

const isOffset = /(\-?[0-9]+)h(rs)?/i;
const isNumber = /(\-?[0-9]+)/;
const utcOffset = /utc([\-+]?[0-9]+)/i;
const gmtOffset = /gmt([\-+]?[0-9]+)/i;

const toIana = function(num) {
  num = Number(num);
  if (num > -13 && num < 13) {
    num = num * -1; //it's opposite!
    num = (num > 0 ? '+' : '') + num; //add plus sign
    return 'etc/gmt' + num
  }
  return null
};

const parseOffset = function(tz) {
  // '+5hrs'
  let m = tz.match(isOffset);
  if (m !== null) {
    return toIana(m[1])
  }
  // 'utc+5'
  m = tz.match(utcOffset);
  if (m !== null) {
    return toIana(m[1])
  }
  // 'GMT-5' (not opposite)
  m = tz.match(gmtOffset);
  if (m !== null) {
    let num = Number(m[1]) * -1;
    return toIana(num)
  }
  // '+5'
  m = tz.match(isNumber);
  if (m !== null) {
    return toIana(m[1])
  }
  return null
};
var parseOffset_1 = parseOffset;

const local = guessTz_1();

//add all the city names by themselves
const cities = Object.keys(unpack).reduce((h, k) => {
  let city = k.split('/')[1] || '';
  city = city.replace(/_/g, ' ');
  h[city] = k;
  return h
}, {});

//try to match these against iana form
const normalize = tz => {
  tz = tz.replace(/ time/g, '');
  tz = tz.replace(/ (standard|daylight|summer)/g, '');
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
  tz = tz.replace(/\beuropean/g, 'europe');
  tz = tz.replace(/\islands/g, 'island');
  return tz
};

// try our best to reconcile the timzone to this given string
const lookupTz = (str, zones) => {
  if (!str) {
    return local
  }
  let tz = str.trim();
  let split = str.split('/');
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1];
  }
  tz = tz.toLowerCase();
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize(tz);
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //try city-names
  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz]
  }
  // //try to parse '-5h'
  if (/[0-9]/.test(tz) === true) {
    let id = parseOffset_1(tz);
    if (id) {
      return id
    }
  }

  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  )
};
var find = lookupTz;

let o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc
o.day = 8.64e7; //
o.date = o.day;
o.month = 8.64e7 * 29.5; //(average)
o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(k => {
  o[k + 's'] = o[k];
});
var milliseconds = o;

//basically, step-forward/backward until js Date object says we're there.
const walk = (s, n, fn, unit, previous) => {
  let current = s.d[fn]();
  if (current === n) {
    return //already there
  }
  let startUnit = previous === null ? null : s.d[previous]();
  let original = s.epoch;
  //try to get it as close as we can
  let diff = n - current;
  s.epoch += milliseconds[unit] * diff;

  //DST edge-case: if we are going many days, be a little conservative
  if (unit === 'day' && Math.abs(diff) > 28) {
    //but don't push it over a month
    if (n < 28) {
      s.epoch += milliseconds.hour;
    }
  }
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = milliseconds[unit] / 2;
  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  //oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original;
    // i mean, but make it close...
    s.epoch += milliseconds[unit] * diff * 0.97; // i guess?
  }
};
//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: n => n > -4000 && n < 4000,
    walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
  },
  month: {
    valid: n => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let d = s.d;
      let current = d.getMonth();
      let original = s.epoch;
      let startUnit = d.getYear();
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = n - current;
      s.epoch += milliseconds.day * (diff * 28); //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getYear()) {
        s.epoch = original;
      }
      //incriment by day
      while (s.d.getMonth() < n) {
        s.epoch += milliseconds.day;
      }
      while (s.d.getMonth() > n) {
        s.epoch -= milliseconds.day;
      }
    }
  },
  date: {
    valid: n => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
  },
  hour: {
    valid: n => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
  },
  minute: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
  },
  second: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: n => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};

const walkTo = (s, wants) => {
  let keys = Object.keys(units);
  let old = s.clone();
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === undefined) {
      n = old[k]();
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      s.epoch = null;
      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n);
      }
      return
    }
    // console.log(k, n)
    units[k].walkTo(s, n);
  }
  return
};

var walk_1 = walkTo;

let shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec'
];
let longMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function buildMapping() {
  const obj = {
    sep: 8 //support this format
  };
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i;
  }
  return obj
}

var months = {
  short: () => shortMonths,
  long: () => longMonths,
  mapping: () => buildMapping(),
  set: i18n => {
    shortMonths = i18n.short || shortMonths;
    longMonths = i18n.long || longMonths;
  }
};

//pull-apart ISO offsets, like "+0100"
const parseOffset$1 = (s, offset) => {
  if (!offset) {
    return s
  }
  //this is a fancy-move
  if (offset === 'Z') {
    offset = '+0000';
  }

  // according to ISO8601, tz could be hh:mm, hhmm or hh
  // so need few more steps before the calculation.
  let num = 0;

  // for (+-)hh:mm
  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    //support "+01:00"
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, '');
    }
    //support "+01:30"
    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, '.5');
    }
  }

  // for (+-)hhmm
  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, '.5');
  }

  num = parseFloat(offset);

  //divide by 100 or 10 - , "+0100", "+01"
  if (Math.abs(num) > 100) {
    num = num / 100;
  }
  //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }
  let tz = 'etc/gmt' + num;
  let zones = s.timezones;

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz;
  }
  return s
};
var parseOffset_1$1 = parseOffset$1;

const parseTime = (s, str = '') => {
  str = str.replace(/^\s+/, '').toLowerCase(); //trim
  //formal time formats - 04:30.23
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
  if (arr !== null) {
    //validate it a little
    let h = Number(arr[1]);
    if (h < 0 || h > 24) {
      return s.startOf('day')
    }
    let m = Number(arr[2]); //don't accept '5:3pm'
    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf('day')
    }
    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(arr[3] || 0);
    s = s.millisecond(arr[4] || 0);
    //parse-out am/pm
    let ampm = str.match(/[\b0-9](am|pm)\b/);
    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1]);
    }
    return s
  }
  //try an informal form - 5pm (no minutes)
  arr = str.match(/([0-9]+) ?(am|pm)/);
  if (arr !== null && arr[1]) {
    let h = Number(arr[1]);
    //validate it a little..
    if (h > 12 || h < 1) {
      return s.startOf('day')
    }
    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf('hour');
    return s
  }
  //no time info found, use start-of-day
  s = s.startOf('day');
  return s
};
var parseTime_1 = parseTime;

const monthLengths = [
  31, // January - 31 days
  28, // February - 28 days in a common year and 29 days in leap years
  31, // March - 31 days
  30, // April - 30 days
  31, // May - 31 days
  30, // June - 30 days
  31, // July - 31 days
  31, // August - 31 days
  30, // September - 30 days
  31, // October - 31 days
  30, // November - 30 days
  31 // December - 31 days
];
var monthLengths_1 = monthLengths;

const isLeapYear = fns.isLeapYear;

//given a month, return whether day number exists in it
const hasDate = obj => {
  //invalid values
  if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  let max = monthLengths_1[obj.month] || 0;
  if (obj.date <= max) {
    return true
  }
  return false
};
var hasDate_1 = hasDate;

const months$1 = months.mapping();





const parseYear = (str = '') => {
  //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
  let year = parseInt(str.trim(), 10);
  year = year || new Date().getFullYear();
  return year
};

const strFmt = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
    parse: (s, arr, givenTz, options) => {
      let month = parseInt(arr[2], 10) - 1;
      let obj = {
        year: arr[1],
        month,
        date: arr[3]
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      parseOffset_1$1(s, arr[5]);
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s
    }
  },
  //iso "2015-03-25" or "2015/03/25" //0-based-months!
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
    parse: (s, arr) => {
      let obj = {
        year: arr[1],
        month: parseInt(arr[2], 10) - 1,
        date: parseInt(arr[3], 10)
      };
      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10);
        obj.month = parseInt(arr[3], 10) - 1;
      }
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s);
      return s
    }
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10);
      if (month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        month = parseInt(arr[2], 10) - 1;
        date = parseInt(arr[1], 10);
      }
      let year = arr[3] || new Date().getFullYear();
      let obj = {
        year,
        month,
        date
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s);
      return s
    }
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
    parse: (s, arr) => {
      let month = months$1[arr[1].toLowerCase()];
      let year = parseYear(arr[3]);
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[2] || '')
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s
    }
  },
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months$1[arr[1].toLowerCase()];
      let year = parseYear(arr[2]);
      let obj = {
        year,
        month,
        date: 1
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months$1[arr[2].toLowerCase()];
      let year = parseYear(arr[3]);
      let obj = {
        year,
        month,
        date: fns.toCardinal(arr[1])
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s);
      return s
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}$/i,
    parse: (s, arr) => {
      let year = parseYear(arr[0]);
      let d = new Date();
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s);
      return s
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || '';
      //make negative-year
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
      //remove commas
      str = str.replace(/,/g, '');
      let year = parseInt(str.trim(), 10);
      let d = new Date();
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1(s, obj);
      s = parseTime_1(s);
      return s
    }
  }
];

var strParse = strFmt;

const dates = {
  now: s => {
    s.epoch = Date.now();
    return s
  },
  tonight: s => {
    s.epoch = Date.now();
    s = s.hour(18);
    return s
  },
  today: s => {
    s.epoch = Date.now();
    return s
  },
  tomorrow: s => {
    s.epoch = Date.now();
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s
  },
  yesterday: s => {
    s.epoch = Date.now();
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s
  },
  christmas: s => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25
    return s
  },
  'new years': s => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31
    return s
  }
};
dates['new years eve'] = dates['new years'];
var namedDates = dates;

//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const minimumEpoch = 2500000000;

const defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
};

//support [2016, 03, 01] format
const handleArray = (s, arr) => {
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (let i = 0; i < order.length; i++) {
    let num = arr[i] || defaults[order[i]] || 0;
    s = s[order[i]](num);
  }
  return s
};
//support {year:2016, month:3} format
const handleObject = (s, obj) => {
  obj = Object.assign({}, defaults, obj);
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i];
    //make sure we have this method
    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue
    }
    //make sure the value is a number
    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue
    }
    let num = obj[unit] || defaults[unit] || 0;
    s = s[unit](num);
  }
  return s
};

//find the epoch from different input styles
const parseInput = (s, input, givenTz) => {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }
    s.epoch = input;
    return s
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return s //k, we're good.
  }
  //support input of Date() object
  if (fns.isDate(input) === true) {
    s.epoch = input.getTime();
    return s
  }
  //support [2016, 03, 01] format
  if (fns.isArray(input) === true) {
    s = handleArray(s, input);
    return s
  }
  //support {year:2016, month:3} format
  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      s.tz = input.tz;
      return s
    }
    s = handleObject(s, input);
    return s
  }
  //input as a string..
  if (typeof input !== 'string') {
    return s
  }
  //little cleanup..
  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
  input = input.replace(/,/g, '');
  input = input.replace(/ +/g, ' ').trim();
  //try some known-words, like 'now'
  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s);
    return s
  }
  //try each text-parse template, use the first good result
  for (let i = 0; i < strParse.length; i++) {
    let m = input.match(strParse[i].reg);
    if (m) {
      s = strParse[i].parse(s, m, givenTz);
      return s
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'");
  }
  s.epoch = null;
  return s
};
var input = parseInput;

let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var days = {
  short: () => shortDays,
  long: () => longDays,
  set: i18n => {
    shortDays = i18n.short || shortDays;
    longDays = i18n.long || longDays;
  }
};

// create the timezone offset part of an iso timestamp
// it's kind of nuts how involved this is
// "+01:00", "+0100", or simply "+01"
const isoOffset = s => {
  let offset = s.timezone().current.offset;
  const isNegative = offset < 0;
  let minute = '00';
  //handle 5.5 → '5:30'
  if (Math.abs(offset % 1) === 0.5) {
    minute = '30';
    if (offset >= 0) {
      offset = Math.floor(offset);
    } else {
      offset = Math.ceil(offset);
    }
  }
  if (isNegative) {
    //handle negative sign
    offset *= -1;
    offset = fns.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns.zeroPad(offset, 2);
    offset = '+' + offset;
  }
  offset = offset + ':' + minute;
  //'Z' means 00
  if (offset === '+00:00') {
    offset = 'Z';
  }
  return offset
};

var _offset = isoOffset;

const format = {
  day: s => fns.titleCase(s.dayName()),
  'day-short': s => fns.titleCase(days.short()[s.day()]),
  'day-number': s => s.day(),
  'day-ordinal': s => fns.ordinal(s.day()),
  'day-pad': s => fns.zeroPad(s.day()),

  date: s => s.date(),
  'date-ordinal': s => fns.ordinal(s.date()),
  'date-pad': s => fns.zeroPad(s.date()),

  month: s => fns.titleCase(s.monthName()),
  'month-short': s => fns.titleCase(months.short()[s.month()]),
  'month-number': s => s.month(),
  'month-ordinal': s => fns.ordinal(s.month()),
  'month-pad': s => fns.zeroPad(s.month()),
  'iso-month': s => fns.zeroPad(s.month() + 1), //1-based months

  year: s => {
    let year = s.year();
    if (year > 0) {
      return year
    }
    year = Math.abs(year);
    return year + ' BC'
  },
  'year-short': s => {
    let year = s.year();
    if (year > 0) {
      return `'${String(s.year()).substr(2, 4)}`
    }
    year = Math.abs(year);
    return year + ' BC'
  },
  'iso-year': s => {
    let year = s.year();
    let isNegative = year < 0;
    let str = fns.zeroPad(Math.abs(year), 4); //0-padded
    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = fns.zeroPad(str, 6);
      str = '-' + str;
    }
    return str
  },

  time: s => s.time(),
  'time-24': s => `${s.hour24()}:${fns.zeroPad(s.minute())}`,
  hour: s => s.hour12(),
  'hour-pad': s => fns.zeroPad(s.hour12()),
  'hour-24': s => s.hour24(),
  'hour-24-pad': s => fns.zeroPad(s.hour24()),

  minute: s => s.minute(),
  'minute-pad': s => fns.zeroPad(s.minute()),
  second: s => s.second(),
  'second-pad': s => fns.zeroPad(s.second()),

  ampm: s => s.ampm(),
  quarter: s => 'Q' + s.quarter(),
  season: s => s.season(),
  era: s => s.era(),
  timezone: s => s.timezone().name,
  offset: s => _offset(s),

  numeric: s => `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': s => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': s => `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
  'mm/dd': s => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`, //mm/dd

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: s => {
    let year = s.format('iso-year');
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    let hour = fns.zeroPad(s.h24());
    let minute = fns.zeroPad(s.minute());
    let second = fns.zeroPad(s.second());
    let ms = fns.zeroPad(s.millisecond(), 3);
    let offset = _offset(s);
    return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}` //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': s => {
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    return `${s.year()}-${month}-${date}` //2017-02-15
  },
  'iso-utc': s => {
    return new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
  },

  //i made these up
  nice: s => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.time()}`,
  'nice-year': s => `${months.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.year()}`,
  'nice-day': s =>
    `${days.short()[s.day()]} ${fns.titleCase(months.short()[s.month()])} ${fns.ordinal(s.date())}`,
  'nice-full': s =>
    `${s.dayName()} ${fns.titleCase(s.monthName())} ${fns.ordinal(s.date())}, ${s.time()}`
};
//aliases
const aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  tz: 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'month-iso': 'iso-month',
  'year-iso': 'iso-year',
  'nice-short': 'nice',
  mdy: 'numeric-us',
  dmy: 'numeric-uk',
  ymd: 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
};
Object.keys(aliases).forEach(k => (format[k] = format[aliases[k]]));

const printFormat = (s, str = '') => {
  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return ''
  }
  //support .format('month')
  if (format.hasOwnProperty(str)) {
    let out = String(format[str](s) || '');
    if (str !== 'ampm') {
      out = fns.titleCase(out);
    }
    return out
  }
  //support '{hour}:{minute}' notation
  if (str.indexOf('{') !== -1) {
    let sections = /\{(.+?)\}/g;
    str = str.replace(sections, (_, fmt) => {
      fmt = fmt.toLowerCase().trim();
      if (format.hasOwnProperty(fmt)) {
        return String(format[fmt](s) || '')
      }
      return ''
    });
    return str
  }

  return s.format('iso-short')
};
var format_1 = printFormat;

const pad = fns.zeroPad;
const formatTimezone = fns.formatTimezone;
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: s => s.era(),
  GG: s => s.era(),
  GGG: s => s.era(),
  GGGG: s => (s.era() === 'AD' ? 'Anno Domini' : 'Before Christ'),
  //year
  y: s => s.year(),
  yy: s => {
    //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10)
  },
  yyy: s => s.year(),
  yyyy: s => s.year(),
  yyyyy: s => '0' + s.year(),
  // u: (s) => {},//extended non-gregorian years

  //quarter
  Q: s => s.quarter(),
  QQ: s => s.quarter(),
  QQQ: s => s.quarter(),
  QQQQ: s => s.quarter(),

  //month
  M: s => s.month() + 1,
  MM: s => pad(s.month() + 1),
  MMM: s => s.format('month-short'),
  MMMM: s => s.format('month'),

  //week
  w: s => s.week(),
  ww: s => pad(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: s => s.date(),
  dd: s => pad(s.date()),
  //date of year
  D: s => s.dayOfYear(),
  DD: s => pad(s.dayOfYear()),
  DDD: s => pad(s.dayOfYear(), 3),

  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day

  //day
  E: s => s.format('day-short'),
  EE: s => s.format('day-short'),
  EEE: s => s.format('day-short'),
  EEEE: s => s.format('day'),
  EEEEE: s => s.format('day')[0],
  e: s => s.day(),
  ee: s => s.day(),
  eee: s => s.format('day-short'),
  eeee: s => s.format('day'),
  eeeee: s => s.format('day')[0],

  //am/pm
  a: s => s.ampm().toUpperCase(),
  aa: s => s.ampm().toUpperCase(),
  aaa: s => s.ampm().toUpperCase(),
  aaaa: s => s.ampm().toUpperCase(),

  //hour
  h: s => s.h12(),
  hh: s => pad(s.h12()),
  H: s => s.hour(),
  HH: s => pad(s.hour()),
  // j: (s) => {},//weird hour format

  m: s => s.minute(),
  mm: s => pad(s.minute()),
  s: s => s.second(),
  ss: s => pad(s.second()),
  //milliseconds in the day
  A: s => s.epoch - s.startOf('day').epoch,
  //timezone
  z: s => s.timezone().name,
  zz: s => s.timezone().name,
  zzz: s => s.timezone().name,
  zzzz: s => s.timezone().name,
  Z: s => formatTimezone(s.timezone().current.offset),
  ZZ: s => formatTimezone(s.timezone().current.offset),
  ZZZ: s => formatTimezone(s.timezone().current.offset),
  ZZZZ: s => formatTimezone(s.timezone().current.offset, ':')
};

const addAlias = (char, to, n) => {
  let name = char;
  let toName = to;
  for (let i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += char;
    toName += to;
  }
};
addAlias('q', 'Q', 4);
addAlias('L', 'M', 4);
addAlias('Y', 'y', 4);
addAlias('c', 'e', 4);
addAlias('k', 'H', 2);
addAlias('K', 'h', 2);
addAlias('S', 's', 2);
addAlias('v', 'z', 4);
addAlias('V', 'Z', 4);

const unixFmt = (s, str) => {
  let chars = str.split('');
  //combine consecutive chars, like 'yyyy' as one.
  let arr = [chars[0]];
  let quoteOn = false;
  for (let i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === `'`) {
      quoteOn = !quoteOn;
      //support '', meaning one tick
      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue
      }
    }
    //merge it with the last one
    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || '';
    } else {
      txt += c;
    }
    return txt
  }, '')
};
var unixFmt_1 = unixFmt;

const units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

const doUnit = function(s, k) {
  let start = s.clone().startOf(k);
  let end = s.clone().endOf(k);
  let duration = end.epoch - start.epoch;
  let percent = (s.epoch - start.epoch) / duration;
  return parseFloat(percent.toFixed(2))
};

//how far it is along, from 0-1
const progress = (s, unit) => {
  if (unit) {
    unit = fns.normalize(unit);
    return doUnit(s, unit)
  }
  let obj = {};
  units$1.forEach(k => {
    obj[k] = doUnit(s, k);
  });
  return obj
};

var progress_1 = progress;

//round to either current, or +1 of this unit
const nearest = (s, unit) => {
  //how far have we gone?
  let prog = s.progress();
  unit = fns.normalize(unit);
  //fix camel-case for this one
  if (unit === 'quarterhour') {
    unit = 'quarterHour';
  }
  if (prog[unit] !== undefined) {
    // go forward one?
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }
    // go to start
    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }
  return s
};
var nearest_1 = nearest;

//increment until dates are the same
const climb = (a, b, unit) => {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  }
  //oops, we went too-far..
  if (a.isAfter(b, unit)) {
    i -= 1;
  }
  return i
};

// do a thurough +=1 on the unit, until they match
// for speed-reasons, only used on day, month, week.
const diffOne = (a, b, unit) => {
  if (a.isBefore(b)) {
    return climb(a, b, unit)
  } else {
    return climb(b, a, unit) * -1 //reverse it
  }
};

var one = diffOne;

// don't do anything too fancy here.
// 2020 - 2019 may be 1 year, or 0 years
// - '1 year difference' means 366 days during a leap year
const fastYear = (a, b) => {
  let years = b.year() - a.year();
  // should we decrement it by 1?
  a = a.year(b.year());
  if (a.isAfter(b)) {
    years -= 1;
  }
  return years
};

// use a waterfall-method for computing a diff of any 'pre-knowable' units
// compute years, then compute months, etc..
// ... then ms-math for any very-small units
const diff = function(a, b) {
  // an hour is always the same # of milliseconds
  // so these units can be 'pre-calculated'
  let msDiff = b.epoch - a.epoch;
  let obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);

  //do the year
  let tmp = a.clone();
  obj.years = fastYear(tmp, b);
  tmp = a.add(obj.years, 'year');

  //there's always 12 months in a year...
  obj.months = obj.years * 12;
  tmp = a.add(obj.months, 'month');
  obj.months += one(tmp, b, 'month');

  // there's always atleast 52 weeks in a year..
  // (month * 4) isn't as close
  obj.weeks = obj.years * 52;
  tmp = a.add(obj.weeks, 'week');
  obj.weeks += one(tmp, b, 'week');

  // there's always atleast 7 days in a week
  obj.days = obj.weeks * 7;
  tmp = a.add(obj.days, 'day');
  obj.days += one(tmp, b, 'day');

  return obj
};
var waterfall = diff;

const reverseDiff = function(obj) {
  Object.keys(obj).forEach(k => {
    obj[k] *= -1;
  });
  return obj
};

// this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year
const main = function(a, b, unit) {
  b = fns.beADate(b, a);
  //reverse values, if necessary
  let reversed = false;
  if (a.isAfter(b)) {
    let tmp = a;
    a = b;
    b = tmp;
    reversed = true;
  }
  //compute them all (i know!)
  let obj = waterfall(a, b);
  if (reversed) {
    obj = reverseDiff(obj);
  }
  //return just the requested unit
  if (unit) {
    //make sure it's plural-form
    unit = fns.normalize(unit);
    if (/s$/.test(unit) !== true) {
      unit += 's';
    }
    if (unit === 'dates') {
      unit = 'days';
    }
    return obj[unit]
  }
  return obj
};

var diff$1 = main;

//by spencermountain + Shaun Grady

//our conceptual 'break-points' for each unit
const qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
};

//get number of hours/minutes... between the two dates
function getDiff(a, b) {
  const isBefore = a.isBefore(b);
  const later = isBefore ? b : a;
  let earlier = isBefore ? a : b;
  earlier = earlier.clone();
  const diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff).forEach(unit => {
    if (earlier.isSame(later, unit)) {
      return
    }
    let max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff[unit] = max;
  });

  //reverse it, if necessary
  if (isBefore) {
    Object.keys(diff).forEach(u => {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }
  return diff
}

// Expects a plural unit arg
function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }
  return value + ' ' + unit
}

//create the human-readable diff between the two dates
const since = (start, end) => {
  end = fns.beADate(end, start);
  const diff = getDiff(start, end);
  const isNow = Object.keys(diff).every(u => !diff[u]);
  if (isNow === true) {
    return {
      diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    }
  }
  let rounded;
  let qualified;
  let precise;
  let englishValues = [];

  //go through each value and create its text-representation
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit]);
    if (value === 0) {
      return
    }
    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = qualified = englishValue;
      if (i > 4) {
        return
      }
      //is it a 'almost' something, etc?
      const nextUnit = units[i + 1];
      const nextValue = Math.abs(diff[nextUnit]);
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
    }
  });
  //make them into a string
  precise = englishValues.splice(0, 2).join(', ');
  //handle before/after logic
  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }
  return {
    diff,
    rounded,
    qualified,
    precise
  }
};

var since_1 = since;

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
var seasons = {
  north: [
    ['spring', 2, 1], //spring march 1
    ['summer', 5, 1], //june 1
    ['fall', 8, 1], //sept 1
    ['autumn', 8, 1], //sept 1
    ['winter', 11, 1] //dec 1
  ],
  south: [
    ['fall', 2, 1], //march 1
    ['autumn', 2, 1], //march 1
    ['winter', 5, 1], //june 1
    ['spring', 8, 1], //sept 1
    ['summer', 11, 1] //dec 1
  ]
};

var quarters = [
  null,
  [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1] //oct 1
];

const units$2 = {
  minute: s => {
    walk_1(s, {
      second: 0,
      millisecond: 0
    });
    return s
  },
  quarterhour: s => {
    let minute = s.minutes();
    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }
    walk_1(s, {
      second: 0,
      millisecond: 0
    });
    return s
  },
  hour: s => {
    walk_1(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  day: s => {
    walk_1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  week: s => {
    let original = s.clone();
    s = s.day(s._weekStart); //monday
    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }
    walk_1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  month: s => {
    walk_1(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  quarter: s => {
    let q = s.quarter();
    if (quarters[q]) {
      walk_1(s, {
        month: quarters[q][0],
        date: quarters[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    return s
  },
  season: s => {
    let current = s.season();
    let hem = 'north';
    if (s.hemisphere() === 'South') {
      hem = 'south';
    }
    for (let i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        //winter goes between years
        let year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walk_1(s, {
          year,
          month: seasons[hem][i][1],
          date: seasons[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s
      }
    }
    return s
  },
  year: s => {
    walk_1(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  decade: s => {
    s = s.startOf('year');
    let year = s.year();
    let decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s
  },
  century: s => {
    s = s.startOf('year');
    let year = s.year();
    let decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s
  }
};
units$2.date = units$2.day;

const startOf = (a, unit) => {
  let s = a.clone();
  unit = fns.normalize(unit);
  if (units$2[unit]) {
    return units$2[unit](s)
  }
  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units$2.season(s)
  }
  return s
};

//piggy-backs off startOf
const endOf = (a, unit) => {
  let s = a.clone();
  unit = fns.normalize(unit);
  if (units$2[unit]) {
    s = units$2[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s
  }
  return s
};
var startOf_1 = {
  startOf,
  endOf
};

//is it 'wednesday'?
const isDay = function(unit) {
  if (days.short().find(s => s === unit)) {
    return true
  }
  if (days.long().find(s => s === unit)) {
    return true
  }
  return false
};

// return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input
const every = function(start, unit = '', end) {
  if (!unit || !end) {
    return []
  }
  //cleanup unit param
  unit = fns.normalize(unit);
  //cleanup to param
  end = start.clone().set(end);
  //swap them, if they're backwards
  if (start.isAfter(end)) {
    let tmp = start;
    start = end;
    end = tmp;
  }

  //support 'every wednesday'
  let d = start.clone();
  if (isDay(unit)) {
    d = d.next(unit);
    unit = 'week';
  } else {
    d = d.next(unit);
  }
  //okay, actually start doing it
  let result = [];
  while (d.isBefore(end)) {
    result.push(d);
    d = d.add(1, unit);
  }
  return result
};
var every_1 = every;

const parseDst = dst => {
  if (!dst) {
    return []
  }
  return dst.split('->')
};

const titleCase = str => {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/\/gmt/, '/GMT');
  str = str.replace(/[\/_]([a-z])/gi, s => {
    return s.toUpperCase()
  });
  return str
};

//get metadata about this timezone
const timezone = s => {
  let zones = s.timezones;
  let tz = s.tz;
  if (zones.hasOwnProperty(tz) === false) {
    tz = find(s.tz, zones);
  }
  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }
    return {
      current: {
        epochShift: 0
      }
    }
  }
  let found = zones[tz];
  let result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  };

  if (result.hasDst) {
    let arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = found.offset; // (july)
  let winter = summer; // (january) assume it's the same for now
  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = found.offset + 1;
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
  }
  return result
};
var timezone_1 = timezone;

//the spacetime instance methods (also, the API)
const methods = {
  set: function(input$1, tz) {
    let s = this.clone();
    s = input(s, input$1);
    if (tz) {
      this.tz = find(tz);
    }
    return s
  },
  timezone: function() {
    return timezone_1(this)
  },
  isDST: function() {
    return timezone_1(this).current.isDST
  },
  hasDST: function() {
    return timezone_1(this).hasDst
  },
  offset: function() {
    return timezone_1(this).current.offset * 60
  },
  hemisphere: function() {
    return timezone_1(this).hemisphere
  },
  format: function(fmt) {
    return format_1(this, fmt)
  },
  unixFmt: function(fmt) {
    return unixFmt_1(this, fmt)
  },
  startOf: function(unit) {
    return startOf_1.startOf(this, unit)
  },
  endOf: function(unit) {
    return startOf_1.endOf(this, unit)
  },
  leapYear: function() {
    let year = this.year();
    return fns.isLeapYear(year)
  },
  progress: function(unit) {
    return progress_1(this, unit)
  },
  nearest: function(unit) {
    return nearest_1(this, unit)
  },
  diff: function(d, unit) {
    return diff$1(this, d, unit)
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set();
    }
    return since_1(this, d)
  },
  next: function(unit) {
    let s = this.add(1, unit);
    return s.startOf(unit)
  },
  //the start of the previous year/week/century
  last: function(unit) {
    let s = this.subtract(1, unit);
    return s.startOf(unit)
  },
  isValid: function() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto: function(tz) {
    let s = this.clone();
    s.tz = find(tz, s.timezones); //science!
    return s
  },
  //get each week/month/day between a -> b
  every: function(unit, to) {
    return every_1(this, unit, to)
  },
  isAwake: function() {
    let hour = this.hour();
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function() {
    return !this.isAwake()
  },
  //pretty-printing
  log: function() {
    console.log('');
    console.log(format_1(this, 'nice-short'));
    return this
  },
  logYear: function() {
    console.log('');
    console.log(format_1(this, 'full-short'));
    return this
  },
  debug: function() {
    let tz = this.timezone();
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this
  },
  //alias of 'since' but opposite - like moment.js
  from: function(d) {
    d = this.clone().set(d);
    return d.since(this)
  },
  fromNow: function() {
    let d = this.clone().set(Date.now());
    return d.since(this)
  },
  weekStart: function(input) {
    //accept a number directly
    if (typeof input === 'number') {
      this._weekStart = input;
      return this
    }
    if (typeof input === 'string') {
      // accept 'wednesday'
      input = input.toLowerCase().trim();
      let num = days.short().indexOf(input);
      if (num === -1) {
        num = days.long().indexOf(input);
      }
      if (num === -1) {
        num = 1; //go back to default
      }
      this._weekStart = num;
    } else {
      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
    }
    return this
  }
};
// aliases
methods.inDST = methods.isDST;
methods.round = methods.nearest;
methods.each = methods.every;
var methods_1 = methods;

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.





const validate = n => {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  return n
};

const order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

//reduce hostile micro-changes when moving dates by millisecond
const confirm = (s, tmp, unit) => {
  let n = order.indexOf(unit);
  let arr = order.slice(n, order.length);
  for (let i = 0; i < arr.length; i++) {
    let want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s
};

var set = {
  milliseconds: (s, n) => {
    n = validate(n);
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff
  },

  seconds: (s, n) => {
    n = validate(n);
    let diff = s.second() - n;
    let shift = diff * milliseconds.second;
    return s.epoch - shift
  },

  minutes: (s, n) => {
    n = validate(n);
    let old = s.clone();
    let diff = s.minute() - n;
    let shift = diff * milliseconds.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch
  },

  hours: (s, n) => {
    n = validate(n);
    if (n >= 24) {
      n = 24;
    } else if (n < 0) {
      n = 0;
    }
    let old = s.clone();
    let diff = s.hour() - n;
    let shift = diff * milliseconds.hour;
    s.epoch -= shift;
    walk_1(s, {
      hour: n
    });
    confirm(s, old, 'minute');
    return s.epoch
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: (s, str) => {
    let m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);
    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);
      if (!m) {
        return s.epoch
      }
      m.splice(2, 0, '0'); //add implicit 0 minutes
    }
    let h24 = false;
    let hour = parseInt(m[1], 10);
    let minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    //make the hour into proper 24h time
    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }
      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }
    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch
  },

  date: (s, n) => {
    n = validate(n);
    //avoid setting february 31st
    if (n > 28) {
      const max = monthLengths_1[s.month()];
      if (n > max) {
        n = max;
      }
    }
    //avoid setting < 0
    if (n <= 0) {
      n = 1;
    }
    walk_1(s, {
      date: n
    });
    return s.epoch
  },

  //this one's tricky
  month: (s, n) => {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }
    n = validate(n);
    //don't go past december
    if (n >= 12) {
      n = 11;
    }
    if (n <= 0) {
      n = 0;
    }

    let date = s.date();
    //there's no 30th of february, etc.
    if (date > monthLengths_1[n]) {
      //make it as close as we can..
      date = monthLengths_1[n];
    }
    walk_1(s, {
      month: n,
      date
    });
    return s.epoch
  },

  year: (s, n) => {
    n = validate(n);
    walk_1(s, {
      year: n
    });
    return s.epoch
  },

  dayOfYear: (s, n) => {
    n = validate(n);
    let old = s.clone();
    n -= 1; //days are 1-based
    if (n <= 0) {
      n = 0;
    } else if (n >= 365) {
      n = 364;
    }
    s = s.startOf('year');
    s = s.add(n, 'day');
    confirm(s, old, 'hour');
    return s.epoch
  }
};

const methods$1 = {
  millisecond: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.milliseconds(s, num);
      return s
    }
    return this.d.getMilliseconds()
  },
  second: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.seconds(s, num);
      return s
    }
    return this.d.getSeconds()
  },
  minute: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.minutes(s, num);
      return s
    }
    return this.d.getMinutes()
  },
  hour: function(num) {
    let d = this.d;
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.hours(s, num);
      return s
    }
    return d.getHours()
  },

  //'3:30' is 3.5
  hourFloat: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      let minute = num % 1;
      minute = minute * 60;
      let hour = parseInt(num, 10);
      s.epoch = set.hours(s, hour);
      s.epoch = set.minutes(s, minute);
      return s
    }
    let d = this.d;
    let hour = d.getHours();
    let minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute
  },

  // hour in 12h format
  hour12: function(str) {
    let d = this.d;
    if (str !== undefined) {
      let s = this.clone();
      str = '' + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        s.epoch = set.hours(s, hour);
      }
      return s
    }
    //get the hour
    let hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12
  },

  //some ambiguity here with 12/24h
  time: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      s.epoch = set.time(s, str);
      return s
    }
    return `${this.h12()}:${fns.zeroPad(this.minute())}${this.ampm()}`
  },

  // either 'am' or 'pm'
  ampm: function(input) {
    let which = 'am';
    let hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (typeof input !== 'string') {
      return which
    }
    //okay, we're doing a setter
    let s = this.clone();
    input = input.toLowerCase().trim();
    //ampm should never change the day
    // - so use `.hour(n)` instead of `.minus(12,'hour')`
    if (hour >= 12 && input === 'am') {
      //noon is 12pm
      hour -= 12;
      return s.hour(hour)
    }
    if (hour < 12 && input === 'pm') {
      hour += 12;
      return s.hour(hour)
    }
    return s
  },

  //some hard-coded times of day, like 'noon'
  dayTime: function(str) {
    if (str !== undefined) {
      const times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      };
      let s = this.clone();
      str = str || '';
      str = str.toLowerCase();
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }
      return s
    }
    let h = this.hour();
    if (h < 6) {
      return 'night'
    }
    if (h < 12) {
      //until noon
      return 'morning'
    }
    if (h < 17) {
      //until 5pm
      return 'afternoon'
    }
    if (h < 22) {
      //until 10pm
      return 'evening'
    }
    return 'night'
  },

  //parse a proper iso string
  iso: function(num) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso')
  }
};
var _01Time = methods$1;

const methods$2 = {
  // # day in the month
  date: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.date(s, num);
      return s
    }
    return this.d.getDate()
  },

  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay()
    }
    let original = this.clone();
    let want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short().indexOf(input);
      if (want === -1) {
        want = days.long().indexOf(input);
      }
    }
    //move approx
    let day = this.d.getDay();
    let diff = day - want;
    let s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walk_1(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long()[this.day()]
    }
    let s = this.clone();
    s = s.day(input);
    return s
  },

  //either name or number
  month: function(input) {
    if (input !== undefined) {
      let s = this.clone();
      s.epoch = set.month(s, input);
      return s
    }
    return this.d.getMonth()
  }
};
var _02Date = methods$2;

const clearMinutes = s => {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s
};

const methods$3 = {
  // day 0-366
  dayOfYear: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.dayOfYear(s, num);
      return s
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0;
    let month = this.d.getMonth();
    let tmp;
    //count the num days in each month
    for (let i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years
      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month
      sum += tmp.getDate();
    }
    return sum + this.d.getDate()
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes(s);
      //don't go into last-year
      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }
      num -= 1; //1-based
      s = s.add(num, 'weeks');
      return s
    }
    //find-out which week it is
    let tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    }
    const thisOne = this.epoch;
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1
    }
    //speed it up, if we can
    let i = 0;
    let skipWeeks = this.month() * 4;
    tmp.epoch += milliseconds.week * skipWeeks;
    i += skipWeeks;
    for (; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i
      }
      tmp = tmp.add(1, 'week');
    }
    return 52
  },

  //'january'
  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()]
    }
    let s = this.clone();
    s = s.month(input);
    return s
  },

  //q1, q2, q3, q4
  quarter: function(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }
      if (quarters[num]) {
        let s = this.clone();
        let month = quarters[num][0];
        s = s.month(month);
        s = s.date(1);
        s = s.startOf('day');
        return s
      }
    }
    let month = this.d.getMonth();
    for (let i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1
      }
    }
    return 4
  },

  //spring, summer, winter, fall
  season: function(input) {
    let hem = 'north';
    if (this.hemisphere() === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      let s = this.clone();
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day');
        }
      }
      return s
    }
    let month = this.d.getMonth();
    for (let i = 0; i < seasons[hem].length - 1; i++) {
      if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
        return seasons[hem][i][0]
      }
    }
    return 'winter'
  },

  //the year number
  year: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set.year(s, num);
      return s
    }
    return this.d.getFullYear()
  },

  //bc/ad years
  era: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      str = str.toLowerCase();
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = s.d.getFullYear();
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        s.epoch = set.year(s, year * -1);
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        s.epoch = set.year(s, year * -1);
      }
      return s
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  }
};
var _03Year = methods$3;

const methods$4 = Object.assign({}, _01Time, _02Date, _03Year);

//aliases
methods$4.milliseconds = methods$4.millisecond;
methods$4.seconds = methods$4.second;
methods$4.minutes = methods$4.minute;
methods$4.hours = methods$4.hour;
methods$4.hour24 = methods$4.hour;
methods$4.h12 = methods$4.hour12;
methods$4.h24 = methods$4.hour24;
methods$4.days = methods$4.day;

const addMethods = Space => {
  //hook the methods into prototype
  Object.keys(methods$4).forEach(k => {
    Space.prototype[k] = methods$4[k];
  });
};

var query = addMethods;

const order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
let keep = {
  second: order$1.slice(0, 1),
  minute: order$1.slice(0, 2),
  quarterhour: order$1.slice(0, 2),
  hour: order$1.slice(0, 3),
  date: order$1.slice(0, 4),
  month: order$1.slice(0, 4),
  quarter: order$1.slice(0, 4),
  season: order$1.slice(0, 4),
  year: order$1,
  decade: order$1,
  century: order$1
};
keep.week = keep.hour;
keep.season = keep.date;
keep.quarter = keep.date;

// Units need to be dst adjuested
const dstAwareUnits = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  day: true
};

const keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
//month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough
const rollMonth = (want, old) => {
  //increment year
  if (want.month > 0) {
    let years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    let years = Math.floor(Math.abs(want.month) / 13, 10);
    years = Math.abs(years) + 1;
    want.year = old.year() - years;
    //ignore extras
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want
};

const addMethods$1 = SpaceTime => {
  SpaceTime.prototype.add = function(num, unit) {
    let s = this.clone();
    if (!unit || num === 0) {
      return s //don't bother
    }
    let old = this.clone();
    unit = fns.normalize(unit);
    //move forward by the estimated milliseconds (rough)
    if (milliseconds[unit]) {
      s.epoch += milliseconds[unit] * num;
    } else if (unit === 'week') {
      s.epoch += milliseconds.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += milliseconds.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += milliseconds.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += milliseconds.minute * 15 * num;
    }
    //now ensure our milliseconds/etc are in-line
    let want = {};
    if (keep[unit]) {
      keep[unit].forEach(u => {
        want[u] = old[u]();
      });
    }

    if (dstAwareUnits[unit]) {
      const diff = old.timezone().current.offset - s.timezone().current.offset;
      s.epoch += diff * 3600 * 1000;
    }

    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num;
      //month is the one unit we 'model' directly
      want = rollMonth(want, old);
    }
    //support coercing a week, too
    if (unit === 'week') {
      let sum = old.date() + num * 7;
      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    }
    //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
      //specify a naive date number, if it's easy to do...
      let sum = old.date() + num;
      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
      //or if we haven't moved at all..
      else if (num !== 0 && old.isSame(s, 'day')) {
        want.date = old.date() + num;
      }
    }
    //ensure year has changed (leap-years)
    else if (unit === 'year' && s.year() === old.year()) {
      s.epoch += milliseconds.week;
    }
    //these are easier
    else if (unit === 'decade') {
      want.year = s.year() + 10;
    } else if (unit === 'century') {
      want.year = s.year() + 100;
    }
    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      let max = monthLengths_1[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    walk_1(s, want);
    return s
  };

  //subtract is only add *-1
  SpaceTime.prototype.subtract = function(num, unit) {
    let s = this.clone();
    return s.add(num * -1, unit)
  };
  //add aliases
  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

var add = addMethods$1;

//make a string, for easy comparison between dates
const print = {
  millisecond: s => {
    return s.epoch
  },
  second: s => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-')
  },
  minute: s => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-')
  },
  hour: s => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-')
  },
  day: s => {
    return [s.year(), s.month(), s.date()].join('-')
  },
  week: s => {
    return [s.year(), s.week()].join('-')
  },
  month: s => {
    return [s.year(), s.month()].join('-')
  },
  quarter: s => {
    return [s.year(), s.quarter()].join('-')
  },
  year: s => {
    return s.year()
  }
};
print.date = print.day;

const addMethods$2 = SpaceTime => {
  SpaceTime.prototype.isSame = function(b, unit) {
    let a = this;
    if (!unit) {
      return null
    }
    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    }
    //support 'seconds' aswell as 'second'
    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b)
    }
    return null
  };
};

var same = addMethods$2;

const addMethods$3 = SpaceTime => {
  const methods = {
    isAfter: function(d) {
      d = fns.beADate(d, this);
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch > epoch
    },
    isBefore: function(d) {
      d = fns.beADate(d, this);
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch < epoch
    },
    isEqual: function(d) {
      d = fns.beADate(d, this);
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch === epoch
    },
    isBetween: function(start, end) {
      start = fns.beADate(start, this);
      end = fns.beADate(end, this);
      let startEpoch = fns.getEpoch(start);
      if (startEpoch === null) {
        return null
      }
      let endEpoch = fns.getEpoch(end);
      if (endEpoch === null) {
        return null
      }
      return startEpoch < this.epoch && this.epoch < endEpoch
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

var compare = addMethods$3;

const addMethods$4 = SpaceTime => {
  const methods = {
    i18n: data => {
      //change the day names
      if (fns.isObject(data.days)) {
        days.set(data.days);
      }
      //change the month names
      if (fns.isObject(data.months)) {
        months.set(data.months);
      }
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

var i18n = addMethods$4;

let timezones = unpack;

//fake timezone-support, for fakers (es5 class)
const SpaceTime = function(input$1, tz, options = {}) {
  //the holy moment
  this.epoch = null;
  //the shift for the given timezone
  this.tz = find(tz, timezones);
  //whether to output warnings to console
  this.silent = options.silent || true;

  //does the week start on sunday, or monday:
  this._weekStart = 1; //default to monday
  if (options.weekStart !== undefined) {
    this._weekStart = options.weekStart;
  }
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let offset = quick(this);
      //every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0;
      //movement
      let shift = bias + offset * 60; //in minutes
      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset
      let epoch = this.epoch + shift;
      let d = new Date(epoch);
      return d
    }
  });
  //add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: () => timezones,
    set: obj => {
      timezones = obj;
      return obj
    }
  });
  //parse the various formats
  if (input$1 !== undefined || input$1 === null) {
    let tmp = input(this, input$1, tz);
    this.epoch = tmp.epoch;
  }
};

//(add instance methods to prototype)
Object.keys(methods_1).forEach(k => {
  SpaceTime.prototype[k] = methods_1[k];
});

// ¯\_(ツ)_/¯
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent,
    weekStart: this._weekStart
  })
};

//append more methods
query(SpaceTime);
add(SpaceTime);
same(SpaceTime);
compare(SpaceTime);
i18n(SpaceTime);

var spacetime = SpaceTime;

// const timezones = require('../data');

const whereIts = (a, b) => {
  let start = new spacetime(null);
  let end = new spacetime(null);
  start = start.time(a);
  //if b is undefined, use as 'within one hour'
  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  let startHour = start.hour();
  let endHour = end.hour();
  let tzs = Object.keys(start.timezones).filter(tz => {
    if (tz.indexOf('/') === -1) {
      return false
    }
    let m = new spacetime(null, tz);
    let hour = m.hour();
    //do 'calendar-compare' not real-time-compare
    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false
      }
      if (hour === endHour && m.minute() > end.minute()) {
        return false
      }
      return true
    }
    return false
  });
  return tzs
};
var whereIts_1 = whereIts;

var _version = '6.0.0';

const main$1 = (input, tz, options) => new spacetime(input, tz, options);

//some helper functions on the main method
main$1.now = (tz, options) => new spacetime(new Date().getTime(), tz, options);
main$1.today = (tz, options) => {
  let s = new spacetime(new Date().getTime(), tz, options);
  return s.startOf('day')
};
main$1.tomorrow = (tz, options) => {
  let s = new spacetime(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day')
};
main$1.yesterday = (tz, options) => {
  let s = new spacetime(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day')
};
main$1.extend = function(obj) {
  Object.keys(obj).forEach(k => {
    spacetime.prototype[k] = obj[k];
  });
  return this
};
//find tz by time
main$1.whereIts = whereIts_1;
main$1.version = _version;

//aliases:
main$1.plugin = main$1.extend;
var src = main$1;

var spacetime$1 = /*#__PURE__*/Object.freeze({
	'default': src
});

var spacetime$2 = getCjsExportFromNamespace(spacetime$1);

//
const parse = function(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      value: str
    }
  }
  //support pixels
  if (/[0-9]px$/.test(str)) {
    return {
      type: 'pixel',
      value: Number(str.replace(/px/, ''))
    }
  }
  //support percentages
  if (/[0-9]%$/.test(str)) {
    let num = Number(str.replace(/%/, ''));
    return {
      type: 'percent',
      value: num
    }
  }
  //try a straight-up number
  let num = Number(str);
  if (!isNaN(num)) {
    return {
      type: 'number',
      value: num
    }
  }
  //try a date
  let s = spacetime$2(str);
  if (s.isValid()) {
    return {
      type: 'date',
      value: s.epoch
    }
  }
  console.warn("Counldn't parse: " + str);
  return {
    type: 'unknown',
    value: null
  }
};

const parseX = function(str, world) {
  let res = parse(str);
  if (res.type === 'date') {
    world.x.format(res.type);
  }
  return res
};

const parseY = function(str, world) {
  let res = parse(str);
  if (res.type === 'date') {
    world.y.format(res.type);
  }
  return res
};

var parse_1 = {
  parseX: parseX,
  parseY: parseY
};

const extent = function(arr) {
  let min = null;
  let max = null;
  arr.forEach(a => {
    if (min === null || a < min) {
      min = a;
    }
    if (max === null || a > max) {
      max = a;
    }
  });
  return {
    min: min,
    max: max
  }
};

/* eslint no-bitwise: 0 */
//may need to change when the term really-transforms? not sure.
const uid = str => {
  let nums = '';
  for (let i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10);
  }
  return str + '-' + nums
};

var _fns = {
  extent: extent,
  uid: uid
};

const { parseX: parseX$1, parseY: parseY$1 } = parse_1;


const has = function(x) {
  return x !== undefined && x !== null
};

let methods$5 = {
  //add new minimums
  from: function(x, y) {
    if (has(x) === true) {
      x = parseX$1(x, this);

      this.x.min = x;
      this.x.rescale();
    }
    if (has(y) === true) {
      y = parseY$1(y, this).value;
      this.y.min = y;
      this.y.rescale();
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parseX$1(x, this).value;
      this.c.max = x;
      this.c.rescale();
    }
    if (has(y) === true) {
      y = parseX$1(y, this).value;
      this.y.max = y;
      this.y.rescale();
    }
    return this
  },

  fitX: function(x) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null);
    let minX = _fns.extent(arr.map(o => o.x.min).filter(n => n !== null)).min || 0;
    let maxX = _fns.extent(arr.map(o => o.x.max).filter(n => n !== null)).max || 0;
    //keep graphs from 0, if you can...
    this.x.min = minX > 0 ? 0 : minX;
    this.x.max = maxX;
    if (this.x.format() === 'date') {
      this.x.min = minX;
      this.x.max = maxX;
    }
    this.x.rescale();
    if (has(x) === true) {
      x = parseX$1(x, this).value;
      if (x > this.x.max) {
        this.x.max = x;
      } else if (x < this.x.min) {
        this.x.min = x;
      }
      this.x.rescale();
    }
    return this
  },
  fitY: function(y) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null);
    let minY = _fns.extent(arr.map(o => o.y.min).filter(n => n !== null)).min || 0;
    let maxY = _fns.extent(arr.map(o => o.y.max).filter(n => n !== null)).max || 0;
    this.y.min = minY > 0 ? 0 : minY;
    this.y.max = maxY;
    if (this.y.format() === 'date') {
      this.y.min = minY;
      this.y.max = maxY;
    }
    this.y.rescale();
    if (has(y) === true) {
      y = parseY$1(y, this).value;
      if (y > this.y.max) {
        this.y.max = y;
      } else if (y < this.y.min) {
        this.y.min = y;
      }
      this.y.rescale();
    }
    return this
  },

  fit: function(x, y) {
    this.fitX(x);
    this.fitY(y);
    return this
  }
};
var methods_1$1 = methods$5;

//remove shapes outside of boundaries
const clipShapes = function(shapes, xScale, yScale) {
  shapes = shapes.filter(s => {
    //ignore
    if (s.ignore_clip === true) {
      return true
    }
    let { x, y } = s.extent();
    //clip according to x-axis
    if (xScale._clip) {
      //support reversed min/max values
      let min = xScale.min;
      let max = xScale.max;
      if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
      }
      if (x.min < min) {
        return false
      }
      if (x.max > max) {
        return false
      }
      if (x.min > max || x.max < min) {
        return false
      }
    }
    if (yScale._clip) {
      //support reversed min/max values
      let min = yScale.min;
      let max = yScale.max;
      if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
      }
      if (y.min < min) {
        return false
      }
      if (y.max > max) {
        return false
      }
      if (y.min > max || y.max < min) {
        return false
      }
    }
    return true
  });

  return shapes
};
var _clip = clipShapes;

//a very-tiny version of d3-scale's scaleLinear
const scaleLinear = function(obj) {
  let world = obj.world || [];
  let minmax = obj.minmax || [];
  const calc = num => {
    let range = minmax[1] - minmax[0];
    let percent = (num - minmax[0]) / range;
    let size = world[1] - world[0];
    return parseInt(size * percent, 10)
  };
  return calc
};
var _linear = scaleLinear;

// const scaleLinear = require('d3-scale').scaleLinear

const { parseX: parseX$2 } = parse_1;

const has$1 = function(x) {
  return x !== undefined && x !== null
};

class Scale {
  constructor(data, world) {
    this.world = world;
    this.min = 0;
    this.max = 1;

    this.from = 0;
    this.to = world.width;

    this._format = 'number';
    this.parse = parseX$2;
    this.is_y = false;
    this._clip = false;
    this.rescale();
  }
  rescale() {
    this.scale = _linear({
      world: [this.from, this.to],
      minmax: [this.min, this.max]
    });
    return this
  }
  fit(a, b) {
    if (has$1(a) === false && has$1(b) === false) {
      if (this.is_y) {
        this.world.fitY();
      } else {
        this.world.fitX();
      }
      this.rescale();
      return this
    }
    if (has$1(a) === true) {
      let num = this.parse(a, this.world).value;
      this.min = num;
    }
    if (has$1(b) === true) {
      let num = this.parse(b, this.world).value;
      this.max = num;
    }
    this.rescale();
    return this
  }
  place(obj) {
    //from=top
    //to=bottom
    if (obj.type === 'pixel') {
      if (this.is_y) {
        return this.to - obj.value //flip grid
      }
      return obj.value
    }
    if (obj.type === 'percent') {
      let num = this.byPercent(obj.value);
      return this.scale(num)
    }
    return this.scale(obj.value)
  }
  byPercent(num = 0) {
    num = num / 100;
    let diff = this.max - this.min;
    return diff * num + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    this._format = format;
    return this
  }
  clip(bool) {
    if (bool === undefined) {
      bool = true;
    }
    this._clip = bool;
  }
  reverse() {
    let tmp = this.min;
    this.min = this.max;
    this.max = tmp;
    this.rescale();
    return tmp
  }
}

var Scale_1 = Scale;

// const scaleLinear = require('d3-scale').scaleLinear
const { parseY: parseY$2 } = parse_1;

class YScale extends Scale_1 {
  constructor(data, world) {
    super(data, world);
    //use height instead of width
    this.to = world.height;
    this.is_y = true;
    this.parse = parseY$2;
    this.rescale();
  }
  rescale() {
    this.scale = _linear({
      world: [this.from, this.to],
      minmax: [this.max, this.min]
    });
  }
}
var YScale_1 = YScale;

var spencerColor = createCommonjsModule(function (module, exports) {
!function(e){module.exports=e();}(function(){return function u(i,a,c){function f(r,e){if(!a[r]){if(!i[r]){var o="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&o)return o(r,!0);if(d)return d(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var t=a[r]={exports:{}};i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,u,i,a,c);}return a[r].exports}for(var d="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,r,o){r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#F2C0BB",brown:"#705E5C",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",fuscia:"#735873",beige:"#e6d7b3",slate:"#8C8C88",suede:"#9c896c",burnt:"#603a39",sea:"#50617A",sky:"#2D85A8",night:"#303b50",rouge:"#914045",grey:"#838B91",mud:"#C4ABAB",royal:"#275291",cherry:"#cc6966",tulip:"#e6b3bc",rose:"#D68881",fire:"#AB5850",greyblue:"#72697D",greygreen:"#8BA3A2",greypurple:"#978BA3",burn:"#6D5685",slategrey:"#bfb0b3",light:"#a3a5a5",lighter:"#d7d5d2",fudge:"#4d4d4d",lightgrey:"#949a9e",white:"#fbfbfb",dimgrey:"#606c74",softblack:"#463D4F",dark:"#443d3d",black:"#333333"};},{}],2:[function(e,r,o){var n=e("./colors"),t={juno:["blue","mud","navy","slate","pink","burn"],barrow:["rouge","red","orange","burnt","brown","greygreen"],roma:["#8a849a","#b5b0bf","rose","lighter","greygreen","mud"],palmer:["red","navy","olive","pink","suede","sky"],mark:["#848f9a","#9aa4ac","slate","#b0b8bf","mud","grey"],salmon:["sky","sea","fuscia","slate","mud","fudge"],dupont:["green","brown","orange","red","olive","blue"],bloor:["night","navy","beige","rouge","mud","grey"],yukon:["mud","slate","brown","sky","beige","red"],david:["blue","green","yellow","red","pink","light"],neste:["mud","cherry","royal","rouge","greygreen","greypurple"],ken:["red","sky","#c67a53","greygreen","#dfb59f","mud"]};Object.keys(t).forEach(function(e){t[e]=t[e].map(function(e){return n[e]||e});}),r.exports=t;},{"./colors":1}],3:[function(e,r,o){var n=e("./colors"),t=e("./combos"),u={colors:n,list:Object.keys(n).map(function(e){return n[e]}),combos:t};r.exports=u;},{"./colors":1,"./combos":2}]},{},[3])(3)});
});

function createCommonjsModule$2(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace$2 (n) {
	return n && n['default'] || n;
}

var fns$1 = createCommonjsModule$2(function (module, exports) {
//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
exports.isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// unsurprisingly-nasty `typeof date` call
exports.isDate = d => Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
exports.isArray = input => Object.prototype.toString.call(input) === '[object Array]';
exports.isObject = input => Object.prototype.toString.call(input) === '[object Object]';

exports.zeroPad = (str, len = 2) => {
  let pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
};

exports.titleCase = str => {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
};

exports.ordinal = i => {
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
};

//strip 'st' off '1st'..
exports.toCardinal = str => {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
  return parseInt(str, 10)
};

//used mostly for cleanup of unit names, like 'months'
exports.normalize = (str = '') => {
  str = str.toLowerCase().trim();
  str = str.replace(/ies$/, 'y'); //'centuries'
  str = str.replace(/s$/, '');
  str = str.replace(/-/g, '');
  if (str === 'day') {
    return 'date'
  }
  return str
};

exports.getEpoch = tmp => {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime()
  }
  if (tmp.epoch) {
    return tmp.epoch
  }
  return null
};

//make sure this input is a spacetime obj
exports.beADate = (d, s) => {
  if (exports.isObject(d) === false) {
    return s.clone().set(d)
  }
  return d
};

exports.formatTimezone = (offset, delimiter = '') => {
  const absOffset = Math.abs(offset);
  const sign = offset > 0 ? '+' : '-';
  return `${sign}${exports.zeroPad(absOffset)}${delimiter}00`
};
});
var fns_1$1 = fns$1.isLeapYear;
var fns_2$1 = fns$1.isDate;
var fns_3$1 = fns$1.isArray;
var fns_4$1 = fns$1.isObject;
var fns_5$1 = fns$1.zeroPad;
var fns_6$1 = fns$1.titleCase;
var fns_7$1 = fns$1.ordinal;
var fns_8$1 = fns$1.toCardinal;
var fns_9$1 = fns$1.normalize;
var fns_10$1 = fns$1.getEpoch;
var fns_11$1 = fns$1.beADate;
var fns_12$1 = fns$1.formatTimezone;

const zeroPad$1 = fns$1.zeroPad;

const toString$1 = d =>
  zeroPad$1(d.getMonth() + 1) + '/' + zeroPad$1(d.getDate()) + ':' + zeroPad$1(d.getHours());

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange$1 = (epoch, start, end, defaultOffset) => {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(epoch);
  //(try to mediate this a little?)
  let bias = d.getTimezoneOffset() || 0;
  let shift = bias + defaultOffset * 60; //in minutes
  shift = shift * 60 * 1000; //in ms
  d = new Date(epoch + shift);

  let current = toString$1(d);
  //eg. is it after ~november?
  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true
    }
  }
  return false
};
var summerTime$1 = shouldChange$1;

// this method avoids having to do a full dst-calculation on every operation
// it reproduces some things in ./index.js, but speeds up spacetime considerably
const quickOffset$1 = s => {
  let zones = s.timezones;
  let obj = zones[s.tz];
  if (obj === undefined) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0
  }
  if (obj.dst === undefined) {
    return obj.offset
  }

  //get our two possible offsets
  let jul = obj.offset;
  let dec = obj.offset + 1; // assume it's the same for now
  if (obj.hem === 'n') {
    dec = jul - 1;
  }
  let split = obj.dst.split('->');
  let inSummer = summerTime$1(s.epoch, split[0], split[1], jul);
  if (inSummer === true) {
    return jul
  }
  return dec
};
var quick$1 = quickOffset$1;

var _build$2 = {
	"9|s": "2/dili,2/jayapura",
	"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
	"9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
	"9.5|s": "4/darwin,4/north",
	"8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
	"8|n|03/25:03->09/29:23": "2/ulan_bator",
	"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
	"8.75|s": "4/eucla",
	"7|s": "12/davis,2/jakarta,9/christmas",
	"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
	"6|s": "12/vostok",
	"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
	"6.5|n": "2/rangoon,9/cocos",
	"5|s": "12/mawson,9/kerguelen",
	"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
	"5.75|n": "2/kathmandu,2/katmandu",
	"5.5|n": "2/calcutta,2/colombo,2/kolkata",
	"4|s": "9/reunion",
	"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
	"4.5|n|03/22:00->09/21:24": "2/tehran",
	"4.5|n": "2/kabul",
	"3|s": "12/syowa,9/antananarivo",
	"3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
	"3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
	"3|n|03/31:00->10/26:24": "2/beirut",
	"3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
	"3|n|03/29:00->10/25:01": "2/amman",
	"3|n|03/29:00->10/24:24": "2/damascus",
	"3|n|03/23:01->10/26:01": "2/gaza,2/hebron",
	"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
	"2|s|03/31:02->10/27:02": "12/troll",
	"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
	"2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
	"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
	"1|s|04/02:01->09/03:03": "0/windhoek",
	"1|s": "0/kinshasa,0/luanda",
	"1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
	"1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
	"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
	"14|n": "11/kiritimati",
	"13|s|04/07:04->09/29:03": "11/apia",
	"13|s|01/15:02->11/05:03": "11/tongatapu",
	"13|n": "11/enderbury,11/fakaofo",
	"12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
	"12|s|01/13:03->11/03:02": "11/fiji",
	"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
	"12.75|s|04/07:03->04/07:02": "11/chatham",
	"11|s": "12/macquarie,11/bougainville",
	"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
	"11.5|n": "11/norfolk",
	"10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
	"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
	"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
	"10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
	"0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
	"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
	"-9|n|03/10:02->11/03:02": "1/adak,1/atka",
	"-9|n": "11/gambier",
	"-9.5|n": "11/marquesas",
	"-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
	"-8|n": "11/pitcairn",
	"-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
	"-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
	"-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
	"-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
	"-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
	"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
	"-5|s": "1/lima,1/rio_branco,5/acre",
	"-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
	"-5|n|03/12:03->11/05:01": "1/north_dakota",
	"-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
	"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
	"-4|s|05/13:23->08/13:01": "12/palmer",
	"-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
	"-4|s|03/23:24->10/06:00": "1/asuncion",
	"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
	"-4|s": "1/la_paz,1/manaus,5/west",
	"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
	"-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
	"-4|n|03/10:00->11/03:01": "1/havana",
	"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
	"-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
	"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
	"-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
	"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
	"-2|s": "5/denoronha",
	"-2|n|03/30:22->10/26:23": "1/godthab",
	"-2|n|03/10:02->11/03:02": "1/miquelon",
	"-2|n": "1/noronha,3/south_georgia",
	"-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
	"-1|n": "3/cape_verde",
	"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
	"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
};

var _build$1$1 = /*#__PURE__*/Object.freeze({
	'default': _build$2
});

//prefixes for iana names..
var _prefixes$1 = [
  'africa',
  'america',
  'asia',
  'atlantic',
  'australia',
  'brazil',
  'canada',
  'chile',
  'europe',
  'indian',
  'mexico',
  'pacific',
  'antarctica',
  'etc'
];

var data$1 = getCjsExportFromNamespace$2(_build$1$1);

let all$1 = {};
Object.keys(data$1).forEach(k => {
  let split = k.split('|');
  let obj = {
    offset: Number(split[0]),
    hem: split[1]
  };
  if (split[2]) {
    obj.dst = split[2];
  }
  let names = data$1[k].split(',');
  names.forEach(str => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      num = Number(num);
      return _prefixes$1[num] + '/'
    });
    all$1[str] = obj;
  });
});

all$1['utc'] = {
  offset: 0,
  hem: 'n' //(sorry)
};

//add etc/gmt+n
for (let i = -13; i <= 13; i += 0.5) {
  let num = i;
  if (num > 0) {
    num = '+' + num;
  }
  let name = 'etc/gmt' + num;
  all$1[name] = {
    offset: i * -1, //they're negative!
    hem: 'n' //(sorry)
  };
  name = 'utc/gmt' + num; //this one too, why not.
  all$1[name] = {
    offset: i * -1,
    hem: 'n'
  };
}
// console.log(all)

// console.log(Object.keys(all).length)
var unpack$1 = all$1;

//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ$1 = 'utc'; //

//this Intl object is not supported often, yet
const safeIntl$1 = () => {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null
  }
  let format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null
  }
  let timezone = format.resolvedOptions().timeZone;
  if (!timezone) {
    return null
  }
  return timezone.toLowerCase()
};

const guessTz$1 = () => {
  let timezone = safeIntl$1();
  if (timezone === null) {
    return fallbackTZ$1
  }
  return timezone
};
//do it once per computer
var guessTz_1$1 = guessTz$1;

const isOffset$1 = /(\-?[0-9]+)h(rs)?/i;
const isNumber$1 = /(\-?[0-9]+)/;
const utcOffset$1 = /utc([\-+]?[0-9]+)/i;
const gmtOffset$1 = /gmt([\-+]?[0-9]+)/i;

const toIana$1 = function(num) {
  num = Number(num);
  if (num > -13 && num < 13) {
    num = num * -1; //it's opposite!
    num = (num > 0 ? '+' : '') + num; //add plus sign
    return 'etc/gmt' + num
  }
  return null
};

const parseOffset$2 = function(tz) {
  // '+5hrs'
  let m = tz.match(isOffset$1);
  if (m !== null) {
    return toIana$1(m[1])
  }
  // 'utc+5'
  m = tz.match(utcOffset$1);
  if (m !== null) {
    return toIana$1(m[1])
  }
  // 'GMT-5' (not opposite)
  m = tz.match(gmtOffset$1);
  if (m !== null) {
    let num = Number(m[1]) * -1;
    return toIana$1(num)
  }
  // '+5'
  m = tz.match(isNumber$1);
  if (m !== null) {
    return toIana$1(m[1])
  }
  return null
};
var parseOffset_1$2 = parseOffset$2;

const local$1 = guessTz_1$1();

//add all the city names by themselves
const cities$1 = Object.keys(unpack$1).reduce((h, k) => {
  let city = k.split('/')[1] || '';
  city = city.replace(/_/g, ' ');
  h[city] = k;
  return h
}, {});

//try to match these against iana form
const normalize$1 = tz => {
  tz = tz.replace(/ time/g, '');
  tz = tz.replace(/ (standard|daylight|summer)/g, '');
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
  tz = tz.replace(/\beuropean/g, 'europe');
  tz = tz.replace(/\islands/g, 'island');
  return tz
};

// try our best to reconcile the timzone to this given string
const lookupTz$1 = (str, zones) => {
  if (!str) {
    return local$1
  }
  let tz = str.trim();
  let split = str.split('/');
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1];
  }
  tz = tz.toLowerCase();
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize$1(tz);
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //try city-names
  if (cities$1.hasOwnProperty(tz) === true) {
    return cities$1[tz]
  }
  // //try to parse '-5h'
  if (/[0-9]/.test(tz) === true) {
    let id = parseOffset_1$2(tz);
    if (id) {
      return id
    }
  }

  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  )
};
var find$1 = lookupTz$1;

let o$1 = {
  millisecond: 1
};
o$1.second = 1000;
o$1.minute = 60000;
o$1.hour = 3.6e6; // dst is supported post-hoc
o$1.day = 8.64e7; //
o$1.date = o$1.day;
o$1.month = 8.64e7 * 29.5; //(average)
o$1.week = 6.048e8;
o$1.year = 3.154e10; // leap-years are supported post-hoc
//add plurals
Object.keys(o$1).forEach(k => {
  o$1[k + 's'] = o$1[k];
});
var milliseconds$1 = o$1;

//basically, step-forward/backward until js Date object says we're there.
const walk$1 = (s, n, fn, unit, previous) => {
  let current = s.d[fn]();
  if (current === n) {
    return //already there
  }
  let startUnit = previous === null ? null : s.d[previous]();
  let original = s.epoch;
  //try to get it as close as we can
  let diff = n - current;
  s.epoch += milliseconds$1[unit] * diff;

  //DST edge-case: if we are going many days, be a little conservative
  if (unit === 'day' && Math.abs(diff) > 28) {
    //but don't push it over a month
    if (n < 28) {
      s.epoch += milliseconds$1.hour;
    }
  }
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = milliseconds$1[unit] / 2;
  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  //oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original;
    // i mean, but make it close...
    s.epoch += milliseconds$1[unit] * diff * 0.97; // i guess?
  }
};
//find the desired date by a increment/check while loop
const units$3 = {
  year: {
    valid: n => n > -4000 && n < 4000,
    walkTo: (s, n) => walk$1(s, n, 'getFullYear', 'year', null)
  },
  month: {
    valid: n => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let d = s.d;
      let current = d.getMonth();
      let original = s.epoch;
      let startUnit = d.getYear();
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = n - current;
      s.epoch += milliseconds$1.day * (diff * 28); //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getYear()) {
        s.epoch = original;
      }
      //incriment by day
      while (s.d.getMonth() < n) {
        s.epoch += milliseconds$1.day;
      }
      while (s.d.getMonth() > n) {
        s.epoch -= milliseconds$1.day;
      }
    }
  },
  date: {
    valid: n => n > 0 && n <= 31,
    walkTo: (s, n) => walk$1(s, n, 'getDate', 'day', 'getMonth')
  },
  hour: {
    valid: n => n >= 0 && n < 24,
    walkTo: (s, n) => walk$1(s, n, 'getHours', 'hour', 'getDate')
  },
  minute: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk$1(s, n, 'getMinutes', 'minute', 'getHours')
  },
  second: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: n => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};

const walkTo$1 = (s, wants) => {
  let keys = Object.keys(units$3);
  let old = s.clone();
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === undefined) {
      n = old[k]();
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    //make-sure it's valid
    if (!units$3[k].valid(n)) {
      s.epoch = null;
      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n);
      }
      return
    }
    // console.log(k, n)
    units$3[k].walkTo(s, n);
  }
  return
};

var walk_1$1 = walkTo$1;

let shortMonths$1 = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec'
];
let longMonths$1 = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function buildMapping$1() {
  const obj = {
    sep: 8 //support this format
  };
  for (let i = 0; i < shortMonths$1.length; i++) {
    obj[shortMonths$1[i]] = i;
  }
  for (let i = 0; i < longMonths$1.length; i++) {
    obj[longMonths$1[i]] = i;
  }
  return obj
}

var months$2 = {
  short: () => shortMonths$1,
  long: () => longMonths$1,
  mapping: () => buildMapping$1(),
  set: i18n => {
    shortMonths$1 = i18n.short || shortMonths$1;
    longMonths$1 = i18n.long || longMonths$1;
  }
};

//pull-apart ISO offsets, like "+0100"
const parseOffset$1$1 = (s, offset) => {
  if (!offset) {
    return s
  }
  //this is a fancy-move
  if (offset === 'Z') {
    offset = '+0000';
  }

  // according to ISO8601, tz could be hh:mm, hhmm or hh
  // so need few more steps before the calculation.
  let num = 0;

  // for (+-)hh:mm
  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
    //support "+01:00"
    if (/:00/.test(offset) === true) {
      offset = offset.replace(/:00/, '');
    }
    //support "+01:30"
    if (/:30/.test(offset) === true) {
      offset = offset.replace(/:30/, '.5');
    }
  }

  // for (+-)hhmm
  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
    offset = offset.replace(/30$/, '.5');
  }

  num = parseFloat(offset);

  //divide by 100 or 10 - , "+0100", "+01"
  if (Math.abs(num) > 100) {
    num = num / 100;
  }
  //okay, try to match it to a utc timezone
  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }
  let tz = 'etc/gmt' + num;
  let zones = s.timezones;

  if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    s.tz = tz;
  }
  return s
};
var parseOffset_1$1$1 = parseOffset$1$1;

const parseTime$1 = (s, str = '') => {
  str = str.replace(/^\s+/, '').toLowerCase(); //trim
  //formal time formats - 04:30.23
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
  if (arr !== null) {
    //validate it a little
    let h = Number(arr[1]);
    if (h < 0 || h > 24) {
      return s.startOf('day')
    }
    let m = Number(arr[2]); //don't accept '5:3pm'
    if (arr[2].length < 2 || m < 0 || m > 59) {
      return s.startOf('day')
    }
    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(arr[3] || 0);
    s = s.millisecond(arr[4] || 0);
    //parse-out am/pm
    let ampm = str.match(/[\b0-9](am|pm)\b/);
    if (ampm !== null && ampm[1]) {
      s = s.ampm(ampm[1]);
    }
    return s
  }
  //try an informal form - 5pm (no minutes)
  arr = str.match(/([0-9]+) ?(am|pm)/);
  if (arr !== null && arr[1]) {
    let h = Number(arr[1]);
    //validate it a little..
    if (h > 12 || h < 1) {
      return s.startOf('day')
    }
    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf('hour');
    return s
  }
  //no time info found, use start-of-day
  s = s.startOf('day');
  return s
};
var parseTime_1$1 = parseTime$1;

const monthLengths$1 = [
  31, // January - 31 days
  28, // February - 28 days in a common year and 29 days in leap years
  31, // March - 31 days
  30, // April - 30 days
  31, // May - 31 days
  30, // June - 30 days
  31, // July - 31 days
  31, // August - 31 days
  30, // September - 30 days
  31, // October - 31 days
  30, // November - 30 days
  31 // December - 31 days
];
var monthLengths_1$1 = monthLengths$1;

const isLeapYear$1 = fns$1.isLeapYear;

//given a month, return whether day number exists in it
const hasDate$1 = obj => {
  //invalid values
  if (monthLengths_1$1.hasOwnProperty(obj.month) !== true) {
    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear$1(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  let max = monthLengths_1$1[obj.month] || 0;
  if (obj.date <= max) {
    return true
  }
  return false
};
var hasDate_1$1 = hasDate$1;

const months$1$1 = months$2.mapping();





const parseYear$1 = (str = '') => {
  //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
  let year = parseInt(str.trim(), 10);
  year = year || new Date().getFullYear();
  return year
};

const strFmt$1 = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
    parse: (s, arr, givenTz, options) => {
      let month = parseInt(arr[2], 10) - 1;
      let obj = {
        year: arr[1],
        month,
        date: arr[3]
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      parseOffset_1$1$1(s, arr[5]);
      walk_1$1(s, obj);
      s = parseTime_1$1(s, arr[4]);
      return s
    }
  },
  //iso "2015-03-25" or "2015/03/25" //0-based-months!
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
    parse: (s, arr) => {
      let obj = {
        year: arr[1],
        month: parseInt(arr[2], 10) - 1,
        date: parseInt(arr[3], 10)
      };
      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10);
        obj.month = parseInt(arr[3], 10) - 1;
      }
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s);
      return s
    }
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10);
      if (month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        month = parseInt(arr[2], 10) - 1;
        date = parseInt(arr[1], 10);
      }
      let year = arr[3] || new Date().getFullYear();
      let obj = {
        year,
        month,
        date
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s);
      return s
    }
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
    parse: (s, arr) => {
      let month = months$1$1[arr[1].toLowerCase()];
      let year = parseYear$1(arr[3]);
      let obj = {
        year,
        month,
        date: fns$1.toCardinal(arr[2] || '')
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s, arr[4]);
      return s
    }
  },
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months$1$1[arr[1].toLowerCase()];
      let year = parseYear$1(arr[2]);
      let obj = {
        year,
        month,
        date: 1
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s, arr[4]);
      return s
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months$1$1[arr[2].toLowerCase()];
      let year = parseYear$1(arr[3]);
      let obj = {
        year,
        month,
        date: fns$1.toCardinal(arr[1])
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s);
      return s
    }
  },
  {
    // '1992'
    reg: /^[0-9]{4}$/i,
    parse: (s, arr) => {
      let year = parseYear$1(arr[0]);
      let d = new Date();
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s);
      return s
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || '';
      //make negative-year
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
      //remove commas
      str = str.replace(/,/g, '');
      let year = parseInt(str.trim(), 10);
      let d = new Date();
      let obj = {
        year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate_1$1(obj) === false) {
        s.epoch = null;
        return s
      }
      walk_1$1(s, obj);
      s = parseTime_1$1(s);
      return s
    }
  }
];

var strParse$1 = strFmt$1;

const dates$1 = {
  now: s => {
    s.epoch = Date.now();
    return s
  },
  tonight: s => {
    s.epoch = Date.now();
    s = s.hour(18);
    return s
  },
  today: s => {
    s.epoch = Date.now();
    return s
  },
  tomorrow: s => {
    s.epoch = Date.now();
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s
  },
  yesterday: s => {
    s.epoch = Date.now();
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s
  },
  christmas: s => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25
    return s
  },
  'new years': s => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31
    return s
  }
};
dates$1['new years eve'] = dates$1['new years'];
var namedDates$1 = dates$1;

//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const minimumEpoch$1 = 2500000000;

const defaults$1 = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
};

//support [2016, 03, 01] format
const handleArray$1 = (s, arr) => {
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (let i = 0; i < order.length; i++) {
    let num = arr[i] || defaults$1[order[i]] || 0;
    s = s[order[i]](num);
  }
  return s
};
//support {year:2016, month:3} format
const handleObject$1 = (s, obj) => {
  obj = Object.assign({}, defaults$1, obj);
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i];
    //make sure we have this method
    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue
    }
    //make sure the value is a number
    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue
    }
    let num = obj[unit] || defaults$1[unit] || 0;
    s = s[unit](num);
  }
  return s
};

//find the epoch from different input styles
const parseInput$1 = (s, input, givenTz) => {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch$1 && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }
    s.epoch = input;
    return s
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return s //k, we're good.
  }
  //support input of Date() object
  if (fns$1.isDate(input) === true) {
    s.epoch = input.getTime();
    return s
  }
  //support [2016, 03, 01] format
  if (fns$1.isArray(input) === true) {
    s = handleArray$1(s, input);
    return s
  }
  //support {year:2016, month:3} format
  if (fns$1.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      s.tz = input.tz;
      return s
    }
    s = handleObject$1(s, input);
    return s
  }
  //input as a string..
  if (typeof input !== 'string') {
    return s
  }
  //little cleanup..
  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
  input = input.replace(/,/g, '');
  input = input.replace(/ +/g, ' ').trim();
  //try some known-words, like 'now'
  if (namedDates$1.hasOwnProperty(input) === true) {
    s = namedDates$1[input](s);
    return s
  }
  //try each text-parse template, use the first good result
  for (let i = 0; i < strParse$1.length; i++) {
    let m = input.match(strParse$1[i].reg);
    if (m) {
      s = strParse$1[i].parse(s, m, givenTz);
      return s
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'");
  }
  s.epoch = null;
  return s
};
var input$1 = parseInput$1;

let shortDays$1 = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let longDays$1 = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var days$1 = {
  short: () => shortDays$1,
  long: () => longDays$1,
  set: i18n => {
    shortDays$1 = i18n.short || shortDays$1;
    longDays$1 = i18n.long || longDays$1;
  }
};

// create the timezone offset part of an iso timestamp
// it's kind of nuts how involved this is
// "+01:00", "+0100", or simply "+01"
const isoOffset$1 = s => {
  let offset = s.timezone().current.offset;
  const isNegative = offset < 0;
  let minute = '00';
  //handle 5.5 → '5:30'
  if (Math.abs(offset % 1) === 0.5) {
    minute = '30';
    if (offset >= 0) {
      offset = Math.floor(offset);
    } else {
      offset = Math.ceil(offset);
    }
  }
  if (isNegative) {
    //handle negative sign
    offset *= -1;
    offset = fns$1.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns$1.zeroPad(offset, 2);
    offset = '+' + offset;
  }
  offset = offset + ':' + minute;
  //'Z' means 00
  if (offset === '+00:00') {
    offset = 'Z';
  }
  return offset
};

var _offset$1 = isoOffset$1;

const format$1 = {
  day: s => fns$1.titleCase(s.dayName()),
  'day-short': s => fns$1.titleCase(days$1.short()[s.day()]),
  'day-number': s => s.day(),
  'day-ordinal': s => fns$1.ordinal(s.day()),
  'day-pad': s => fns$1.zeroPad(s.day()),

  date: s => s.date(),
  'date-ordinal': s => fns$1.ordinal(s.date()),
  'date-pad': s => fns$1.zeroPad(s.date()),

  month: s => fns$1.titleCase(s.monthName()),
  'month-short': s => fns$1.titleCase(months$2.short()[s.month()]),
  'month-number': s => s.month(),
  'month-ordinal': s => fns$1.ordinal(s.month()),
  'month-pad': s => fns$1.zeroPad(s.month()),
  'iso-month': s => fns$1.zeroPad(s.month() + 1), //1-based months

  year: s => {
    let year = s.year();
    if (year > 0) {
      return year
    }
    year = Math.abs(year);
    return year + ' BC'
  },
  'year-short': s => {
    let year = s.year();
    if (year > 0) {
      return `'${String(s.year()).substr(2, 4)}`
    }
    year = Math.abs(year);
    return year + ' BC'
  },
  'iso-year': s => {
    let year = s.year();
    let isNegative = year < 0;
    let str = fns$1.zeroPad(Math.abs(year), 4); //0-padded
    if (isNegative) {
      //negative years are for some reason 6-digits ('-00008')
      str = fns$1.zeroPad(str, 6);
      str = '-' + str;
    }
    return str
  },

  time: s => s.time(),
  'time-24': s => `${s.hour24()}:${fns$1.zeroPad(s.minute())}`,
  hour: s => s.hour12(),
  'hour-pad': s => fns$1.zeroPad(s.hour12()),
  'hour-24': s => s.hour24(),
  'hour-24-pad': s => fns$1.zeroPad(s.hour24()),

  minute: s => s.minute(),
  'minute-pad': s => fns$1.zeroPad(s.minute()),
  second: s => s.second(),
  'second-pad': s => fns$1.zeroPad(s.second()),

  ampm: s => s.ampm(),
  quarter: s => 'Q' + s.quarter(),
  season: s => s.season(),
  era: s => s.era(),
  timezone: s => s.timezone().name,
  offset: s => _offset$1(s),

  numeric: s => `${s.year()}/${fns$1.zeroPad(s.month() + 1)}/${fns$1.zeroPad(s.date())}`, // yyyy/mm/dd
  'numeric-us': s => `${fns$1.zeroPad(s.month() + 1)}/${fns$1.zeroPad(s.date())}/${s.year()}`, // mm/dd/yyyy
  'numeric-uk': s => `${fns$1.zeroPad(s.date())}/${fns$1.zeroPad(s.month() + 1)}/${s.year()}`, //dd/mm/yyyy
  'mm/dd': s => `${fns$1.zeroPad(s.month() + 1)}/${fns$1.zeroPad(s.date())}`, //mm/dd

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: s => {
    let year = s.format('iso-year');
    let month = fns$1.zeroPad(s.month() + 1); //1-based months
    let date = fns$1.zeroPad(s.date());
    let hour = fns$1.zeroPad(s.h24());
    let minute = fns$1.zeroPad(s.minute());
    let second = fns$1.zeroPad(s.second());
    let ms = fns$1.zeroPad(s.millisecond(), 3);
    let offset = _offset$1(s);
    return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}` //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': s => {
    let month = fns$1.zeroPad(s.month() + 1); //1-based months
    let date = fns$1.zeroPad(s.date());
    return `${s.year()}-${month}-${date}` //2017-02-15
  },
  'iso-utc': s => {
    return new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
  },

  //i made these up
  nice: s => `${months$2.short()[s.month()]} ${fns$1.ordinal(s.date())}, ${s.time()}`,
  'nice-year': s => `${months$2.short()[s.month()]} ${fns$1.ordinal(s.date())}, ${s.year()}`,
  'nice-day': s =>
    `${days$1.short()[s.day()]} ${fns$1.titleCase(months$2.short()[s.month()])} ${fns$1.ordinal(s.date())}`,
  'nice-full': s =>
    `${s.dayName()} ${fns$1.titleCase(s.monthName())} ${fns$1.ordinal(s.date())}, ${s.time()}`
};
//aliases
const aliases$1 = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  tz: 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'month-iso': 'iso-month',
  'year-iso': 'iso-year',
  'nice-short': 'nice',
  mdy: 'numeric-us',
  dmy: 'numeric-uk',
  ymd: 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
};
Object.keys(aliases$1).forEach(k => (format$1[k] = format$1[aliases$1[k]]));

const printFormat$1 = (s, str = '') => {
  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return ''
  }
  //support .format('month')
  if (format$1.hasOwnProperty(str)) {
    let out = String(format$1[str](s) || '');
    if (str !== 'ampm') {
      out = fns$1.titleCase(out);
    }
    return out
  }
  //support '{hour}:{minute}' notation
  if (str.indexOf('{') !== -1) {
    let sections = /\{(.+?)\}/g;
    str = str.replace(sections, (_, fmt) => {
      fmt = fmt.toLowerCase().trim();
      if (format$1.hasOwnProperty(fmt)) {
        return String(format$1[fmt](s) || '')
      }
      return ''
    });
    return str
  }

  return s.format('iso-short')
};
var format_1$1 = printFormat$1;

const pad$1 = fns$1.zeroPad;
const formatTimezone$1 = fns$1.formatTimezone;
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping$1 = {
  G: s => s.era(),
  GG: s => s.era(),
  GGG: s => s.era(),
  GGGG: s => (s.era() === 'AD' ? 'Anno Domini' : 'Before Christ'),
  //year
  y: s => s.year(),
  yy: s => {
    //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10)
  },
  yyy: s => s.year(),
  yyyy: s => s.year(),
  yyyyy: s => '0' + s.year(),
  // u: (s) => {},//extended non-gregorian years

  //quarter
  Q: s => s.quarter(),
  QQ: s => s.quarter(),
  QQQ: s => s.quarter(),
  QQQQ: s => s.quarter(),

  //month
  M: s => s.month() + 1,
  MM: s => pad$1(s.month() + 1),
  MMM: s => s.format('month-short'),
  MMMM: s => s.format('month'),

  //week
  w: s => s.week(),
  ww: s => pad$1(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: s => s.date(),
  dd: s => pad$1(s.date()),
  //date of year
  D: s => s.dayOfYear(),
  DD: s => pad$1(s.dayOfYear()),
  DDD: s => pad$1(s.dayOfYear(), 3),

  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day

  //day
  E: s => s.format('day-short'),
  EE: s => s.format('day-short'),
  EEE: s => s.format('day-short'),
  EEEE: s => s.format('day'),
  EEEEE: s => s.format('day')[0],
  e: s => s.day(),
  ee: s => s.day(),
  eee: s => s.format('day-short'),
  eeee: s => s.format('day'),
  eeeee: s => s.format('day')[0],

  //am/pm
  a: s => s.ampm().toUpperCase(),
  aa: s => s.ampm().toUpperCase(),
  aaa: s => s.ampm().toUpperCase(),
  aaaa: s => s.ampm().toUpperCase(),

  //hour
  h: s => s.h12(),
  hh: s => pad$1(s.h12()),
  H: s => s.hour(),
  HH: s => pad$1(s.hour()),
  // j: (s) => {},//weird hour format

  m: s => s.minute(),
  mm: s => pad$1(s.minute()),
  s: s => s.second(),
  ss: s => pad$1(s.second()),
  //milliseconds in the day
  A: s => s.epoch - s.startOf('day').epoch,
  //timezone
  z: s => s.timezone().name,
  zz: s => s.timezone().name,
  zzz: s => s.timezone().name,
  zzzz: s => s.timezone().name,
  Z: s => formatTimezone$1(s.timezone().current.offset),
  ZZ: s => formatTimezone$1(s.timezone().current.offset),
  ZZZ: s => formatTimezone$1(s.timezone().current.offset),
  ZZZZ: s => formatTimezone$1(s.timezone().current.offset, ':')
};

const addAlias$1 = (char, to, n) => {
  let name = char;
  let toName = to;
  for (let i = 0; i < n; i += 1) {
    mapping$1[name] = mapping$1[toName];
    name += char;
    toName += to;
  }
};
addAlias$1('q', 'Q', 4);
addAlias$1('L', 'M', 4);
addAlias$1('Y', 'y', 4);
addAlias$1('c', 'e', 4);
addAlias$1('k', 'H', 2);
addAlias$1('K', 'h', 2);
addAlias$1('S', 's', 2);
addAlias$1('v', 'z', 4);
addAlias$1('V', 'Z', 4);

const unixFmt$1 = (s, str) => {
  let chars = str.split('');
  //combine consecutive chars, like 'yyyy' as one.
  let arr = [chars[0]];
  let quoteOn = false;
  for (let i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === `'`) {
      quoteOn = !quoteOn;
      //support '', meaning one tick
      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue
      }
    }
    //merge it with the last one
    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }
  return arr.reduce((txt, c) => {
    if (mapping$1[c] !== undefined) {
      txt += mapping$1[c](s) || '';
    } else {
      txt += c;
    }
    return txt
  }, '')
};
var unixFmt_1$1 = unixFmt$1;

const units$1$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

const doUnit$1 = function(s, k) {
  let start = s.clone().startOf(k);
  let end = s.clone().endOf(k);
  let duration = end.epoch - start.epoch;
  let percent = (s.epoch - start.epoch) / duration;
  return parseFloat(percent.toFixed(2))
};

//how far it is along, from 0-1
const progress$1 = (s, unit) => {
  if (unit) {
    unit = fns$1.normalize(unit);
    return doUnit$1(s, unit)
  }
  let obj = {};
  units$1$1.forEach(k => {
    obj[k] = doUnit$1(s, k);
  });
  return obj
};

var progress_1$1 = progress$1;

//round to either current, or +1 of this unit
const nearest$1 = (s, unit) => {
  //how far have we gone?
  let prog = s.progress();
  unit = fns$1.normalize(unit);
  //fix camel-case for this one
  if (unit === 'quarterhour') {
    unit = 'quarterHour';
  }
  if (prog[unit] !== undefined) {
    // go forward one?
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }
    // go to start
    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }
  return s
};
var nearest_1$1 = nearest$1;

//increment until dates are the same
const climb$1 = (a, b, unit) => {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  }
  //oops, we went too-far..
  if (a.isAfter(b, unit)) {
    i -= 1;
  }
  return i
};

// do a thurough +=1 on the unit, until they match
// for speed-reasons, only used on day, month, week.
const diffOne$1 = (a, b, unit) => {
  if (a.isBefore(b)) {
    return climb$1(a, b, unit)
  } else {
    return climb$1(b, a, unit) * -1 //reverse it
  }
};

var one$1 = diffOne$1;

// don't do anything too fancy here.
// 2020 - 2019 may be 1 year, or 0 years
// - '1 year difference' means 366 days during a leap year
const fastYear$1 = (a, b) => {
  let years = b.year() - a.year();
  // should we decrement it by 1?
  a = a.year(b.year());
  if (a.isAfter(b)) {
    years -= 1;
  }
  return years
};

// use a waterfall-method for computing a diff of any 'pre-knowable' units
// compute years, then compute months, etc..
// ... then ms-math for any very-small units
const diff$2 = function(a, b) {
  // an hour is always the same # of milliseconds
  // so these units can be 'pre-calculated'
  let msDiff = b.epoch - a.epoch;
  let obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);

  //do the year
  let tmp = a.clone();
  obj.years = fastYear$1(tmp, b);
  tmp = a.add(obj.years, 'year');

  //there's always 12 months in a year...
  obj.months = obj.years * 12;
  tmp = a.add(obj.months, 'month');
  obj.months += one$1(tmp, b, 'month');

  // there's always atleast 52 weeks in a year..
  // (month * 4) isn't as close
  obj.weeks = obj.years * 52;
  tmp = a.add(obj.weeks, 'week');
  obj.weeks += one$1(tmp, b, 'week');

  // there's always atleast 7 days in a week
  obj.days = obj.weeks * 7;
  tmp = a.add(obj.days, 'day');
  obj.days += one$1(tmp, b, 'day');

  return obj
};
var waterfall$1 = diff$2;

const reverseDiff$1 = function(obj) {
  Object.keys(obj).forEach(k => {
    obj[k] *= -1;
  });
  return obj
};

// this method counts a total # of each unit, between a, b.
// '1 month' means 28 days in february
// '1 year' means 366 days in a leap year
const main$2 = function(a, b, unit) {
  b = fns$1.beADate(b, a);
  //reverse values, if necessary
  let reversed = false;
  if (a.isAfter(b)) {
    let tmp = a;
    a = b;
    b = tmp;
    reversed = true;
  }
  //compute them all (i know!)
  let obj = waterfall$1(a, b);
  if (reversed) {
    obj = reverseDiff$1(obj);
  }
  //return just the requested unit
  if (unit) {
    //make sure it's plural-form
    unit = fns$1.normalize(unit);
    if (/s$/.test(unit) !== true) {
      unit += 's';
    }
    if (unit === 'dates') {
      unit = 'days';
    }
    return obj[unit]
  }
  return obj
};

var diff$1$1 = main$2;

//by spencermountain + Shaun Grady

//our conceptual 'break-points' for each unit
const qualifiers$1 = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
};

//get number of hours/minutes... between the two dates
function getDiff$1(a, b) {
  const isBefore = a.isBefore(b);
  const later = isBefore ? b : a;
  let earlier = isBefore ? a : b;
  earlier = earlier.clone();
  const diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff).forEach(unit => {
    if (earlier.isSame(later, unit)) {
      return
    }
    let max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff[unit] = max;
  });

  //reverse it, if necessary
  if (isBefore) {
    Object.keys(diff).forEach(u => {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }
  return diff
}

// Expects a plural unit arg
function pluralize$1(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }
  return value + ' ' + unit
}

//create the human-readable diff between the two dates
const since$1 = (start, end) => {
  end = fns$1.beADate(end, start);
  const diff = getDiff$1(start, end);
  const isNow = Object.keys(diff).every(u => !diff[u]);
  if (isNow === true) {
    return {
      diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    }
  }
  let rounded;
  let qualified;
  let precise;
  let englishValues = [];

  //go through each value and create its text-representation
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit]);
    if (value === 0) {
      return
    }
    const englishValue = pluralize$1(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = qualified = englishValue;
      if (i > 4) {
        return
      }
      //is it a 'almost' something, etc?
      const nextUnit = units[i + 1];
      const nextValue = Math.abs(diff[nextUnit]);
      if (nextValue > qualifiers$1[nextUnit].almost) {
        rounded = pluralize$1(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers$1[nextUnit].over) qualified = 'over ' + englishValue;
    }
  });
  //make them into a string
  precise = englishValues.splice(0, 2).join(', ');
  //handle before/after logic
  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }
  return {
    diff,
    rounded,
    qualified,
    precise
  }
};

var since_1$1 = since$1;

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
var seasons$1 = {
  north: [
    ['spring', 2, 1], //spring march 1
    ['summer', 5, 1], //june 1
    ['fall', 8, 1], //sept 1
    ['autumn', 8, 1], //sept 1
    ['winter', 11, 1] //dec 1
  ],
  south: [
    ['fall', 2, 1], //march 1
    ['autumn', 2, 1], //march 1
    ['winter', 5, 1], //june 1
    ['spring', 8, 1], //sept 1
    ['summer', 11, 1] //dec 1
  ]
};

var quarters$1 = [
  null,
  [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1] //oct 1
];

const units$2$1 = {
  minute: s => {
    walk_1$1(s, {
      second: 0,
      millisecond: 0
    });
    return s
  },
  quarterhour: s => {
    let minute = s.minutes();
    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }
    walk_1$1(s, {
      second: 0,
      millisecond: 0
    });
    return s
  },
  hour: s => {
    walk_1$1(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  day: s => {
    walk_1$1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  week: s => {
    let original = s.clone();
    s = s.day(s._weekStart); //monday
    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }
    walk_1$1(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  month: s => {
    walk_1$1(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  quarter: s => {
    let q = s.quarter();
    if (quarters$1[q]) {
      walk_1$1(s, {
        month: quarters$1[q][0],
        date: quarters$1[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    return s
  },
  season: s => {
    let current = s.season();
    let hem = 'north';
    if (s.hemisphere() === 'South') {
      hem = 'south';
    }
    for (let i = 0; i < seasons$1[hem].length; i++) {
      if (seasons$1[hem][i][0] === current) {
        //winter goes between years
        let year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walk_1$1(s, {
          year,
          month: seasons$1[hem][i][1],
          date: seasons$1[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s
      }
    }
    return s
  },
  year: s => {
    walk_1$1(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s
  },
  decade: s => {
    s = s.startOf('year');
    let year = s.year();
    let decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s
  },
  century: s => {
    s = s.startOf('year');
    let year = s.year();
    let decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s
  }
};
units$2$1.date = units$2$1.day;

const startOf$1 = (a, unit) => {
  let s = a.clone();
  unit = fns$1.normalize(unit);
  if (units$2$1[unit]) {
    return units$2$1[unit](s)
  }
  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units$2$1.season(s)
  }
  return s
};

//piggy-backs off startOf
const endOf$1 = (a, unit) => {
  let s = a.clone();
  unit = fns$1.normalize(unit);
  if (units$2$1[unit]) {
    s = units$2$1[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s
  }
  return s
};
var startOf_1$1 = {
  startOf: startOf$1,
  endOf: endOf$1
};

//is it 'wednesday'?
const isDay$1 = function(unit) {
  if (days$1.short().find(s => s === unit)) {
    return true
  }
  if (days$1.long().find(s => s === unit)) {
    return true
  }
  return false
};

// return a list of the weeks/months/days between a -> b
// returns spacetime objects in the timezone of the input
const every$1 = function(start, unit = '', end) {
  if (!unit || !end) {
    return []
  }
  //cleanup unit param
  unit = fns$1.normalize(unit);
  //cleanup to param
  end = start.clone().set(end);
  //swap them, if they're backwards
  if (start.isAfter(end)) {
    let tmp = start;
    start = end;
    end = tmp;
  }

  //support 'every wednesday'
  let d = start.clone();
  if (isDay$1(unit)) {
    d = d.next(unit);
    unit = 'week';
  } else {
    d = d.next(unit);
  }
  //okay, actually start doing it
  let result = [];
  while (d.isBefore(end)) {
    result.push(d);
    d = d.add(1, unit);
  }
  return result
};
var every_1$1 = every$1;

const parseDst$1 = dst => {
  if (!dst) {
    return []
  }
  return dst.split('->')
};

const titleCase$1 = str => {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/\/gmt/, '/GMT');
  str = str.replace(/[\/_]([a-z])/gi, s => {
    return s.toUpperCase()
  });
  return str
};

//get metadata about this timezone
const timezone$1 = s => {
  let zones = s.timezones;
  let tz = s.tz;
  if (zones.hasOwnProperty(tz) === false) {
    tz = find$1(s.tz, zones);
  }
  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }
    return {
      current: {
        epochShift: 0
      }
    }
  }
  let found = zones[tz];
  let result = {
    name: titleCase$1(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  };

  if (result.hasDst) {
    let arr = parseDst$1(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = found.offset; // (july)
  let winter = summer; // (january) assume it's the same for now
  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = found.offset + 1;
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (summerTime$1(s.epoch, result.change.start, result.change.back, summer) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
  }
  return result
};
var timezone_1$1 = timezone$1;

//the spacetime instance methods (also, the API)
const methods$6 = {
  set: function(input$1$1, tz) {
    let s = this.clone();
    s = input$1(s, input$1$1);
    if (tz) {
      this.tz = find$1(tz);
    }
    return s
  },
  timezone: function() {
    return timezone_1$1(this)
  },
  isDST: function() {
    return timezone_1$1(this).current.isDST
  },
  hasDST: function() {
    return timezone_1$1(this).hasDst
  },
  offset: function() {
    return timezone_1$1(this).current.offset * 60
  },
  hemisphere: function() {
    return timezone_1$1(this).hemisphere
  },
  format: function(fmt) {
    return format_1$1(this, fmt)
  },
  unixFmt: function(fmt) {
    return unixFmt_1$1(this, fmt)
  },
  startOf: function(unit) {
    return startOf_1$1.startOf(this, unit)
  },
  endOf: function(unit) {
    return startOf_1$1.endOf(this, unit)
  },
  leapYear: function() {
    let year = this.year();
    return fns$1.isLeapYear(year)
  },
  progress: function(unit) {
    return progress_1$1(this, unit)
  },
  nearest: function(unit) {
    return nearest_1$1(this, unit)
  },
  diff: function(d, unit) {
    return diff$1$1(this, d, unit)
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set();
    }
    return since_1$1(this, d)
  },
  next: function(unit) {
    let s = this.add(1, unit);
    return s.startOf(unit)
  },
  //the start of the previous year/week/century
  last: function(unit) {
    let s = this.subtract(1, unit);
    return s.startOf(unit)
  },
  isValid: function() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto: function(tz) {
    let s = this.clone();
    s.tz = find$1(tz, s.timezones); //science!
    return s
  },
  //get each week/month/day between a -> b
  every: function(unit, to) {
    return every_1$1(this, unit, to)
  },
  isAwake: function() {
    let hour = this.hour();
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function() {
    return !this.isAwake()
  },
  //pretty-printing
  log: function() {
    console.log('');
    console.log(format_1$1(this, 'nice-short'));
    return this
  },
  logYear: function() {
    console.log('');
    console.log(format_1$1(this, 'full-short'));
    return this
  },
  debug: function() {
    let tz = this.timezone();
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this
  },
  //alias of 'since' but opposite - like moment.js
  from: function(d) {
    d = this.clone().set(d);
    return d.since(this)
  },
  fromNow: function() {
    let d = this.clone().set(Date.now());
    return d.since(this)
  },
  weekStart: function(input) {
    //accept a number directly
    if (typeof input === 'number') {
      this._weekStart = input;
      return this
    }
    if (typeof input === 'string') {
      // accept 'wednesday'
      input = input.toLowerCase().trim();
      let num = days$1.short().indexOf(input);
      if (num === -1) {
        num = days$1.long().indexOf(input);
      }
      if (num === -1) {
        num = 1; //go back to default
      }
      this._weekStart = num;
    } else {
      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
    }
    return this
  }
};
// aliases
methods$6.inDST = methods$6.isDST;
methods$6.round = methods$6.nearest;
methods$6.each = methods$6.every;
var methods_1$2 = methods$6;

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.





const validate$1 = n => {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  return n
};

const order$2 = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

//reduce hostile micro-changes when moving dates by millisecond
const confirm$1 = (s, tmp, unit) => {
  let n = order$2.indexOf(unit);
  let arr = order$2.slice(n, order$2.length);
  for (let i = 0; i < arr.length; i++) {
    let want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s
};

var set$1 = {
  milliseconds: (s, n) => {
    n = validate$1(n);
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff
  },

  seconds: (s, n) => {
    n = validate$1(n);
    let diff = s.second() - n;
    let shift = diff * milliseconds$1.second;
    return s.epoch - shift
  },

  minutes: (s, n) => {
    n = validate$1(n);
    let old = s.clone();
    let diff = s.minute() - n;
    let shift = diff * milliseconds$1.minute;
    s.epoch -= shift;
    confirm$1(s, old, 'second');
    return s.epoch
  },

  hours: (s, n) => {
    n = validate$1(n);
    if (n >= 24) {
      n = 24;
    } else if (n < 0) {
      n = 0;
    }
    let old = s.clone();
    let diff = s.hour() - n;
    let shift = diff * milliseconds$1.hour;
    s.epoch -= shift;
    walk_1$1(s, {
      hour: n
    });
    confirm$1(s, old, 'minute');
    return s.epoch
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: (s, str) => {
    let m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);
    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);
      if (!m) {
        return s.epoch
      }
      m.splice(2, 0, '0'); //add implicit 0 minutes
    }
    let h24 = false;
    let hour = parseInt(m[1], 10);
    let minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    //make the hour into proper 24h time
    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }
      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }
    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch
  },

  date: (s, n) => {
    n = validate$1(n);
    //avoid setting february 31st
    if (n > 28) {
      const max = monthLengths_1$1[s.month()];
      if (n > max) {
        n = max;
      }
    }
    //avoid setting < 0
    if (n <= 0) {
      n = 1;
    }
    walk_1$1(s, {
      date: n
    });
    return s.epoch
  },

  //this one's tricky
  month: (s, n) => {
    if (typeof n === 'string') {
      n = months$2.mapping()[n.toLowerCase()];
    }
    n = validate$1(n);
    //don't go past december
    if (n >= 12) {
      n = 11;
    }
    if (n <= 0) {
      n = 0;
    }

    let date = s.date();
    //there's no 30th of february, etc.
    if (date > monthLengths_1$1[n]) {
      //make it as close as we can..
      date = monthLengths_1$1[n];
    }
    walk_1$1(s, {
      month: n,
      date
    });
    return s.epoch
  },

  year: (s, n) => {
    n = validate$1(n);
    walk_1$1(s, {
      year: n
    });
    return s.epoch
  },

  dayOfYear: (s, n) => {
    n = validate$1(n);
    let old = s.clone();
    n -= 1; //days are 1-based
    if (n <= 0) {
      n = 0;
    } else if (n >= 365) {
      n = 364;
    }
    s = s.startOf('year');
    s = s.add(n, 'day');
    confirm$1(s, old, 'hour');
    return s.epoch
  }
};

const methods$1$1 = {
  millisecond: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.milliseconds(s, num);
      return s
    }
    return this.d.getMilliseconds()
  },
  second: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.seconds(s, num);
      return s
    }
    return this.d.getSeconds()
  },
  minute: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.minutes(s, num);
      return s
    }
    return this.d.getMinutes()
  },
  hour: function(num) {
    let d = this.d;
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.hours(s, num);
      return s
    }
    return d.getHours()
  },

  //'3:30' is 3.5
  hourFloat: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      let minute = num % 1;
      minute = minute * 60;
      let hour = parseInt(num, 10);
      s.epoch = set$1.hours(s, hour);
      s.epoch = set$1.minutes(s, minute);
      return s
    }
    let d = this.d;
    let hour = d.getHours();
    let minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute
  },

  // hour in 12h format
  hour12: function(str) {
    let d = this.d;
    if (str !== undefined) {
      let s = this.clone();
      str = '' + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        s.epoch = set$1.hours(s, hour);
      }
      return s
    }
    //get the hour
    let hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12
  },

  //some ambiguity here with 12/24h
  time: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      s.epoch = set$1.time(s, str);
      return s
    }
    return `${this.h12()}:${fns$1.zeroPad(this.minute())}${this.ampm()}`
  },

  // either 'am' or 'pm'
  ampm: function(input) {
    let which = 'am';
    let hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (typeof input !== 'string') {
      return which
    }
    //okay, we're doing a setter
    let s = this.clone();
    input = input.toLowerCase().trim();
    //ampm should never change the day
    // - so use `.hour(n)` instead of `.minus(12,'hour')`
    if (hour >= 12 && input === 'am') {
      //noon is 12pm
      hour -= 12;
      return s.hour(hour)
    }
    if (hour < 12 && input === 'pm') {
      hour += 12;
      return s.hour(hour)
    }
    return s
  },

  //some hard-coded times of day, like 'noon'
  dayTime: function(str) {
    if (str !== undefined) {
      const times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      };
      let s = this.clone();
      str = str || '';
      str = str.toLowerCase();
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }
      return s
    }
    let h = this.hour();
    if (h < 6) {
      return 'night'
    }
    if (h < 12) {
      //until noon
      return 'morning'
    }
    if (h < 17) {
      //until 5pm
      return 'afternoon'
    }
    if (h < 22) {
      //until 10pm
      return 'evening'
    }
    return 'night'
  },

  //parse a proper iso string
  iso: function(num) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso')
  }
};
var _01Time$1 = methods$1$1;

const methods$2$1 = {
  // # day in the month
  date: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.date(s, num);
      return s
    }
    return this.d.getDate()
  },

  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay()
    }
    let original = this.clone();
    let want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days$1.short().indexOf(input);
      if (want === -1) {
        want = days$1.long().indexOf(input);
      }
    }
    //move approx
    let day = this.d.getDay();
    let diff = day - want;
    let s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walk_1$1(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days$1.long()[this.day()]
    }
    let s = this.clone();
    s = s.day(input);
    return s
  },

  //either name or number
  month: function(input) {
    if (input !== undefined) {
      let s = this.clone();
      s.epoch = set$1.month(s, input);
      return s
    }
    return this.d.getMonth()
  }
};
var _02Date$1 = methods$2$1;

const clearMinutes$1 = s => {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s
};

const methods$3$1 = {
  // day 0-366
  dayOfYear: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.dayOfYear(s, num);
      return s
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0;
    let month = this.d.getMonth();
    let tmp;
    //count the num days in each month
    for (let i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years
      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month
      sum += tmp.getDate();
    }
    return sum + this.d.getDate()
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes$1(s);
      //don't go into last-year
      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }
      num -= 1; //1-based
      s = s.add(num, 'weeks');
      return s
    }
    //find-out which week it is
    let tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes$1(tmp);
    tmp = tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    }
    const thisOne = this.epoch;
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1
    }
    //speed it up, if we can
    let i = 0;
    let skipWeeks = this.month() * 4;
    tmp.epoch += milliseconds$1.week * skipWeeks;
    i += skipWeeks;
    for (; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i
      }
      tmp = tmp.add(1, 'week');
    }
    return 52
  },

  //'january'
  monthName: function(input) {
    if (input === undefined) {
      return months$2.long()[this.month()]
    }
    let s = this.clone();
    s = s.month(input);
    return s
  },

  //q1, q2, q3, q4
  quarter: function(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }
      if (quarters$1[num]) {
        let s = this.clone();
        let month = quarters$1[num][0];
        s = s.month(month);
        s = s.date(1);
        s = s.startOf('day');
        return s
      }
    }
    let month = this.d.getMonth();
    for (let i = 1; i < quarters$1.length; i++) {
      if (month < quarters$1[i][0]) {
        return i - 1
      }
    }
    return 4
  },

  //spring, summer, winter, fall
  season: function(input) {
    let hem = 'north';
    if (this.hemisphere() === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      let s = this.clone();
      for (let i = 0; i < seasons$1[hem].length; i++) {
        if (input === seasons$1[hem][i][0]) {
          s = s.month(seasons$1[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day');
        }
      }
      return s
    }
    let month = this.d.getMonth();
    for (let i = 0; i < seasons$1[hem].length - 1; i++) {
      if (month >= seasons$1[hem][i][1] && month < seasons$1[hem][i + 1][1]) {
        return seasons$1[hem][i][0]
      }
    }
    return 'winter'
  },

  //the year number
  year: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = set$1.year(s, num);
      return s
    }
    return this.d.getFullYear()
  },

  //bc/ad years
  era: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      str = str.toLowerCase();
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = s.d.getFullYear();
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        s.epoch = set$1.year(s, year * -1);
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        s.epoch = set$1.year(s, year * -1);
      }
      return s
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  }
};
var _03Year$1 = methods$3$1;

const methods$4$1 = Object.assign({}, _01Time$1, _02Date$1, _03Year$1);

//aliases
methods$4$1.milliseconds = methods$4$1.millisecond;
methods$4$1.seconds = methods$4$1.second;
methods$4$1.minutes = methods$4$1.minute;
methods$4$1.hours = methods$4$1.hour;
methods$4$1.hour24 = methods$4$1.hour;
methods$4$1.h12 = methods$4$1.hour12;
methods$4$1.h24 = methods$4$1.hour24;
methods$4$1.days = methods$4$1.day;

const addMethods$5 = Space => {
  //hook the methods into prototype
  Object.keys(methods$4$1).forEach(k => {
    Space.prototype[k] = methods$4$1[k];
  });
};

var query$1 = addMethods$5;

const order$1$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
let keep$1 = {
  second: order$1$1.slice(0, 1),
  minute: order$1$1.slice(0, 2),
  quarterhour: order$1$1.slice(0, 2),
  hour: order$1$1.slice(0, 3),
  date: order$1$1.slice(0, 4),
  month: order$1$1.slice(0, 4),
  quarter: order$1$1.slice(0, 4),
  season: order$1$1.slice(0, 4),
  year: order$1$1,
  decade: order$1$1,
  century: order$1$1
};
keep$1.week = keep$1.hour;
keep$1.season = keep$1.date;
keep$1.quarter = keep$1.date;

// Units need to be dst adjuested
const dstAwareUnits$1 = {
  year: true,
  quarter: true,
  season: true,
  month: true,
  week: true,
  day: true
};

const keepDate$1 = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
//month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough
const rollMonth$1 = (want, old) => {
  //increment year
  if (want.month > 0) {
    let years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    let years = Math.floor(Math.abs(want.month) / 13, 10);
    years = Math.abs(years) + 1;
    want.year = old.year() - years;
    //ignore extras
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want
};

const addMethods$1$1 = SpaceTime => {
  SpaceTime.prototype.add = function(num, unit) {
    let s = this.clone();
    if (!unit || num === 0) {
      return s //don't bother
    }
    let old = this.clone();
    unit = fns$1.normalize(unit);
    //move forward by the estimated milliseconds (rough)
    if (milliseconds$1[unit]) {
      s.epoch += milliseconds$1[unit] * num;
    } else if (unit === 'week') {
      s.epoch += milliseconds$1.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += milliseconds$1.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += milliseconds$1.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += milliseconds$1.minute * 15 * num;
    }
    //now ensure our milliseconds/etc are in-line
    let want = {};
    if (keep$1[unit]) {
      keep$1[unit].forEach(u => {
        want[u] = old[u]();
      });
    }

    if (dstAwareUnits$1[unit]) {
      const diff = old.timezone().current.offset - s.timezone().current.offset;
      s.epoch += diff * 3600 * 1000;
    }

    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num;
      //month is the one unit we 'model' directly
      want = rollMonth$1(want, old);
    }
    //support coercing a week, too
    if (unit === 'week') {
      let sum = old.date() + num * 7;
      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    }
    //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
      //specify a naive date number, if it's easy to do...
      let sum = old.date() + num;
      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
      //or if we haven't moved at all..
      else if (num !== 0 && old.isSame(s, 'day')) {
        want.date = old.date() + num;
      }
    }
    //ensure year has changed (leap-years)
    else if (unit === 'year' && s.year() === old.year()) {
      s.epoch += milliseconds$1.week;
    }
    //these are easier
    else if (unit === 'decade') {
      want.year = s.year() + 10;
    } else if (unit === 'century') {
      want.year = s.year() + 100;
    }
    //keep current date, unless the month doesn't have it.
    if (keepDate$1[unit]) {
      let max = monthLengths_1$1[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    walk_1$1(s, want);
    return s
  };

  //subtract is only add *-1
  SpaceTime.prototype.subtract = function(num, unit) {
    let s = this.clone();
    return s.add(num * -1, unit)
  };
  //add aliases
  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

var add$1 = addMethods$1$1;

//make a string, for easy comparison between dates
const print$1 = {
  millisecond: s => {
    return s.epoch
  },
  second: s => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-')
  },
  minute: s => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-')
  },
  hour: s => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-')
  },
  day: s => {
    return [s.year(), s.month(), s.date()].join('-')
  },
  week: s => {
    return [s.year(), s.week()].join('-')
  },
  month: s => {
    return [s.year(), s.month()].join('-')
  },
  quarter: s => {
    return [s.year(), s.quarter()].join('-')
  },
  year: s => {
    return s.year()
  }
};
print$1.date = print$1.day;

const addMethods$2$1 = SpaceTime => {
  SpaceTime.prototype.isSame = function(b, unit) {
    let a = this;
    if (!unit) {
      return null
    }
    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    }
    //support 'seconds' aswell as 'second'
    unit = unit.replace(/s$/, '');

    if (print$1[unit]) {
      return print$1[unit](a) === print$1[unit](b)
    }
    return null
  };
};

var same$1 = addMethods$2$1;

const addMethods$3$1 = SpaceTime => {
  const methods = {
    isAfter: function(d) {
      d = fns$1.beADate(d, this);
      let epoch = fns$1.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch > epoch
    },
    isBefore: function(d) {
      d = fns$1.beADate(d, this);
      let epoch = fns$1.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch < epoch
    },
    isEqual: function(d) {
      d = fns$1.beADate(d, this);
      let epoch = fns$1.getEpoch(d);
      if (epoch === null) {
        return null
      }
      return this.epoch === epoch
    },
    isBetween: function(start, end) {
      start = fns$1.beADate(start, this);
      end = fns$1.beADate(end, this);
      let startEpoch = fns$1.getEpoch(start);
      if (startEpoch === null) {
        return null
      }
      let endEpoch = fns$1.getEpoch(end);
      if (endEpoch === null) {
        return null
      }
      return startEpoch < this.epoch && this.epoch < endEpoch
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

var compare$1 = addMethods$3$1;

const addMethods$4$1 = SpaceTime => {
  const methods = {
    i18n: data => {
      //change the day names
      if (fns$1.isObject(data.days)) {
        days$1.set(data.days);
      }
      //change the month names
      if (fns$1.isObject(data.months)) {
        months$2.set(data.months);
      }
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

var i18n$1 = addMethods$4$1;

let timezones$1 = unpack$1;

//fake timezone-support, for fakers (es5 class)
const SpaceTime$1 = function(input$1$1, tz, options = {}) {
  //the holy moment
  this.epoch = null;
  //the shift for the given timezone
  this.tz = find$1(tz, timezones$1);
  //whether to output warnings to console
  this.silent = options.silent || true;

  //does the week start on sunday, or monday:
  this._weekStart = 1; //default to monday
  if (options.weekStart !== undefined) {
    this._weekStart = options.weekStart;
  }
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let offset = quick$1(this);
      //every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0;
      //movement
      let shift = bias + offset * 60; //in minutes
      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset
      let epoch = this.epoch + shift;
      let d = new Date(epoch);
      return d
    }
  });
  //add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: () => timezones$1,
    set: obj => {
      timezones$1 = obj;
      return obj
    }
  });
  //parse the various formats
  if (input$1$1 !== undefined || input$1$1 === null) {
    let tmp = input$1(this, input$1$1, tz);
    this.epoch = tmp.epoch;
  }
};

//(add instance methods to prototype)
Object.keys(methods_1$2).forEach(k => {
  SpaceTime$1.prototype[k] = methods_1$2[k];
});

// ¯\_(ツ)_/¯
SpaceTime$1.prototype.clone = function() {
  return new SpaceTime$1(this.epoch, this.tz, {
    silent: this.silent,
    weekStart: this._weekStart
  })
};

//append more methods
query$1(SpaceTime$1);
add$1(SpaceTime$1);
same$1(SpaceTime$1);
compare$1(SpaceTime$1);
i18n$1(SpaceTime$1);

var spacetime$3 = SpaceTime$1;

// const timezones = require('../data');

const whereIts$1 = (a, b) => {
  let start = new spacetime$3(null);
  let end = new spacetime$3(null);
  start = start.time(a);
  //if b is undefined, use as 'within one hour'
  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  let startHour = start.hour();
  let endHour = end.hour();
  let tzs = Object.keys(start.timezones).filter(tz => {
    if (tz.indexOf('/') === -1) {
      return false
    }
    let m = new spacetime$3(null, tz);
    let hour = m.hour();
    //do 'calendar-compare' not real-time-compare
    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false
      }
      if (hour === endHour && m.minute() > end.minute()) {
        return false
      }
      return true
    }
    return false
  });
  return tzs
};
var whereIts_1$1 = whereIts$1;

var _version$1 = '6.0.0';

const main$1$1 = (input, tz, options) => new spacetime$3(input, tz, options);

//some helper functions on the main method
main$1$1.now = (tz, options) => new spacetime$3(new Date().getTime(), tz, options);
main$1$1.today = (tz, options) => {
  let s = new spacetime$3(new Date().getTime(), tz, options);
  return s.startOf('day')
};
main$1$1.tomorrow = (tz, options) => {
  let s = new spacetime$3(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day')
};
main$1$1.yesterday = (tz, options) => {
  let s = new spacetime$3(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day')
};
main$1$1.extend = function(obj) {
  Object.keys(obj).forEach(k => {
    spacetime$3.prototype[k] = obj[k];
  });
  return this
};
//find tz by time
main$1$1.whereIts = whereIts_1$1;
main$1$1.version = _version$1;

//aliases:
main$1$1.plugin = main$1$1.extend;
var src$1 = main$1$1;

var spacetime$1$1 = /*#__PURE__*/Object.freeze({
  'default': src$1
});

const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }
  while (arr.length > n) {
    //remove every other one
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    });
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
};
var _reduce = reduceTo;

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = [];
  start = start.add(1, unit);
  start = start.startOf(unit);
  while (start.isBefore(end)) {
    ticks.push(start);
    start = start.add(1, unit);
  }
  return ticks
};

const formatTicks = function(arr, fmt, start, end) {
  let delta = end.epoch - start.epoch;
  return arr.map(s => {
    let percent = (s.epoch - start.epoch) / delta;
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
};

const methods$5$1 = {
  centuries: (start, end, n) => {
    let ticks = allTicks(start, end, 'century');
    ticks = _reduce(ticks, n);
    let fmt = '{year}';
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  decades: (start, end, n) => {
    let ticks = allTicks(start, end, 'decade');
    ticks = _reduce(ticks, n);
    let fmt = '{year}';
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  years: (start, end, n) => {
    let ticks = allTicks(start, end, 'year');
    ticks = _reduce(ticks, n);
    let fmt = '{month-short} {year-short}';
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  months: (start, end, n) => {
    let ticks = allTicks(start, end, 'month');
    ticks = _reduce(ticks, n);
    let fmt = '{month-short} {date}';
    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}';
    }
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  days: (start, end, n) => {
    let ticks = allTicks(start, end, 'day');
    ticks = _reduce(ticks, n);
    let fmt = '{month-short} {date}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  hours: (start, end, n) => {
    let ticks = allTicks(start, end, 'hour');
    ticks = _reduce(ticks, n);
    let fmt = '{time}';
    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}';
    }
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  },
  minutes: (start, end, n) => {
    let ticks = allTicks(start, end, 'minute');
    ticks = _reduce(ticks, n);
    let fmt = '{time}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks
  }
};
var methods_1$1$1 = methods$5$1;

var _version$1$1 = '0.2.0';

function getCjsExportFromNamespace$1$1 (n) {
	return n && n['default'] || n;
}

var spacetime$2$1 = getCjsExportFromNamespace$1$1(spacetime$1$1);

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end);
  if (diff.years > 300) {
    return methods_1$1$1.centuries(start, end, n)
  }
  if (diff.years > 30) {
    return methods_1$1$1.decades(start, end, n)
  }
  if (diff.years > 3) {
    return methods_1$1$1.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods_1$1$1.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods_1$1$1.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods_1$1$1.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods_1$1$1.minutes(start, end, n)
  }
  return methods_1$1$1.months(start, end, n)
};

//flip it around backwards
const reverseTicks = function(ticks) {
  ticks = ticks.map(o => {
    o.value = 1 - o.value;
    return o
  });
  return ticks.reverse()
};

const spacetimeTicks = function(start, end, n = 6) {
  let reverse = false;
  start = spacetime$2$1(start);
  end = spacetime$2$1(end);
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    reverse = true;
    let tmp = start.epoch;
    start.epoch = end.epoch;
    end.epoch = tmp;
  }
  let ticks = chooseMethod(start, end, n);
  //support backwards ticks
  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }
  return ticks
};
spacetimeTicks.version = _version$1$1;

var src$1$1 = spacetimeTicks;

var spacetimeTicks$1 = /*#__PURE__*/Object.freeze({
	'default': src$1$1
});

var somehowTicks = createCommonjsModule(function (module, exports) {
/* somehow v0.0.3
   github.com/spencermountain/somehow-ticks
   MIT
*/

(function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){

module.exports = {
  trillion: 1000000000000,
  billion: 1000000000,
  million: 1000000,
  hundredThousand: 100000,
  tenThousand: 10000,
  thousand: 1000,
  hundred: 100,
  ten: 10,
  one: 1,
  tenth: 0.1,
  hundredth: 0.01,
  thousandth: 0.01
};

},{}],2:[function(_dereq_,module,exports){

var n = _dereq_('./_constants');

var prettyNum = function prettyNum(num) {
  num = parseFloat(num);

  if (num >= n.trillion) {
    num = parseInt(num / 100000000000, 10) * 100000000000;
    return num / n.trillion + 't';
  }

  if (num >= n.billion) {
    num = parseInt(num / 100000000, 10) * 100000000;
    return num / n.billion + 'b';
  }

  if (num >= n.million) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / n.million + 'm';
  }

  if (num >= n.tenThousand) {
    num = parseInt(num / n.thousand, 10) * n.thousand;
    return num / n.thousand + 'k';
  }

  if (num >= n.thousand) {
    num = parseInt(num / n.hundred, 10) * n.hundred;
    return num / n.thousand + 'k';
  }

  return num.toLocaleString();
};

module.exports = prettyNum;

},{"./_constants":1}],3:[function(_dereq_,module,exports){

// const zeroPad = (str, len = 2) => {
//   let pad = '0'
//   str = str + ''
//   return str.length >= len
//     ? str
//     : new Array(len - str.length + 1).join(pad) + str
// }
//
// const preferZeros = function(arr, ticks) {
//   const max = String(arr[arr.length - 1] || '').length
//   const zeroArr = arr.map(a => {
//     let str = zeroPad(String(a), max)
//     const zeros = (str.match(/0/g) || []).length
//     return [a, zeros]
//   })
//   let ranked = zeroArr.sort((a, b) => (a[1] < b[1] ? 1 : -1))
//   console.log(ranked)
//   return ranked
//     .map(a => a[0])
//     .slice(0, ticks)
//     .sort()
// }
var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  } //try filtering-down by # of non-zero digits used
  // let tmp = preferZeros(arr, n)
  // if (tmp.length > 0 && tmp.length <= n) {
  //   return tmp
  // }
  //otherwise, remove every other selection (less good)


  while (arr.length > n) {
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
};

module.exports = reduceTo;

},{}],4:[function(_dereq_,module,exports){

var methods = _dereq_('./methods');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = Math.abs(end - start);

  if (diff === 0) {
    return [];
  } //1 million


  if (diff > 3000000) {
    return methods.millions(start, end, n);
  } //100k


  if (diff > 300000) {
    return methods.hundredKs(start, end, n);
  } //1k


  if (diff > 3000) {
    return methods.thousands(start, end, n);
  } //100


  if (diff > 300) {
    return methods.hundreds(start, end, n);
  } //10


  if (diff > 30) {
    return methods.tens(start, end, n);
  } //1


  if (diff > 3) {
    return methods.ones(start, end, n);
  } //.1


  if (diff > 0.3) {
    return methods.tenths(start, end, n);
  } //.01


  return methods.hundredths(start, end, n);
}; //flip it around backwards


var reverseTicks = function reverseTicks(ticks) {
  ticks = ticks.map(function (o) {
    o.value = 1 - o.value;
    return o;
  });
  return ticks.reverse();
}; //


var somehowTicks = function somehowTicks(start, end, n) {
  var reverse = false;
  start = Number(start);
  end = Number(end); //reverse them, if necessary

  if (start > end) {
    reverse = true;
    var tmp = start;
    start = end;
    end = tmp;
  }

  var ticks = chooseMethod(start, end, n); //support backwards ticks

  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }

  return ticks;
};

module.exports = somehowTicks;

},{"./methods":5}],5:[function(_dereq_,module,exports){

var reduceTo = _dereq_('./_reduce');

var prettyNum = _dereq_('./_prettyNum');

var c = _dereq_('./_constants');

var roundDown = function roundDown(n, unit) {
  return Math.floor(n / unit) * unit;
}; //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var inc = unit / 2; //increment by .5

  var ticks = [];
  start = start += unit;
  start = roundDown(start, unit);

  while (start < end) {
    ticks.push(start);
    start = start += inc;
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end - start;
  return arr.map(function (s) {
    var percent = (s - start) / delta;
    return {
      label: prettyNum(s),
      number: s,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  millions: function millions(start, end, n) {
    var ticks = allTicks(start, end, c.million);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundredKs: function hundredKs(start, end, n) {
    var ticks = allTicks(start, end, c.hundredThousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'k', start, end);
    return ticks;
  },
  thousands: function thousands(start, end, n) {
    var ticks = allTicks(start, end, c.thousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundreds: function hundreds(start, end, n) {
    var ticks = allTicks(start, end, c.hundred);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  tens: function tens(start, end, n) {
    var ticks = allTicks(start, end, c.ten);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  ones: function ones(start, end, n) {
    var ticks = allTicks(start, end, c.one);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  tenths: function tenths(start, end, n) {
    var ticks = allTicks(start, end, c.tenth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  hundredths: function hundredths(start, end, n) {
    var ticks = allTicks(start, end, c.hundredth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  }
};
module.exports = methods;

},{"./_constants":1,"./_prettyNum":2,"./_reduce":3}]},{},[4])(4)
});
});

var spacetimeTicks$2 = getCjsExportFromNamespace(spacetimeTicks$1);

const generic = function(axis, n = 5) {
  let scale = axis.scale;
  let start = scale.min || 0;
  let end = scale.max || 0;
  let ticks = somehowTicks(start, end, n);
  return ticks
};

const date = function(axis, n = 5) {
  let scale = axis.scale;
  let start = scale.min || 0;
  let end = scale.max || 0;
  let ticks = spacetimeTicks$2(start, end, n);
  return ticks
};
var _ticks = {
  generic: generic,
  date: date
};

const bil = 1000000000;
const mil = 1000000;
const tenThou = 10000;
const thou = 1000;

const prettyNum = function(num) {
  num = parseFloat(num);
  if (num >= bil) {
    num = parseInt(num / 100000000, 10) * 100000000;
    return num / mil + 'b'
  }
  if (num >= mil) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / mil + 'm'
  }
  if (num >= tenThou) {
    num = parseInt(num / thou, 10) * thou;
    return num / thou + 'k'
  }
  if (num >= thou) {
    num = parseInt(num / 100, 10) * 100;
    return num / thou + 'k'
  }
  return num.toLocaleString()
};
var _prettyNum = prettyNum;

const drawTick = function(s, axis) {
  let scale = axis.scale.scale;
  let label = null;
  //support {label, value} format
  if (typeof s === 'object' && s !== null) {
    label = s.label;
    s = s.value;
  }
  //support 'june 5th'
  if (typeof s === 'string') {
    s = spacetime$2(s);
    return {
      num: s.epoch, //val
      pos: parseInt(scale(s.epoch), 10), //x/y
      label: label || s.format(axis._fmt || '{month} {year}') //text
    }
  }
  //support '52'
  let num = Number(s);
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: label || _prettyNum(num)
  }
};
var _custom = drawTick;

const defaults$2 = {
  stroke: '#d7d5d2',
  'stroke-width': 1,
  'vector-effect': 'non-scaling-stroke'
};

class Axis {
  constructor(obj = {}, world) {
    this.world = world;
    this.attrs = Object.assign({}, defaults$2, obj);
    this.scale = null;
    this._tickCount = 6;
    this._fmt = undefined;
    this._given = undefined;
    this._show = true;
    this._label = '';
  }
  color(color) {
    this.attrs.stroke = spencerColor[color] || color;
    return this
  }
  label(str) {
    this._label = str;
    return this
  }
  remove() {
    this._show = false;
    return this
  }
  format(str) {
    this._fmt = str;
    return this
  }
  show() {
    this._show = true;
    return this
  }
  ticks(n) {
    if (typeof n === 'number') {
      this._tickCount = n;
    } else if (typeof n === 'object') {
      this._given = n;
    }
    if (this._given) {
      return this._given.map(o => _custom(o, this))
    }
    if (this.scale.format() === 'date') {
      return _ticks.date(this, this._tickCount)
    }
    return _ticks.generic(this, this._tickCount)
  }
}
var Axis_1 = Axis;

class XAxis extends Axis_1 {
  constructor(obj = {}, world) {
    super(obj, world);
    this.scale = world.x;
  }
  drawTicks(y) {
    let h = this.world.html;
    return this.ticks().map(o => {
      console.log(o.label);
      return h`<text x="${o.value * 100 + '%'}" y="${y + 5}" fill="${
        this.attrs.stroke
      }" text-anchor="middle" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html;
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs;
    let width = this.world.width;
    let y = this.world.height;
    let ticks = this.drawTicks(y);
    let textAttrs = {
      x: '50%',
      y: '115%',
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    };
    return h`<g>
      ${ticks}
      <line x1="${0}" y1="${y}" x2="${width}" y2="${y}" ...${attrs} stroke="#d7d5d2" />
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
var XAxis_1 = XAxis;

class YAxis extends Axis_1 {
  constructor(obj = {}, world) {
    super(obj, world);
    this.scale = world.y;
  }
  drawTicks(x) {
    let h = this.world.html;
    return this.ticks().map(o => {
      let percent = o.value * 100;
      percent = 100 - percent;
      return h`<text x="${x}" y="${percent + '%'}" dy="0" dx="-2px" fill="${
        this.attrs.stroke
      }" text-anchor="end" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html;
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs;
    let height = this.world.height;
    let x = 0;
    let ticks = this.drawTicks(x);
    let textAttrs = {
      x: '-5%',
      y: '50%',
      fill: this.attrs.stroke,
      style: 'text-anchor:end;'
    };
    return h`<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
var YAxis_1 = YAxis;

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function constant(x) {
  return function constant() {
    return x;
  };
}

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon$1 = 1e-12;
var pi$1 = Math.PI;
var halfPi = pi$1 / 2;
var tau$1 = 2 * pi$1;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon$1) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon$1)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau$1 - epsilon$1) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$1) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$1) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$1) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon$1) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon$1) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon$1) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00),
            oc;

        // Restrict the corner radius according to the sector angle.
        if (da < pi$1 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$1)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$1) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$1) || !(da0 > epsilon$1)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$1) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line() {
  var x$1 = x,
      y$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

function pie() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau$1),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

var slice = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$1 = x,
      y$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = path();
    curve(context, +x$1.apply(this, (argv[0] = s, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link) : x$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link) : y$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi$1);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810,
    kr = Math.sin(pi$1 / 10) / Math.sin(7 * pi$1 / 10),
    kx = Math.sin(tau$1 / 10) * kr,
    ky = -Math.cos(tau$1 / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau$1 * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

function symbol() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop() {}

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$1) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$1) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$1(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
}

function diverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$1(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$1(series) {
  return ascending(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$1(series).reverse();
}



var src$2 = /*#__PURE__*/Object.freeze({
	arc: arc,
	area: area,
	line: line,
	pie: pie,
	areaRadial: areaRadial,
	radialArea: areaRadial,
	lineRadial: lineRadial$1,
	radialLine: lineRadial$1,
	pointRadial: pointRadial,
	linkHorizontal: linkHorizontal,
	linkVertical: linkVertical,
	linkRadial: linkRadial,
	symbol: symbol,
	symbols: symbols,
	symbolCircle: circle,
	symbolCross: cross,
	symbolDiamond: diamond,
	symbolSquare: square,
	symbolStar: star,
	symbolTriangle: triangle,
	symbolWye: wye,
	curveBasisClosed: basisClosed,
	curveBasisOpen: basisOpen,
	curveBasis: basis,
	curveBundle: bundle,
	curveCardinalClosed: cardinalClosed,
	curveCardinalOpen: cardinalOpen,
	curveCardinal: cardinal,
	curveCatmullRomClosed: catmullRomClosed,
	curveCatmullRomOpen: catmullRomOpen,
	curveCatmullRom: catmullRom,
	curveLinearClosed: linearClosed,
	curveLinear: curveLinear,
	curveMonotoneX: monotoneX,
	curveMonotoneY: monotoneY,
	curveNatural: natural,
	curveStep: step,
	curveStepAfter: stepAfter,
	curveStepBefore: stepBefore,
	stack: stack,
	stackOffsetExpand: expand,
	stackOffsetDiverging: diverging,
	stackOffsetNone: none,
	stackOffsetSilhouette: silhouette,
	stackOffsetWiggle: wiggle,
	stackOrderAppearance: appearance,
	stackOrderAscending: ascending,
	stackOrderDescending: descending$1,
	stackOrderInsideOut: insideOut,
	stackOrderNone: none$1,
	stackOrderReverse: reverse
});

const { parseX: parseX$3, parseY: parseY$3 } = parse_1;

//a very-flexible input language
const parseStr = function(str = '', world) {
  let lines = str.split(/\n/g);
  lines = lines.filter(l => l);
  lines = lines.map(line => {
    let split = line.split(/(,|\t) ?/).map(s => s.trim());
    let x = parseX$3(split[0], world);
    let y = parseY$3(split[2], world);
    let obj = {
      x: x,
      y: y
    };
    //y2 is bottom of an area
    if (split[4] !== undefined) {
      obj.y2 = parseY$3(split[4], world);
    }
    return obj
  });
  return lines
};

const parseInput$2 = function(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world)
  }
  return set.map(a => {
    let x = parseX$3(a[0], world);
    let y = parseY$3(a[1], world);
    let obj = {
      x: x,
      y: y
    };
    //y2 is bottom of an area
    if (a[2] !== undefined) {
      obj.y2 = parseY$3(a[2], world);
    }
    return obj
  })
};

var parseInput_1 = parseInput$2;

const colors = spencerColor.colors;


const { parseX: parseX$4, parseY: parseY$4 } = parse_1;

const defaults$3 = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality',
  'vector-effect': 'non-scaling-stroke'
};

class Shape {
  constructor(obj = {}, world) {
    this.world = world;
    this.data = obj.data || [];
    this._id = obj.id || _fns.uid('input');
    this.attrs = Object.assign({}, defaults$3, obj);
    this.style = {};
    this.curve = src$2.curveMonotoneX;
    this._shape = 1;
    this._title = '';
    this._click = obj.click;
    this._hover = obj.hover;
    //nudge pixels
    this._dx = 0;
    this._dy = 0;
    this.ignore_clip = false;
  }
  //don't clip some shapes
  clip(bool) {
    this.ignore_clip = bool;
    return this
  }
  straight() {
    this.curve = src$2.curveLinear;
    return this
  }
  id(str) {
    this._id = str;
    return this
  }
  soft() {
    this.curve = src$2.curveBasis;
    return this
  }
  dx(n) {
    this._dx = n;
    return this
  }
  dy(n) {
    this._dy = n;
    return this
  }
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) {
      this.set([[x, y]]);
      return this
    }
    //vertical line
    if (x || x === 0) {
      this.set([[x, '0%'], [x, '100%']]);
      return this
    }
    //horizontal line
    if (y || y === 0) {
      this.set([['0%', y], ['100%', y]]);
    }
    return this
  }
  extent() {
    let xArr = [];
    let yArr = [];
    this.data.forEach(o => {
      if (o.x.type !== 'pixel') {
        xArr.push(o.x.value);
      }
      if (o.y.type !== 'pixel') {
        yArr.push(o.y.value);
      }
      if (o.y2 && o.y2.type !== 'pixel') {
        yArr.push(o.y2.value);
      }
    });
    return {
      x: _fns.extent(xArr),
      y: _fns.extent(yArr)
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color;
    return this
  }
  opacity(n) {
    this.attrs.opacity = n;
    return this
  }
  title(str) {
    this._title = str;
    return this
  }
  set(str) {
    this.data = parseInput_1(str, this.world);
    return this
  }
  from(x, y) {
    this.data[0] = {
      x: parseX$4(x, this.world),
      y: parseY$4(y, this.world)
    };
    return this
  }
  to(x, y) {
    this.data[1] = {
      x: parseX$4(x, this.world),
      y: parseY$4(y, this.world)
    };
    return this
  }
  //set any listeners on the dom element
  onMount() {
    if (!this._click && !this._hover) {
      return
    }
    //wait for mount
    setTimeout(() => {
      let el = document.getElementById(this._id);
      if (!el) {
        return
      }
      if (this._click) {
        el.addEventListener('click', () => {
          this._click(this);
        });
      }
      if (this._hover) {
        el.addEventListener('mouseenter', () => {
          this._hover(this);
        });
      }
    }, 50);
  }
  click(fn) {
    this._click = fn;
  }
  hover(fn) {
    this._hover = fn;
  }
  //x,y coordinates
  points() {
    let { x, y } = this.world;
    let points = this.data.map(o => {
      let arr = [x.place(o.x), y.place(o.y)];
      if (o.y2 !== undefined) {
        arr.push(y.place(o.y2));
      }
      arr[0] += this._dx;
      arr[1] += this._dy;
      return arr
    });
    return points
  }
  path() {
    let zero = this.world.y.place(parseY$4(0));
    let points = this.points();
    return src$2
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(src$2.curveMonotoneX)(points)
  }
  drawSyle() {
    return Object.keys(this.style)
      .map(k => {
        return `${k}:${this.style[k]};`
      })
      .join(' ')
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    });
    return h`<path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>`
  }
}
var Shape_1 = Shape;

const colors$1 = spencerColor.colors;


const { parseY: parseY$5 } = parse_1;

const defaults$4 = {
  fill: colors$1.green,
  stroke: colors$1.green,
  'fill-opacity': 0.25,
  'stroke-width': 2
};

class Area extends Shape_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$4, obj);
    super(obj, world);
    this._line = 2;
  }
  color(color) {
    this.attrs.stroke = colors$1[color] || color;
    this.attrs.fill = colors$1[color] || color;
    return this
  }
  line(num) {
    this._line = num;
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n;
    return this
  }
  areaPath() {
    let points = this.points();
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return src$2
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    let zero = this.world.y.place(parseY$5(0));
    return src$2
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(this.curve)(points)
  }
  linePath() {
    let points = this.points();
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return src$2
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    return src$2
      .area()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    });
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}"/>`;
    if (!this._line) {
      return area
    }
    //draw a line on top
    let lineAttr = Object.assign({}, this.attrs, {
      d: this.linePath(),
      fill: 'none'
    });
    let line = h`<path ...${lineAttr} style="${this.drawSyle()}">
        <title>${this._title}</title>
      </path>`;
    return [line, area]
  }
}

var Area_1 = Area;

const colors$2 = spencerColor.colors;


const defaults$5 = {
  fill: colors$2.green,
  stroke: colors$2.green,
  'fill-opacity': 0.25,
  'stroke-width': 1
};

class Rect extends Shape_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$5, obj);
    super(obj, world);
    this._rounded = 3;
    this._width = undefined;
    this._height = undefined;
  }
  color(color) {
    this.attrs.stroke = colors$2[color] || color;
    this.attrs.fill = colors$2[color] || color;
    return this
  }
  border(n) {
    this.attrs['stroke-width'] = n;
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n;
    return this
  }
  width(n) {
    this._width = n;
    return this
  }
  height(n) {
    this._height = n;
    return this
  }
  rounded(r) {
    this._rounded = r;
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let points = this.points();
    let a = points[0];
    let b = points[1] || 0;
    let width = Math.abs(b[0] - a[0]);
    let height = Math.abs(b[1] - a[1]);
    if (this._width !== undefined) {
      width = this._width;
    }
    if (this._height !== undefined) {
      height = this._height;
    }
    let attrs = Object.assign({}, this.attrs, {
      x: a[0],
      y: a[1] - height,
      width: width,
      height: height,
      rx: this._rounded
    });
    return h`<rect ...${attrs} >
      <title>${this._title}</title>
    </rect>` //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
  }
}

var Rect_1 = Rect;

const colors$3 = spencerColor.colors;



const defaults$6 = {
  fill: 'none',
  stroke: colors$3.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
};

class Line extends Shape_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$6, obj);
    super(obj, world);
  }
  color(color) {
    this.attrs.stroke = colors$3[color] || color;
    return this
  }
  dotted(n) {
    if (n === true) {
      n = 4;
    }
    this.attrs['stroke-dasharray'] = n || 4;
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num;
    return this
  }
  path() {
    let points = this.points();
    return src$2
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
}

var Line_1 = Line;

const colors$4 = spencerColor.colors;

const defaults$7 = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round',
  'font-size': 5
};

class Text extends Shape_1 {
  constructor(obj = {}, world) {
    let text = null;
    let textFn = null;
    if (typeof obj === 'string') {
      text = [obj];
      obj = {};
    } else if (typeof obj === 'function') {
      textFn = obj;
      obj = {};
    } else if (Array.isArray(obj)) {
      text = obj;
      obj = [];
    }
    obj = Object.assign({}, defaults$7, obj);
    super(obj, world);
    this.textLines = text || obj.text || [];
    this.textFn = textFn;
    if (typeof this.textLines === 'string') {
      this.textLines = [this.textLines];
    }
    this._order = 0;
    this.data = [
      {
        x: {
          value: 50,
          type: 'percent'
        },
        y: {
          value: 50,
          type: 'percent'
        }
      }
    ];
    this._dodge = {
      x: 0,
      y: 4
    };
    this._underline = '';
  }
  before(x, y) {
    this.attrs['text-anchor'] = 'end';
    this.set([[x, y]]);
    return this
  }
  after(x, y) {
    this.attrs['text-anchor'] = 'start';
    this.set([[x, y]]);
    return this
  }
  center(x, y) {
    this.attrs['text-anchor'] = 'middle';
    if (x !== undefined) {
      this.set([[x, y]]);
    }
    return this
  }
  left() {
    this.attrs['text-anchor'] = 'start';
    return this
  }
  right() {
    this.attrs['text-anchor'] = 'end';
    return this
  }
  color(color) {
    this.attrs.fill = colors$4[color] || color;
    return this
  }
  dy(n = 0) {
    this._dodge.y = n * -1;
    return this
  }
  dx(n = 0) {
    this._dodge.x = n;
    return this
  }
  dodge(x, y) {
    x = x || this._dodge.x;
    y = y || this._dodge.y;
    this._dodge.x = x * -1;
    this._dodge.y = y * -1;
    return this
  }
  font(num) {
    if (typeof num === 'number') {
      num += 'px';
    }
    this.style['font-size'] = num;
    return this
  }
  size(num) {
    return this.font(num)
  }
  extent() {
    // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
    // let width = longest.length * 8
    // let height = this.textLines.length * 20
    let d = this.data[0] || {};
    return {
      x: {
        min: d.x.value,
        max: d.x.value
      },
      y: {
        min: d.y.value, // - height,
        max: d.y.value
      }
    }
  }
  text(text) {
    if (typeof text === 'string') {
      this.textLines = [text];
    } else if (typeof text === 'function') {
      this.textLines = [];
      this.textFn = text;
    } else {
      this.textLines = text;
    }
    return this
  }
  path() {
    return ''
  }
  estimate() {
    let textArr = this.textLines;
    if (this.textFn !== null) {
      textArr = this.textFn(this.world);
      textArr = typeof textArr === 'string' ? [textArr] : textArr;
    }
    //calculate height
    let height = 24;
    if (this.style['font-size']) {
      let num = this.style['font-size'].replace('px', '');
      num = Number(num);
      height = num * 1.5;
    }
    height *= textArr.length;
    //calculate width
    let width = 0;
    textArr.forEach(str => {
      let w = str.length * 8;
      if (w > width) {
        width = w;
      }
    });
    return {
      height: height,
      width: width
    }
  }
  position() {
    let point = this.points()[0];
    let res = {
      x: 0,
      y: 0
    };
    if (!point) {
      return res
    }
    let { height, width } = this.estimate();
    res.height = height;
    res.width = width;
    res.y = point[1] + this._dodge.y - height;
    res.x = point[0] + 2 + this._dodge.x;
    return res
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let textArr = this.textLines;
    if (this.textFn !== null) {
      textArr = this.textFn(this.world);
      textArr = typeof textArr === 'string' ? [textArr] : textArr;
    }
    console.log(this.attrs);
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em" >${String(str)}</tspan>`);
    let { x, y } = this.position();
    let transform = `translate(${x} ${y})`;
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs} class="somehow-legible">
        ${inside}
      </text>
    </g>`
  }
}

var Text_1 = Text;

const colors$5 = spencerColor.colors;


const defaults$8 = {
  fill: colors$5.blue,
  stroke: 'none'
};

class Dot extends Shape_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$8, obj);
    super(obj, world);
    this._radius = obj.radius || 5;
  }
  radius(r) {
    this._radius = r;
    return this
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let point = this.points()[0];
    let attrs = Object.assign({}, this.attrs, {
      id: this._id,
      cx: point[0],
      cy: point[1],
      r: this._radius
    });
    return h`<circle ...${attrs} ><title>${this._title}</title></circle>`
  }
}

var Dot_1 = Dot;

const colors$6 = spencerColor.colors;


const defaults$9 = {
  'text-anchor': 'start',
  'font-size': 5,
  class: 'somehow-legible'
};

class Annotation extends Text_1 {
  constructor(obj = {}, world) {
    super(obj, world);
    this.attrs = Object.assign({}, defaults$9, this.attrs);
    this._nudge = {
      x: 0,
      y: 0
    };
    this._title = '';
  }
  on(x, y) {
    this.at(x, y);
    return this
  }
  title(txt) {
    this._title = txt;
    return this
  }
  nudge(x, y) {
    //always in pixels
    this._nudge.x = x;
    this._nudge.y = y;
    return this
  }
  drawText() {
    let h = this.world.html;
    let nudge = this._nudge;
    let textArr = this.textLines;
    if (this.textFn !== null) {
      textArr = this.textFn(this.world);
      textArr = typeof textArr === 'string' ? [textArr] : textArr;
    }
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em">${String(str)}</tspan>`);
    let point = this.position();
    let estimate = this.estimate();
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y //- estimate.height,
    };
    let transform = `translate(${place.x} ${place.y})`;
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${-2}" y1="${estimate.height}" x2="${estimate.width}" y2="${
      estimate.height
    }" style="stroke-width:1.5px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;"  stroke=${
      colors$6.grey
    }/>
    </g>`
  }
  drawRange() {
    let h = this.world.html;
    let points = this.points();
    if (points.length <= 1) {
      return null
    }
    let size = 4;
    let style =
      'stroke-width:2px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;';
    let top = points[0];
    let bottom = points[1];
    //for a vertical range...
    let ticks = h`<g>
      <line x1="${top[0] - size}" y1="${top[1]}" x2="${top[0] + size}" y2="${
      top[1]
    }" style="${style}" stroke=${colors$6.grey}/>
      <line x1="${bottom[0] - size}" y1="${bottom[1]}" x2="${bottom[0] + size}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors$6.grey}/>
    </g>
    `;
    //for a horizontal range
    if (top[0] !== bottom[0]) {
      ticks = h`<g>
        <line x1="${top[0]}" y1="${top[1] - size}" x2="${top[0]}" y2="${top[1] +
        size}" style="${style}" stroke=${colors$6.grey}/>
        <line x1="${bottom[0]}" y1="${bottom[1] - size}" x2="${bottom[0]}" y2="${bottom[1] +
        size}" style="${style}" stroke=${colors$6.grey}/>
      </g>
      `;
    }
    return h`<g>
      <line x1="${top[0]}" y1="${top[1]}" x2="${bottom[0]}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors$6.grey}/>
      ${ticks}
    </g>`
  }
  getPoint() {
    let points = this.points();
    if (points.length <= 1) {
      return points[0]
    }
    //the middle point?
    let xDiff = points[0][0] - points[1][0];
    let yDiff = points[0][1] - points[1][1];
    return [points[0][0] - xDiff / 2, points[0][1] - yDiff / 2]
  }
  drawLine() {
    let h = this.world.html;
    let nudge = this._nudge;
    let point = this.getPoint();
    let start = this.points()[0];
    let textPoint = {
      x: start[0] + nudge.x,
      y: start[1] - nudge.y + 4
    };
    //touch the right side, instead
    if (nudge.x < 0) {
      let estimate = this.estimate();
      textPoint.x += estimate.width;
    }
    return h`<line id="line" x1="${textPoint.x}" y1="${textPoint.y}" x2="${point[0]}" y2="${
      point[1]
    }" style="stroke-width:2px; shapeRendering:optimizeQuality;" vector-effect="non-scaling-stroke" stroke=${
      colors$6.grey
    }/>`
  }
  build() {
    let h = this.world.html;
    this.onMount();
    return h`<g id="build">
      ${this.drawText()}
      ${this.drawLine()}
      ${this.drawRange()}
    </g>`
  }
}
var Annotation_1 = Annotation;

const { parseY: parseY$6 } = parse_1;



class Midarea extends Area_1 {
  constructor(obj, world) {
    super(obj, world);
    this._zero = this.world.y.place(parseY$6(0));
  }
  zero(y) {
    this._zero = y;
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n;
    return this
  }
  set(str) {
    this.data = parseInput_1(str, this.world);
    //add the bottom part, to data
    this.data.forEach(o => {
      o.y.value /= 2;
      o.y2 = Object.assign({}, o.y);
      o.y2.value *= -1;
    });
    return this
  }
  topLine(points) {
    return src$2
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  bottomLine(points) {
    return src$2
      .line()
      .x(d => d[0])
      .y(d => d[2])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    });
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}">
      <title>${this._title}</title>
    </path>`;
    if (!this._line) {
      return area
    }
    let points = this.points();

    //draw a line on top
    let topLine = Object.assign({}, this.attrs, {
      d: this.topLine(points),
      fill: 'none'
    });
    topLine = h`<path ...${topLine} style="${this.drawSyle()}"/>`;

    //draw a line on the bottom
    let bottomLine = Object.assign({}, this.attrs, {
      d: this.bottomLine(points),
      fill: 'none'
    });
    bottomLine = h`<path ...${bottomLine} style="${this.drawSyle()}"/>`;
    return [topLine, area, bottomLine]
  }
}
var MidArea = Midarea;

const colors$7 = spencerColor.colors;

const { parseX: parseX$5, parseY: parseY$7 } = parse_1;

const defaults$a = {
  fill: colors$7.green,
  stroke: colors$7.green,
  'fill-opacity': 1,
  'stroke-width': 1
};

class Bar extends Rect_1 {
  constructor(obj, world) {
    obj = Object.assign({}, defaults$a, obj);
    super(obj, world);
    this._rounded = 1;
    this._width = 5;
    this._zero = 0;
  }
  width(w) {
    this._width = w;
    return this
  }
  //point that it flips on
  zero(w) {
    this._zero = w;
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n;
    return this
  }
  at(x, y) {
    this.data = [
      {
        x: parseX$5(x, this.world),
        y: parseY$7(0, this.world)
      },
      {
        x: parseX$5(x, this.world),
        y: parseY$7(y, this.world)
      }
    ];
    return this
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let points = this.points();
    let bottom = points[0][1];
    if (points[0][1] > points[1][1]) {
      bottom = points[1][1];
    }
    let height = Math.abs(points[1][1] - points[0][1]);
    let attrs = Object.assign({}, this.attrs, {
      x: points[0][0],
      y: bottom,
      width: this._width,
      height: height,
      rx: this._rounded,
      title: this._title
    });
    return h`<rect ...${attrs} >
        <title>${this._title}</title>
      </rect>`
  }
}
var Bar_1 = Bar;

const colors$8 = spencerColor.colors;

class Image extends Shape_1 {
  constructor(obj, world) {
    super(obj, world);
    this._src = '';
    this._width = 100;
    this._height = 200;
    this._caption = '';
  }
  src(src) {
    this._src = src;
    return this
  }
  caption(txt) {
    this._caption = txt;
    return this
  }
  size(w, h) {
    this._width = w;
    this._height = h;
    return this
  }
  width(w) {
    this._width = w;
    return this
  }
  height(h) {
    this._height = h;
    return this
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let point = this.points()[0];
    if (!point) {
      point = [0, 0];
    }
    let caption = '';
    if (this._caption) {
      let y = point[1] + this._height + 15;
      caption = h`<text x="${point[0]}" y="${y}" stroke="none" fill="${colors$8.grey}">${
        this._caption
      }</text>`;
    }
    return h`<g>
      <image xlink:href="${this._src}" x="${point[0]}" y="${point[1]}" height="${
      this._width
    }" width="${this._height}" />
      ${caption}
    </g>
    `
    //preserveAspectRatio="slice"
  }
}
var Image_1 = Image;

const colors$9 = spencerColor.colors;



const defaults$b = {
  fill: 'none',
  stroke: colors$9.grey,
  'stroke-width': 3,
  'stroke-linecap': 'round',
  'shape-rendering': 'optimizeQuality'
};

class Arrow extends Shape_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$b, obj);
    super(obj, world);
    this._length = 35;
  }
  color(color) {
    this.attrs.stroke = colors$9[color] || color;
    return this
  }
  from(x, y) {
    this.set([this._data[0], [x, y]]);
  }
  length(num) {
    this._length = num;
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num;
    return this
  }
  path() {
    let points = this.points();
    return src$2
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  getLength(start, end) {
    let x = start[0] - end[0];
    let y = start[1] - end[1];
    let h = Math.pow(x, 2) + Math.pow(y, 2); //x^2 + y^2 = h^2
    h = Math.sqrt(h);
    return h
  }
  getAngle(start, end) {
    let p1 = {
      x: start[0],
      y: start[1]
    };
    let p2 = {
      x: end[0],
      y: end[1]
    };
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    return angleRadians
  }
  head(start, end) {
    let h = this.world.html;
    let radian = this.getAngle(start, end);
    let leftAngle = radian - Math.PI / 4;
    let rightAngle = radian + Math.PI / 4;
    let length = this.getLength(start, end);
    length = length * 0.2;
    //---soh cah toa--
    let left = {
      opp: Math.sin(leftAngle) * length,
      adj: Math.cos(leftAngle) * length
    };
    let right = {
      opp: Math.sin(rightAngle) * length,
      adj: Math.cos(rightAngle) * length
    };
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + left.adj} y2=${start[1] + left.opp} ...${
      this.attrs
    }/>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + right.adj} y2=${start[1] +
      right.opp} ...${this.attrs}/>
    </g>`
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let points = this.points();
    let start = points[0];
    let end = points[1];
    if (!end) {
      end = [start[0] - this._length, start[1]];
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${end[0]} y2=${end[1]} ...${this.attrs}/>
      ${this.head(start, end)}
    </g>`
  }
}

var Arrow_1 = Arrow;

const colors$a = spencerColor.colors;


const defaults$c = {
  fill: 'none',
  stroke: colors$a.lighter,
  'stroke-width': 2,
  'stroke-linecap': 'round'
};

class Now extends Line_1 {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults$c, obj);
    super(obj, world);
    this._label = '';
    this._y = '-5%';
    this.dotted(true);
    let d = Date.now();
    this.set([[d, '0%'], [d, '100%']]);
  }
  label(str) {
    this._label = str;
    return this
  }
  top() {
    this._y = '-5%';
  }
  bottom() {
    this._y = '105%';
  }
  build() {
    let h = this.world.html;
    this.onMount();
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    });
    let point = this.points()[0];
    let textAttrs = {
      x: point[0],
      y: this._y,
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    };
    return h`
      <g>
        <text ...${textAttrs}>
          ${this._label}
        </text>
        <path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>
      </g>
    `
  }
}

var Now_1 = Now;

const colors$b = spencerColor.colors;


const defaults$d = {
  stroke: 'none',
  fill: colors$b.grey,
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'text-anchor': 'middle',
  class: 'somehow-legible'
};

class Title extends Text_1 {
  constructor(obj = {}, world) {
    let title = '';
    if (typeof obj === 'string') {
      title = obj;
      obj = {};
    }
    obj = Object.assign({}, defaults$d, obj);
    super(obj, world);
    this._title = title;
    this._y = '-5%';
    this._x = '50%';
    this.ignore_clip = true;
  }
  extent() {
    return null
  }
  label(str) {
    this._label = str;
    return this
  }
  color(c) {
    this.attrs.fill = c;
    return this
  }
  top() {
    this._y = '-15%';
    return this
  }
  bottom() {
    this._y = '115%';
    return this
  }
  left() {
    this._x = '15%';
    this.attrs['text-anchor'] = 'start';
    return this
  }
  right() {
    this._x = '95%';
    this.attrs['text-anchor'] = 'end';
    return this
  }
  build() {
    let h = this.world.html;
    let attrs = Object.assign({}, this.attrs, {
      x: this._x,
      y: this._y
    });
    return h`<text ...${attrs}>
          ${this._title}
        </text>`
  }
}

var Title_1 = Title;

class World {
  constructor(obj = {}) {
    this.width = 100;
    this.height = 100;
    obj.aspect = obj.aspect || 'widescreen';
    if (obj.aspect) {
      this.aspect = obj.aspect;
      let res = fitAspectRatio({
        aspect: obj.aspect,
        width: 100
      });
      this.width = res.width || 100;
      this.height = res.height || 100;
    }
    this.shapes = [];
    //give the points a little bit of space.
    this.wiggle_room = 1.05;
    this.x = new Scale_1(obj, this);
    this.y = new YScale_1(obj, this);
    this.xAxis = new XAxis_1({}, this);
    this.yAxis = new YAxis_1({}, this);
    this.html = htm.bind(vhtml);
    this.inputs = [];
    this.state = {};
    this.state.time = Date.now();
    this._title = '';
    this.el = obj.el || null;
    if (typeof this.el === 'string') {
      this.el = document.querySelector(this.el);
    }
  }
  bind(fn) {
    this.html = htm.bind(fn);
  }
  line(obj) {
    let line = new Line_1(obj, this);
    this.shapes.push(line);
    return line
  }
  dot(obj) {
    let dot = new Dot_1(obj, this);
    this.shapes.push(dot);
    return dot
  }
  text(obj) {
    let text = new Text_1(obj, this);
    this.shapes.push(text);
    return text
  }
  area(obj) {
    let shape = new Area_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  midArea(obj) {
    let shape = new MidArea(obj, this);
    this.shapes.push(shape);
    return shape
  }
  rect(obj) {
    let shape = new Rect_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  bar(obj) {
    let shape = new Bar_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  annotation(obj) {
    let shape = new Annotation_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  image(obj) {
    let shape = new Image_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  arrow(obj) {
    let shape = new Arrow_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  now(obj) {
    let shape = new Now_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  title(obj) {
    let shape = new Title_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  shape(obj) {
    let shape = new Shape_1(obj, this);
    this.shapes.push(shape);
    return shape
  }
  getShape(id) {
    return this.shapes.find(shape => shape.id === id || shape._id === id)
  }
  redraw() {
    if (this.el) {
      this.el.innerHTML = this.build();
    } else {
      console.log('must define world html element');
    }
  }
  breakpoints() {
    return this.html`<style scoped>
      .somehow-legible {
        font-size: 14px;
      }
      @media (min-width: 300px) {
        .somehow-legible {
          font-size: 7px;
        }
      }
      @media (min-width: 500px) {
        .somehow-legible {
          font-size: 5px;
        }
      }
      @media (min-width: 600px) {
        .somehow-legible {
          font-size: 4px;
        }
      }
      @media (min-width: 800px) {
        .somehow-legible {
          font-size: 3px;
        }
      }
      @media (min-width: 1000px) {
        .somehow-legible {
          font-size: 2px;
        }
      }
    </style>`
  }
  clip() {
    this.x.clip();
    this.y.clip();
    return this
  }
  build() {
    let h = this.html;
    let shapes = this.shapes.sort((a, b) => (a._order > b._order ? 1 : -1));
    //remove shapes outside of max/mins
    shapes = _clip(shapes, this.x, this.y);
    let elements = [];
    if (this.xAxis) {
      elements.push(this.xAxis.build());
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build());
    }
    elements = elements.concat(shapes.map(shape => shape.build()));
    let attrs = {
      // width: this.width,
      // height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;
    };
    return h`<svg ...${attrs}>
      ${this.breakpoints()}
      ${elements}
    </svg>`
  }
}
Object.keys(methods_1$1).forEach(k => {
  World.prototype[k] = methods_1$1[k];
});
const aliases$2 = {
  plusminus: 'plusMinus'
};
Object.keys(aliases$2).forEach(k => {
  World.prototype[k] = methods_1$1[aliases$2[k]];
});
var World_1 = World;

var _version$2 = '0.2.0';

// ...people call this a 'factory'
const somehow = function(obj) {
  return new World_1(obj)
};
somehow.version = _version$2;
var src$3 = somehow;

export default src$3;
