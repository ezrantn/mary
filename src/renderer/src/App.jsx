import { useState } from 'react'
import './App.css'

const notes = [
  {
    id: 1,
    title: 'AOWB Heuristic',
    preview: 'Adaptive order-widening branching heuristic...',
    tags: ['nra', 'ricp']
  },
  {
    id: 2,
    title: 'HC4 Contractor',
    preview: 'HC4 performs constraint propagation...',
    tags: ['nra', 'interval']
  },
  {
    id: 3,
    title: 'Ownership Calculus',
    preview: 'A minimal ownership calculus using dependent types...',
    tags: ['lean', 'formal-methods']
  },
  {
    id: 4,
    title: 'Separation Logic',
    preview: 'Reasoning about programs that manipulate memory...',
    tags: ['formal-methods']
  }
]

function App() {
  const [selectedNote, setSelectedNote] = useState(notes[0])
  const [search, setSearch] = useState('')
  const [content, setContent] = useState(
    `# AOWB Heuristic

Adaptive order-widening branching heuristic for interval constraint propagation.

## Motivation

The heuristic prioritizes variables based on the expected reduction of the search space.

## Related

[[Interval Arithmetic]]
[[HC4 Contractor]]
[[Branch and Bound]]

#nra #ricp`
  )

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )

  const openNote = (note) => {
    setSelectedNote(note)

    setContent(
      `# ${note.title}

${note.preview}

## Notes

Start writing here...

#${note.tags.join(' #')}`
    )
  }

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled',
      preview: '',
      tags: []
    }

    setSelectedNote(newNote)
    setContent('# Untitled\n\n')
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">B</div>

          <div>
            <div className="brand-name">Mary</div>
            <div className="brand-subtitle">local knowledge base</div>
          </div>
        </div>

        <button className="new-note-button" onClick={createNote}>
          <span>+</span>
          New note
        </button>

        <div className="search-container">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <kbd>⌘ K</kbd>
        </div>

        <div className="sidebar-section">
          <div className="section-label">Recent</div>

          <div className="note-list">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                onClick={() => openNote(note)}
              >
                <span className="note-title">{note.title}</span>

                {note.preview && <span className="note-preview">{note.preview}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section tags-section">
          <div className="section-label">Tags</div>

          <div className="tags">
            <button>#formal-methods</button>
            <button>#lean</button>
            <button>#nra</button>
            <button>#ricp</button>
            <button>#research</button>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="vault-status">
            <span className="status-dot"></span>
            Local vault
          </div>

          <div className="version">v0.1.0</div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Mary</span>
            <span className="separator">/</span>
            <span>{selectedNote?.title || 'Untitled'}</span>
          </div>

          <div className="topbar-actions">
            <button title="Search">⌕</button>
            <button title="More">•••</button>
          </div>
        </header>

        <div className="editor-wrapper">
          <div className="editor">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck="false"
              autoFocus
            />
          </div>
        </div>

        <footer className="editor-footer">
          <div>Markdown</div>

          <div className="editor-status">
            <span>Saved</span>
            <span>•</span>
            <span>{content.length} characters</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
