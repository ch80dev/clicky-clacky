class Game{	
	base_building_cost = Config.base_building_cost;
	buildings = [];
	click_modifier = 1;
	clicks = 1;
	first_turn = false;
	input = new Input();	
	loop = new Loop();
	map = new GameMap (Config.max_x, Config.max_y);
	new_tile_cost = Config.base_tile_cost;	
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

	build(x, y, building_type){
		let cost = this.fetch_building_cost(building_type)
		if (juego.clicks < cost){
			return;
		}
		this.base_building_cost *= 2;
		this.clicks -= cost;
		//still need to validate building
		this.buildings.push({x: x, y: y, type: building_type});
		this.map.build(x, y, building_type);
	}

	fetch_building_cost(building_type){
        return this.base_building_cost * (this.fetch_num_of_buildings(building_type) + 1);
    }

	fetch_buildings(terrain){
		let buildings = Config.building_requirements.all.concat(Config.building_requirements[terrain]);
		return buildings;
		
	}
	fetch_num_of_buildings(building_type){
		let n = 0;
		for (let building of this.buildings){
			if (building.type == building_type){
				n ++;
			}
		}
		return n;
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
