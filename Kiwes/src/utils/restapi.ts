import {jwtToken} from './metaData';
import {RESTAPIBuilder} from './restapiBuilder';

// async function refreshToken(header: HeadersInit, params: RequestInit, url: string) {
//   const res_ref = await fetch('/api/refresh_token');
//   const data_ref = await res_ref.json();
//   if (res_ref.ok) {
//     // console.log('refresh success', data_ref)
//     params.headers = {
//       Authorization: data_ref.accessToken,
//       ...header,
//     };
//     const res = await fetch(url, params);
//     const data = await res.json();
//     if (res.ok) {
//       // console.log('run original api success')
//       return data;
//     } else {
//       console.error('run original api failed');
//     }
//   } else {
//     console.error('refresh token failed');
//   }
//   return null;
// }

export class RESTAPI {
  private url: string; // request URL
  private builder: RESTAPIBuilder;

  constructor(builder: RESTAPIBuilder) {
    // console.log('builder', builder)
    this.url = builder.url;
    this.builder = builder;
  }

  async run() {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...this.builder.header,
      },
      method: this.builder.method,
      body: JSON.stringify(this.builder.body),
    };
    // console.log('needToken', this.builder.needToken)
    if (this.builder.needToken) {
      params.headers = {
        ...params.headers,
        Authorization: `Bearer ${jwtToken}`,
      };
    }

    const res = await fetch(this.url, params);
    const data = await res.json();

    if (!res.ok) {
      if (res.status == 419) {
        //todo refresh
        // const data_refresh = refreshToken(this.builder.header, params, this.url)
        // if (data_refresh != null) {
        //   return data_refresh
        // }
      } else if (res.status == 999) {
        //todo logout
      } else if (res.status == 401) {
        //todo invalid token
        console.error('401 Unauthorized');
        // await fetch('/api/logout')
        return null;
      } else if (res.status == 502) {
        //todo do nothing
        return null;
      }
      throw data.message;
    }
    return data;
  }
}
