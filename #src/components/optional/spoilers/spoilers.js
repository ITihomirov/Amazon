//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

//=================
//spoilers
let spoilers = document.querySelectorAll("._spoiler");
let spoilersGo = true;
if (spoilers.length > 0) {

	function spoilerCLick(e) {
		const spoiler = e.target.classList.contains('_spoiler') ? e.target : e.target.closest('._spoiler');
		if (spoilersGo) {
			spoilersGo = false;

			if (spoiler.closest('._spoilers').classList.contains('_one')) {
				let curent_spoilers = spoiler.closest('._spoilers').querySelectorAll('._spoiler');
				for (let i = 0; i < curent_spoilers.length; i++) {
					let el = curent_spoilers[i];
					if (el != spoiler) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			spoiler.classList.toggle('_active');
			_slideToggle(spoiler.nextElementSibling);

			setTimeout(function () {
				spoilersGo = true;
			}, 500);
		}
	}
	function spoilersInit() {
		for (let index = 0; index < spoilers.length; index++) {
			const spoiler = spoilers[index];
			let spoilerMax = spoiler.getAttribute('data-max');

			if (spoilerMax && window.innerWidth > spoilerMax) {
				if (spoiler.classList.contains('_init')) {
					spoiler.classList.remove('_active');
					spoiler.classList.remove('_init');
					spoiler.nextElementSibling.style.cssText = '';
					spoiler.removeEventListener("click", spoilerCLick);
				}
			} else if (!spoiler.classList.contains('_init')) {
				spoiler.classList.add('_init');
				spoiler.addEventListener("click", spoilerCLick);
			}
		}
	}
	function spoilersShowActive() {
		for (let index = 0; index < spoilers.length; index++) {
			const spoiler = spoilers[index];
			if (spoiler.classList.contains('_active')) {
				_slideToggle(spoiler.nextElementSibling);
			}
		}
	}
	window.addEventListener("resize", spoilersInit);

	setTimeout(function () {
		spoilersShowActive();
		spoilersInit();
	}, 0);
}