export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted">
        {/* Add background image or pattern here */}
      </div>
      <div className="flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}

