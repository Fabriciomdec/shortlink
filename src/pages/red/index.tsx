import axios from "axios"
import { usePathname, useSearchParams } from "next/navigation"

export default function Redirect() {



  const redirectTo = async () => {
    try {
      const responseLongUrl = await axios.get(`/localhost:3001/api/`)
    } catch (error) {

    }
  }

  return (
    <></>
  )
}