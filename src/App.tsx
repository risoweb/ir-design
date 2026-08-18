import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'

const colors = ['#e91e8c', '#d946ef', '#c084fc', '#a78bfa', '#ffffff', '#f3e8ff', '#fce7f3']

function HollowCubes({ count = 25 }: { count?: number }) {
  const groupRef = useRef<any>(null)
  const meshesRef = useRef<any[]>([])
  const speedsRef = useRef<number[]>([])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    while (group.children.length) group.remove(group.children[0])
    meshesRef.current = []
    speedsRef.current = []
    const largeCount = Math.min(5, count)
    const largeSet = new Set<number>()
    while (largeSet.size < largeCount) {
      largeSet.add(Math.floor(Math.random() * count))
    }
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6
      const y = (Math.random() - 0.5) * 6
      const z = -(2 + Math.random() * 10)
      const isLarge = largeSet.has(i)
      const scale = isLarge ? 0.9 + Math.random() * 1.6 : 0.25 + Math.random() * 1.1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const speed = (isLarge ? 0.18 : 0.25) + Math.random() * 1.0
      const faceMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), side: THREE.DoubleSide, transparent: true, opacity: 0.6, roughness: 0.4, metalness: 0.2 })
      const faceGeom = new THREE.PlaneGeometry(1, 1)
      const crate = new THREE.Group()
      const back = new THREE.Mesh(faceGeom, faceMat)
      back.position.set(0, 0, -0.5)
      crate.add(back)
      const top = new THREE.Mesh(faceGeom, faceMat)
      top.rotation.x = -Math.PI / 2
      top.position.set(0, 0.5, 0)
      crate.add(top)
      const bottom = new THREE.Mesh(faceGeom, faceMat)
      bottom.rotation.x = Math.PI / 2
      bottom.position.set(0, -0.5, 0)
      crate.add(bottom)
      const left = new THREE.Mesh(faceGeom, faceMat)
      left.rotation.y = Math.PI / 2
      left.position.set(-0.5, 0, 0)
      crate.add(left)
      const right = new THREE.Mesh(faceGeom, faceMat)
      right.rotation.y = -Math.PI / 2
      right.position.set(0.5, 0, 0)
      crate.add(right)
      const boxGeom = new THREE.BoxGeometry(1.02, 1.02, 1.02)
      const edges = new THREE.EdgesGeometry(boxGeom)
      const edgeMat = new THREE.LineBasicMaterial({ color: new THREE.Color('#48242c'), linewidth: 2 })
      const outline = new THREE.LineSegments(edges, edgeMat)
      crate.add(outline)
      crate.position.set(x, y, z)
      crate.scale.set(scale, scale, scale)
      crate.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      group.add(crate)
      meshesRef.current.push(crate)
      speedsRef.current.push(speed)
    }
  }, [count])

  useFrame((_, delta) => {
    meshesRef.current.forEach((m: any, i: number) => {
      const s = speedsRef.current[i]
      m.rotation.x += s * 0.001 * delta * 60
      m.rotation.y += s * 0.0013 * delta * 60
    })
  })
  return <group ref={groupRef} />
}

function CameraRig() {
  const { camera } = useThree()
  const scroll = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scroll.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useFrame((_, delta) => {
    const angle = scroll.current * Math.PI * 1.5
    const radius = 10
    const targetX = Math.sin(angle) * radius * 0.6
    const targetZ = Math.cos(angle) * radius + 2
    const targetY = 1.8 + Math.sin(angle * 0.5) * 2
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 1.2)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 1.2)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 1.2)
    camera.lookAt(0, 0, -4)
  })
  return null
}

function BrandScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />
      <pointLight position={[-5, 2, -5]} intensity={0.4} />
      <HollowCubes count={25} />
      <CameraRig />
    </>
  )
}

