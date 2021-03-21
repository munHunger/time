<script context="module">
	/**
	 * @param {import('@sveltejs/kit).LoadOptions} options
	 * @returns {import('@sveltejs/kit').Loaded}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/index.json`;
		const res = await fetch(url);
		if (res.ok) {
			return {
				props: {
					items: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>
<script>
	import {nord} from "$lib/nord"
	import Tab from '$lib/Tab.svelte';
	import Icon from '$lib/Icon.svelte';
	import Modal from "$lib/Modal.svelte"
	import Timer from "$lib/Timer.svelte";
	import Rating from "$lib/Rating.svelte";

	import {onMount} from "svelte"
	onMount(() => {
		if(document) {
			document.documentElement.style.cssText = "--bg-color:" + nord[0];
			document.documentElement.style.cssText += "--fg-color:" + nord[5];
		}
	})

	export let items = [];

	export let addingItem = false;

	let selected = undefined;

	let newName = "";

	function saveNewItem() {
		window.fetch("/index.json", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({tag: newName})
		}).then(data => {
			items = items.concat(newName);
			newName = "";
			addingItem = false;
		})
	}

	let startTime;

	function save(rating, type) {
		console.log(rating)
		console.log(type);
		console.log(startTime)
		let time = Math.floor((new Date().getTime() - startTime) / 1000);
		startTime = undefined;
		selected = undefined;
		window.fetch("/report.json", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({ type, rating, time, start: new Date().getTime()})
		}).then(data => {
			console.log("saved");
		});
	}
</script>

<main>
	{#each items as item}
		<Tab name={item} expanded={!selected || selected === item} onSelect={() => selected = item}></Tab>
		{#if selected === item}
			<Timer bind:start={startTime}></Timer>
			<Rating on:rating={event => save(event.detail, item)}></Rating>
		{/if}
	{/each}
	<div class="add" style="color: {nord[3]}" on:click="{() => addingItem = true}">
		<Icon plus />
	</div>
	{#if addingItem}
		<Modal>
			<label for="itemName">Name</label>
			<input name="itemName" bind:value="{newName}" />
			<div style="margin-top:1rem; color:{nord[3]}">
				<span on:click="{saveNewItem}">
					<Icon check />
				</span>
				<span on:click="{() => addingItem = false}">
					<Icon cross />
				</span>
			</div>
		</Modal>
	{/if}
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.add {
		padding: 1rem;
		cursor: pointer;
	}

	main {
		text-align: center;
		margin: 0 auto;
		padding: 0;
	}

	:global(input) {
		color: var(--fg-color);
		background-color: var(--bg-color);
		text-align: center;
		border: none;
		border-radius: 0.25rem;;
		outline: none;
	}

	:global(body) {
		padding: 0;
		margin: 0;
		background-color: var(--bg-color);
		color: var(--fg-color);
	}
</style>
