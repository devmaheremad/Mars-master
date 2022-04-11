var $menu = $('.Menu-list'),
    $item = $('.Menu-list-item'),
    w = $(window).width(), //window width
    h = $(window).height(); //window height

$(window).on('mousemove', function(e) {
    var offsetX = 0.5 - e.pageX / w, //cursor position X
        offsetY = 0.5 - e.pageY / h, //cursor position Y
        dy = e.pageY - h / 2, //@h/2 = center of poster
        dx = e.pageX - w / 2, //@w/2 = center of poster
        theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
        angle = theta * 180 / Math.PI - 90, //convert rad in degrees
        offsetPoster = $menu.data('offset'),
        transformPoster = 'translate3d(0, ' + -offsetX * offsetPoster + 'px, 0) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

    //get angle between 0-360
    if (angle < 0) {
        angle = angle + 360;
    }

    //poster transform
    $menu.css('transform', transformPoster);

    //parallax for each layer
    $item.each(function() {
        var $this = $(this),
            offsetLayer = $this.data('offset') || 0,
            transformLayer = 'translate3d(' + offsetX * offsetLayer + 'px, ' + offsetY * offsetLayer + 'px, 20px)';

        $this.css('transform', transformLayer);
    });
});

// initialize fullPage
$('#fullpage').fullpage({
    scrollOverflow: true,
    verticalCentered: true,
    paddingTop: "2rem",
    paddingBottom: "2rem",
    anchors: ['home', 'about', 'brand', 'motion', 'design', 'development', 'animation', 'marketing', "contact"],
    menu: '#menu',
    css3: false,
});



// X-ray Motion
let svgElement = document.querySelector('.xRaySection svg');
let maskedElement = document.querySelector('#mask-circle');
let circleFeedback = document.querySelector('#circle-shadow');
let svgPoint = svgElement.createSVGPoint();

function cursorPoint(e, svg) {
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

function update(svgCoords) {
    maskedElement.setAttribute('cx', svgCoords.x);
    maskedElement.setAttribute('cy', svgCoords.y);
    circleFeedback.setAttribute('cx', svgCoords.x);
    circleFeedback.setAttribute('cy', svgCoords.y);
}

window.addEventListener('mousemove', function(e) {
    update(cursorPoint(e, svgElement));
}, false);

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        update(cursorPoint(touch, svgElement));
    }
}, false);

// Img fullPage

$('img[data-enlargable]').addClass('img-enlargable').click(function() {

    let headerPortfolio = document.getElementById("headerPortfolio")
    var src = $(this).attr('src');
    $('<div class="fullImg">').css({
        background: 'RGBA(0,0,0,.5) url(' + src + ') center center no-repeat',
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '10000',
        top: '0',
        left: '0',
        cursor: 'zoom-out',
        backgroundSize: "45%",
    }).click(function() {
        $(this).remove();
    }).appendTo(headerPortfolio);

});