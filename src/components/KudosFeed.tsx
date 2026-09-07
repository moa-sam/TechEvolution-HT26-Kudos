import type { Colleague, Kudos } from '../domain'
import KudosCard from './KudosCard'

type KudosFeedProps = {
  kudos: Kudos[]
  colleagues: Colleague[]
}

function KudosFeed({ kudos, colleagues }: KudosFeedProps) {
  const colleaguesById = new Map(colleagues.map((colleague) => [colleague.id, colleague]))

  return (
    <section className="feed" aria-labelledby="feed-title">
      <div className="feed-heading">
        <div>
          <p className="eyebrow">The wall</p>
          <h2 id="feed-title">Recent kudos</h2>
        </div>
        <span className="feed-count">{kudos.length} {kudos.length === 1 ? 'kudos' : 'kudos shared'}</span>
      </div>
      {kudos.length === 0 ? (
        <div className="empty-state" role="status">
          <span className="empty-face" aria-hidden="true">☹</span>
          <h3>No kudos yet</h3>
          <p>Be the first to celebrate someone on the team.</p>
        </div>
      ) : (
        <div className="kudos-list">
          {kudos.map((item) => <KudosCard key={item.id} kudos={item} colleaguesById={colleaguesById} />)}
        </div>
      )}
    </section>
  )
}

export default KudosFeed
