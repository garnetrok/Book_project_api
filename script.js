// script.js
import { bookApi } from './api.js';

let books = [];
const itemsPerPage = 15;
let currentPage = 1;

async function loadBooks() {
    try {
        const data = await bookApi.getBooks(currentPage, itemsPerPage);
        books = data.books;
        displayBooks();
        displayPagination(data.totalBooks);
    } catch (error) {
        console.error('도서 데이터를 불러오는 중 오류 발생:', error);
        document.getElementById('bookList').innerHTML = '도서 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.';
    }
}

// displayBooks 함수는 변경 없음

// displayPagination 함수는 변경 없음

function changePage(page) {
    currentPage = page;
    loadBooks();
}

async function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm === '') {
        loadBooks();
        return;
    }

    try {
        const data = await bookApi.searchBooks(searchTerm, currentPage, itemsPerPage);
        books = data.books;
        displayBooks();
        displayPagination(data.totalBooks);
    } catch (error) {
        console.error('도서 검색 중 오류 발생:', error);
        document.getElementById('bookList').innerHTML = '도서 검색에 실패했습니다. 잠시 후 다시 시도해주세요.';
    }
}

// showBookDetails 함수는 변경 없음

// 이벤트 리스너 설정은 변경 없음

loadBooks();