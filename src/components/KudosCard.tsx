import type { Colleague, Kudos } from '../domain'
import { categoryLabels } from '../domain'

type KudosCardProps = {
  kudos: Kudos
  colleaguesById: Map<string, Colleague>
  currentUserId: string
  onEdit: () => void
}

function KudosCard({ kudos, colleaguesById, currentUserId, onEdit }: KudosCardProps) {
  const sender = colleaguesById.get(kudos.from)
  const recipient = colleaguesById.get(kudos.to)
  const createdAt = new Date(kudos.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const canEdit = kudos.from === currentUserId

  return (
    <article className="kudos-card">
      <div className="card-topline">
        <span className="category-pill">{categoryLabels[kudos.category]}</span>
        <time dateTime={kudos.createdAt}>{createdAt}</time>
      </div>
      <p className="kudos-message">“{kudos.message}”</p>
      <p className="kudos-attribution">
        <strong>{sender?.name ?? 'Former colleague'}</strong>
        <span aria-hidden="true">→</span>
        <strong>{recipient?.name ?? 'Former colleague'}</strong>
      </p>
      {canEdit && (
        <button
          type="button"
          className="edit-button"
          onClick={onEdit}
          aria-label={`Edit kudos from ${sender?.name ?? 'colleague'}`}
        >
          ✎
        </button>
      )}
    </article>
  )
}

export default KudosCard
