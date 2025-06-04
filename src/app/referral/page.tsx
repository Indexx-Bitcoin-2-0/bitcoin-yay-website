import { Suspense } from 'react'
import ReferralPage from './ReferralPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReferralPage />
    </Suspense>
  )
}
