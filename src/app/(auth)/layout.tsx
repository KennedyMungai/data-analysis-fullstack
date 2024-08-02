import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return <div>{children}</div>
}

export default AuthLayout
