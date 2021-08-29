import { createSignal, createEffect } from 'solid-js'

const FirstComponent = (props) => {
  const [first, setFirst] = createSignal<string>("JSON")
  const [last, setLast] = createSignal<string>("Bourne")

  createEffect(async () => {
    // console.log(`${first()} ${last()}`)
    try {
      const data = await fetch('http://localhost:5000/ingredients')
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  })

  return <div>Hello {props.name}</div>
}

export default FirstComponent
