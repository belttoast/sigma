import { useState } from 'react'
import users from './users.json'
import './Login.css'

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate async check (matches real login feel)
    setTimeout(() => {
      const match = users.find(
        (u) => u.username === username.trim() && u.password === password,
      )

      if (match) {
        // Persist session in localStorage
        localStorage.setItem(
          'sfg_session',
          JSON.stringify({ username: match.username, displayName: match.displayName }),
        )
        onLoginSuccess(match)
      } else {
        setIsLoading(false)
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        setShake(true)
        setTimeout(() => setShake(false), 600)
      }
    }, 800)
  }

  return (
    <div className="login-root">
      {/* Animated background blobs */}
      <div className="login-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className={`login-card ${shake ? 'shake' : ''}`}>
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <img src="/Food-Logo-Graphics-1-70.jpg" alt="SFG Logo" className="login-logo-img" />
          </div>
          <h1 className="login-title">Saraburi Food Guide</h1>
          <p className="login-subtitle">เข้าสู่ระบบเพื่อค้นหาร้านอร่อยในสระบุรี</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="field-group">
            <label htmlFor="login-username" className="field-label">
              ชื่อผู้ใช้
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </span>
              <input
                id="login-username"
                type="text"
                className="field-input"
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <label htmlFor="login-password" className="field-label">
              รหัสผ่าน
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="field-input"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="login-error" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !username || !password}
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </button>
        </form>

        {/* Hint */}
        <p className="login-hint">
          {/*บัญชีทดสอบ: <strong>admin</strong> / <strong>admin1234</strong> */}
        </p>
      </div>
    </div>
  )
}
