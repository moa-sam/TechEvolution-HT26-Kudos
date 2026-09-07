import type { Colleague, Kudos } from '../domain'

const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

type RecognitionInsightsProps = {
  kudos: Kudos[]
  colleagues: Colleague[]
}

function RecognitionInsights({ kudos, colleagues }: RecognitionInsightsProps) {
  const recentCutoff = Date.now() - RECENT_WINDOW_MS
  const recentRecipientIds = new Set(
    kudos
      .filter((item) => new Date(item.createdAt).getTime() >= recentCutoff)
      .map((item) => item.to),
  )
  const awaitingRecognition = colleagues.filter((colleague) => !recentRecipientIds.has(colleague.id))
  const kudosByRecipient = new Map(colleagues.map((colleague) => [colleague.id, 0]))

  kudos.forEach((item) => {
    if (kudosByRecipient.has(item.to)) {
      kudosByRecipient.set(item.to, (kudosByRecipient.get(item.to) ?? 0) + 1)
    }
  })

  const rankedRecipients = colleagues
    .filter((colleague) => (kudosByRecipient.get(colleague.id) ?? 0) > 0)
    .sort((first, second) => (
      (kudosByRecipient.get(second.id) ?? 0) - (kudosByRecipient.get(first.id) ?? 0)
      || first.name.localeCompare(second.name)
    ))

  return (
    <section className="insights" aria-label="Recognition insights">
      <div className="insight-panel">
        <div className="insight-heading">
          <div>
            <p className="eyebrow">Keep it balanced</p>
            <h2>Awaiting recognition</h2>
          </div>
          <span className="insight-icon" aria-hidden="true">♡</span>
        </div>
        <p className="insight-description">No kudos received in the last 7 days.</p>
        {awaitingRecognition.length === 0 ? (
          <p className="insight-empty">Everyone has been celebrated this week.</p>
        ) : (
          <ul className="colleague-list">
            {awaitingRecognition.map((colleague) => (
              <li key={colleague.id}>
                <span className="avatar">{colleague.name.charAt(0)}</span>
                <span><strong>{colleague.name}</strong><small>{colleague.role}</small></span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="insight-panel">
        <div className="insight-heading">
          <div>
            <p className="eyebrow">The leaderboard</p>
            <h2>Top receivers</h2>
          </div>
          <span className="insight-icon" aria-hidden="true">✦</span>
        </div>
        <p className="insight-description">Colleagues ranked by kudos received.</p>
        {rankedRecipients.length === 0 ? (
          <p className="insight-empty">The leaderboard will appear after the first kudos.</p>
        ) : (
          <ol className="ranking-list">
            {rankedRecipients.map((colleague, index) => (
              <li key={colleague.id}>
                <span className="rank">{index + 1}</span>
                <span className="ranking-name"><strong>{colleague.name}</strong><small>{colleague.role}</small></span>
                <strong className="kudos-total">{kudosByRecipient.get(colleague.id)}</strong>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

export default RecognitionInsights
