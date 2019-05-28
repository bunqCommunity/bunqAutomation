export class DomainError extends Error {
    public data: any;

    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NoBunqApiKeyError extends DomainError {
    constructor(query = null) {
        super(`No bunq API key has been set yet.`);
        this.data = { query };
    }
}

export class NoBunqApiKeyIdentifierError extends DomainError {
    constructor(query = null) {
        super(`No bunq API key identifier given`);
        this.data = { query };
    }
}

export class BunqJSClientNotReadyError extends DomainError {
    constructor(query = null) {
        super(`The bunq connection for this key is not ready or has errors`);
        this.data = { query };
    }
}

export class NoPasswordSetError extends DomainError {
    constructor(query = null) {
        super(`No password has been set yet.`);
        this.data = { query };
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor(resource = null, query = null) {
        super(`Resource '${resource}' was not found.`);
        this.data = { resource, query };
    }
}

export class BadRequestError extends DomainError {
    constructor(message = null) {
        super(message || "The given request was not valid.");
        this.data = { query: message };
    }
}

export class UnAuthenticatedError extends DomainError {
    constructor() {
        super(`Unauthenticated, permission denied.`);
    }
}

export default DomainError;
