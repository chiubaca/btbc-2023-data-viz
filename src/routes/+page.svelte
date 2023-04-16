<script lang="ts">
	import { onMount } from 'svelte';

	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	import route from '../data/full-route.json';

	import day1Route from '../data/segments/day-1.json';

	let mapElement: HTMLDivElement;

	onMount(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiY2hpdWJhY2EiLCJhIjoiY2tvOHdueTE5MnI2ZDJwcGdhYmdldWcxbiJ9.nODodukM4uQc-6KXgoZ4zQ';

		const map = new mapboxgl.Map({
			container: mapElement, // container ID
			style: 'mapbox://styles/chiubaca/clge0llj7001t01rq9kz4l55x', // style URL
			center: [86.7801, 27.8002], // starting position [lng, lat]
			zoom: 9, // starting zoom
			pitch: 49
		});

		map.on('load', () => {
			map.addSource('route', {
				type: 'geojson',
				data: day1Route
			});
			map.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					// make this look like its glowing

					'line-color': '#888',
					'line-width': 8
				}
			});
		});
	});
</script>

<div class="relative w-screen h-screen">
	<div bind:this={mapElement} id="map" class="w-full h-full" />

	<div id="overlay" class=" bottom-0 absolute flex h-[200px] bg-pink-400 m-7">hello</div>
</div>
