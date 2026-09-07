import { useState, type FormEvent } from 'react'
import type { Colleague, KudosCategory } from '../domain'
import {
  KUDOS_CATEGORIES,
  KUDOS_MAX_MESSAGE_LENGTH,
  categoryLabels,
  validateKudosMessage,
} from '../domain'

type KudosFormProps = {
  colleagues: Colleague[]
  currentUserId: string
  onCurrentUserChange: (id: string) => void
  onSubmit: (to: string, message: string, category: KudosCategory) => void
}

function KudosForm({
  colleagues,
  currentUserId,
  onCurrentUserChange,
  onSubmit,
}: KudosFormProps) {
  const [recipientId, setRecipientId] = useState(colleagues[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<KudosCategory>('TEAMWORK')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationError = validateKudosMessage(message)

    if (validationError) {
      setError(validationError)
      return
    }

    onSubmit(recipientId, message.trim(), category)
    setMessage('')
    setError(null)
  }

  return (
    <form className="kudos-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">Share appreciation</p>
          <h2>Send a kudos</h2>
        </div>
        <span className="form-icon" aria-hidden="true">✦</span>
      </div>

      <label>
        Sending as
        <select value={currentUserId} onChange={(event) => onCurrentUserChange(event.target.value)}>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>{colleague.name}</option>
          ))}
        </select>
      </label>

      <label>
        To
        <select value={recipientId} onChange={(event) => setRecipientId(event.target.value)}>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>{colleague.name}</option>
          ))}
        </select>
      </label>

      <label>
        Category
        <select value={category} onChange={(event) => setCategory(event.target.value as KudosCategory)}>
          {KUDOS_CATEGORIES.map((item) => (
            <option key={item} value={item}>{categoryLabels[item]}</option>
          ))}
        </select>
      </label>

      <label>
        Message
        <textarea
          value={message}
          maxLength={KUDOS_MAX_MESSAGE_LENGTH}
          onChange={(event) => {
            setMessage(event.target.value)
            setError(null)
          }}
          placeholder="What did they do that made a difference?"
          rows={4}
        />
        <span className="character-count">{message.length}/{KUDOS_MAX_MESSAGE_LENGTH}</span>
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-button" type="submit">Send kudos <span aria-hidden="true">→</span></button>
    </form>
  )
}

export default KudosForm
