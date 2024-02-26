/**
 * 오류 코드 정의
 */
export enum ExceptionCodeEnum {
	/**
	 * 서버 내부 오류
	 */
	InternalServerError = 'INTERNAL0001',
	/**
	 * 사용자를 찾지 못 할 경우
	 */
	AccountNotFound = 'ACCOUNT0001',
	/**
	 * 이미 가입된 회원
	 */
	AlreadySignUpUser = 'AUTH0002',
	/**
	 * 아이디 또는 비밀번호가 틀릴경우
	 */
	InvalidUsernameOrPassword = 'AUTH0003',
	/**
	 * Device Token을 찾지 못한 경우
	 */
	NotFoundUserDeviceToken = 'AUTH0004',
	/**
	 * AccessToken이 잘못된 경우
	 */
	InvalidAccessToken = 'AUTH0005',
	/**
	 * AccessToken이 만료된 경우
	 */
	ExpiredAccessToken = 'AUTH0006',
	/**
	 * 시스템에러
	 */
	UnCatch = 'SYS00001',
	/**
	 * 쿼리 오류
	 */
	QueryError = 'SYS00002',
	/**
	 * 환경 변수를 찾지 못한 경우
	 */
	NotFoundEnvironment = 'SYS00003',
	/**
	 * 이미 등록된 회원 정보
	 */
	AlreadyCreatedUser = 'USER0001',
}
