import {RESTAPI} from './restapi';

export class RESTAPIBuilder {
  public url: string;
  public method: string;
  public header: any;
  public body: any;
  public responseDataDepth?: string;
  public needToken: boolean;

  constructor(reqURL: string, reqMethod: string) {
    this.url = reqURL;
    this.method = reqMethod;
    this.needToken = false;
  }

  public setHeader(header: any) {
    this.header = header;
    return this;
  }

  public setBody(body: any) {
    this.body = body;
    return this;
  }

  public setResponseDataDepth(depth: string) {
    this.responseDataDepth = depth;
    return this;
  }

  public setNeedToken(need: boolean) {
    this.needToken = need;
    return this;
  }

  public build() {
    return new RESTAPI(this);
  }
}
