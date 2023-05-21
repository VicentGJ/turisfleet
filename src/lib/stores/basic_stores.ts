import { writable } from 'svelte/store'
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store'

interface PopupType {
  type: 'error' | 'warning'
  message: string
}
export const loading = writable(false)
export const idColumn = writable(undefined)
export const errorMessage = writable<PopupType>({ message: '', type: 'error' })
export const view = persist(writable('requests'), createLocalStorage(), 'V')
