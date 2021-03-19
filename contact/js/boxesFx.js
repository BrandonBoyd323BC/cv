
(function (window) {

	'use strict';

	function getViewport(axis) {
		var client, inner;
		if (axis === 'x') {
			client = docElem['clientWidth'];
			inner = window['innerWidth'];
		}
		else if (axis === 'y') {
			client = docElem['clientHeight'];
			inner = window['innerHeight'];
		}

		return client < inner ? inner : client;
	}

	var docElem = window.document.documentElement,
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		support = { transitions: Modernizr.csstransitions },
		win = { width: getViewport('x'), height: getViewport('y') };

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function BoxesFx(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	BoxesFx.prototype.options = {}

	BoxesFx.prototype._init = function () {
		// //Have to make the randomness of the image transitions here



		const num = () => {
			return Math.round((Math.random() * 2) + 1)
		}

		console.log(num())

		this.el.setAttribute('data-effect', "effect-2")

		const thisFunction = () => {
			if (num() === 1) {
				console.log("one")
				this.el.setAttribute('data-effect', "effect-1")
			} else if (num() === 2) {
				console.log("two")
				this.el.setAttribute('data-effect', "effect-2")
			} else if (num() === 3) {
				console.log("three")
				this.el.setAttribute('data-effect', "effect-3")
			}
			
			console.log(num() + " in function")
			console.log(this.el.getAttribute('data-effect') + " in function")
		}

		thisFunction()

		console.log(this.el.getAttribute('data-effect'))

		// set transforms configuration
		this._setTransforms();
		// which effect		
		this.effect = this.el.getAttribute('data-effect') || 'effect-3';
		// check if animating
		this.isAnimating = false;
		// the panels
		this.panels = [].slice.call(this.el.querySelectorAll('.panel'));
		// total number of panels (4 for this demo)
		//this.panelsCount = this.panels.length;
		this.panelsCount = 4;
		// current panel´s index
		this.current = 0;
		classie.add(this.panels[0], 'current');
		// replace image with 4 divs, each including the image
		var self = this;
		this.panels.forEach(function (panel) {
			var img = panel.querySelector('img'), imgReplacement = '';
			for (var i = 0; i < self.panelsCount; ++i) {
				imgReplacement += '<div class="bg-tile"><div class="bg-img"><img src="' + img.src + '" /></div></div>'
			}
			panel.removeChild(img);
			panel.innerHTML = imgReplacement + panel.innerHTML;
		});
		// add navigation element
		this.nav = document.createElement('nav');
		this.nav.innerHTML = '<span class="prev"><i></i></span><span class="next"><i></i></span>';
		this.el.appendChild(this.nav);
		// initialize events
		this._initEvents();
	}

	// set the transforms per effect
	// we have defined both the next and previous action transforms for each panel
	BoxesFx.prototype._setTransforms = function () {
		this.transforms = {
			'effect-1': {
				'next': [
					'translate3d(0, ' + (win.height / 2 + 10) + 'px, 0)', // transforms for 1 panel
					'translate3d(-' + (win.width / 2 + 10) + 'px, 0, 0)', // transforms for 2 panel
					'translate3d(' + (win.width / 2 + 10) + 'px, 0, 0)', // transforms for 3 panel
					'translate3d(0, -' + (win.height / 2 + 10) + 'px, 0)' // transforms for 4 panel
				],
				'prev': [
					'translate3d(' + (win.width / 2 + 10) + 'px, 0, 0)',
					'translate3d(0, ' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0, -' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(-' + (win.width / 2 + 10) + 'px, 0, 0)'
				]
			},
			'effect-2': {
				'next': [
					'translate3d(-' + (win.width / 2 + 10) + 'px, 0, 0)',
					'translate3d(' + (win.width / 2 + 10) + 'px, 0, 0)',
					'translate3d(-' + (win.width / 2 + 10) + 'px, 0, 0)',
					'translate3d(' + (win.width / 2 + 10) + 'px, 0, 0)'
				],
				'prev': [
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)'
				]
			},
			'effect-3': {
				'next': [
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,' + (win.height / 2 + 10) + 'px, 0)'
				],
				'prev': [
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)',
					'translate3d(0,-' + (win.height / 2 + 10) + 'px, 0)'
				]
			}
		};
	}
	// Toggle so that the kickoff is random and set for timeout
	BoxesFx.prototype._initEvents = function () {

		var self = this, navctrls = this.nav.children;
		// My insert of the set inteval to do it automatically
		setInterval(function () { self._navigate('next') }, 4000);
		setInterval(function () { self._navigate('prev') }, 13000);


		// previous action
		navctrls[0].addEventListener('click', function () { self._navigate('prev') });
		// next action
		navctrls[1].addEventListener('click', function () { self._navigate('next') });
		// window resize
		window.addEventListener('resize', function () { self._resizeHandler(); });
	}

	// goto next or previous slide
	BoxesFx.prototype._navigate = function (dir) {
		if (this.isAnimating) return false;
		this.isAnimating = true;

		var self = this, currentPanel = this.panels[this.current];

		if (dir === 'next') {
			this.current = this.current < this.panelsCount - 1 ? this.current + 1 : 0;
		}
		else {
			this.current = this.current > 0 ? this.current - 1 : this.panelsCount - 1;
		}

		// next panel to be shown
		var nextPanel = this.panels[this.current];
		// add class active to the next panel to trigger its animation
		classie.add(nextPanel, 'active');
		// apply the transforms to the current panel
		this._applyTransforms(currentPanel, dir);

		// let´s track the number of transitions ended per panel
		var cntTransTotal = 0,

			// transition end event function
			onEndTransitionFn = function (ev) {
				if (ev && !classie.has(ev.target, 'bg-img')) return false;

				// return if not all panel transitions ended
				++cntTransTotal;
				if (cntTransTotal < self.panelsCount) return false;

				if (support.transitions) {
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}

				// remove current class from current panel and add it to the next one
				classie.remove(currentPanel, 'current');
				classie.add(nextPanel, 'current');
				// reset transforms for the currentPanel
				self._resetTransforms(currentPanel);
				// remove class active
				classie.remove(nextPanel, 'active');
				self.isAnimating = false;
			};

		if (support.transitions) {
			currentPanel.addEventListener(transEndEventName, onEndTransitionFn);
		}
		else {
			onEndTransitionFn();
		}
	}

	BoxesFx.prototype._applyTransforms = function (panel, dir) {
		var self = this;
		[].slice.call(panel.querySelectorAll('div.bg-img')).forEach(function (tile, pos) {
			tile.style.WebkitTransform = self.transforms[self.effect][dir][pos];
			tile.style.transform = self.transforms[self.effect][dir][pos];
		});
	}

	BoxesFx.prototype._resetTransforms = function (panel) {
		[].slice.call(panel.querySelectorAll('div.bg-img')).forEach(function (tile) {
			tile.style.WebkitTransform = 'none';
			tile.style.transform = 'none';
		});
	}

	BoxesFx.prototype._resizeHandler = function () {
		var self = this;
		function delayed() {
			self._resize();
			self._resizeTimeout = null;
		}
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
		this._resizeTimeout = setTimeout(delayed, 50);
	}

	BoxesFx.prototype._resize = function () {
		win.width = getViewport('x');
		win.height = getViewport('y');
		this._setTransforms();
	}

	// add to global namespace
	window.BoxesFx = BoxesFx;
	
	function myFunction() {
		var x = document.getElementById("nav");
		if (x.className === "nav") {
		  x.className += " responsive";
		} else {
		  x.className = "nav";
		}
	   }
})(window);