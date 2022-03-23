import { AccessToken, AuthStatus, BeEvent, BentleyError } from "@itwin/core-bentley";
import { ViewerAuthorizationClient } from "@itwin/web-viewer-react";

export class TokenServerAuthClient implements ViewerAuthorizationClient {
  public readonly onAccessTokenChanged = new BeEvent<
    (token: AccessToken) => void
  >();
  protected _accessToken?: AccessToken;

  constructor(private _envPrefix = "prod-") {}

  public async initialize() {
    const tokenUrl = `https://${this._envPrefix}imodeldeveloperservices-eus.azurewebsites.net/api/v0/sampleShowcaseUser/devUser`;

    try {
      const res = await fetch(tokenUrl);
      if (res.ok) {
        const { _jwt } = await res.json();
        const accessToken = `Bearer ${_jwt}`;
        this._accessToken = accessToken;
        this.onAccessTokenChanged.raiseEvent(accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async getAccessToken(): Promise<AccessToken> {
    if (!this._accessToken) {
      throw new BentleyError(AuthStatus.Error, "Cannot get access token");
    }
    return this._accessToken;
  }
}
