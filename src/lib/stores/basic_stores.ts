import { writable } from "svelte/store";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";

export const loading = writable(false);
export const idColumn = writable(undefined);

export const view = persist(writable("requests"), createLocalStorage(), "V");
