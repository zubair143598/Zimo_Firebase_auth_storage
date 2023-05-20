import { useState } from "react"
import Auth from "./Auth"
import SignIn from "./SignIn"



const Tabs = () => {
    const [tab, setTab] =useState(0)
    if(tab===0) return <Auth setTab={setTab}/>
    if(tab===1) return <SignIn setTab={setTab}/>

  return 
    null
  
}

export default Tabs