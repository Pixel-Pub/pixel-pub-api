import axios from 'axios'

export default class AuthService {
    get headers() {
        return {
            'X-API-KEY'    : process.env.BUNGIE_API_KEY,
            'Content-Type' : 'application/x-www-form-url-encoded',
            'Authorization': 'Basic ' + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)    
        }
    }

    static async refreshToken(refresh) {
        const url = 'https://www.bungie.net/platform/app/oauth/token/'
        const raw = await axios({
            url,
            method  : 'POST',
            headers : this.headers,
            data    : {
                grant_type: refresh_token,
                refresh_token: refresh
            }
        })

        const {access_token, refresh_token, membership_id} = response.data

        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            membershipId: membership_id
        }
    }  
}