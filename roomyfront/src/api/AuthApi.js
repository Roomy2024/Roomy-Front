import createAxios from "./createAxios";

const MID_URL = "/auth"

class AuthApi {

    constructor(){
        this.axios = createAxios(MID_URL)
    }

    async kakaoLogin(){
        try{
            const response = await this.axios.get(
                "/kakaoLogin", //백에서 로그인 로직 URL 만들면 수정해주기
                {
                    withCredentials: true,
                }
            );
            console.log(response);
            return response.data;   
        }catch(error){
            throw error;
        }
    }
}