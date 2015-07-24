/**
jquery.googlemapstatic.js
Copyright (c) oniyon.com Makoto Enomoto
This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/
(function( $ ){
	var $elm = null;
	var _settings = {};
	var _text = '';

	$.fn.typewriter = function( options ){
		var defaults = {
			'speed': 32
			,'fade_speed': 8
			,'callback':function(){}
		};
		_settings = $.extend( defaults, options, {} );
		$e = $(this);
		$elm = $e;
		_srcHtml = $e.html();
		return this;
	}
	$.fn.typewriter.setText = function( text ){
		_text = text;
		return $elm;
	}

	$.fn.typewriter.skip = function(){
		skip();
	}
	function skip(){
		var settingsBack = _settings;
		_settings.speed = 0;
		_settings.fade_speed = 0;
		play();
		if( typeof _settings.completeCallback !== 'undefined' ){
			_settings.completeCallback();
		}
		_settings = settingsBack;
		return $elm;
	}
	$.fn.typewriter.play = function(){
		play();
		return $elm;
	}
	function play(){
		var str = [];
		var timer = null;
		$elm.html('');
		
		$e.on( 'click touchend', function(){
			clearTimeout( timer );
			skip();

		});
		for (var j = 0; j < _text.length; j++) {
			if( _text.substr(j, 1) === "\n" ){
				$elm.append('<br />');
			}
			else{
				$elm.append('<span style="opacity:0;">'+_text.substr(j, 1)+'</span>');
				$elm.children('span:last').delay(_settings.speed * j).animate({opacity:'1'}, _settings.fade_speed);
			}

			if( j == str.length-1 ){
				if( typeof _settings.completeCallback !== 'undefined' ){
					timer = setTimeout( function(){
						_settings.completeCallback();
					},_settings.speed * j);
				}
			}
		}
	}
})( jQuery );

