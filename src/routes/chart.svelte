<script context="module">
  /**
   * @param {import('@sveltejs/kit).LoadOptions} options
   * @returns {import('@sveltejs/kit').Loaded}
   */
  export async function load({ page, fetch, session, context }) {
    const url = `/chart.json`;
    const res = await fetch(url);
    if (res.ok) {
      return {
        props: {
          data: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script>
  import Chart from "$lib/Chart.svelte";
  import { nord } from "$lib/nord";

  import { onMount } from "svelte";
  onMount(() => {
    if (document) {
      document.documentElement.style.cssText = "--bg-color:" + nord[0];
      document.documentElement.style.cssText += "--fg-color:" + nord[5];
    }
  });

  String.prototype.hashCode = function () {
    var hash = 0,
      i,
      chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  export let data;
  let chartData = {
    labels: data
      .map((e) => e.entry.map((entry) => new Date(entry.start).getDate()))
      .reduce((acc, val) => acc.concat(val), []),
    datasets: data
      .map((e) => ({
        label: e.type + " time",
        borderColor: nord[(e.type.hashCode() % 4) + 7],
        pointBorderColor: nord[14],
        backgroundColor: nord[1] + "30",
        data: e.entry.map((entry) => entry.time / 60),
        yAxisID: "axis-1",
      }))
      .concat(
        data.map((e) => ({
          label: e.type + " rating",
          borderColor: nord[(e.type.hashCode() % 4) + 7],
          pointBorderColor: nord[15],
          backgroundColor: nord[3] + "30",
          data: e.entry.map((entry) => entry.rating),
          yAxisID: "axis-2",
        }))
      ),
  };
  let options = {
    stacked: false,
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: nord[4],
      },
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "axis-2",
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };
  console.log(JSON.stringify(chartData, null, 2));
</script>

<!-- <Chart {...$$props} type="bar"></Chart> -->
<Chart type="line" data={chartData} {options} />

<style>
  :global(input) {
    color: var(--fg-color);
    background-color: var(--bg-color);
    text-align: center;
    border: none;
    border-radius: 0.25rem;
    outline: none;
  }

  :global(body) {
    padding: 0;
    margin: 0;
    background-color: var(--bg-color);
    color: var(--fg-color);
  }
</style>
