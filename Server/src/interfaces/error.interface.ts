
export default interface ErrorInterface extends Error {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}