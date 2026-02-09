import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white/40 border-amber-900/20 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <CardTitle className="text-amber-900">Something went wrong</CardTitle>
              </div>
              <CardDescription className="text-amber-800">
                An unexpected error occurred. Please reload the page to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700">
                If this problem persists, please check the browser console for more details.
              </p>
              {this.state.error && (
                <p className="text-xs text-amber-600 mt-2 font-mono">
                  {this.state.error.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={this.handleReload}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              >
                Reload Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
