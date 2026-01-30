// 포트폴리오 필터 기능
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.portfolio-gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 필터링
            const filter = btn.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    // 애니메이션 효과
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 통계 카운팅 애니메이션
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCount(entry.target, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });
});

// 카운팅 애니메이션 함수
function animateCount(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (end === 100 ? '' : '+');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 모달 기능
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

// 프로젝트 상세 데이터
const projectData = {
    project1: {
        title: '서울 강남 오피스빌딩',
        category: '오피스',
        location: '서울 강남구',
        date: '2024.01',
        client: '대우건설',
        scale: '20층 규모 업무용 빌딩',
        description: '서울 강남구에 위치한 20층 규모의 프리미엄 오피스빌딩 신축 프로젝트입니다. 총 600여 개소의 관통부에 대한 내화채움공사를 진행했으며, 바닥, 벽체, 천장의 모든 관통부에 대해 3시간 내화 성능을 확보했습니다.',
        work: [
            '바닥 슬래브 관통부 350개소',
            '방화벽 관통부 180개소',
            '천장 관통부 70개소',
            '케이블 트레이 관통부 50개소'
        ],
        features: [
            '3시간 내화 성능 확보',
            'KS 인증 내화재 사용',
            '전 과정 사진 기록',
            '2년 품질 보증'
        ]
    },
    project2: {
        title: '분당 주상복합 아파트',
        category: '주거시설',
        location: '경기 성남시 분당구',
        date: '2023.12',
        client: '삼성물산',
        scale: '35층 주상복합 1,200세대',
        description: '분당 신도시 재건축 사업의 일환으로 진행된 35층 주상복합 아파트 프로젝트입니다. 1,200세대 전체 세대의 층간 관통부 및 공용부 관통부에 대한 내화채움공사를 완료했습니다.',
        work: [
            '세대 내 관통부 4,800개소',
            '공용부 관통부 650개소',
            '주차장 관통부 380개소',
            '설비실 관통부 120개소'
        ],
        features: [
            '세대별 맞춤 시공',
            '소음 최소화 공법',
            '빠른 시공 일정',
            '철저한 품질 관리'
        ]
    },
    project3: {
        title: '판교 복합 쇼핑몰',
        category: '상업시설',
        location: '경기 성남시 판교',
        date: '2023.11',
        client: '현대백화점',
        scale: '지하 5층, 지상 10층',
        description: '판교 테크노밸리의 랜드마크인 복합쇼핑몰 프로젝트입니다. 대규모 상업시설의 특성상 복잡한 설비 시스템을 고려한 정밀 시공을 진행했습니다.',
        work: [
            '대형 덕트 관통부 280개소',
            '복합 배관 관통부 520개소',
            '전기실/기계실 관통부 180개소',
            '케이블 트레이 관통부 240개소'
        ],
        features: [
            '대구경 관통부 전문 시공',
            '복합 관통부 처리',
            '24시간 시공 체제',
            '안전 관리 철저'
        ]
    },
    project4: {
        title: '서울대학교병원 분원',
        category: '의료시설',
        location: '서울 강남구',
        date: '2023.10',
        client: '서울대학교병원',
        scale: '지하 3층, 지상 12층',
        description: '최첨단 의료시설의 안전성을 최우선으로 고려한 프로젝트입니다. 의료 가스 배관, 의료 기기 전원 등 특수한 요구사항을 모두 충족하는 시공을 완료했습니다.',
        work: [
            '의료 가스 배관 관통부 420개소',
            '클린룸 관통부 180개소',
            '중환자실/수술실 관통부 150개소',
            '일반 병동 관통부 680개소'
        ],
        features: [
            '의료시설 특화 공법',
            '무균 시공 절차',
            '긴급 대응 체계',
            '정밀 품질 관리'
        ]
    },
    project5: {
        title: '평택 산업단지 공장',
        category: '산업시설',
        location: '경기 평택시',
        date: '2023.09',
        client: 'LG전자',
        scale: '연면적 45,000㎡',
        description: '대규모 제조 공장의 방화구획 구축 프로젝트입니다. 공장 가동 중 단계적 시공을 통해 생산 중단 없이 공사를 완료했습니다.',
        work: [
            '생산라인 관통부 850개소',
            '대형 설비 관통부 320개소',
            '공조 시스템 관통부 480개소',
            '전력 공급 관통부 280개소'
        ],
        features: [
            '무중단 시공',
            '대규모 현장 관리',
            '산업 안전 준수',
            '빠른 시공 속도'
        ]
    },
    project6: {
        title: '가산 데이터센터',
        category: '특수시설',
        location: '서울 금천구',
        date: '2023.08',
        client: 'KT',
        scale: '지하 2층, 지상 8층',
        description: '최고 수준의 보안과 안전성이 요구되는 데이터센터 프로젝트입니다. 케이블 트레이와 복합 관통부에 대한 특수 내화 시공을 완료했습니다.',
        work: [
            '케이블 트레이 관통부 680개소',
            '광케이블 관통부 420개소',
            '냉각 시스템 관통부 280개소',
            '전력 공급 관통부 350개소'
        ],
        features: [
            '특수 내화 시스템',
            '케이블 밀집 구역 특화',
            '정밀 시공',
            '보안 절차 준수'
        ]
    },
    project7: {
        title: '여의도 금융센터',
        category: '오피스',
        location: '서울 영등포구',
        date: '2023.07',
        client: '한화건설',
        scale: '30층 금융업무용 빌딩',
        description: '여의도 금융 중심지의 프리미엄 오피스 빌딩입니다.',
        work: [
            '바닥 관통부 480개소',
            '벽체 관통부 320개소'
        ],
        features: [
            '고급 마감',
            '빠른 시공'
        ]
    },
    project8: {
        title: '송파 래미안 아파트',
        category: '주거시설',
        location: '서울 송파구',
        date: '2023.06',
        client: '삼성물산',
        scale: '1,200세대 대단지',
        description: '송파구 재건축 대단지 프로젝트입니다.',
        work: [
            '전 세대 관통부 시공',
            '공용부 관통부 처리'
        ],
        features: [
            '대단지 경험',
            '철저한 관리'
        ]
    },
    project9: {
        title: '신세계백화점 센텀시티점',
        category: '상업시설',
        location: '부산 해운대구',
        date: '2023.05',
        client: '신세계',
        scale: '대형 백화점 리모델링',
        description: '운영 중인 백화점의 리모델링 프로젝트입니다.',
        work: [
            '영업 중 단계별 시공',
            '설비 증설 관통부'
        ],
        features: [
            '무중단 영업',
            '신속한 대응'
        ]
    }
};

// 모달 열기 함수
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modalHTML = `
        <h2>${project.title}</h2>
        <div style="margin: 1.5rem 0;">
            <span style="display: inline-block; background-color: var(--primary-color); color: white; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.9rem; margin-right: 0.5rem;">${project.category}</span>
            <span style="color: var(--secondary-color);">📍 ${project.location}</span>
            <span style="color: var(--secondary-color); margin-left: 1rem;">📅 ${project.date}</span>
        </div>
        <div style="margin: 2rem 0;">
            <h3 style="margin-bottom: 1rem;">프로젝트 개요</h3>
            <p style="color: var(--secondary-color); line-height: 1.8;">${project.description}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div>
                <h3 style="margin-bottom: 1rem;">시공 내역</h3>
                <ul style="list-style: none; padding: 0;">
                    ${project.work.map(item => `
                        <li style="padding: 0.5rem 0; color: var(--secondary-color);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; display: inline-block; margin-right: 0.5rem; color: var(--primary-color); vertical-align: middle;">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div>
                <h3 style="margin-bottom: 1rem;">주요 특징</h3>
                <ul style="list-style: none; padding: 0;">
                    ${project.features.map(feature => `
                        <li style="padding: 0.5rem 0; color: var(--secondary-color);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; display: inline-block; margin-right: 0.5rem; color: var(--primary-color); vertical-align: middle;">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        <div style="background-color: var(--light-color); padding: 1.5rem; border-radius: 10px; margin-top: 2rem;">
            <p style="margin: 0; color: var(--dark-color);"><strong>발주처:</strong> ${project.client}</p>
            <p style="margin: 0.5rem 0 0; color: var(--dark-color);"><strong>규모:</strong> ${project.scale}</p>
        </div>
    `;

    modalBody.innerHTML = modalHTML;
    modal.style.display = 'block';
}

// 모달 닫기
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// fadeIn 애니메이션 정의
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('포트폴리오 페이지가 로드되었습니다.');
