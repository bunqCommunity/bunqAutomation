export class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor(resource, query) {
        super(`Resource '${resource}' was not found.`);
        this.data = { resource, query };
    }
}

export class BadRequestError extends DomainError {
    constructor(query) {
        super(`The given request was not formatted correctly.`);
        this.data = { query };
    }
}

export class UnAuthenticatedError extends DomainError {
    constructor() {
        super(`Unauthenticated, permission denied`);
    }
}

export default DomainError;
