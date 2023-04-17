import day1Route from './data/segments/day-1.json';
import day2Route from './data/segments/day-2.json';
import day3Route from './data/segments/day-3.json';
import day4Route from './data/segments/day-4.json';
import day5Route from './data/segments/day-5.json';
import day6Route from './data/segments/day-6.json';
import day7Route from './data/segments/day-7.json';
import day8Route from './data/segments/day-8.json';
import day9Route from './data/segments/day-9.json';
import day10Route from './data/segments/day-10.json';
import day11Route from './data/segments/day-11.json';
import day12Route from './data/segments/day-12.json';
import day13Route from './data/segments/day-13.json';
import day14Route from './data/segments/day-14.json';

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
	},
	'day-6': {
		geojson: day6Route as GeoJSON.FeatureCollection
	},
	'day-7': {
		geojson: day7Route as GeoJSON.FeatureCollection
	},
	'day-8': {
		geojson: day8Route as GeoJSON.FeatureCollection
	},
	'day-9': {
		geojson: day9Route as GeoJSON.FeatureCollection
	},
	'day-10': {
		geojson: day10Route as GeoJSON.FeatureCollection
	},
	'day-11': {
		geojson: day11Route as GeoJSON.FeatureCollection
	},
	'day-12': {
		geojson: day12Route as GeoJSON.FeatureCollection
	},
	'day-13': {
		geojson: day13Route as GeoJSON.FeatureCollection
	},
	'day-14': {
		geojson: day14Route as GeoJSON.FeatureCollection
	}
};

// type of of all the keys from layers
export type LayerNames = keyof typeof layers;
