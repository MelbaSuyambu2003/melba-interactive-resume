import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

import Room from './components/Room'
import InfoCard from './components/InfoCard'
import Particles from './components/Particles'

function CameraController() {
  const keys = useRef({})

  useFrame((state, delta) => {
    const speed = 10 * delta

    const forward = new THREE.Vector3()
    state.camera.getWorldDirection(forward)

    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
    right
      .crossVectors(forward, new THREE.Vector3(0, 1, 0))
      .normalize()

    if (keys.current['KeyW']) {
      state.camera.position.add(
        forward.clone().multiplyScalar(speed)
      )
    }

    if (keys.current['KeyS']) {
      state.camera.position.add(
        forward.clone().multiplyScalar(-speed)
      )
    }

    if (keys.current['KeyA']) {
      state.camera.position.add(
        right.clone().multiplyScalar(speed)
      )
    }

    if (keys.current['KeyD']) {
      state.camera.position.add(
        right.clone().multiplyScalar(-speed)
      )
    }
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.code] = true
    }

    const handleKeyUp = (e) => {
      keys.current[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return null
}

export default function App() {
  const [selected, setSelected] = useState(null)

  const [progress, setProgress] = useState(0)

  const [completed, setCompleted] = useState([])

  const [gameStarted, setGameStarted] = useState(false)

  const [paperScore, setPaperScore] = useState(0)

  /* NEW */
  const [started, setStarted] = useState(false)

  /* NEW */
  const [showControls, setShowControls] = useState(false)

  /* NEW */
  const finished =
    progress === 6 && paperScore === 3

  return (
    <>
      {/* START SCREEN */}
      {!started && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, #050816, #12071f)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5000,
            color: 'white',
            fontFamily: 'sans-serif'
          }}
        >
          <h1
            style={{
              fontSize: '52px',
              color: '#ffd6f5',
              marginBottom: '10px'
            }}
          >
            ✨ Melba S
          </h1>

          <p
            style={{
              fontSize: '20px',
              marginBottom: '30px',
              opacity: 0.8
            }}
          >
            Interactive 3D Resume Experience
          </p>

          <button
            onClick={() => setStarted(true)}
            style={{
              padding: '14px 30px',
              borderRadius: '12px',
              border: 'none',
              background: '#ff8ad4',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Start Experience
          </button>

          <button
            onClick={() =>
              setShowControls(!showControls)
            }
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid #ff8ad4',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Controls
          </button>

          {showControls && (
            <div
              style={{
  marginTop: '24px',
  background: 'rgba(0,0,0,0.6)',
  padding: '20px',
  borderRadius: '16px',
  width: '430px',
  whiteSpace: 'nowrap',
  lineHeight: '1.8',
  textAlign: 'left'
}}
            >
              🎮 WASD → Move Around
              <br />
              🖱️ Mouse → Rotate Camera
              <br />
              🔍 Scroll → Zoom
              <br />
              💫 Click Glowing Orbs → Reveal Resume Info
              <br />
              🗑️ Press E → Start Paper Toss
              <br />
              📄 Click Papers → Throw Into Dustbin
            </div>
          )}
        </div>
      )}

      {/* MAIN EXPERIENCE */}
      {started && (
        <>
          <Canvas
            camera={{
              position: [0, 30, -40],
              fov: 45
            }}
          >
            {/* BACKGROUND */}
            <color args={['#050816']} attach="background" />

            {/* LIGHTS */}
            <ambientLight intensity={1.5} />

            <directionalLight
              position={[5, 10, 5]}
              intensity={2}
              color="#ffd6f5"
            />

            <pointLight
              position={[0, 8, 0]}
              intensity={40}
              color="#ff8ad4"
            />

            {/* PARTICLES */}
            <Particles />

            {/* ROOM */}
            <Room
              setSelected={setSelected}
              setProgress={setProgress}
              completed={completed}
              setCompleted={setCompleted}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              paperScore={paperScore}
              setPaperScore={setPaperScore}
            />

            {/* CONTROLS */}
            <OrbitControls target={[0, 8, 0]} />

            {/* CAMERA */}
            <CameraController />
          </Canvas>

          {/* PROGRESS BAR */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '220px',
              background: '#222',
              borderRadius: '12px',
              overflow: 'hidden',
              zIndex: 1000
            }}
          >
            <div
              style={{
                width: `${(progress / 6) * 100}%`,
                height: '20px',
                background: '#ff8ad4',
                transition: '0.3s'
              }}
            />

            <p
              style={{
                color: 'white',
                padding: '5px',
                textAlign: 'center',
                fontFamily: 'sans-serif'
              }}
            >
              Progress {progress}/6
            </p>
          </div>

          {/* PAPER TOSS SCORE */}
          {gameStarted && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                fontFamily: 'sans-serif',
                border: '2px solid #ff8ad4',
                zIndex: 1000
              }}
            >
              🗑️ Paper Toss : {paperScore}/3
            </div>
          )}

          {/* INFO CARD */}
          {selected && (
            <InfoCard
              title={selected.title}
              description={selected.description}
              onClose={() => setSelected(null)}
            />
          )}

          {/* FINAL SUMMARY SCREEN */}
          {finished && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.82)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 6000,
                color: 'white',
                fontFamily: 'sans-serif',
                textAlign: 'center'
              }}
            >
              <h1
                style={{
                  fontSize: '52px',
                  color: '#ffd6f5',
                  marginBottom: '20px'
                }}
              >
                ✨ Experience Complete
              </h1>

              <p
                style={{
                  maxWidth: '650px',
                  lineHeight: '1.8',
                  fontSize: '20px',
                  opacity: 0.9
                }}
              >
                Thank you for exploring my
                interactive resume experience.
                <br />
                This project combines creativity,
                3D design, frontend development,
                and interaction systems using
                Blender, React Three Fiber,
                and Three.js.
              </p>

              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '30px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ff8ad4',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                Restart Experience
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}