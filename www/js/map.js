var map;
function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        scrollwheel: false,
        zoom: 16
    });
}
$('.single-item').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
});



function initialize() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15,
            scrollwheel: false

        });
    })




}
