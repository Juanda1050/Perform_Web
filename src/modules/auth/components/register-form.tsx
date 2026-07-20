import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/config/routes'
import { useRegister } from '@/modules/auth/hooks/use-register'
import { registerSchema, type RegisterFormValues } from '@/modules/auth/schemas/register-schema'

export function RegisterForm() {
  const navigate = useNavigate()
  const register_ = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', companyName: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit((values) => {
    register_.mutate(values, {
      onSuccess: ({ outcome }) => {
        if (outcome === 'signed-in') {
          navigate(ROUTES.dashboard, { replace: true })
        } else {
          navigate(ROUTES.login, { replace: true })
        }
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          {...register('fullName')}
        />
        {errors.fullName ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.fullName.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="companyName">Company name</Label>
        <Input
          id="companyName"
          autoComplete="organization"
          aria-invalid={!!errors.companyName}
          {...register('companyName')}
        />
        {errors.companyName ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.companyName.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={register_.isPending} className="mt-2">
        {register_.isPending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
