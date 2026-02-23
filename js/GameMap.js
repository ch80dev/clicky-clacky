class GameMap {
    active_tiles = 1;
    buildings = [];
    center = 4;
    grid = [];
    constructor(max_x, max_y){
        this.max_x = max_x;
        this.max_y = max_y;
        for (let x = 0; x < max_x; x ++){
            this.buildings[x] = [];
            this.grid[x] = [];

            for (let y = 0; y < max_y; y ++){
                this.buildings[x][y] = null;
                if (x == this.center && y == this.center){
                    this.grid[x][y] = 1;
                    continue;
                }
                this.grid[x][y] = null;            
            }    
        }
        this.generate();
    }

    at (x, y){
        return this.grid[x][y];
    }

    build(x, y, building){
        this.buildings[x][y] = building;
    }

    fetch_adjacent_terrain(pos_x, pos_y){
        let terrain = [];
        for (let x = pos_x - 1; x <= pos_x + 1; x ++ ){
            for (let y = pos_y - 1; y <= pos_y + 1; y ++ ){
                if (!this.is_valid(x, y) || this.at(x, y) == null || (x == pos_x && y == pos_y)){
                    continue;
                }
                
                if (!terrain.includes(Config.terrain[this.at(x, y)])){
                    terrain.push(Config.terrain[this.at(x, y)]);
                }
            }    
        }
        return terrain;
    }
    


    fetch_distance(from_x, from_y, to_x, to_y){
	    return Math.sqrt(Math.pow(from_x - to_x, 2) + Math.pow(from_y - to_y, 2))
    }

    fetch_most_terrain(x, y){
        let terrain_arr = this.fetch_adjacent_terrain(x, y);
        let most = null;
        let n = 0;
        for (let terrain of terrain_arr){
            let count = this.how_many_adjacent(x, y, Config.terrain.indexOf(terrain), false);
            if (count > n){
                n = count;
                most = terrain;
            }
        }
        return most;
    }

    generate(){

    }

    generate_new_tile(x, y){
        let rand = rand_num(1, 2);
        
        let same_tile = rand_num(1, 2) == 1;
        let most = this.fetch_most_terrain(x, y);
        this.active_tiles ++;
        juego.new_tile_cost *=  2;//this.active_tiles * Config.base_tile_cost;
        if (same_tile){
            this.is(x, y, Config.terrain.indexOf(most));
            return;
        }
        
        let terrain = Config.terrain_unlocks[most][rand_num(0, Config.terrain_unlocks[most].length - 1)];
        
        this.is(x, y, Config.terrain.indexOf(terrain));
    }

    how_many_adjacent(pos_x, pos_y, value, orthogonal){
        let n = 0;
        for (let x = pos_x - 1; x <= pos_x + 1; x ++){
            for (let y = pos_y - 1; y <= pos_y + 1; y ++){
                if (!this.is_valid(x, y) || this.at(x, y) != value 
                    || (orthogonal && !this.is_orthogonal(x, y, pos_x, pos_y))){
                    continue;
                }
                n ++;
            }
        }
        return n;
    }

    how_many_adjacent_not(pos_x, pos_y, value, orthogonal){
        let n = 0;
        for (let x = pos_x - 1; x <= pos_x + 1; x ++){
            for (let y = pos_y - 1; y <= pos_y + 1; y ++){
                if (!this.is_valid(x, y) || this.at(x, y) == value 
                    || (orthogonal && !this.is_orthogonal(x, y, pos_x, pos_y))){
                    continue;
                }
                n ++;
            }
        }
        return n;
    }

    is (x, y, what){
        this.grid[x][y] = what;
    }

    is_orthogonal(x1, y1, x2, y2){
        let delta_x = Math.floor(x1 - x2);
        let delta_y = Math.floor(y1 - y2);
        let distance = this.fetch_distance(x1, y1, x2, y2);
        return (delta_x == 0 || delta_y == 0 ) && distance < 2;//  || (delta_x != 0 && delta_y == 0);
    }

    is_valid(x, y){
        return x >= 0 && x < Config.max_x && y >=0 && y < Config.max_y;
    }
}