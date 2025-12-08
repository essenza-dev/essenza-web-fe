'use client'

import UserForm from '@/components/dashboards/users/Form'

const UsersEditPage = ({ params }) => {
  const id = params?.id

  return <UserForm id={id} />
}

export default UsersEditPage
