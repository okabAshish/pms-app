import React from 'react'
import { Provider } from 'react-redux'
import SignUpScreen from './screens/SignUpScreen/SignUpScreen'
import store from './store'

type Props = {}

const App = (props: Props) => {


  return (
    <Provider store={store}>
   <SignUpScreen/>
    </Provider>
  )
}

export default App