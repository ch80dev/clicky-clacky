class UI{
	revealed = {

	};
	constructor(){
		for (let resource of Object.values(Config.terrain_resources)){
			this.revealed[resource] = false;
		}
	
	}

	display_map(){
		let txt = "";
		for (let y = 0; y < Config.max_y; y ++){
			txt += "<div class='row'>"
			for (let x = 0; x < Config.max_x; x ++){
				let cell_class = "";
				let cell_txt = "";
				if (juego.map.at(x, y) != null){
					cell_class = `terrain ${Config.terrain[juego.map.at(x, y)]}`;
				} else if (juego.map.how_many_adjacent_not(x, y, null, true) && juego.clicks > juego.new_tile_cost){
					cell_class = "empty";
				}
				if (juego.map.buildings[x][y] != null){
					cell_txt = "X";
				}
				txt += `<div id='cell-${x}-${y}' class='cell ${cell_class}'>${cell_txt}</div>`
			}
			txt += "</div>"
		}
		document.getElementById('map').innerHTML = txt;		
	}

	display_sell_buttons(resource){
		let disabled_one = '';
		let n = juego.resources[resource];
		if (n < 1){
			disabled_one = " disabled ";			
		}
		let txt = `<button id='sell-${resource}-1' class='sell' ${disabled_one}>1x</button> <button id='sell-${resource}-all' class='sell' ${disabled_one}>all</button>`;
		return txt;
	}

	refresh(){
		$("#new_tile_cost").html(juego.new_tile_cost);
		this.display_map();
		let txt = "";
		for (let resource in juego.resources){
			let disabled = "";
			let n = juego.resources[resource];
			let quantity = 1;
			if (juego.click_modifier != 'all'){
				quantity = juego.click_modifier;
			}
			if (!this.revealed[resource] && n > 0){
				this.revealed[resource] = true;
			}
			if (n < quantity ){
				disabled = " disabled ";
			}
			if (this.revealed[resource]){
				let modifier = juego.click_modifier;
				if (modifier != 'all'){
					modifier = modifier + "x";
				}
				txt += `<div class='resource'><button id='sell-${resource}' class='sell' ${disabled}><span class="arrow">&uarr;</span><span class="sell_modifier">${modifier}</span></button>[${juego.prices[resource]}]<span class='label'>${resource}: ${n} <span id='${resource}_delta'></span></span> </div>`;

				//txt += this.display_sell_buttons(resource);

			}
		}
		$(".click").prop('disabled', false);
		$(`#click-${juego.click_modifier}`).prop('disabled', true);
		$("#resources").html(txt);
		$("#clicks").html((Math.round(juego.clicks * Config.rounding_to) / Config.rounding_to).toFixed());
	}

	show_context_menu(x, y){
		let space = juego.map.at(x, y);
		if(space == null){
			return;
		}
		let buildings = juego.fetch_buildings(Config.terrain[space]);
		let txt = "";
		for (let building of buildings){
			
			let cost = juego.fetch_building_cost(building);
			let disabled = "";
			if (juego.clicks <= cost){
				disabled = " disabled ";
			}
			let build_button = `<button id='build-${x}-${y}-${building}' class='build' ${disabled}>build</button>`;
			if (juego.map.buildings[x][y] == building){
				build_button = " [ built ]";
			}
			txt += `${building}: ${Config.building_captions[building]} Cost: ${cost} ${build_button}`
		}
		$("#context_menu").html(txt);
		
		
	}

	show_delta(id, txt){
		$("#" + id).html(txt);
	}
}
