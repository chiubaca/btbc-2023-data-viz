import day1Route from './data/segments/day-1.json';
import day2Route from './data/segments/day-2.json';
import day3Route from './data/segments/day-3.json';
import day4Route from './data/segments/day-4.json';
import day5Route from './data/segments/day-5.json';

export const layers = {
	'day-1': {
		geojson: day1Route as GeoJSON.FeatureCollection
	},
	'day-2': {
		geojson: day2Route as GeoJSON.FeatureCollection
	},
	'day-3': {
		geojson: day3Route as GeoJSON.FeatureCollection
	},
	'day-4': {
		geojson: day4Route as GeoJSON.FeatureCollection
	},
	'day-5': {
		geojson: day5Route as GeoJSON.FeatureCollection
	}
};

// type of of all the keys from layers
export type LayerNames = keyof typeof layers;
