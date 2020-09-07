import { writable, derived } from 'svelte/store'

export let height = writable(400)

export let doubled = derived(height, ($height) => $height * 2)
