// API 기본 URL
const API_BASE = window.location.origin;

// 이미지 압축 함수 (균형잡힌 설정)
function compressImage(file, maxWidth = 1000, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // 최대 너비를 초과하면 비율에 맞게 축소
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                
                // 이미지 스무딩 활성화 (품질 개선)
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                ctx.drawImage(img, 0, 0, width, height);

                // Base64로 변환 (JPEG 형식, 품질 설정)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                
                // 압축률 로그
                const originalSize = (event.target.result.length / 1024).toFixed(2);
                const compressedSize = (compressedDataUrl.length / 1024).toFixed(2);
                console.log(`🖼️ 이미지 압축: ${originalSize}KB → ${compressedSize}KB (${((1 - compressedSize / originalSize) * 100).toFixed(1)}% 감소)`);
                
                resolve(compressedDataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
}

// 갤러리 데이터 관리
class GalleryManager {
    constructor() {
        this.photos = [];
        this.videos = [];
        this.currentPage = 1;
        this.photosPerPage = 9;
        this.currentFilter = 'all';
        this.initialized = false;
    }

    // 초기화 - 서버에서 데이터 로드
    async init() {
        if (this.initialized) return;
        
        console.log('🔄 GalleryManager 초기화 시작...');
        
        // 메인 페이지에서는 최근 4개만 로드 (빠른 로딩)
        const isHomePage = document.getElementById('recentGalleryGrid') !== null;
        
        if (isHomePage) {
            console.log('📱 메인 페이지 감지 - 최근 4개만 로드');
            await this.loadRecentPhotos(4);
        } else {
            console.log('🖼️ 갤러리 페이지 - 전체 로드');
            await this.loadPhotos();
        }
        
        await this.loadVideos();
        console.log(`✅ 데이터 로드 완료 - 사진: ${this.photos.length}, 영상: ${this.videos.length}`);
        
        this.renderPhotos();
        this.renderVideos();
        this.updateRecentGallery();
        
        this.initialized = true;
        console.log('✅ GalleryManager 초기화 완료');
    }

    // 서버에서 사진 데이터 로드
    async loadPhotos() {
        try {
            const response = await fetch(`${API_BASE}/api/photos`);
            const result = await response.json();
            if (result.success) {
                this.photos = result.data;
                console.log('Loaded photos from server:', this.photos.length);
            }
        } catch (error) {
            console.error('Error loading photos:', error);
            this.photos = [];
        }
    }

    // 최근 사진만 로드 (메인 페이지용 - 빠른 로딩)
    async loadRecentPhotos(limit = 4) {
        try {
            const response = await fetch(`${API_BASE}/api/photos/recent?limit=${limit}`);
            const result = await response.json();
            if (result.success) {
                this.photos = result.data;
                console.log(`📷 최근 ${limit}개 사진 로드 완료:`, this.photos.length);
            }
        } catch (error) {
            console.error('Error loading recent photos:', error);
            this.photos = [];
        }
    }

    // 서버에서 영상 데이터 로드
    async loadVideos() {
        try {
            const response = await fetch(`${API_BASE}/api/videos`);
            const result = await response.json();
            if (result.success) {
                this.videos = result.data;
                console.log('Loaded videos from server:', this.videos.length);
            }
        } catch (error) {
            console.error('Error loading videos:', error);
            this.videos = [];
        }
    }

    // 사진 저장 (서버에 전송)
    async savePhoto(photo) {
        try {
            const response = await fetch(`${API_BASE}/api/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(photo)
            });
            const result = await response.json();
            if (result.success) {
                console.log('Photo saved to server:', result.data);
                return result.data;
            }
        } catch (error) {
            console.error('Error saving photo:', error);
            throw error;
        }
    }

    // 영상 저장 (서버에 전송)
    async saveVideo(video) {
        try {
            const response = await fetch(`${API_BASE}/api/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(video)
            });
            const result = await response.json();
            if (result.success) {
                console.log('Video saved to server:', result.data);
                return result.data;
            }
        } catch (error) {
            console.error('Error saving video:', error);
            throw error;
        }
    }

    // 새 사진 추가
    async addPhoto(photo) {
        console.log('GalleryManager.addPhoto called with:', photo);
        try {
            const savedPhoto = await this.savePhoto(photo);
            this.photos.push(savedPhoto);
            console.log('Photo saved. Total photos:', this.photos.length);
            this.renderPhotos();
            this.updateRecentGallery();
            console.log('Photo rendering complete');
        } catch (error) {
            console.error('Failed to add photo:', error);
            alert('사진 업로드 중 오류가 발생했습니다.');
        }
    }

    // 새 영상 추가
    async addVideo(video) {
        try {
            const savedVideo = await this.saveVideo(video);
            this.videos.push(savedVideo);
            this.renderVideos();
        } catch (error) {
            console.error('Failed to add video:', error);
            alert('영상 업로드 중 오류가 발생했습니다.');
        }
    }

    // 사진 삭제
    async deletePhoto(id) {
        try {
            const response = await fetch(`${API_BASE}/api/photos/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                this.photos = this.photos.filter(p => p.id !== id);
                this.renderPhotos(this.currentFilter, this.currentPage);
                this.updateRecentGallery();
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('사진 삭제 중 오류가 발생했습니다.');
        }
    }

    // 영상 삭제
    async deleteVideo(id) {
        try {
            const response = await fetch(`${API_BASE}/api/videos/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                this.videos = this.videos.filter(v => v.id !== id);
                this.renderVideos();
            }
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('영상 삭제 중 오류가 발생했습니다.');
        }
    }

    // 사진 수정
    async updatePhoto(id, updates) {
        try {
            const response = await fetch(`${API_BASE}/api/photos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });
            const result = await response.json();
            if (result.success) {
                const index = this.photos.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.photos[index] = result.data;
                    this.renderPhotos(this.currentFilter, this.currentPage);
                    this.updateRecentGallery();
                }
            }
        } catch (error) {
            console.error('Error updating photo:', error);
            alert('사진 수정 중 오류가 발생했습니다.');
        }
    }

    // 사진첩 렌더링 (페이지네이션 포함)
    renderPhotos(filter = 'all', page = 1) {
        console.log('renderPhotos called');
        const gallery = document.querySelector('.masonry-gallery');
        if (!gallery) {
            console.error('Gallery element not found!');
            return;
        }

        this.currentFilter = filter;
        this.currentPage = page;

        console.log('Gallery element found');
        
        // 모든 갤러리 아이템 제거 (동적 + 정적)
        const allItems = gallery.querySelectorAll('.gallery-item');
        console.log('Removing', allItems.length, 'existing items (static + dynamic)');
        allItems.forEach(item => item.remove());

        // 필터링
        let filteredPhotos = this.photos;
        if (filter !== 'all') {
            filteredPhotos = this.photos.filter(photo => photo.category === filter);
        }

        // 최신순 정렬 (역순)
        const reversedPhotos = [...filteredPhotos].reverse();
        
        // 페이지네이션
        const startIndex = (page - 1) * this.photosPerPage;
        const endIndex = startIndex + this.photosPerPage;
        const photosToShow = reversedPhotos.slice(startIndex, endIndex);

        console.log(`Showing ${photosToShow.length} photos (page ${page}, filter: ${filter})`);
        
        // 사진이 없을 때 플레이스홀더 표시
        if (this.photos.length === 0) {
            this.renderPlaceholders(gallery);
        } else {
            // 사진 렌더링
            photosToShow.forEach((photo, index) => {
                console.log(`Creating element for photo ${index + 1}:`, photo.title);
                const item = this.createPhotoElement(photo);
                gallery.appendChild(item);
            });
        }
        
        console.log('Photos added to DOM');
        
        // Lazy Loading 초기화
        this.initLazyLoading();
        
        // 페이지네이션 UI 업데이트
        this.updatePagination(reversedPhotos.length, page);
    }

    // Lazy Loading 초기화
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const loader = img.previousElementSibling;
                        
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        
                        img.onload = () => {
                            if (loader && loader.classList.contains('image-loader')) {
                                loader.style.display = 'none';
                            }
                        };
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px' // 200px 전에 미리 로드 시작 (더 빠른 체감)
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // IntersectionObserver 미지원 시 즉시 로드
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                const loader = img.previousElementSibling;
                if (loader && loader.classList.contains('image-loader')) {
                    loader.style.display = 'none';
                }
            });
        }
    }

    // 플레이스홀더 렌더링 (업로드된 사진이 없을 때)
    renderPlaceholders(gallery) {
        const placeholders = [
            { category: 'daily', title: '집에서 쉬는 김치', date: '2024년 2월 1일', tall: true },
            { category: 'walk', title: '산책하는 김치', date: '2024년 1월 28일', tall: false },
            { category: 'grooming', title: '미용 후 김치', date: '2024년 1월 15일', tall: false },
            { category: 'travel', title: '바다에서', date: '2023년 8월 15일', tall: true },
            { category: 'special', title: '4번째 생일', date: '2024년 3월 15일', tall: false },
            { category: 'daily', title: '낮잠 자는 김치', date: '2024년 1월 20일', tall: false },
            { category: 'walk', title: '공원에서', date: '2023년 11월 20일', tall: true },
            { category: 'travel', title: '제주도에서', date: '2023년 10월 5일', tall: false },
            { category: 'special', title: '특별한 순간', date: '2024년 1월 1일', tall: false }
        ];

        const categoryNames = {
            'daily': '일상',
            'walk': '산책',
            'grooming': '미용사진',
            'travel': '여행',
            'special': '특별한 날'
        };

        placeholders.forEach((placeholder, index) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.setAttribute('data-category', placeholder.category);
            
            const tallClass = placeholder.tall ? ' tall' : '';
            div.innerHTML = `
                <div class="gallery-placeholder${tallClass}">
                    <i class="fas fa-image fa-3x"></i>
                    <p>${categoryNames[placeholder.category]} ${index + 1}</p>
                    <span class="category-badge ${placeholder.category}">${categoryNames[placeholder.category]}</span>
                </div>
                <div class="gallery-info">
                    <h4>${placeholder.title}</h4>
                    <p>${placeholder.date}</p>
                </div>
            `;
            gallery.appendChild(div);
        });
    }

    // 영상 렌더링
    renderVideos() {
        const videoGrid = document.querySelector('.video-grid');
        if (!videoGrid) return;

        // 기존 동적 영상 제거
        const existingItems = videoGrid.querySelectorAll('[data-dynamic="true"]');
        existingItems.forEach(item => item.remove());

        // 최신순 정렬 (역순)
        const reversedVideos = [...this.videos].reverse();

        reversedVideos.forEach((video, index) => {
            const item = this.createVideoElement(video);
            videoGrid.appendChild(item);
        });
    }

    // 사진 엘리먼트 생성
    createPhotoElement(photo) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', photo.category);
        div.setAttribute('data-dynamic', 'true');
        div.setAttribute('data-photo-id', photo.id);

        const categoryNames = {
            'daily': '일상',
            'walk': '산책',
            'grooming': '미용사진',
            'travel': '여행',
            'special': '특별한 날'
        };

        const categoryName = categoryNames[photo.category] || photo.category;

        // Lazy loading을 위해 data-src 사용
        div.innerHTML = `
            <div class="image-loader">
                <div class="loading-spinner"></div>
            </div>
            <img data-src="${photo.dataUrl}" alt="${photo.title}" class="lazy-image" loading="lazy">
            <div class="gallery-actions">
                <button class="action-btn edit-btn" data-id="${photo.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${photo.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="gallery-info">
                <h4>${photo.title}</h4>
                <p>${photo.date}</p>
                <span class="category-badge ${photo.category}">${categoryName}</span>
            </div>
        `;

        // 이벤트 리스너
        div.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('이 사진을 삭제하시겠습니까?')) {
                this.deletePhoto(photo.id);
            }
        });

        div.querySelector('.edit-btn').addEventListener('click', () => {
            this.editPhoto(photo.id);
        });

        return div;
    }

    // 영상 엘리먼트 생성
    createVideoElement(video) {
        const div = document.createElement('div');
        div.className = 'video-item';
        div.setAttribute('data-dynamic', 'true');
        div.setAttribute('data-video-id', video.id);

        div.innerHTML = `
            <video src="${video.dataUrl}" controls style="width: 100%; height: 280px; object-fit: cover; object-position: center 35%;"></video>
            <div class="gallery-actions">
                <button class="action-btn edit-btn" data-id="${video.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${video.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="video-info">
                <h4>${video.title}</h4>
                <p>${video.date}</p>
            </div>
        `;

        // 이벤트 리스너
        div.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('이 영상을 삭제하시겠습니까?')) {
                this.deleteVideo(video.id);
            }
        });

        div.querySelector('.edit-btn').addEventListener('click', () => {
            this.editVideo(video.id);
        });

        return div;
    }

    // 사진 수정
    editPhoto(id) {
        const photo = this.photos.find(p => p.id === id);
        if (!photo) return;

        const newTitle = prompt('제목을 입력하세요:', photo.title);
        if (newTitle && newTitle !== photo.title) {
            this.updatePhoto(id, { title: newTitle });
        }
    }

    // 영상 수정
    editVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (!video) return;

        const newTitle = prompt('제목을 입력하세요:', video.title);
        if (newTitle && newTitle !== video.title) {
            // 영상 수정 API 호출 (필요시 구현)
            const index = this.videos.findIndex(v => v.id === id);
            if (index !== -1) {
                this.videos[index].title = newTitle;
                this.renderVideos();
            }
        }
    }

    // 페이지네이션 UI 업데이트
    updatePagination(totalPhotos, currentPage) {
        const totalPages = Math.ceil(totalPhotos / this.photosPerPage);
        const paginationContainer = document.querySelector('.pagination-container');
        
        if (!paginationContainer) return;

        // 페이지가 1개 이하면 페이지네이션 숨김
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        const prevBtn = paginationContainer.querySelector('.pagination-btn.prev');
        const nextBtn = paginationContainer.querySelector('.pagination-btn.next');
        const pageInfo = paginationContainer.querySelector('.pagination-info');
        const photoCount = paginationContainer.querySelector('.photo-count');

        if (pageInfo) {
            pageInfo.textContent = `${currentPage} / ${totalPages}`;
        }

        if (photoCount) {
            photoCount.textContent = `총 ${totalPhotos}장`;
        }

        // 버튼 활성화/비활성화
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
    }

    // 최근 갤러리 업데이트 (홈 페이지용)
    updateRecentGallery() {
        const recentGalleryGrid = document.getElementById('recentGalleryGrid');
        if (!recentGalleryGrid) return;

        // 모든 기존 아이템 제거 (플레이스홀더 포함)
        recentGalleryGrid.innerHTML = '';

        // 최신 4개만 표시 (메인페이지용)
        const recentPhotos = [...this.photos].reverse().slice(0, 4);

        if (recentPhotos.length === 0) {
            // 사진이 없을 때 플레이스홀더 4개 생성
            for (let i = 1; i <= 4; i++) {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.innerHTML = `
                    <div class="gallery-placeholder">
                        <i class="fas fa-camera"></i>
                        <p>사진 ${i}</p>
                    </div>
                `;
                recentGalleryGrid.appendChild(div);
            }
        } else {
            // 사진이 있을 때 Lazy Loading 적용
            recentPhotos.forEach(photo => {
                const div = document.createElement('div');
                div.className = 'gallery-item';

                const categoryNames = {
                    'daily': '일상',
                    'grooming': '미용사진',
                    'travel': '여행',
                    'friends': '친구들',
                    'special': '특별한 날'
                };

                // Lazy Loading 적용
                div.innerHTML = `
                    <div class="image-loader">
                        <div class="loading-spinner"></div>
                    </div>
                    <img data-src="${photo.dataUrl}" alt="${photo.title}" class="lazy-image" loading="lazy">
                    <div class="gallery-info">
                        <h4>${photo.title}</h4>
                        <p>${photo.date}</p>
                        <span class="category-badge ${photo.category}">${categoryNames[photo.category] || photo.category}</span>
                    </div>
                `;

                recentGalleryGrid.appendChild(div);
            });

            // Lazy Loading 초기화
            this.initLazyLoadingForRecent();
        }
    }

    // 최근 갤러리용 Lazy Loading 초기화
    initLazyLoadingForRecent() {
        const lazyImages = document.querySelectorAll('#recentGalleryGrid .lazy-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const loader = img.previousElementSibling;
                        
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        
                        img.onload = () => {
                            if (loader && loader.classList.contains('image-loader')) {
                                loader.style.display = 'none';
                            }
                        };
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px' // 200px 전에 미리 로드 (빠른 체감)
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // 폴백: 즉시 로드
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                const loader = img.previousElementSibling;
                if (loader && loader.classList.contains('image-loader')) {
                    loader.style.display = 'none';
                }
            });
        }
    }
}

// 전역 인스턴스 생성
const galleryManager = new GalleryManager();

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', async function() {
    console.log('📄 DOM 로드 완료');
    
    // GalleryManager 초기화
    await galleryManager.init();
    
    // 업로드 폼 기본값 설정
    const photoDateInput = document.getElementById('photoDate');
    if (photoDateInput && !photoDateInput.value) {
        photoDateInput.value = new Date().toISOString().split('T')[0];
        console.log('📅 날짜 기본값 설정:', photoDateInput.value);
    }
    
    // 페이지네이션 버튼 이벤트
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (galleryManager.currentPage > 1) {
                galleryManager.renderPhotos(galleryManager.currentFilter, galleryManager.currentPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPhotos = galleryManager.photos.length;
            const totalPages = Math.ceil(totalPhotos / galleryManager.photosPerPage);
            if (galleryManager.currentPage < totalPages) {
                galleryManager.renderPhotos(galleryManager.currentFilter, galleryManager.currentPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 파일 업로드 관련 코드
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewGrid = document.getElementById('previewGrid');
    const uploadBox = document.querySelector('.upload-box');
    const uploadPreviewBox = document.getElementById('uploadPreviewBox');
    const previewImagesGrid = document.getElementById('previewImagesGrid');
    const selectFileBtn = document.getElementById('selectFileBtn');

    let selectedFiles = [];

    // 파일 선택 버튼 클릭
    if (selectFileBtn && fileInput) {
        selectFileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Select file button clicked');
            fileInput.click();
        });
    }

    // 파일 선택 처리
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            console.log('📁 File input changed');
            const files = Array.from(e.target.files);
            
            if (files.length === 0) {
                console.log('⚠️ No files selected');
                return;
            }

            selectedFiles = files;
            console.log('✅ Selected files:', files.length);

            // upload-box는 그대로 유지, 미리보기만 표시
            // if (uploadBox) uploadBox.style.display = 'none';  <- 제거
            if (uploadPreviewBox) {
                uploadPreviewBox.style.display = 'block';
                console.log('📸 미리보기 박스 표시');
            }

            // 미리보기 이미지 그리드 생성
            if (previewImagesGrid) {
                previewImagesGrid.innerHTML = '';
                files.forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        
                        if (file.type.startsWith('image/')) {
                            previewItem.innerHTML = `
                                <img src="${e.target.result}" alt="미리보기 ${index + 1}" style="max-width: 100%; height: auto; border-radius: 8px;">
                                <p style="margin-top: 0.5rem; font-size: 0.9rem;">${file.name}</p>
                            `;
                        } else if (file.type.startsWith('video/')) {
                            previewItem.innerHTML = `
                                <video src="${e.target.result}" style="max-width: 100%; height: auto; border-radius: 8px;"></video>
                                <p style="margin-top: 0.5rem; font-size: 0.9rem;">${file.name}</p>
                            `;
                        }
                        
                        previewImagesGrid.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    // 업로드 버튼 클릭
    if (uploadBtn) {
        uploadBtn.addEventListener('click', async function(e) {
            e.preventDefault(); // 기본 동작 방지
            e.stopPropagation(); // 이벤트 전파 중지
            
            console.log('=== 업로드 버튼 클릭됨 ===');
            
            const titleInput = document.getElementById('photoTitle');
            const dateInput = document.getElementById('photoDate');
            const categoryInput = document.getElementById('photoCategory');
            const descriptionInput = document.getElementById('photoDescription');
            
            // 요소 존재 확인
            if (!titleInput || !dateInput || !categoryInput || !descriptionInput) {
                console.error('❌ 폼 요소를 찾을 수 없습니다!', {
                    title: !!titleInput,
                    date: !!dateInput,
                    category: !!categoryInput,
                    description: !!descriptionInput
                });
                alert('폼 요소를 찾을 수 없습니다. 페이지를 새로고침해주세요.');
                return;
            }
            
            const title = titleInput.value.trim();
            const date = dateInput.value;
            const category = categoryInput.value;
            const description = descriptionInput.value;

            console.log('📋 폼 데이터:', { 
                title: `"${title}"`, 
                date: `"${date}"`, 
                category: `"${category}"`, 
                description: `"${description}"`, 
                filesCount: selectedFiles.length 
            });

            // 유효성 검사
            if (!title || title === '') {
                alert('❌ 제목을 입력해주세요.');
                console.log('❌ 유효성 검사 실패: 제목 없음');
                titleInput.focus();
                return;
            }
            if (!date) {
                alert('❌ 촬영 날짜를 선택해주세요.');
                console.log('❌ 유효성 검사 실패: 날짜 없음');
                dateInput.focus();
                return;
            }
            if (!category || category === '') {
                alert('❌ 카테고리를 선택해주세요.');
                console.log('❌ 유효성 검사 실패: 카테고리 없음 (현재 값:', category, ')');
                categoryInput.focus();
                return;
            }
            if (selectedFiles.length === 0) {
                alert('❌ 파일을 선택해주세요.');
                console.log('❌ 유효성 검사 실패: 파일 없음');
                return;
            }
            
            console.log('✅ 유효성 검사 통과');

            try {
                console.log('🚀 업로드 시작...');

                let uploadedCount = 0;
                const totalFiles = selectedFiles.length;

                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    
                    console.log(`📂 파일 ${i + 1}/${totalFiles} 처리 중:`, file.name);
                    
                    let dataUrl;
                    
                    // 이미지 파일인 경우 압축
                    if (file.type.startsWith('image/')) {
                        console.log('🖼️ 이미지 압축 중...');
                        dataUrl = await compressImage(file, 1000, 0.8); // 균형잡힌 압축
                    } else {
                        // 비디오는 압축하지 않음
                        console.log('🎬 비디오 읽기 중...');
                        const reader = new FileReader();
                        dataUrl = await new Promise((resolve) => {
                            reader.onload = (e) => resolve(e.target.result);
                            reader.readAsDataURL(file);
                        });
                    }

                    const data = {
                        title: title,
                        date: date,
                        category: category,
                        description: description,
                        dataUrl: dataUrl,
                        uploadDate: new Date().toISOString()
                    };

                    console.log(`📤 서버에 업로드 중 ${i + 1}/${totalFiles}:`, file.name);

                    if (file.type.startsWith('image/')) {
                        await galleryManager.addPhoto(data);
                    } else if (file.type.startsWith('video/')) {
                        await galleryManager.addVideo(data);
                    }

                    uploadedCount++;
                    console.log(`✅ 업로드 진행: ${uploadedCount}/${totalFiles}`);
                }

                console.log('✅ 모든 업로드 완료!');
                alert('✅ 업로드가 완료되었습니다!');

                // 폼 초기화
                titleInput.value = '';
                dateInput.value = new Date().toISOString().split('T')[0];
                categoryInput.value = '';
                descriptionInput.value = '';
                fileInput.value = '';
                selectedFiles = [];

                // UI 초기화
                if (uploadPreviewBox) uploadPreviewBox.style.display = 'none';
                if (previewImagesGrid) previewImagesGrid.innerHTML = '';
                
                console.log('🔄 폼 초기화 완료');

                // 사진첩 섹션으로 스크롤
                const photosSection = document.getElementById('photos');
                if (photosSection) {
                    photosSection.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('❌ 업로드 중 오류 발생:', error);
                alert('❌ 업로드 중 오류가 발생했습니다: ' + error.message);
            }
        });
    }
});
