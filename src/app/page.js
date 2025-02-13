import { permanentRedirect } from 'next/navigation'

//Main route is /home
export default function Home() {
  permanentRedirect("/home");
}
