import React from 'react'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'

const Protected = () => {
	const { push } = useRouter()
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated: () => {
			push('/join')
		},
	})

	if (status === 'loading') {
		return <h1>Loading...</h1>
	}

	if (status === 'unauthenticated')
		return <h1> You are unauthenticated. this is a protected page.</h1>

	return <h1>{session.user.email}</h1>
}

// export const getServerSideProps = async (ctx) => {
// 	const session = await getSession(ctx)
//
// 	// if (!session)
// 	// 	return {
// 	// 		redirect: {
// 	// 			destination: '/auth/signin',
// 	// 		},
// 	// 	}
//
// 	return {
// 		props: { session },
// 	}
// }

export default Protected