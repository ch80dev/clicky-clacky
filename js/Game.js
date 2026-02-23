class Game{
	buildings = [];
	click_modifier = 0;
	clicks = 11;
	first_turn = false;
	input = new Input();
	
	loop = new Loop();
	map = new GameMap (Config.max_x, Config.max_y);
	player = new Player();
	prices = {

	}
	resources = {};
	constructor(){
		setInterval(() => this.loop.go(this), Config.loop_interval_timing);
		for (let resource of Object.values(Config.terrain_resources)){
			this.resources[resource] = 0;
			this.prices[resource] = 2;
		}
	}

	build(x, y, building){
		console.log(x, y, building);
		let cost = 10;
		if (juego.clicks < cost){
			return;
		}
		this.clicks -= cost;
		//still need to validate building
		this.buildings.push({x: x, y: y, type: building});
		this.map.build(x, y, building);
		console.log(this.buildings, this.map.buildings);
	}

	fetch_buildings(terrain){
		let buildings = Config.building_requirements.all.concat(Config.building_requirements[terrain]);
		return buildings;
		
	}

	raise_other_prices(not_resource){
		for (let resource in this.prices){
			if (resource == not_resource){
				continue;
			}
			let price = this.prices[resource];

			this.prices[resource] = Math.round( price * (1 + (rand_num(1, 10) * .01)) * Config.rounding_to)  / Config.rounding_to;
		}
	}

	run_buildings(clicks, x, y){
		for (let building of this.buildings){
			if (building.x == x && building.y == y){
				continue;
			}
			console.log(building.type);
			console.log(Config.building_outputs)			
			console.log(Config.building_outputs[building.type])
			this.resources[Config.building_outputs[building.type]] += clicks;
		}
	}

	sell(resource){
		let quantity = juego.click_modifier;
		if ((quantity == 'all' && this.resources[resource] < 1)
			|| (quantity != 'all' && this.resources[resource] < quantity)){
			return;
		}
		if (quantity == 'all'){
			quantity = this.resources[resource];
		} 
		quantity = Number(quantity);
		let clicks_go_up = Math.round(quantity *  this.prices[resource] * Config.rounding_to) / Config.rounding_to;
		console.log(clicks_go_up);
		this.clicks += clicks_go_up;
		this.resources[resource] -= quantity;
		this.prices[resource] = Math.round(this.prices[resource] * (.01 * rand_num(85, 99)) * Config.rounding_to) / Config.rounding_to;  
		this.raise_other_prices(resource);
	}


}
