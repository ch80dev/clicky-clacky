class Config {
	static building_captions = {
		farm: "Create one grain every time any resource is harvested",
		fishery: "Create one fish every time any resource is harvested",
		mine: "Create one stone every time any resource is harvested",
		sawmill: "Create one wood every time any resource is harvested",

	};

	static building_outputs = {
		farm: 'grain', fishery: "fish", mine: 'stone', sawmill: 'wood',
	}
	static building_requirements = {
		all: [],

		forest: ['sawmill'],
		lake: ['fishery'],
		mountains: ['mine'],
		plains: ['farm'],

	}
	static loop_interval_timing = 1000;
	static max_x = 9;
	static max_y = 9;
	static rounding_to  = 10;
	static terrain = [
		null, 'plains', 'forest', 'mountains', 'lake',
	]
	static terrain_resources = {
		forest: 'wood',
		mountains: 'stone',
		plains: 'grain',
		lake: 'fish',

	};

}