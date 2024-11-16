const menu = [
  '<span>01.</span> <br> <p>Brand Owners</p> ',
  '<span>02.</span> <br> <p>Formula for Success</p>',
  '<span>03.</span> <br> <p>Partnership Model</p>',
  '<span>04.</span> <br> <p>Our Expertise</p>',
];

const swiper = new Swiper('.slider-section__slider', {
  slidesPerColumn: 1,
  direction: 'vertical',
  speed: 800,
  mousewheel: {
    forceToAxis: true,
    releaseOnEdges: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + menu[index] + '</span>';
    },
  },
});
if (screen.width > 993) {
	const stopScroll = () => {
		const thisScroll = this.scrollY;
		let topPosition = document.getElementById('slider-section__content').offsetTop;
    if(1200 < screen.width < 1500){
    topPosition = document.getElementById('slider-section__content').offsetTop - 300;
    }
		const heightPosition = document.getElementById('slider-section__content').offsetHeight / 100 * 5;
		const overallScroll = topPosition + heightPosition;
		if(thisScroll > overallScroll){
			document.body.style.overflow = "initial";
		} 
		else if (thisScroll > topPosition ){
			document.body.style.overflow = "hidden";
		}
		else{
			document.body.style.overflow = "initial";
		}
	}

	swiper.on('reachEnd', function(){
		document.body.style.overflow = "initial";
		window.removeEventListener('scroll', stopScroll);
	});

	swiper.on('reachBeginning', function(){
		document.body.style.overflow = "initial";
		window.removeEventListener('scroll', stopScroll);
	});

	window.addEventListener('scroll', stopScroll);
}
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.main-icon');

for (let elm of elements) {
  observer.observe(elm);
}
