// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // 갤러리 필터 기능 (페이지네이션 연동)
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // galleryManager가 있으면 페이지네이션과 함께 렌더링
            if (typeof galleryManager !== 'undefined') {
                galleryManager.renderPhotos(filter, 1);
                
                // 사진첩 섹션으로 스크롤
                const photosSection = document.getElementById('photos');
                if (photosSection) {
                    photosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // galleryManager가 없으면 기존 방식으로 필터링
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const category = item.getAttribute('data-category');
                        if (category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            }
        });
    });
    
    // 파일 업로드 미리보기
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewGrid = document.getElementById('previewGrid');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            
            if (files.length > 0) {
                uploadPreview.style.display = 'block';
                previewGrid.innerHTML = '';
                
                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        
                        if (file.type.startsWith('image/')) {
                            previewItem.innerHTML = `
                                <img src="${e.target.result}" alt="Preview">
                                <p>${file.name}</p>
                            `;
                        } else if (file.type.startsWith('video/')) {
                            previewItem.innerHTML = `
                                <video controls>
                                    <source src="${e.target.result}" type="${file.type}">
                                </video>
                                <p>${file.name}</p>
                            `;
                        }
                        
                        previewGrid.appendChild(previewItem);
                    };
                    
                    reader.readAsDataURL(file);
                });
            }
        });
    }
    
    // 드래그 앤 드롭 업로드
    const uploadBox = document.querySelector('.upload-box');
    
    if (uploadBox) {
        // 업로드 박스 클릭 시 파일 선택
        uploadBox.addEventListener('click', function(e) {
            // 버튼 클릭이 아닌 경우에만 작동
            if (!e.target.classList.contains('btn-primary') && !e.target.closest('.btn-primary')) {
                if (fileInput) {
                    fileInput.click();
                }
            }
        });
        
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'rgba(255, 107, 157, 0.1)';
        });
        
        uploadBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--border-color)';
            this.style.background = 'white';
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--border-color)';
            this.style.background = 'white';
            
            const files = e.dataTransfer.files;
            if (fileInput && files.length > 0) {
                // Create a new DataTransfer object to set files
                const dataTransfer = new DataTransfer();
                Array.from(files).forEach(file => dataTransfer.items.add(file));
                fileInput.files = dataTransfer.files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
            }
        });
    }
    
    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 갤러리 아이템 클릭 시 확대
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 여기에 모달 또는 라이트박스 기능을 추가할 수 있습니다
            console.log('Gallery item clicked');
        });
    });
    
    // 애니메이션 효과 (스크롤 시 요소 나타나기)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 관찰할 요소들
    const animatedElements = document.querySelectorAll('.gallery-item, .highlight-card, .timeline-item, .personality-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // 캘린더 네비게이션 (간단한 예시)
    const calendarPrevBtn = document.querySelector('.calendar-header .btn-icon:first-child');
    const calendarNextBtn = document.querySelector('.calendar-header .btn-icon:last-child');
    
    if (calendarPrevBtn && calendarNextBtn) {
        calendarPrevBtn.addEventListener('click', function() {
            console.log('Previous month');
            // 여기에 이전 달로 이동하는 로직 추가
        });
        
        calendarNextBtn.addEventListener('click', function() {
            console.log('Next month');
            // 여기에 다음 달로 이동하는 로직 추가
        });
    }
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 스크롤 이벤트 (헤더 그림자 효과)
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// 폼 제출 처리 (예시)
const uploadForm = document.querySelector('.upload-form');
if (uploadForm) {
    const submitBtn = uploadForm.querySelector('.btn-primary');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title')?.value;
            const date = document.getElementById('date')?.value;
            const category = document.getElementById('category')?.value;
            const description = document.getElementById('description')?.value;
            
            if (!title || !date || !category) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // 여기에 실제 업로드 로직을 추가할 수 있습니다
            alert('업로드가 완료되었습니다!');
            
            // 폼 리셋
            uploadForm.reset();
            document.getElementById('uploadPreview').style.display = 'none';
        });
    }
}

// 일기 작성 버튼
const newDiaryBtn = document.querySelector('.diary-section .btn-secondary');
if (newDiaryBtn) {
    newDiaryBtn.addEventListener('click', function() {
        alert('일기 작성 페이지로 이동합니다!');
        // 실제로는 일기 작성 페이지나 모달을 열 수 있습니다
    });
}

