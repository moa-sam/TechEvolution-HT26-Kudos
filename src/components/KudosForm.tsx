import { useEffect, useState, type FormEvent } from 'react'
import type { Colleague, Kudos, KudosCategory } from '../domain'
import {
  KUDOS_CATEGORIES,
  KUDOS_MAX_MESSAGE_LENGTH,
  categoryLabels,
  validateKudosMessage,
  validateKudosRecipient,
} from '../domain'

type KudosFormProps = {
  colleagues: Colleague[]
  currentUserId: string
  editingKudos: Kudos | null
  onCurrentUserChange: (id: string) => void
  onCancelEdit: () => void
  onSubmit: (to: string, message: string, category: KudosCategory) => void
  onEditSubmit: (id: string, to: string, message: string, category: KudosCategory) => void
}

function KudosForm({
  colleagues,
  currentUserId,
  editingKudos,
  onCurrentUserChange,
  onCancelEdit,
  onSubmit,
  onEditSubmit,
}: KudosFormProps) {
  const [recipientId, setRecipientId] = useState(colleagues[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<KudosCategory>('TEAMWORK')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingKudos) {
      setRecipientId(editingKudos.to)
      setMessage(editingKudos.message)
      setCategory(editingKudos.category)
      setError(null)
      return
    }

    setRecipientId(colleagues[0]?.id ?? '')
    setMessage('')
    setCategory('TEAMWORK')
    setError(null)
  }, [colleagues, editingKudos])

  const isEditing = Boolean(editingKudos)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const recipientError = validateKudosRecipient(currentUserId, recipientId)

    if (recipientError) {
      setError(recipientError)
      return
    }

    const validationError = validateKudosMessage(message)

    if (validationError) {
      setError(validationError)
      return
    }

    if (editingKudos) {
      onEditSubmit(editingKudos.id, recipientId, message.trim(), category)
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
          <h2>{isEditing ? 'Edit kudos' : 'Send a kudos'}</h2>
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
            <option key={colleague.id} value={colleague.id} disabled={colleague.id === currentUserId}>
              {colleague.name}{colleague.id === currentUserId ? ' (you)' : ''}
            </option>
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

      <button className="primary-button" type="submit">
        {isEditing ? 'Save changes' : 'Send kudos'} <span aria-hidden="true">→</span>
      </button>

      {isEditing && (
        <button
          className="secondary-button"
          type="button"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default KudosForm
