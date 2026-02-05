// 일정 및 건강 관리 시스템
class DailyManager {
    constructor() {
        this.schedules = this.loadSchedules();
        this.healthRecords = this.loadHealthRecords();
        this.diaries = this.loadDiaries();
        this.currentDate = new Date();
    }

    // 로컬 스토리지에서 일정 로드
    loadSchedules() {
        const stored = localStorage.getItem('kimchi_schedules');
        return stored ? JSON.parse(stored) : [];
    }

    // 로컬 스토리지에서 건강 기록 로드
    loadHealthRecords() {
        const stored = localStorage.getItem('kimchi_health_records');
        return stored ? JSON.parse(stored) : [];
    }

    // 로컬 스토리지에서 일기 로드
    loadDiaries() {
        const stored = localStorage.getItem('kimchi_diaries');
        return stored ? JSON.parse(stored) : [];
    }

    // 일정 저장
    saveSchedules() {
        localStorage.setItem('kimchi_schedules', JSON.stringify(this.schedules));
    }

    // 건강 기록 저장
    saveHealthRecords() {
        localStorage.setItem('kimchi_health_records', JSON.stringify(this.healthRecords));
    }

    // 일기 저장
    saveDiaries() {
        localStorage.setItem('kimchi_diaries', JSON.stringify(this.diaries));
    }

    // 일기 추가
    addDiary(diary) {
        this.diaries.unshift(diary);
        this.saveDiaries();
        this.renderDiaries();
    }

    // 일기 렌더링
    renderDiaries() {
        const diaryList = document.querySelector('.diary-list');
        if (!diaryList) return;

        const dynamicDiaries = diaryList.querySelectorAll('.diary-entry[data-dynamic="true"]');
        dynamicDiaries.forEach(entry => entry.remove());

        this.diaries.forEach((diary, index) => {
            const entry = this.createDiaryElement(diary, index);
            diaryList.insertBefore(entry, diaryList.firstChild);
        });
    }

    // 일기 엘리먼트 생성
    createDiaryElement(diary, index) {
        const div = document.createElement('div');
        div.className = 'diary-entry';
        div.setAttribute('data-dynamic', 'true');

        const date = new Date(diary.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;

        const weatherIcons = {
            'sunny': 'fa-sun',
            'cloudy': 'fa-cloud',
            'rainy': 'fa-cloud-rain',
            'snowy': 'fa-snowflake'
        };

        const weatherIcon = weatherIcons[diary.weather] || 'fa-cloud';

        div.innerHTML = `
            <div class="diary-header">
                <div class="diary-date">
                    <div class="date-box">
                        <span class="day">${String(day).padStart(2, '0')}</span>
                        <span class="month">${month}월</span>
                    </div>
                </div>
                <div class="diary-meta">
                    <h3>${diary.title}</h3>
                    <span class="diary-weather">
                        <i class="fas ${weatherIcon}"></i>
                    </span>
                </div>
            </div>
            <div class="diary-content">
                <p>${diary.content}</p>
                ${diary.tags ? `<div class="diary-tags">
                    ${diary.tags.split(',').map(tag => `<span class="tag"><i class="fas fa-tag"></i> ${tag.trim()}</span>`).join('')}
                </div>` : ''}
            </div>
        `;

        return div;
    }

    // 일정 추가
    addSchedule(schedule) {
        this.schedules.push(schedule);
        this.saveSchedules();
        this.renderCalendar();
        this.renderUpcomingSchedules();
        
        // 건강 관련 일정이면 건강 기록에도 추가
        if (schedule.type === 'health') {
            this.addHealthRecord({
                date: schedule.date,
                type: schedule.healthType || 'checkup',
                title: schedule.title,
                description: schedule.description,
                location: schedule.location
            });
        }
    }

    // 건강 기록 추가
    addHealthRecord(record) {
        this.healthRecords.push(record);
        this.saveHealthRecords();
        this.renderHealthRecords();
    }

    // 캘린더 렌더링
    renderCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // 캘린더 헤더 업데이트
        const calendarHeader = document.querySelector('.calendar-header span');
        if (calendarHeader) {
            calendarHeader.textContent = `${year}년 ${month + 1}월`;
        }

        const calendarTitle = document.querySelector('.schedule-calendar h3');
        if (calendarTitle) {
            calendarTitle.innerHTML = `<i class="fas fa-calendar"></i> ${month + 1}월 캘린더`;
        }

        // 첫날과 마지막 날
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        // 기존 날짜 요일 제거
        const existingDays = calendarGrid.querySelectorAll('.calendar-day, .calendar-day-name');
        existingDays.forEach(day => {
            if (!day.classList.contains('calendar-day-name')) {
                day.remove();
            }
        });

        // 빈 칸 추가
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // 날짜 추가
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // 오늘 날짜 표시
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('today');
            }

