import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Dashboard render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-6 rounded-2xl border border-rose-300/50 bg-rose-950/40 p-6 text-rose-200">
          Something went wrong. Please refresh the dashboard.
        </div>
      );
    }

    return this.props.children;
  }
}
