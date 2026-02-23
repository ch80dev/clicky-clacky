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

    hover_cell(x, y){
        if (juego.map.at(x, y) != null){
            let quantity = juego.click_modifier;
            if (juego.click_modifier == 'all'){
                quantity = Math.round(juego.clicks);
            }
            ui.show_delta("clicks_delta", ` (<span class='bad'>-${quantity}</span>)`);
            let resource_type = Config.terrain_resources[Config.terrain[juego.map.at(x, y)]];
            
            ui.show_delta(resource_type + "_delta", ` (<span class='good'>+${quantity}</span>)`);
            return;
        }

        if (juego.map.how_many_adjacent_not(x, y, null, true) && juego.clicks > juego.new_tile_cost){
            ui.show_delta("clicks_delta", ` (<span class='bad'>-${juego.new_tile_cost}</span>)`);
            $("#new_tile_caption").css("font-weight", 'bold');
            return;
        }
    }

    hover_sell(resource_type){
        let quantity = juego.click_modifier;
        if (juego.click_modifier == 'all'){
            quantity = Math.round(juego.resources[resource_type]);
        }
        ui.show_delta('clicks_delta', ` (<span class='good'>+${quantity}</span>)`);
        ui.show_delta(resource_type + "_delta", ` (<span class='bad'>-${quantity}</span>)`);
    }



    leave_cell(x, y){
        if (juego.map.at(x, y) != null){                        
            let resource_type = Config.terrain_resources[Config.terrain[juego.map.at(x, y)]];
            
            $("#clicks_delta").html("");
            $("#" + resource_type + "_delta").html("");
            return;
        }

        if (juego.map.how_many_adjacent_not(x, y, null, true) && juego.clicks > juego.new_tile_cost){
            ui.show_delta("clicks_delta", "");
            $("#new_tile_caption").css("font-weight", 'normal');
            return;
        }
    }

    leave_sell(resource_type){
        ui.show_delta('clicks_delta', "");
        ui.show_delta(resource_type + "_delta", "");
    }

    modify_clicks(modifier){
        juego.click_modifier = modifier;
        
    }
}

