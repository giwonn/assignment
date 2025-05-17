export class LoginResult {
  accessToken: string;

  public static of(params: { accessToken: string }): LoginResult {
    const result = new LoginResult();
    result.accessToken = params.accessToken;
    return result;
  }
}
