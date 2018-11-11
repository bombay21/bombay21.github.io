// Drawer Menu
drawer = $('nav ul');
menuItem = $('nav ul li');

$('#drawer').click(function(e){
    e.preventDefault();
    drawer.slideToggle();
});
$(menuItem).click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
$(window).resize(function(){
    var w = $(this).width();
    if(w > 768){
        drawer.removeAttr('style');
    }
});
$(menuItem).click(function(e){
    var w = $(window).width();
    if(w < 768){
        drawer.slideToggle();
    }
});

// Sticky Form
// window.onscroll = () => stickify();
// let searchForm = document.getElementById("search-form");
// let sticky = searchForm.offsetTop;
// let stickify = () => window.pageYOffset >= sticky ? searchForm.classList.add("sticky") : searchForm.classList.remove("sticky");

// VENUES
// Search Filter

// get search input field
let searchField = document.getElementById('search-field');
let stateField = document.getElementById('state-field');
let categoryField = document.getElementById('category-field');
let searchButton = document.getElementById('search-button');
function filterVenue() {
    // get value of input
    let searchValue = searchField.value.toUpperCase();
    let stateValue = stateField.value;
    let categoryValue = categoryField.value;
    
    //get venues container
    let venueContainer = document.getElementById('ourvenues');

    //get collection of venues
    let venues = venueContainer.querySelectorAll('.feature');

    //loop through venues
    for(let i = 0; i < venues.length; i++){
        let h2 = venues[i].getElementsByTagName('h2')[0];
       
        // check matching string
        if(h2.innerHTML.toUpperCase().indexOf(searchValue) > -1 ){
            venues[i].style.display = '';
        }
        else{
            venues[i].style.display = 'none';
        }
    }
}
// searchField.addEventListener('keyup',filterVenue);
searchButton.addEventListener('click',filterVenue);
