<script>
  import { nord } from "$lib/nord";
    import {onMount, afterUpdate, onDestroy} from 'svelte';
  
    import Chart from 'chart.js';
  
    //  Expected data
    export let data = {
      labels: [],
      datasets: [
        {values: []}
      ],
      yMarkers: {},
      yRegions: [],
    };
    export let type = 'line';
    export let options = {};
    export let plugins = {};
    let chart = null;
    let chartRef;
    let props = ["data", "type", "options", "plugins"];
    onMount(() => {
      chart = new Chart(chartRef, {
        type,
        data,
        options,
        plugins
      });
    });
    afterUpdate(() => {
      chart.data = data;
      chart.type = type;
      chart.options = options;
      chart.plugins = plugins;
      chart.update()
    });
  
    onDestroy(() => {
      chart = null;
    });
  </script>
  
  <canvas bind:this={chartRef} type width="600" height="200" style="background-color: {nord[0]}"></canvas>
  