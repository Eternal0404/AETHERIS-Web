import { createServerSupabaseClient } from "@/lib/supabase-server"
import { HomeClient } from "./home-client"

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="relative min-h-screen">
      <HomeClient user={user} />
    </main>
  )
}
