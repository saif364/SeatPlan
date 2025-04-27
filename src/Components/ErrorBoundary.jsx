import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render a fallback UI
            return (
                <div className='border-4 border-red-200' style={{
                    textAlign: 'center',
                    marginTop: '50px',
                    padding: '20px',

                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '600px',
                    margin: '50px auto'
                }}>
                    <h1 style={{ color: '#d9534f', marginBottom: '15px' }}>Oops! Something went wrong.</h1>
                    <p style={{ color: '#555' }}>We are working to fix this issue. Please try again later.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;