import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login.jsx'

const fallbackImages = {
  hero:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80',
}

const folderImages = (folder, count = 8) => {
  const extensions = ['jpg', 'jpeg', 'png', 'webp']

  return Array.from({ length: count }, (_, index) => index + 1).flatMap((number) =>
    extensions.map((extension) => encodeURI(`/${folder}/pic${number}.${extension}`)),
  )
}

const imageGroups = {
  bigbg: folderImages('Big bg'),
  shop1: folderImages('shop1'),
  shop2: folderImages('shop2'),
  shop3: folderImages('shop3'),
}

function useCyclingImage(sources, fallback, intervalMs = 3500) {
  const [availableSources, setAvailableSources] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let isMounted = true

    Promise.all(
      sources.map(
        (source) =>
          new Promise((resolve) => {
            const image = new Image()
            image.onload = () => resolve({ source, isAvailable: true })
            image.onerror = () => resolve({ source, isAvailable: false })
            image.src = source
          }),
      ),
    ).then((results) => {
      if (!isMounted) {
        return
      }

      setAvailableSources(
        results.filter((result) => result.isAvailable).map((result) => result.source),
      )
      setActiveIndex(0)
    })

    return () => {
      isMounted = false
    }
  }, [sources])

  useEffect(() => {
    if (availableSources.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % availableSources.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [availableSources.length, intervalMs])

  return availableSources[activeIndex] || fallback
}

const restaurants = [
  {
    name: 'ก๋วยเตี๋ยวกลางนา',
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    description:
      'ร้านก๋วยเตี๋ยวกลางนา ก๋วยเตี๋ยวน้ำซุปกระดูกหมาหอมกลมกล่อม เส้นเหนียวนุ่ม เครื่องแน่น บรรยากาศกลางทุ่งนา เหมาะสำหรับผู้ที่มองหามื้ออร่อยพร้อมความสดชื่นจากธรรมชาติ',
    location: 'ตำบล ผึ้งรวง อำเภอเฉลิมพระเกียรติ จังหวัด สระบุรี',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=ก๋วยเตี๋ยวกลางนา',
  },
  {
    name: 'Shinyou Shabu ชินยู ชาบู',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8j0U3C9nKgryprCuuAnC7q3c5fT82Z8xaBQCay_SyvSEVariQEGL_Z9dMKCzG-AkCb98d4ziESks_ZguNMfYX_w4KyMj434hVztGSEMguhmGwfF2sXwoQP-jO0LKM4l5gkJly=s1360-w1360-h1020-rw',
    description:
      'ร้าน Shinyou Shabu ชินยู ชาบู บุฟเฟต์ชาบูน้ำซุปหอมกลมกล่อม พร้อมเนื้อสดและวัตถุดิบคุณภาพ น้ำจิ้มรสเข้มข้น เหมาะสำหรับการรับประทานกับครอบครัว เพื่อน หรือคนพิเศษในทุกโอกาส',
    location: 'ตำบล ตะกุด อำเภอเมืองสระบุรี จังหวัด สระบุรี ',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Shinyou Shabu ชินยู ชาบู 28, 196 ซอย บุญสว่าง ตำบล ปากเพรียว เมือง สระบุรี 18000',
  },
  {
    name: 'โรงสี กาแฟ',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE31XX98GVyYqjlp9gyey-4nNbrUIntFM45zReV2a4nTIXP0D-xMS6T2gDliEoE09TA1ZRwqLYkTGEupIKHYvPVtFjEd_SCjSbwQbjBcZkemqVwowOwQjgHxDWqcC-urhQLtpSadAGcoYM=s1360-w1360-h1020-rw',
    description:
      'ร้านโรงสี กาแฟ เสิร์ฟสเต๊ก พาสต้า และเครื่องดื่มคุณภาพ วัตถุดิบสดใหม่ รสชาติกลมกล่อม บรรยากาศอบอุ่น เหมาะสำหรับการพักผ่อน พบปะสังสรรค์ หรือรับประทานอาหารได้ทุกมื้อ',
    location: 'ตำบล บ้านยาง อำเภอ เสาไห้ จังหวัด สระบุรี ',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=โรงสี กาแฟ โรงสีไฟเทพประสิทธิ์ 69 ถนน เทศวิวัฒน์ ตำบล แก่งคอย อำเภอแก่งคอย สระบุรี 18110',
  },
]

const maker = {
  name: 'ผู้จัดทำ: นาย พงศ์ภรณ์ พุกเกลี้ยง',
  email: 'aompongphorn@gmail.com',
  phone: '092-249-8524',
  image: '/me.png',
}

function App() {
  // ── Auth state ──────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sfg_session')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function handleLogout() {
    localStorage.removeItem('sfg_session')
    setUser(null)
  }

  // ── Hooks must ALWAYS be called before any early return ──
  const heroImage = useCyclingImage(imageGroups.bigbg, fallbackImages.hero)
  const restaurantImages = [
    useCyclingImage(imageGroups.shop1, restaurants[0].image),
    useCyclingImage(imageGroups.shop2, restaurants[1].image),
    useCyclingImage(imageGroups.shop3, restaurants[2].image),
  ]

  // Show login page when not authenticated
  if (!user) {
    return <Login onLoginSuccess={setUser} />
  }


  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="กลับไปหน้าแรก">
          <img src="/Food-Logo-Graphics-1-70.jpg" alt="SFG Logo" className="brand-logo" />
          <span>ร้านอร่อยสระบุรี</span>
        </a>

        <nav className="nav-links" aria-label="เมนูหลัก">
          <a href="#home">หน้าแรก</a>
          <a href="#restaurants">ร้านอาหาร</a>
          <a href="#contact">ติดต่อ</a>
        </nav>

        <div className="topbar-user">
          <span className="topbar-greeting">👋 {user.displayName}</span>
          <button id="logout-btn" className="logout-btn" onClick={handleLogout}>
            ออกจากระบบ
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero-section"
          id="home"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(31, 25, 18, 0.82), rgba(31, 25, 18, 0.28)), url("${heroImage}")`,
          }}
        >
          <div className="hero-copy">
            <p className="eyebrow">Saraburi Food Guide</p>
            <h1>ร้านอร่อยสระบุรี</h1>
            <p className="hero-text">
              รวมร้านอาหารน่าแวะในจังหวัดสระบุรี พร้อมข้อมูลที่ตั้งและปักหมุด
              Location ให้เดินทางตามได้สะดวก
            </p>

            <a className="primary-link" href="#restaurants">
              ดูร้านอาหารแนะนำ
            </a>
          </div>
        </section>

        <section className="intro-section" aria-label="ข้อความต้อนรับ">
          <div>
            <p className="eyebrow">Welcome</p>
            <h2>รวมสถานที่กินน่าเที่ยวในจังหวัดสระบุรี</h2>
          </div>

          <p>
            เลือกร้านเด่นที่เหมาะกับหลายโอกาส ทั้งมื้อเช้า อาหารอีสาน
            และมื้อครอบครัว พร้อมรูปภาพ คำอธิบาย และแผนที่ครบในหน้าเดียว
          </p>
        </section>

        <section className="section" id="restaurants">
          <div className="section-heading">
            <p className="eyebrow">Recommended</p>
            <h2>ร้านอาหารแนะนำ</h2>
          </div>

          <div className="restaurant-grid">
            {restaurants.map((restaurant, index) => (
              <article className="restaurant-card" key={restaurant.name}>
                <img
                  src={restaurantImages[index]}
                  alt={`ภาพอาหารจาก ${restaurant.name}`}
                />

                <div className="card-body">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.description}</p>

                  <div className="location-row">
                    <span aria-hidden="true">📍</span>
                    <span>{restaurant.location}</span>
                  </div>

                  <a
                    className="map-link"
                    href={restaurant.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ปักหมุด Location
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>ผู้จัดทำ</h2>

            <p>
              อันตัวข้านั้นมีนามว่า...
              <br />
              นาย พงศ์ภรณ์ พุกเกลี้ยง
              <br />
              เรียนเทคนิคสระบุรี เรื่องเรียนไม่ค่อยเถียง
              <br />
              แผนกสาระสนเทศ โค้ดผิดเป็นเรื่องประจำ
              <br />
              ชอบ Furry ก็ชอบไป ไม่ได้ทำใครระกำ
      </p>
          </div>

          <div className="profile-card">
            <img src={maker.image} alt="รูปผู้จัดทำ" />

            <div>
              <h3>{maker.name}</h3>
              <p>อีเมล: {maker.email}</p>
              <p>โทร: {maker.phone}</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Saraburi Food Guide</p>
      </footer>
    </div>
  )
}

export default App