// 일정 추가 버튼
const newScheduleBtn = document.querySelector('.schedule-section .btn-primary');
if (newScheduleBtn) {
    newScheduleBtn.addEventListener('click', function() {
        alert('새 일정 추가 페이지로 이동합니다!');
        // 실제로는 일정 추가 폼이나 모달을 열 수 있습니다
    });
}

// 건강 기록 추가 버튼
const newHealthRecordBtn = document.querySelector('.health-section .btn-secondary');
if (newHealthRecordBtn) {
    newHealthRecordBtn.addEventListener('click', function() {
        alert('건강 기록 추가 페이지로 이동합니다!');
        // 실제로는 건강 기록 추가 폼이나 모달을 열 수 있습니다
    });
}

// CSS 애니메이션 클래스 추가
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .preview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .preview-item {
        background: var(--bg-light);
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
    }
    
    .preview-item img,
    .preview-item video {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    
    .preview-item p {
        font-size: 0.8rem;
        color: var(--text-light);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    @media (max-width: 768px) {
        .main-nav.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 1rem;
        }
        
        .main-nav.active ul {
            flex-direction: column;
            gap: 0;
        }
        
        .main-nav.active li {
            margin-bottom: 0.5rem;
        }
        
        .main-nav.active .dropdown-menu {
            position: static !important;
            box-shadow: none !important;
            background: rgba(255, 255, 255, 0.1) !important;
            margin-top: 0.5rem !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
        }
        
        .main-nav.active .dropdown-menu a {
            color: white;
        }
    }
`;
document.head.appendChild(style);

// 히어로 섹션 이미지 슬라이더
document.addEventListener('DOMContentLoaded', function() {
    const sliderImages = document.querySelectorAll('.slider-image');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        // 범위 체크
        if (n >= sliderImages.length) currentSlide = 0;
        else if (n < 0) currentSlide = sliderImages.length - 1;
        else currentSlide = n;
        
        // 모든 슬라이드와 닷에서 active 클래스 제거
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // 현재 슬라이드와 닷에 active 클래스 추가
        if (sliderImages[currentSlide]) {
            sliderImages[currentSlide].classList.add('active');
        }
        if (sliderDots[currentSlide]) {
            sliderDots[currentSlide].classList.add('active');
        }
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startSlider() {
        // 3초마다 자동으로 다음 슬라이드로 이동
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // 닷 클릭 이벤트
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // 슬라이더가 있을 때만 시작
    if (sliderImages.length > 0) {
        startSlider();
        
        // 마우스 오버 시 슬라이더 일시 정지
        const slider = document.querySelector('.image-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);
        }
    }
});

// 헤더 드롭다운 호버 딜레이
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let hideTimeout;

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
            if (menu) {
                menu.style.display = 'block';
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            }, 500); // 500ms 딜레이
        });
    });
});

// 타임라인 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
    const timelineSlider = document.querySelector('.timeline-slider');
    
    if (timelineSlider) {
        const slides = timelineSlider.querySelectorAll('.slide');
        const dots = timelineSlider.querySelectorAll('.dot');
        const prevBtn = timelineSlider.querySelector('.prev');
        const nextBtn = timelineSlider.querySelector('.next');
        
        let currentSlide = 0;
        let autoSlideInterval;
        let isHovering = false;

        const showSlide = (n) => {
            // 슬라이드 범위 조정
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }

            // 모든 슬라이드와 점 비활성화
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // 현재 슬라이드와 점 활성화
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        // 자동 슬라이드 시작
        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (!isHovering) {
                    nextSlide();
                }
            }, 5000); // 5초마다 자동 전환
        };

        // 자동 슬라이드 정지
        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        };

        // 이벤트 리스너
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide(); // 버튼 클릭 후 자동 슬라이드 재시작
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide(); // 버튼 클릭 후 자동 슬라이드 재시작
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoSlide(); // 점 클릭 후 자동 슬라이드 재시작
            });
        });

        // 마우스 호버 시 자동 슬라이드 일시정지
        timelineSlider.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        timelineSlider.addEventListener('mouseleave', () => {
            isHovering = false;
        });

        // 초기 슬라이드 표시 및 자동 슬라이드 시작
        showSlide(0);
        startAutoSlide();
    }
});
