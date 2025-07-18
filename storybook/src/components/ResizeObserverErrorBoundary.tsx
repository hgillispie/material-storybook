import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Enhanced ResizeObserver error detection
function isResizeObserverError(error: Error): boolean {
  if (!error) return false;

  const message = error.message?.toLowerCase() || "";
  const stack = error.stack?.toLowerCase() || "";

  // Check for various ResizeObserver error patterns
  const errorPatterns = [
    "resizeobserver loop completed with undelivered notifications",
    "resizeobserver loop limit exceeded",
    "resizeobserver loop exceeded",
    "loop limit exceeded",
    "undelivered notifications",
    "non-error exception captured",
  ];

  // Check message
  const hasErrorMessage = errorPatterns.some((pattern) =>
    message.includes(pattern)
  );

  // Check stack trace
  const hasResizeObserverInStack = stack.includes("resizeobserver");

  // Check error name
  const hasResizeObserverName = error.name
    ?.toLowerCase()
    .includes("resizeobserver");

  return hasErrorMessage || hasResizeObserverInStack || hasResizeObserverName;
}

export default class ResizeObserverErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State | null {
    // Check if it's a ResizeObserver-related error
    if (isResizeObserverError(error)) {
      // Don't update state, just suppress the error
      console.debug("ResizeObserver error caught and suppressed by boundary:", {
        message: error.message,
        name: error.name,
        stack: error.stack?.substring(0, 200) + "...",
      });
      return null;
    }

    // For non-ResizeObserver errors, update state to show error UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isResizeObserverError(error)) {
      // Just log for debugging and suppress
      console.debug("ResizeObserver error suppressed by boundary:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });

      // Force a re-render to recover from any state issues
      setTimeout(() => {
        this.forceUpdate();
      }, 100);

      return;
    }

    // Log other errors normally
    console.error("Error caught by boundary:", error, errorInfo);
  }

  // Add lifecycle method to handle errors during render
  componentDidUpdate(prevProps: Props, prevState: State) {
    // If we had an error but it was ResizeObserver related, reset the error state
    if (
      this.state.hasError &&
      this.state.error &&
      isResizeObserverError(this.state.error)
    ) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  // Handle runtime errors that might not be caught by componentDidCatch
  componentDidMount() {
    window.addEventListener("error", this.handleWindowError);
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleWindowError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
  }

  private handleWindowError = (event: ErrorEvent) => {
    if (event.error && isResizeObserverError(event.error)) {
      event.preventDefault();
      console.debug(
        "Window error ResizeObserver suppressed by boundary:",
        event.error.message
      );
    }
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    if (event.reason instanceof Error && isResizeObserverError(event.reason)) {
      event.preventDefault();
      console.debug(
        "Promise rejection ResizeObserver suppressed by boundary:",
        event.reason.message
      );
    }
  };

  render() {
    if (
      this.state.hasError &&
      this.state.error &&
      !isResizeObserverError(this.state.error)
    ) {
      // Only show fallback for non-ResizeObserver errors
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#666",
              fontFamily: "system-ui, sans-serif",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ color: "#d32f2f", margin: "0 0 10px 0" }}>
              Something went wrong
            </h3>
            <p style={{ margin: "0 0 10px 0" }}>
              An error occurred while rendering this component.
            </p>
            <details style={{ textAlign: "left", marginTop: "10px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Error Details
              </summary>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                {this.state.error?.message}
              </pre>
            </details>
            <button
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
