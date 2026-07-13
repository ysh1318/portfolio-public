// Ambient background blobs — carried over from the current single-page
// build (spec §1: "Background"). Purely decorative, aria-hidden.
export default function Particles() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full opacity-50 blur-3xl"
        style={{
          top: '-6%',
          left: '0%',
          width: 320,
          height: 320,
          background: 'linear-gradient(135deg, #FF7597 0%, #C3A3FA 100%)',
        }}
      />
      <div
        className="absolute rounded-full opacity-30 blur-3xl"
        style={{
          top: '25%',
          left: '-4%',
          width: 340,
          height: 340,
          background: 'linear-gradient(135deg, #A8E0FF 0%, #A55EEA 100%)',
        }}
      />
      <div
        className="absolute rounded-full opacity-30 blur-3xl"
        style={{
          top: '65%',
          right: '-6%',
          width: 300,
          height: 300,
          background: 'linear-gradient(135deg, #A8E0FF 0%, #A55EEA 100%)',
        }}
      />
    </div>
  )
}
