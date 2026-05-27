export default function InfoCard({ title, description, onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15,15,25,0.92)',
        padding: '20px',
        borderRadius: '16px',
        color: 'white',
        width: '340px',
        fontFamily: 'sans-serif',
        border: '2px solid #ff9de2',
        boxShadow: '0 0 20px rgba(255,150,220,0.5)',
        zIndex: 1000
      }}
    >
      <h2
        style={{
          marginBottom: '10px',
          color: '#ffb7e8'
        }}
      >
        {title}
      </h2>

      <p
        style={{
          lineHeight: '1.6',
          color: '#f3e8ff',
           whiteSpace: 'pre-line'
        }}
      >
        {description}
      </p>

      <button
        onClick={onClose}
        style={{
          marginTop: '15px',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '8px',
          background: '#ff9de2',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  )
}