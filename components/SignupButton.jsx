'use client'

export default function SignupButton({ classId  }) {

    async function signUp() {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId }),
            })
    
            if (!response.ok) {
                const error = await response.text()
                console.error('Sign-up failed:', error)
            } else {
                console.log('Successfully signed up for class')
            }
        } catch (error) {
            console.error('Error during sign-up:', error)
        }
    }
    return (
        <button className={`bg-white rounded-l-lg text-[26px] p-4`}
        onClick={() => signUp()}>
            Sign up
        </button>
        
    )
}