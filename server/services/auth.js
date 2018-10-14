import fetch from 'node-fetch'
import btoa from 'btoa'

import { URLSearchParams } from 'url'

export default class AuthService {
    static get headers() {
        return {
            'Authorization': 'Basic ' + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        }
    }

    static async refreshToken(refresh) {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token')
        params.append('refresh_token', refresh)

        const str = `grant_type=refresh_token&refresh_token=${refresh}`
        const url = `https://www.bungie.net/platform/app/oauth/token/`
        const raw = await fetch(url, {
            headers : AuthService.headers,
            method  : 'POST',
            body    : params
        })

        const {access_token, refresh_token, membership_id} = await raw.json()

        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            membershipId: membership_id
        }
    }  
}