export default function TestMinimalPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Minimal Test Page</h1>
      <p>If you see this, basic routing works.</p>
      <p>Server time: {new Date().toISOString()}</p>
      <br />
      <h2>Navigation Test:</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/method">Method</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  )
}