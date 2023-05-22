import { createLocalStorage, persist } from '@macfja/svelte-persistent-store'
import { writable } from 'svelte/store'
import type { LoggedInType } from '../types/AuthTypes'

interface PopupType {
  type: 'error' | 'warning'
  message: string
}
export const loading = writable(false)
export const idColumn = writable(undefined)
export const errorMessage = writable<PopupType>({ message: '', type: 'error' })
export const view = persist(writable('requests'), createLocalStorage(), 'V')

export const loggedUser = writable<LoggedInType>({
  username: '',
  id_user: -1,
  id_role: '',
})