            // 일정이 있는 날짜 표시
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = this.schedules.some(schedule => schedule.date === dateStr);
            if (hasEvent) {
                dayElement.classList.add('event');
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    // 다가오는 일정 렌더링
    renderUpcomingSchedules() {
        const scheduleList = document.querySelector('.schedule-list');
        if (!scheduleList) return;

        // 기존 동적 일정 제거
        const dynamicSchedules = scheduleList.querySelectorAll('.schedule-item[data-dynamic="true"]');
        dynamicSchedules.forEach(item => item.remove());

        // 미래 일정만 필터링하고 날짜순 정렬
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingSchedules = this.schedules
            .filter(schedule => new Date(schedule.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5); // 최대 5개만 표시

        upcomingSchedules.forEach(schedule => {
            const item = this.createScheduleElement(schedule);
            scheduleList.insertBefore(item, scheduleList.firstChild);
        });
    }

    // 일정 엘리먼트 생성
    createScheduleElement(schedule) {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.setAttribute('data-dynamic', 'true');

        const dDay = this.calculateDDay(schedule.date);
        const isUrgent = dDay <= 3;
        
        if (isUrgent) {
            div.classList.add('upcoming');
        }

        const icons = {
            'vaccination': 'fa-syringe',
            'grooming': 'fa-cut',
            'checkup': 'fa-stethoscope',
            'walk': 'fa-walking',
            'play': 'fa-gamepad',
            'other': 'fa-calendar-check'
        };

        const icon = icons[schedule.icon] || icons['other'];

        div.innerHTML = `
            <div class="schedule-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="schedule-info">
                <h4>${schedule.title}</h4>
                <p>${this.formatDate(schedule.date)} ${schedule.time || ''}</p>
                ${schedule.location ? `<span class="location"><i class="fas fa-map-marker-alt"></i> ${schedule.location}</span>` : ''}
            </div>
            <span class="schedule-badge ${isUrgent ? 'urgent' : ''}">D-${dDay}</span>
        `;

        return div;
    }

    // D-day 계산
    calculateDDay(dateStr) {
        const targetDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
        
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }

    // 건강 기록 렌더링
    renderHealthRecords() {
        const healthHistory = document.querySelector('.health-history');
        if (!healthHistory) return;

        // 기존 동적 기록 제거
        const dynamicRecords = healthHistory.querySelectorAll('.history-item[data-dynamic="true"]');
        dynamicRecords.forEach(item => item.remove());

        // 최신 기록부터 정렬
        const sortedRecords = [...this.healthRecords]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10); // 최대 10개만 표시

        sortedRecords.forEach(record => {
            const item = this.createHealthRecordElement(record);
            healthHistory.insertBefore(item, healthHistory.firstChild);
        });

        // 건강 개요 업데이트
        this.updateHealthOverview();
    }

    // 건강 기록 엘리먼트 생성
    createHealthRecordElement(record) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.setAttribute('data-dynamic', 'true');

        const icons = {
            'vaccination': 'fa-syringe',
            'checkup': 'fa-stethoscope',
            'grooming': 'fa-cut',
            'weight': 'fa-weight-scale',
            'other': 'fa-notes-medical'
        };

        const icon = icons[record.type] || icons['other'];

        div.innerHTML = `
            <div class="history-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="history-info">
                <h5>${record.title}</h5>
                <p>${this.formatDate(record.date)}</p>
                ${record.location ? `<span class="location"><i class="fas fa-map-marker-alt"></i> ${record.location}</span>` : ''}
            </div>
        `;

        return div;
    }

    // 건강 개요 업데이트
    updateHealthOverview() {
        // 최근 체중 기록 업데이트
        const weightRecords = this.healthRecords.filter(r => r.type === 'weight');
        if (weightRecords.length > 0) {
            const latestWeight = weightRecords[weightRecords.length - 1];
            const weightValue = document.querySelector('.health-card .health-value');
            if (weightValue && latestWeight.weight) {
                weightValue.innerHTML = `${latestWeight.weight} <span>kg</span>`;
            }
        }
    }

    // 날짜 포맷팅
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const weekday = weekdays[date.getDay()];
        
