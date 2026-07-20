import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { RegisterForm } from '@/modules/auth/components/register-form'

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your company</CardTitle>
        <CardDescription>
          This creates your company workspace and an administrator account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <RegisterForm />
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link to={ROUTES.login} className="text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
