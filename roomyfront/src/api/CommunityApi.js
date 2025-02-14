import createAxios from "./CreateAxios"; // ✅ CreateAxios.js에서 가져오기

class CommunityApi {
  constructor() {
    this.axios = createAxios("/community");
  }

  // 📌 게시물 목록 가져오기
  // async fetchPosts() {
  //   try {
  //     const response = await this.axios.get("/getall");
  //     return response.data.map((post) => ({
  //       ...post,
  //       imageUrls: post.imageUrls?.map((url) => this.fixImageUrl(url)) || [],
  //       imageUrl: post.imageUrls?.length ? this.fixImageUrl(post.imageUrls[0]) : "",
  //       likes: post.likes ?? 0,
  //       comments: post.comments ?? 0,
  //     }));
  //   } catch (error) {
  //     console.error("❌ 게시물 목록 가져오기 중 오류 발생:", error);
  //     throw error;
  //   }
  // }


  // async fetchPosts(page = 0, size = 10) {
  //   try {
  //     console.log(`🔍 API 요청 URL: /getall?page=${page}&size=${size}`);
  
  //     const response = await this.axios.get(`/getall?page=${page}&size=${size}`);
  //     console.log("🔍 API 원본 응답:", response.data);
  
  //     // ✅ API 응답이 객체이고 content 필드가 있는지 확인
  //     if (response.data && Array.isArray(response.data.content)) {
  //       console.log("✅ 응답이 content 객체를 포함합니다.");
  //       return response.data.content; // 🚀 content 배열만 반환
  //     }
  
  //     console.error("❌ API 응답이 예상과 다릅니다:", response.data);
  //     return [];
  //   } catch (error) {
  //     console.error("❌ 게시물 목록 가져오기 중 오류 발생:", error);
  //     return [];
  //   }
  // }
  

  async fetchPosts(page = 0, size = 10, category = "게시판") {
    try {
      let url = `/getall?page=${page}&type=${category}`;
  
      console.log(`🔍 API 요청 URL: ${url}`);
      
      const response = await this.axios.get(url);
      console.log("🔍 API 응답 데이터:", response.data);
  
      // ✅ 응답 데이터가 배열인지 확인
      if (response.data && Array.isArray(response.data.content)) {
        return response.data.content.map(post => ({
          ...post,
          type: post.type || "", // ✅ type이 없으면 기본값 설정
        }));
      }
  
      console.error("❌ API 응답이 예상과 다릅니다:", response.data);
      return [];
    } catch (error) {
      console.error("❌ 게시물 목록 가져오기 중 오류 발생:", error);
      return [];
    }
  }
  
  




  // 📌 게시물 상세 조회
  async fetchPostById(communityId) {
    try {
      const response = await this.axios.get(`/${communityId}`);
      return {
        ...response.data,
        imageUrls: response.data.imageUrls?.slice(0, 15).map((url) => this.fixImageUrl(url)) || [],
        createdAt: response.data.createdAt || response.data.timestamp || null,
        likeCount: response.data.likeCount || 0,
        comments: response.data.comments ||[]
      };
    } catch (error) {
      console.error(`❌ 게시물(${communityId}) 데이터 가져오는 중 오류 발생:`, error);
      throw error;
    }
  }

  // 📌 게시물 생성
  async createPost(postData) {
    try {
      const response = await this.axios.post("/create", postData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ 헤더 추가
      });
      console.log("📌 게시물 생성 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 게시물 생성 중 오류 발생:", error);
      throw error;
    }
  }

  // 📌 게시물 삭제
  async deletePost(postId, userId) {
    try {
      const response = await this.axios.delete(`/delete/${postId}`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error(`❌ 게시물(${postId}) 삭제 중 오류 발생:`, error);
      throw error;
    }
  }

  // 📌 게시물 수정
  async updatePost(postId, updatedData) {
    try {
      console.log("수정요청보냄",updatedData);
      const response = await this.axios.post(`/update/${postId}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("📌 수정 성공 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ 게시물(${postId}) 수정 중 오류 발생:`, error);
      throw error;
    }
  }

  // 📌 이미지 URL 가공 함수
  fixImageUrl(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://43.202.98.145:8000/api/${url}`;
  }
}

export default new CommunityApi();
