<script lang="ts">
	import { onMount } from 'svelte';

	import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	import * as turf from '@turf/turf';

	import route from '../data/full-route.json';

	import day1Route from '../data/segments/day-1.json';

	let mapElement: HTMLDivElement;

	let mapbox: mapboxgl.Map;

	onMount(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiY2hpdWJhY2EiLCJhIjoiY2tvOHdueTE5MnI2ZDJwcGdhYmdldWcxbiJ9.nODodukM4uQc-6KXgoZ4zQ';

		mapbox = new mapboxgl.Map({
			container: mapElement, // container ID
			style: 'mapbox://styles/chiubaca/clge0llj7001t01rq9kz4l55x', // style URL
			center: [86.7801, 27.8002], // starting position [lng, lat]
			zoom: 9, // starting zoom
			pitch: 49
		});
	});

	const toggleDay1 = async () => {
		console.log('hello');

		const routeCoordinates = day1Route.features[0].geometry.coordinates;

		mapbox.addSource('route', {
			type: 'geojson',
			data: day1Route
		});
		mapbox.addLayer({
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

		// Create the marker and popup that will display the elevation queries
		const popup = new mapboxgl.Popup({ closeButton: false });
		const marker = new mapboxgl.Marker({
			color: 'red',
			scale: 0.8,
			draggable: false,
			pitchAlignment: 'auto',
			rotationAlignment: 'auto'
		})
			.setLngLat(routeCoordinates[0])
			.setPopup(popup)
			.addTo(mapbox)
			.togglePopup();

		await mapbox.once('idle');
		// The total animation duration, in milliseconds
		const animationDuration = 20000;

		// Use the https://turfjs.org/ library to calculate line distances and
		// sample the line at a given percentage with the turf.along function.
		const path = turf.lineString(routeCoordinates);
		// Get the total line distance
		const pathDistance = turf.lineDistance(path);
		let start;
		function frame(time) {
			if (!start) start = time;
			const animationPhase = (time - start) / animationDuration;
			if (animationPhase > 1) {
				return;
			}

			// Get the new latitude and longitude by sampling along the path
			const alongPath = turf.along(path, pathDistance * animationPhase).geometry.coordinates;
			const lngLat = {
				lng: alongPath[0],
				lat: alongPath[1]
			};

			// Sample the terrain elevation. We round to an integer value to
			// prevent showing a lot of digits during the animation
			const elevation = Math.floor(
				// Do not use terrain exaggeration to get actual meter values
				mapbox.queryTerrainElevation(lngLat, { exaggerated: false })
			);

			// Update the popup altitude value and marker location
			popup.setHTML('Altitude: ' + elevation + 'm<br/>');
			marker.setLngLat(lngLat);

			// Reduce the visible length of the line by using a line-gradient to cutoff the line
			// animationPhase is a value between 0 and 1 that reprents the progress of the animation
			mapbox.setPaintProperty('line', 'line-gradient', [
				'step',
				['line-progress'],
				'red',
				animationPhase,
				'rgba(255, 0, 0, 0)'
			]);

			// Rotate the camera at a slightly lower speed to give some parallax effect in the background
			const rotation = 150 - animationPhase * 40.0;
			mapbox.setBearing(rotation % 360);

			window.requestAnimationFrame(frame);
		}

		window.requestAnimationFrame(frame);
	};
</script>

<div class="relative w-screen h-screen">
	<div bind:this={mapElement} id="map" class="w-full h-full" />

	<div id="overlay" class=" bottom-0 absolute flex h-[200px] bg-pink-400 m-7">
		<button on:click={toggleDay1}> Day 1</button>
	</div>
</div>
