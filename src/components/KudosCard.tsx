import type { Colleague, Kudos } from '../domain'
import { categoryLabels } from '../domain'

type KudosCardProps = {
  kudos: Kudos
  colleaguesById: Map<string, Colleague>
}

function KudosCard({ kudos, colleaguesById }: KudosCardProps) {
  const sender = colleaguesById.get(kudos.from)
  const recipient = colleaguesById.get(kudos.to)
  const createdAt = new Date(kudos.createdAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

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
    </article>
  )
}

export default KudosCard
