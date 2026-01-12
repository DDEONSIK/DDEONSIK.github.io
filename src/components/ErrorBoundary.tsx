import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', backgroundColor: '#FEF2F2', color: '#991B1B', height: '100vh', overflow: 'auto' }}>
                    <h1>⚠️ Something went wrong.</h1>
                    <br />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Error:</h2>
                    <pre style={{ backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
                        {this.state.error?.toString()}
                    </pre>
                    <br />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Component Stack:</h2>
                    <pre style={{ backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.8rem' }}>
                        {this.state.errorInfo?.componentStack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
