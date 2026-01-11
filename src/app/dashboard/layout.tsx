import { createServerSupabaseClient } from "@/lib/supabase-server"
import { DashboardClientLayout } from "./dashboard-client-layout"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <DashboardClientLayout user={user}>
      {children}
    </DashboardClientLayout>
  )
}
