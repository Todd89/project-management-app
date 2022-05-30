import React, { ReactNode } from 'react';
import './boundaryError.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <div className="boundary-error-message">Упс, что-то пошло не так.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
