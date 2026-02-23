class Input {
    click (x, y){
        let quantity = 1;
        let space = juego.map.at(x, y);
        if (juego.clicks < 1 || (space == null && juego.clicks < juego.new_tile_cost) 
            || (space != null && juego.click_modifier > juego.clicks) ){
            return;
        }
        if (!juego.first_turn){
            juego.first_turn = true;
        }
        

        if (space == null){
            juego.clicks -= juego.new_tile_cost;
            juego.map.generate_new_tile(x, y)
            return;
        }
        if (space != null && juego.click_modifier == 'all'){
            quantity = Math.floor (juego.clicks);                    
        } else if (space != null && juego.click_modifier != 'all'){
            quantity = juego.click_modifier;
        }
        juego.clicks -= quantity;
        
        juego.clicks = Math.round(juego.clicks * Config.rounding_to) / Config.rounding_to;
        
        juego.resources[Config.terrain_resources[Config.terrain[juego.map.at(x, y)]]] += quantity;
        juego.run_buildings(quantity, x, y);
    }

    modify_clicks(modifier){
        juego.click_modifier = modifier;
        
    }
}

