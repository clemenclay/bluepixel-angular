$('#main-menu li').each(function(){
   $('#main-menu-mobile').append($(this).clone(true)); 
});
$('nav .button-collapse').sideNav({
    closeOnClick: true
});
