import React from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import SimpleTodos from './components/SimpleTodos'
import TaskLists from './components/TaskLists'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

import Sidebar from './components/Sidebar'
import {useState, useEffect} from 'react'

function App() {
  const [lists, setLists] = useState([])
  const [selectedList, setSelectedList] = useState('WORK')
  // Header background image state
  const bgImages = [
    {
      name: 'Three Dots',
      url:
        "url(\"data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='5' cy='5' r='2' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='20' cy='5' r='2' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='35' cy='5' r='2' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E\")",
    },
    {
      name: 'Diagonal Lines',
      url:
        'repeating-linear-gradient(135deg, #1976d2 0px, #1976d2 8px, #1565c0 8px, #1565c0 16px)',
    },
    {
      name: 'Waves',
      url:
        "url(\"data:image/svg+xml,%3Csvg width='120' height='20' viewBox='0 0 120 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 10 0 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 V20 H0Z' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E\")",
    },
    {
      name: 'Abstract 1',
      url: 'url("/bg/abstract1.jpg")',
    },
    {
      name: 'Abstract 2',
      url: 'url("/bg/abstract2.jpg")',
    },
    {
      name: 'Gradient 1',
      url: 'url("/bg/gradient1.jpg")',
    },
    {
      name: 'Gradient 2',
      url: 'url("/bg/gradient2.jpg")',
    },
    {
      name: 'None',
      url: 'none',
    },
  ]
  const [headerBg, setHeaderBg] = React.useState(bgImages[0].url)
  const [menuOpen, setMenuOpen] = React.useState(false)

  // Fetch categories from backend and keep in sync
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://todoapplication-j07a.onrender.com/todos')
      const data = await res.json()
      const cats = Array.from(
        new Set(data.map(todo => todo.category || 'WORK')),
      )
      setLists(cats)
      if (!cats.includes(selectedList)) setSelectedList(cats[0] || 'WORK')
    }
    fetchCategories()
  }, [selectedList])

  const handleAddList = async name => {
    await fetch('https://todoapplication-j07a.onrender.com/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: Date.now(),
        todo: 'New List',
        priority: 'LOW',
        status: 'TO DO',
        category: name,
        dueDate: '',
      }),
    })
    setSelectedList(name)
  }
  const handleSelectList = name => setSelectedList(name)

  return (
    <BrowserRouter>
      <AppContent
        lists={lists}
        selectedList={selectedList}
        handleSelectList={handleSelectList}
        handleAddList={handleAddList}
        headerBg={headerBg}
        setHeaderBg={setHeaderBg}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        bgImages={bgImages}
      />
    </BrowserRouter>
  )
}

function AppContent({
  lists,
  selectedList,
  handleSelectList,
  handleAddList,
  headerBg,
  setHeaderBg,
  menuOpen,
  setMenuOpen,
  bgImages,
}) {
  const location = useLocation()
  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/register'
  return (
    <div
      style={{minHeight: '100vh', top: 0, width: '100vw', overflowX: 'hidden'}}
    >
      {!isAuthRoute && (
        <header
          style={{
            width: '100%',
            background: '#1976d2',
            color: 'white',
            padding: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundImage: headerBg,
            backgroundRepeat: headerBg === 'none' ? undefined : 'no-repeat',
            backgroundPosition:
              headerBg === 'none' ? undefined : 'right 1.5rem center',
            backgroundSize: headerBg === 'none' ? undefined : '60px 20px',
            transition: 'background-image 0.3s',
          }}
        >
          <span>Simple To Do</span>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <button
              aria-label="Change background"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginRight: '0.5rem',
                position: 'relative',
              }}
              onClick={() => setMenuOpen(v => !v)}
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: 'white',
                    color: '#1976d2',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    minWidth: 160,
                    zIndex: 1000,
                    padding: '0.5rem 0',
                  }}
                >
                  {bgImages.map(img => (
                    <div
                      key={img.name}
                      style={{
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        background:
                          headerBg === img.url
                            ? 'rgba(25,118,210,0.08)'
                            : 'transparent',
                        fontWeight: headerBg === img.url ? 'bold' : 'normal',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                      onClick={() => {
                        setHeaderBg(img.url)
                        setMenuOpen(false)
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 16,
                          display: 'inline-block',
                          borderRadius: 4,
                          background: img.url !== 'none' ? img.url : '#eee',
                          border: '1px solid #ccc',
                          marginRight: 8,
                        }}
                      ></span>
                      {img.name}
                    </div>
                  ))}
                </div>
              )}
            </button>
            <button
              onClick={() => {
                // Remove token/cookie and redirect to login
                if (window && window.localStorage) {
                  window.localStorage.clear()
                }
                if (window && window.sessionStorage) {
                  window.sessionStorage.clear()
                }
                if (window && window.location) {
                  window.location.href = '/login'
                }
              }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 18px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                marginLeft: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s',
              }}
              onMouseOver={e =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')
              }
              onMouseOut={e =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')
              }
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                <path d="M3 12a9 9 0 0115-6.7" />
              </svg>
              Logout
            </button>
          </div>
        </header>
      )}
      <div style={{display: 'flex', width: '100%'}}>
        {!isAuthRoute && (
          <Sidebar
            lists={lists}
            selectedList={selectedList}
            onSelectList={handleSelectList}
            onAddList={handleAddList}
          />
        )}
        <div style={{flex: 1}}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/lists"
              element={
                <ProtectedRoute>
                  <TaskLists selectedCategory={selectedList} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <SimpleTodos listCardBg={headerBg} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App