        return `${year}년 ${month}월 ${day}일 (${weekday})`;
    }

    // 이전 달
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    // 다음 달
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }
}

const dailyManager = new DailyManager();

document.addEventListener('DOMContentLoaded', function() {
    // 일상 페이지에서만 실행
    if (document.querySelector('.schedule-calendar')) {
        dailyManager.renderCalendar();
        dailyManager.renderUpcomingSchedules();
        dailyManager.renderHealthRecords();

        // 캘린더 네비게이션 버튼
        const prevBtn = document.querySelector('.calendar-header .btn-icon:first-child');
        const nextBtn = document.querySelector('.calendar-header .btn-icon:last-child');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                dailyManager.previousMonth();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                dailyManager.nextMonth();
            });
        }

        // 새 일정 추가 버튼
        const addScheduleBtn = document.querySelector('.schedule-section .btn-primary');
        if (addScheduleBtn) {
            addScheduleBtn.addEventListener('click', () => {
                const title = prompt('일정 제목을 입력하세요:');
                if (!title) return;

                const date = prompt('날짜를 입력하세요 (YYYY-MM-DD):');
                if (!date) return;

                const time = prompt('시간을 입력하세요 (예: 오후 2시):');
                const location = prompt('장소를 입력하세요 (선택사항):');
                
                const typeSelect = prompt('일정 유형을 선택하세요\n1: 예방접종\n2: 미용\n3: 건강검진\n4: 산책\n5: 놀이\n6: 기타');
                
                const typeMap = {
                    '1': { icon: 'vaccination', type: 'health', healthType: 'vaccination' },
                    '2': { icon: 'grooming', type: 'grooming' },
                    '3': { icon: 'checkup', type: 'health', healthType: 'checkup' },
                    '4': { icon: 'walk', type: 'activity' },
                    '5': { icon: 'play', type: 'activity' },
                    '6': { icon: 'other', type: 'other' }
                };

                const typeInfo = typeMap[typeSelect] || typeMap['6'];

                dailyManager.addSchedule({
                    title: title,
                    date: date,
                    time: time,
                    location: location,
                    icon: typeInfo.icon,
                    type: typeInfo.type,
                    healthType: typeInfo.healthType,
                    description: ''
                });

                alert('일정이 추가되었습니다!');
            });
        }

        // 일기 작성 모달
        const newDiaryBtn = document.getElementById('newDiaryBtn');
        const diaryModal = document.getElementById('diaryModal');
        const closeDiaryModal = document.getElementById('closeDiaryModal');
        const cancelDiary = document.getElementById('cancelDiary');
        const saveDiary = document.getElementById('saveDiary');

        if (newDiaryBtn && diaryModal) {
            // 모달 열기
            newDiaryBtn.addEventListener('click', () => {
                diaryModal.style.display = 'flex';
                document.getElementById('diaryDate').valueAsDate = new Date();
            });

            // 모달 닫기
            const closeModal = () => {
                diaryModal.style.display = 'none';
                // 폼 초기화
                document.getElementById('diaryTitle').value = '';
                document.getElementById('diaryDate').value = '';
                document.getElementById('diaryWeather').value = '';
                document.getElementById('diaryContent').value = '';
                document.getElementById('diaryTags').value = '';
            };

            closeDiaryModal.addEventListener('click', closeModal);
            cancelDiary.addEventListener('click', closeModal);

            // 모달 배경 클릭 시 닫기
            diaryModal.addEventListener('click', (e) => {
                if (e.target === diaryModal) {
                    closeModal();
                }
            });

            // 일기 저장
            saveDiary.addEventListener('click', () => {
                const title = document.getElementById('diaryTitle').value;
                const date = document.getElementById('diaryDate').value;
                const weather = document.getElementById('diaryWeather').value;
                const content = document.getElementById('diaryContent').value;
                const tags = document.getElementById('diaryTags').value;

                if (!title) {
                    alert('제목을 입력하세요.');
                    return;
                }

                if (!date) {
                    alert('날짜를 선택하세요.');
                    return;
                }

                if (!content) {
                    alert('내용을 입력하세요.');
                    return;
                }

                dailyManager.addDiary({
                    title: title,
                    date: date,
                    weather: weather,
                    content: content,
                    tags: tags,
                    createdAt: new Date().toISOString()
                });

                alert('일기가 저장되었습니다!');
                closeModal();
            });
        }

        // 일기 렌더링
        dailyManager.renderDiaries();
    }
});
