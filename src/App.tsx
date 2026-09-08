import { useMemo, useState } from 'react'
import colleagues from '../data/colleagues.json'
import KudosFeed from './components/KudosFeed'
import KudosForm from './components/KudosForm'
import RecognitionInsights from './components/RecognitionInsights'
import type { Kudos, KudosCategory } from './domain'
import { getStoredKudos, saveKudos } from './kudosStore'

function App() {
  const [kudos, setKudos] = useState<Kudos[]>(getStoredKudos)
  const [currentUserId, setCurrentUserId] = useState(colleagues[0]?.id ?? '')
  const [editingKudosId, setEditingKudosId] = useState<string | null>(null)
  const sortedKudos = useMemo(
    () => [...kudos].sort((first, second) => (
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
    )),
    [kudos],
  )

  const editingKudos = kudos.find((item) => item.id === editingKudosId) ?? null

  function handleAddKudos(to: string, message: string, category: KudosCategory) {
    const newKudos: Kudos = {
      id: crypto.randomUUID(),
      from: currentUserId,
      to,
      message,
      category,
      createdAt: new Date().toISOString(),
    }
    const nextKudos = [newKudos, ...kudos]
    setKudos(nextKudos)
    saveKudos(nextKudos)
  }

  function handleEditKudos(id: string, to: string, message: string, category: KudosCategory) {
    const nextKudos = kudos.map((item) => (
      item.id === id ? { ...item, to, message, category } : item
    ))
    setKudos(nextKudos)
    saveKudos(nextKudos)
    setEditingKudosId(null)
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <h1>Kudos</h1>
          <p className="hero-copy">A little recognition goes a long way. Celebrate the people who make the work better.</p>
        </div>
        <div className="hero-spark" aria-hidden="true">✦</div>
      </header>
      <div className="app-grid">
        <KudosForm
          colleagues={colleagues}
          currentUserId={currentUserId}
          editingKudos={editingKudos}
          onCurrentUserChange={setCurrentUserId}
          onCancelEdit={() => setEditingKudosId(null)}
          onSubmit={handleAddKudos}
          onEditSubmit={handleEditKudos}
        />
        <KudosFeed
          kudos={sortedKudos}
          colleagues={colleagues}
          currentUserId={currentUserId}
          onEditKudos={setEditingKudosId}
        />
      </div>
      <RecognitionInsights kudos={kudos} colleagues={colleagues} />
      <footer>Built for the team, by the team.</footer>
    </main>
  )
}

export default App
