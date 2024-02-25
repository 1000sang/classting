/**
 * DB 접속정보
 */
export interface DatabaseConfig {
  /**
   * 접속 Host
   */
  host: string;
  /**
   * 접속 Port
   */
  port: number;
  /**
   * 사용자 ID
   */
  username: string;
  /**
   * 사용자 패스워드
   */
  password: string;
  /**
   * database 명
   */
  databaseName: string;
}
