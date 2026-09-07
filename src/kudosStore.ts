import type { Kudos } from './domain'

const STORAGE_KEY = 'evolution-lab-kudos'

function readStoredKudos(): Kudos[] {
  const storedKudos = localStorage.getItem(STORAGE_KEY)

  if (!storedKudos) {
    return []
  }

  try {
    const parsedKudos: unknown = JSON.parse(storedKudos)
    return Array.isArray(parsedKudos) ? (parsedKudos as Kudos[]) : []
  } catch {
    return []
  }
}

export function getStoredKudos(): Kudos[] {
  return readStoredKudos()
}

export function saveKudos(kudos: Kudos[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kudos))
}
