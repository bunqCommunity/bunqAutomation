export class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NoBunqApiKeyError extends DomainError {
    constructor(query) {
        super(`No bunq API key has been set yet.`);
        this.data = { query };
    }
}

export class NoPasswordSetError extends DomainError {
    constructor(query) {
        super(`No password has been set yet.`);
        this.data = { query };
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor(resource, query) {
        super(`Resource '${resource}' was not found.`);
        this.data = { resource, query };
    }
}

export class BadRequestError extends DomainError {
    constructor(message) {
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
