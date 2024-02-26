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
	 * 아이디 또는 비밀번호가 틀릴경우
	 */
	InvalidUsernameOrPassword = 'AUTH0003',
	/**
	 * 학교페이지
	 */
	/**
	 * 학교 페이지 지역, 이름이 중복될 경우
	 */
	PageAlreadyExist = 'PAGE0001',
	/**
	 * 소식 작성 실패했을 경우
	 */
	CreateNewsFail = 'PAGE0002',
	/**
	 * 학교 페이지를 찾을 수 없는 경우
	 */
	SchoolPageNotFound = 'PAGE0003',
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
