import { Button } from "./components/Button"

export const App = () => {

  function refreshData() {
    alert('Refresh')
  }

  return (
    <div>
      <h1>Perfocentre Metadata</h1>
      <Button onClick={refreshData}>Click to Refresh</Button>
    </div>
  )
}