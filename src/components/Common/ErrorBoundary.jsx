import { Component } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Structured Crash Reporting Logging
    const crashReport = {
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "unknown",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      errorMessage: error?.message || "Unknown error",
      errorStack: error?.stack,
      componentStack: errorInfo?.componentStack,
    };

    console.error("[CRASH REPORT]", crashReport);

    // Optional: send to telemetry service (e.g. Sentry / custom endpoint)
    if (typeof window !== "undefined" && window.__reportCrash) {
      try {
        window.__reportCrash(crashReport);
      } catch (e) {
        console.warn("Crash reporting handler failed:", e);
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary-screen" role="alert">
          <div className="error-boundary-card">
            <div className="error-boundary-icon-wrap">
              <AlertTriangle size={36} className="error-boundary-icon" />
            </div>

            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-message">
              An unexpected display glitch occurred while rendering this showcase view.
            </p>

            {process.env.NODE_ENV !== "production" && this.state.error && (
              <details className="error-boundary-details">
                <summary>Technical Details</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                type="button"
                className="error-boundary-btn primary"
                onClick={this.handleReload}
              >
                <RotateCcw size={15} />
                <span>Reload View</span>
              </button>

              <button
                type="button"
                className="error-boundary-btn secondary"
                onClick={this.handleReset}
              >
                <Home size={15} />
                <span>Return to Portfolio</span>
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
