import { useEffect, useState } from 'react'

export default function DailyQuote() {
  const [state, setState] = useState({ loading: true, error: null, quote: null })

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://dummyjson.com/quotes/random', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setState({ loading: false, error: null, quote: data })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ loading: false, error: err.message, quote: null })
      })

    return () => controller.abort()
  }, [])

  if (state.loading) {
    return <p>Loading...</p>
  }

  if (state.error) {
    return (
      <p role="alert" className="error">
        {state.error}
      </p>
    )
  }

  return (
    <blockquote>
      {state.quote.quote}
      <footer>— {state.quote.author}</footer>
    </blockquote>
  )
}
