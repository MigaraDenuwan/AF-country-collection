import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'

test('renders without crashing', () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument()
})
