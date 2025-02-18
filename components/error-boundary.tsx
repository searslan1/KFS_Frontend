import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: undefined, errorInfo: undefined }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Üzgünüz, bir hata oluştu.</h1>
            <p className="text-gray-600 mb-4">
              Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.
            </p>
            {this.state.error && (
              <div className="mt-4 p-4 bg-red-100 rounded text-left">
                <p className="font-bold">Hata:</p>
                <p className="font-mono text-sm">{this.state.error.toString()}</p>
              </div>
            )}
            {this.state.errorInfo && (
              <div className="mt-4 p-4 bg-yellow-100 rounded text-left">
                <p className="font-bold">Bileşen Yığını:</p>
                <pre className="font-mono text-sm overflow-auto max-h-40">{this.state.errorInfo.componentStack}</pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

