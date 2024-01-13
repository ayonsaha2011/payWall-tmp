import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { Exception } from "@tsed/exceptions";

@Injectable()
export class ErrorHandlingService {

    static getCustomValidationError(message: string, field: string) {
        return {
            name: 'AJV_VALIDATION_ERROR',
            status: "error",
            message: message,
            errors: [{
                instancePath: `/${field}`,
                field: field,
                message: message
            }]
        }

    }

    static getCustomError(message: string) {
        return {
            name: 'CUSTOM_ERROR',
            status: "error",
            message: message,
            errors: []
        }
    }

    static ProcessError(error: any) {
        if (error instanceof Exception) {
            return {
                name: error.name,
                status: "error",
                message: error.message,
                errors: error.errors
            }
        } else if (error.name === 'AJV_VALIDATION_ERROR') {
            return {
                name: error.name,
                status: "error",
                message: error.message,
                errors: error.errors
            }
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            let field = error.meta?.target as string;
            if (error.code === 'P2002') {
                if (field) {
                    field = field.split("_")[1];
                }
                return {
                    name: 'AJV_VALIDATION_ERROR',
                    status: "error",
                    message: 'Record already exists',
                    errors: [{
                        instancePath: `/${field}`,
                        field: field,
                        message: field + " already exists"
                    }]
                }
            } else if (error.code === 'P2005' || error.code === 'P2006') {
                return {
                    name: 'AJV_VALIDATION_ERROR',
                    status: "error",
                    message: 'Record type mismatch',
                    errors: [{
                        instancePath: `/${field}`,
                        field: field,
                        message: field + " type mismatch"
                    }]
                }
            }
            else {
                return {
                    name: error.code,
                    status: "error",
                    message: error.message,
                    errors: []
                }
            }
        }
        else {
            return {
                name: 'CUSTOM_ERROR',
                status: "error",
                message: error.message,
                errors: []
            }
        }
    }

}
