<script lang="ts">
	import { onMount } from 'svelte';

	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	let mapElement: HTMLDivElement;

	onMount(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiY2hpdWJhY2EiLCJhIjoiY2tvOHdueTE5MnI2ZDJwcGdhYmdldWcxbiJ9.nODodukM4uQc-6KXgoZ4zQ';

		new mapboxgl.Map({
			container: mapElement, // container ID
			style: 'mapbox://styles/chiubaca/clge0llj7001t01rq9kz4l55x', // style URL
			center: [86.7801, 27.8002], // starting position [lng, lat]
			zoom: 9, // starting zoom
			pitch: 49
		});
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div bind:this={mapElement} id="map" style="width: 400px; height: 300px;" />
