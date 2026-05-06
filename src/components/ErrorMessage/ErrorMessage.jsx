import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="error-message" role="alert" aria-live="assertive">
            <div className="error-message__content">
                <span className="error-message__icon">⚠</span>
                <span className="error-message__text">{message}</span>
                {onClose && (
                    <button
                        className="error-message__close"
                        onClick={onClose}
                        aria-label="Close error message"
                        type="button"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
