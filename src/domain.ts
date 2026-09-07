export const KUDOS_MAX_MESSAGE_LENGTH = 100

export const KUDOS_CATEGORIES = [
  'TEAMWORK',
  'EXTRA_MILE',
  'MENTORSHIP',
  'CRAFT',
  'CUSTOMER_IMPACT',
] as const

export type KudosCategory = (typeof KUDOS_CATEGORIES)[number]

export type Kudos = {
  id: string
  from: string
  to: string
  message: string
  category: KudosCategory
  createdAt: string
}

export type Colleague = {
  id: string
  name: string
  role: string
}

export const categoryLabels: Record<KudosCategory, string> = {
  TEAMWORK: 'Teamwork',
  EXTRA_MILE: 'Extra mile',
  MENTORSHIP: 'Mentorship',
  CRAFT: 'Craft',
  CUSTOMER_IMPACT: 'Customer impact',
}

export function validateKudosMessage(message: string): string | null {
  const trimmedMessage = message.trim()

  if (!trimmedMessage) {
    return 'Write a message before sending your kudos.'
  }

  if (trimmedMessage.length > KUDOS_MAX_MESSAGE_LENGTH) {
    return `Messages must be ${KUDOS_MAX_MESSAGE_LENGTH} characters or fewer.`
  }

  return null
}
