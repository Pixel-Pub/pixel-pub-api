import axios from 'axios'
import qs from 'qs'
import btoa from 'btoa'
            
export default class AuthService {
    static get auth() {
        return {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET
        }
    }

    static get headers() {
        return {
            'X-API-KEY'    : process.env.BUNGIE_API_KEY,
            'Content-Type' : 'application/x-www-form-url-encoded',
            'Authorization': 'Basic ' + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        }
    }

    static async refreshToken(refresh) {
        const url = 'https://www.bungie.net/platform/app/oauth/token/'
        const config = {
            url,
            method  : 'POST',
            headers : AuthService.headers,
            data    : qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh
            })
        }

        config.params = config.data
        const {response} = await axios(config)

        const {access_token, refresh_token, membership_id} = response.data

        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            membershipId: membership_id
        }
    }  
}