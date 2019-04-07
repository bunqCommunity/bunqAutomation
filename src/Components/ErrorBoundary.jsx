import React from "react";
import Typography from "@material-ui/core/Typography";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <Typography variant="subtitle2">Something went wrong.</Typography>
                    <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                    </Typography>
                    <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.errorInfo.componentStack}
                    </Typography>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
