$(document).on('click', '.your-dynamic-element-class', function() {
    // Your code here
    console.log("Dynamic element clicked!");
    
    // 'this' refers to the specific element that was clicked
    $(this).css('background-color', 'red');
});

$(document).on('contextmenu', ".terrain", function (e) {
    // Prevent the default browser context menu from appearing
    event.preventDefault();
    let x = Number(this.id.split('-')[1]);
    let y = Number(this.id.split('-')[2]);
    
    ui.show_context_menu(x, y);
});

$(document).on('click', '.build', function() {
    let x = Number(this.id.split('-')[1]);
    let y = Number(this.id.split('-')[2]);
    let building = this.id.split('-')[3];
    juego.build(x, y, building);
    ui.show_context_menu(x, y);
    ui.refresh();
});

$(document).on('click', '.cell', function() {
    let x = Number(this.id.split('-')[1]);
    let y = Number(this.id.split('-')[2]);
    juego.input.click(x, y);
    ui.refresh();
});

$(document).on('click', '.click', function() {    
    juego.input.modify_clicks(this.id.split('-')[1]);
    ui.refresh();
});

$(document).on('click', '.sell', function() {
    let resource = this.id.split('-')[1];
    juego.sell(resource);
    ui.refresh();
});


for (let button of document.querySelectorAll('button')){
	button.addEventListener('click', function(e){
		ui.refresh();
	});
}
