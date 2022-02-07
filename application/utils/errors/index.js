/**
 * Base custom error
*/
class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'INTERNAL_SERVER_ERROR';
    }
}

/**
 * Database custom error
*/
class DatabaseError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'DATABASE_ERROR';
    }
}

/**
 * Not Implemented custom error
 */
class NotImplementedError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'NOT_IMPLEMENTED';
    }
}

/**
 * Bad Request custom error
 */
class RequestError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'BAD_REQUEST';
    }
}

/**
 * Unauthorized custom error
 */
class UnauthorizedError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'UNAUTHORIZED';
    }
}

/**
 * Forbidden custom error
 */
class ForbiddenError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'FORBIDDEN';
    }
}

/**
 * Not Found custom error
 */
class NotFoundError extends ApplicationError {
    constructor(message) {
        super(message);
        this.name = 'NOT_FOUND';
    }
}

module.exports = {
    ApplicationError,
    DatabaseError,
    NotImplementedError,
    RequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
};