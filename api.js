// api.js

const API_BASE_URL = 'https://api.example.com';

// API 호출에 사용할 기본 옵션
const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
        // 필요한 경우 여기에 인증 토큰 등을 추가
    },
};

// API 호출 함수
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

// 도서 관련 API 함수들
export const bookApi = {
    // 도서 목록 가져오기
    getBooks: (page, limit) => 
        apiFetch(`/books?page=${page}&limit=${limit}`),
    
    // 도서 검색
    searchBooks: (query, page, limit) => 
        apiFetch(`/books/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`),
    
    // 도서 상세 정보 가져오기
    getBookDetails: (bookId) => 
        apiFetch(`/books/${bookId}`),
    
    // 도서 리뷰 가져오기
    getBookReviews: (bookId) => 
        apiFetch(`/books/${bookId}/reviews`),
    
    // 도서 리뷰 추가
    addBookReview: (bookId, review) => 
        apiFetch(`/books/${bookId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review)
        }),
    
    // 리뷰 좋아요
    likeReview: (reviewId) => 
        apiFetch(`/reviews/${reviewId}/like`, { method: 'POST' })
};