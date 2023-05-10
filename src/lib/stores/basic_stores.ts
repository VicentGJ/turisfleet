import { writable } from "svelte/store";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";

export const loading = writable(false);

export const view = persist(writable("requests"), createLocalStorage(), "V");
export const situationView = persist(
  writable("car-situations"),
  createLocalStorage(),
  "SV"
);
export const programView = persist(
  writable("specific-programs"),
  createLocalStorage(),
  "PV"
);
