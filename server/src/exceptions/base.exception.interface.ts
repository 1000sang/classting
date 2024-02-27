/* istanbul ignore file */
/**
 * 오류 정의
 */
export interface IBaseException {
	errorCode: string;
	errorMessage?: string;
	timestamp: string;
	statusCode: number;
	path: string;
}
