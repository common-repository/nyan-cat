(function($) {
	alreadyNyaning = false;
	soundManager.url = nyan_strings.soundmanager;
	soundManager.flashVersion = 9;
	soundManager.useFlashBlock = false;
	soundManager.onready(function() {
		nyan = soundManager.createSound({
			id: 'loop',
			url: nyan_strings.nyan_url,
			loops: 9999999,
			autoPlay: alreadyNyaning,
			autoLoad: alreadyNyaning,
			volume: 0
		});
	});
	
	$(function nyan_setup() {
		var nyan_cat_frame = $('<div class="nyan-cat-frame"/>')
			.html("<div class='rainbows'><div class='wrapper'></div></div><div class='nyan-cat'></div>");
		var rainbow_wrapper = nyan_cat_frame.find('.wrapper');
		var rainbox = $("<div class='rainbow'><div class='wave wave-1'></div><div class='wave wave-2'></div><div class='wave wave-3'></div><div class='wave wave-4'></div><div class='wave wave-5'></div><div class='wave wave-6'></div><div class='wave wave-7'></div></div>");
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j <= 6; j++) {
				rainbow_wrapper.append(rainbox.clone().addClass("frame-" + j));
			}
		}
	
		nyan_cat_frame.appendTo('#fullscreen-overlay');
		
		var twitter = '<div id="twitter-share-button" style="display:inline-block;height:20px;vertical-align:top;"><a class="twitter-share-button" data-count="horizontal" data-text="" data-via="wordpress" data-url="http://wordpress.org/extend/plugins/nyan-cat" href="http://twitter.com/share">&nbsp;</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div>';
		$('#wp-fullscreen-status').append('<div id="nyan-cat-time" style="float:left;clear:both;">' + "You've been DISTRACTION-FREE for <span class='seconds'></span> seconds. " + twitter + '</div>');
		
		$("#nyan-cat-time").hover(function() {
			$('#twitter-share-button').html('<a class="twitter-share-button" data-count="horizontal" data-text="I HAVE BEEN DISTRACTION-FREE FOR ' + $(this).find('.seconds').text() + ' SECONDS!" data-via="wordpress" data-url="http://wordpress.org/extend/plugins/nyan-cat" href="http://twitter.com/share">&nbsp;</a>');
			$.getScript('http://platform.twitter.com/widgets.js');
		}, function() {});
	
		$('#wp-fullscreen-tagline').text('Just NYAN!');
	});
	
	function animateRainbow() {
		$('.rainbows').toggleClass("shift")
	}
	
	var startTime, currentTime, seconds, timeOnSiteTimer;
	function timeOnSite() {
		currentTime = new Date;
		seconds = parseFloat((currentTime - startTime) / 1000).toFixed(1);
		$("#nyan-cat-time .seconds").text(seconds);
	}
	
	// hook into the 3.2 fullscreen PubSub
	// WARNING: this is a private API! But it's nice. :)
	var animateRainbowTimer;
	fullscreen.pubsub.subscribe('show', function nyan_show() {
	
		// fade in
		if (nyan)
			nyan.play();
		else
			alreadyNyaning = true;
		var volume = 0;
		var fadeinTimeout;
		function fadein() {
			volume += 5;
			nyan.setVolume(volume);
			if ( volume > 50 )
				clearInterval( fadeinTimeout );
		}
		fadeinTimeout = setInterval( fadein, 250 ); // 2.5s total fadein
	
		startTime = new Date();
		timeOnSiteTimer = setInterval( timeOnSite, 100);
	
		animateRainbowTimer = setInterval( animateRainbow, 400);
	});
	fullscreen.pubsub.subscribe('hide', function nyan_hide() {
		// fade out
		var volume = 50;
		var fadeinTimeout;
		function fadeout() {
			volume -= 5;
			nyan.setVolume(volume);
			if ( volume < 0 ) {
				clearInterval( fadeoutTimeout );
				nyan.stop();
			}
		}
		fadeoutTimeout = setInterval( fadeout, 200 ); // 2s total fadein
		
		clearInterval(animateRainbowTimer);
		clearInterval(timeOnSiteTimer);
	});
	
	/*		function animateStars() {
		$('.star').each(function() {
			thisFrame = $(this).attr('class');
			thisFrame = thisFrame.split(' ');
			thisFrame = thisFrame[1].split('-');
			thisFrame = parseInt(thisFrame[1]);
			if(thisFrame == 6) {
				$(this).remove();
			} else {
				$(this).removeClass("frame-" + String(thisFrame)).addClass("frame-" + String(parseInt(thisFrame) + 1));
			}
		})
	}
	animateStarsTimer = setInterval( animateStars, 500 );
	*/
})(jQuery);