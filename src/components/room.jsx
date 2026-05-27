import { useGLTF, Text } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const infoData = {
  intro: {
    title: '✨ Introduction',
    description:
      'Hi, I’m Melba — a creative and detail-oriented IT professional passionate about building modern web experiences, immersive 3D interfaces, and AI-powered applications. I enjoy combining design, development, and problem-solving to create interactive digital products that feel both functional and engaging.'
  },

  projects: {
    title: '🚀 Projects',
    description:
      'Developed projects across AI, analytics, healthcare, and smart systems.\n\n• Smart Crime Investigation Management System\n• Multi-Document Q&A System using GenAI + RAG\n• Women’s Healthcare Access & Analysis Dashboard\n\nFocused on creating scalable, user-friendly, and impactful solutions.'
  },

  skills: {
    title: '💻 Skills',
    description:
      'Skilled in building responsive web applications and interactive experiences using:\n\n• HTML\n• CSS\n• JavaScript\n• React\n• Node.js\n• Three.js\n\nComfortable with both frontend creativity and logical problem-solving.'
  },

  education: {
    title: '🎓 Education',
    description:
      'B.Tech Information Technology\nSRM Institute of Science and Technology\nCGPA: 9.4\n\nStrong academic foundation with consistent performance, quick adaptability, and a passion for continuous learning and innovation.'
  },

  certifications: {
    title: '🏆 Certifications',
    description:
      'Certified in multiple domains including AI, data science, analytics, and 3D web development.\n\n• Python for Data Science — NPTEL Elite Silver\n• Advanced Data Analytics — Coursera\n• Three.js Journey — Bruno Simon\n• AI Generalist Level 1 — Deloitte'
  },

  contact: {
    title: '📬 Contact',
    description:
      '📧 melbasuyambu2003@gmail.com\n\n📱 +91 9043908757'
  }
}

function Star({
  position,
  label,
  setSelected,
  setProgress,
  completed,
  setCompleted
}) {
  return (
    <group position={position}>
      {/* GLOWING BALL */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()

          setSelected(infoData[label])

          if (!completed.includes(label)) {
            setCompleted((prev) => [...prev, label])

            setProgress((prev) => prev + 1)
          }
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />

        <meshStandardMaterial
          color="#ffd6f5"
          emissive="#ff8ad4"
          emissiveIntensity={4}
        />
      </mesh>

      {/* STAR SYMBOL */}
      <Text
        position={[0, 0, 0.45]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ★
      </Text>
    </group>
  )
}
function Paper({
  paper,
  setPapers,
  setPaperScore
}) {
  const meshRef = useRef()

  const [thrown, setThrown] = useState(false)

  const dustbinPosition = [-13.5, 4, -1.5]

  useFrame(() => {
    if (!meshRef.current || !thrown) return

    // MOVE TOWARD DUSTBIN
    meshRef.current.position.x +=
      (dustbinPosition[0] - meshRef.current.position.x) * 0.08

    meshRef.current.position.y +=
      (dustbinPosition[1] - meshRef.current.position.y) * 0.08

    meshRef.current.position.z +=
      (dustbinPosition[2] - meshRef.current.position.z) * 0.08

    // SHRINK
    meshRef.current.scale.multiplyScalar(0.96)

    // REMOVE WHEN CLOSE
    const distance =
      meshRef.current.position.distanceTo({
        x: dustbinPosition[0],
        y: dustbinPosition[1],
        z: dustbinPosition[2]
      })

    if (distance < 0.3) {
      setPapers((prev) =>
        prev.filter((p) => p.id !== paper.id)
      )

      setPaperScore((prev) => prev + 1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={paper.position}
      onClick={() => {
        setThrown(true)
      }}
    >
      <sphereGeometry args={[0.35, 16, 16]} />

      <meshStandardMaterial color="#fff5f5" />
    </mesh>
  )
}
export default function Room({
  setSelected,
  setProgress,
  completed,
  setCompleted,
  gameStarted,
  setGameStarted,
  paperScore,
  setPaperScore
}) {
  const { scene } = useGLTF('/src/assets/resume-room.glb')

  const [papers, setPapers] = useState([
    {
      id: 1,
      position: [-2, 4.5, -0.9]
    },
    {
      id: 2,
      position: [-3, 4.5, 0]
    },
    {
      id: 3,
      position: [-2, 4.5, 0]
    }
  ])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyE') {
        setGameStarted(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setGameStarted])

  return (
    <group>
      <primitive object={scene} />

      {/* INTRO */}
      <Star
        position={[5, 16, 12]}
        label="intro"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />

      {/* PROJECTS */}
      <Star
        position={[20, 9, -4]}
        label="projects"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />

      {/* SKILLS */}
      <Star
        position={[16, 21, 7]}
        label="skills"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />

      {/* EDUCATION */}
      <Star
        position={[-4.5, 20, 12]}
        label="education"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />

      {/* CERTIFICATIONS */}
      <Star
        position={[-20, 11, 6]}
        label="certifications"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />

      {/* CONTACT */}
      <Star
        position={[-5, 2, -1]}
        label="contact"
        setSelected={setSelected}
        setProgress={setProgress}
        completed={completed}
        setCompleted={setCompleted}
      />
{/* PAPER TOSS GAME */}
{gameStarted &&
  papers.map((paper) => (
    <Paper
      key={paper.id}
      paper={paper}
      setPapers={setPapers}
      setPaperScore={setPaperScore}
    />
  ))}
    </group>
  )
}