function App() {
  return (
  <div className="fullscreen-container">
    <div className="fullscreen-3d">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.8, 10], fov: 40 }}>
        <Suspense fallback={null}>
          <BrandScene />
        </Suspense>
      </Canvas>
    </div>
  <header className="top-header">
    <div className="logo-group">
      <div className="logo-mark">IR</div>
      <span className="logo-text">Design Lab</span>
    </div>
    <nav className="header-nav">
      <a href="#inicio">MANIFESTO</a>
      <a href="#produtos">MÉTODO</a>
      <a href="#sobre">TRABALHO</a>
      <a href="#contato">CONTATO</a>
    </nav>
     <div className="header-actions">
       <a href="https://wa.me/+5591982373646" className="button-whatsapp">WhatsApp</a>
     </div>
  </header>
    <main className="hero-content" id="inicio">
      <p className="hero-eyebrow">01 / Hero</p>
      <div className="hero-panel">
        <div className="hero-panel-columns">
          <div className="hero-panel-column left-column">
            <h1 className="hero-title">ESTÚDIO · ENGENHARIA DA FORMA</h1>
            <h2 className="hero-title-visual">A forma <br />da <br /><span className="hero-title-highlight">engenharia</span>.</h2>
            <p className="hero-copy">Um estúdio dedicado a transformar precisão em símbolo. Fragmentamos ideias em geometria — e as reconstruímos como marcas, produtos e experiências.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#produtos">Ver produtos</a>
              <a className="button button-secondary" href="#personalizados">Fazer encomenda</a>
            </div>
          </div>
            <div className="hero-panel-column right-column">
              <p className="hero-eyebrow">SÍMBOLO VIVO</p>
              <p className="hero-copy side-item">O objeto ao centro é gerado em tempo real. Cada rolar de página revela um novo ângulo do mesmo pensamento.</p>
              <p className="hero-copy dot-item">Renderizado em tempo real · WebGL</p>
            </div>
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-panel-columns">
          <div className="hero-panel-column left-column">
            <h1 className="hero-title">MÉTODO · 02</h1>
            <h3 className="hero-title-mid">Quatro pilares.<br /><span>Um único objeto.</span></h3>              
          </div>
          <div className="hero-panel-column right-column">
            <p>Nosso trabalho é o cubo fragmentado que gira ao lado. Peças distintas, tensão calculada, movimento contínuo.</p>
          </div>
          <div className="cards-container">
            <div className="card card-large">
              <p className="card-line"><span className="first-child">01</span> <span className="last-child">+</span></p>
              <h3 className="hero-title-mid">Estrutura sólida</h3>
              <p className="hero-copy">Cada projeto nasce de um sistema. Grade, tipografia, ritmo — a espinha que sustenta a superfície.</p>
            </div>
            <div className="card card-small">
              <p className="card-line"><span className="first-child">02</span> <span className="last-child">+</span></p>
              <h3 className="hero-title-mid">Inovação contínua</h3>
              <p className="hero-copy">Prototipamos com engenharia. Iteramos com curiosidade. Entregamos com precisão.</p>    </div>
            <div className="card card-small">
              <p className="card-line"><span className="first-child">03</span> <span className="last-child">+</span></p>
              <h3 className="hero-title-mid">Design premium</h3>
              <p className="hero-copy">Materiais raros, tipografia editorial, animações cinéticas. Tudo o que uma marca séria merece — e nada além.</p>    
            </div>
            <div className="card card-large">      
              <p className="card-line"><span className="first-child">04</span> <span className="last-child">+</span></p>
              <h3 className="hero-title-mid">Escala fragmentada</h3>
              <p className="hero-copy">Do pixel ao produto físico. Um sistema de identidade que se recompõe em qualquer meio, sem perder essência.</p>    
            </div>
          </div>
        </div>
      </div>
    
      <div className="hero-panel">
        <div className="hero-panel-columns">
          <div className="hero-panel-column left-column">
            <h1 className="hero-title">MANIFESTO · 03</h1>
            <p className="hero-copy">Escrito em fragmentos.<br />Lido em movimento.</p>
          </div>
          <div className="hero-panel-column small-column">
             <h3 className="hero-title-mid">Acreditamos que <br /><span>precisão é </span><span className="hero-title-highlight">beleza</span>,<br />e que criatividade<br />é uma forma <span className="hero-title-highlight">de engenharia</span>.</h3>
             <p className="hero-copy">Toda marca séria é um objeto em rotação. Vista de um ângulo, revela força. De outro, revela silêncio. Nunca completa, nunca inerte — sempre em movimento controlado.</p>
             <p className="hero-copy">Nosso ofício é calibrar esse giro. Encontrar o eixo certo, a luz certa, o vazio necessário entre as peças. O resto é o que o observador constrói ao rolar a página.</p>
          </div>
        </div>
      </div>
    
      {/* HERO 04 - AGORA EM 4 COLUNAS */}
      <div className="hero-panel">
        {/* Título fica em cima, sozinho */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 className="hero-title">TRABALHOS · 04</h1>
          <h3 className="hero-title-mid" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Fragmentos<span className="hero-title-highlight">.</span></h3>
          <p className="hero-copy" style={{ maxWidth: '500px', marginTop: '1rem' }}>Quatro projetos de engenharia da forma aplicada ao mundo real.</p>
        </div>

        {/* Grid de 4 colunas */}
        <div className="trabalho-four-grid">
          {/* COLUNA 1 */}
          <div className="trabalho-col">
            <p className="card-line"><span className="first-child">01</span> <span className="last-child">+</span></p>
            <h4 className="hero-title-mid" style={{ fontSize: '1.4rem', margin: '1rem 0' }}>COP30</h4>
            <p className="hero-copy" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Voluntariado · 2025 · Belém</p>
            <p className="hero-copy" style={{ marginTop: '0.8rem' }}>Sistema visual fragmentado para relatórios de sustentabilidade. Grade modular inspirada nos cubos.</p>
            <p className="hero-copy dot-item" style={{ marginTop: '1rem' }}>Projeto real</p>
          </div>

          {/* COLUNA 2 */}
          <div className="trabalho-col">
            <p className="card-line"><span className="first-child">02</span> <span className="last-child">+</span></p>
            <h4 className="hero-title-mid" style={{ fontSize: '1.4rem', margin: '1rem 0' }}>EMPRESAS</h4>
            <p className="hero-copy" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Produtos · 2025 · Premiun</p>
            <p className="hero-copy" style={{ marginTop: '0.8rem' }}>Identidade e produtos para empresas. Da forma à geometria do produto à embalagem.</p>
            <p className="hero-copy dot-item" style={{ marginTop: '1rem' }}>Embalagem kraft</p>
          </div>

          {/* COLUNA 3 */}
          <div className="trabalho-col">
            <p className="card-line"><span className="first-child">03</span> <span className="last-child">+</span></p>
            <h4 className="hero-title-mid" style={{ fontSize: '1.4rem', margin: '1rem 0' }}>IR Design Lab</h4>
            <p className="hero-copy" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Estúdio · 2025 · Identidade</p>
            <p className="hero-copy" style={{ marginTop: '0.8rem' }}>O próprio site que você está vendo. WebGL em tempo real, rotoscopia e engenharia da forma.</p>
            <p className="hero-copy dot-item" style={{ marginTop: '1rem' }}>WebGL · React</p>
          </div>

          {/* COLUNA 4 */}
          <div className="trabalho-col">
            <p className="card-line"><span className="first-child">04</span> <span className="last-child">+</span></p>
            <h4 className="hero-title-mid" style={{ fontSize: '1.4rem', margin: '1rem 0' }}>Confeitaria</h4>
            <p className="hero-copy" style={{ fontSize: '0.9rem', fontWeight: 600 }}>SENAI · 2025 · Protótipo</p>
            <p className="hero-copy" style={{ marginTop: '0.8rem' }}>Marca premium de confeitaria onde cada doce é um fragmento preciso. Sistema em desenvolvimento.</p>
            <p className="hero-copy dot-item" style={{ marginTop: '1rem' }}>Em breve</p>
          </div>
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-panel-columns">
          <div className="hero-panel-column left-column">
            <h1 className="hero-title">CONVITE · 05</h1>
            <h2 className="hero-title-visual">Contrua <br />o <span className="hero-title-highlight">futuro</span><br />conosco<span className="hero-title-highlight">.</span></h2>
            <p className="hero-copy">Aceitamos quatro projetos por trimestre. Se a sua marca merece ser um objeto em rotação, começamos aqui.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#produtos">Enviar brienfing</a>
              <a className="button button-secondary" href="#personalizados">Voltar ao início</a>
            </div>
          </div>
            <div className="hero-panel-column right-column">
              <p className="hero-eyebrow">VAGAS DISPONÍVEIS </p>
              <p className="hero-copy side-item">02/04</p>
              <p className="hero-copy dot-item">Q1 · 2026 · Aceitando briefings</p>
            </div>
        </div>
      </div>
    </main>
  </div>
)
}

export default App
