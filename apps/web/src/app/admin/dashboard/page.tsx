import { DashboardView } from '@/components/views/dashboard/DashboardView'

export const revalidate = 600 // every 10 minutes

export default function DashboardPage() {
  return <DashboardView />
}
