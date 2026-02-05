const express = require('express');
const compression = require('compression');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// 데이터 파일 경로
const DATA_DIR = path.join(__dirname, 'data');
const PHOTOS_FILE = path.join(DATA_DIR, 'photos.json');
const VIDEOS_FILE = path.join(DATA_DIR, 'videos.json');

// 미들웨어
// gzip 압축 (명시적 설정)
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        // 모든 응답 압축
        return true;
    },
    level: 6, // 압축 레벨 (0-9, 6=기본)
    threshold: 1024 // 1KB 이상만 압축
}));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname, {
    maxAge: '1d', // 정적 파일 캐싱 1일
    etag: true
}));

// 데이터 디렉토리 초기화
async function initDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        // photos.json 초기화
        try {
            await fs.access(PHOTOS_FILE);
        } catch {
            await fs.writeFile(PHOTOS_FILE, JSON.stringify([]));
            console.log('Created photos.json');
        }
        
        // videos.json 초기화
        try {
            await fs.access(VIDEOS_FILE);
        } catch {
            await fs.writeFile(VIDEOS_FILE, JSON.stringify([]));
            console.log('Created videos.json');
        }
    } catch (error) {
        console.error('Error initializing data directory:', error);
    }
}

// 사진 데이터 읽기
async function readPhotos() {
    try {
        const data = await fs.readFile(PHOTOS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading photos:', error);
        return [];
    }
}

// 사진 데이터 쓰기
async function writePhotos(photos) {
    try {
        await fs.writeFile(PHOTOS_FILE, JSON.stringify(photos, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing photos:', error);
        return false;
    }
}

// 영상 데이터 읽기
async function readVideos() {
    try {
        const data = await fs.readFile(VIDEOS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading videos:', error);
        return [];
    }
}

// 영상 데이터 쓰기
async function writeVideos(videos) {
    try {
        await fs.writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing videos:', error);
        return false;
    }
}

// API 라우트

// 모든 사진 가져오기 (페이지네이션 지원)
app.get('/api/photos', async (req, res) => {
    try {
        // 캐싱 헤더 설정
        res.set('Cache-Control', 'public, max-age=300'); // 5분 캐싱
        res.set('ETag', 'photos-' + Date.now());
        
        const photos = await readPhotos();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0; // 0 = 전체
        const filter = req.query.filter || 'all';
        
        // 필터링
        let filteredPhotos = photos;
        if (filter !== 'all') {
            filteredPhotos = photos.filter(photo => photo.category === filter);
        }
        
        // 최신순 정렬
        filteredPhotos.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        
        // 페이지네이션
        if (limit > 0) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedPhotos = filteredPhotos.slice(startIndex, endIndex);
            
            res.json({ 
                success: true, 
                data: paginatedPhotos,
                pagination: {
                    page,
                    limit,
                    total: filteredPhotos.length,
                    totalPages: Math.ceil(filteredPhotos.length / limit)
                }
            });
        } else {
            // 전체 반환 (하위 호환성)
            res.json({ success: true, data: filteredPhotos });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 최근 사진 가져오기 (메인페이지용 - 최적화)
app.get('/api/photos/recent', async (req, res) => {
    try {
        // 캐싱 헤더 설정
        res.set('Cache-Control', 'public, max-age=300'); // 5분 캐싱
        
        const photos = await readPhotos();
        const limit = parseInt(req.query.limit) || 4;
        
        // 최신순 정렬 후 limit개만
        const recentPhotos = photos
            .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
            .slice(0, limit);
        
        res.json({ success: true, data: recentPhotos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 사진 추가
app.post('/api/photos', async (req, res) => {
    try {
        const photos = await readPhotos();
        const newPhoto = {
            ...req.body,
            id: Date.now().toString(),
            uploadDate: new Date().toISOString()
        };
        photos.push(newPhoto);
        await writePhotos(photos);
        res.json({ success: true, data: newPhoto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 사진 삭제
app.delete('/api/photos/:id', async (req, res) => {
    try {
        const photos = await readPhotos();
        const filteredPhotos = photos.filter(p => p.id !== req.params.id);
        await writePhotos(filteredPhotos);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 사진 수정
app.put('/api/photos/:id', async (req, res) => {
    try {
        const photos = await readPhotos();
        const index = photos.findIndex(p => p.id === req.params.id);
        if (index !== -1) {
            photos[index] = { ...photos[index], ...req.body };
            await writePhotos(photos);
            res.json({ success: true, data: photos[index] });
        } else {
            res.status(404).json({ success: false, error: 'Photo not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 모든 영상 가져오기
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await readVideos();
        res.json({ success: true, data: videos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 영상 추가
app.post('/api/videos', async (req, res) => {
    try {
        const videos = await readVideos();
        const newVideo = {
            ...req.body,
            id: Date.now().toString(),
            uploadDate: new Date().toISOString()
        };
        videos.push(newVideo);
        await writeVideos(videos);
        res.json({ success: true, data: newVideo });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 영상 삭제
app.delete('/api/videos/:id', async (req, res) => {
    try {
        const videos = await readVideos();
        const filteredVideos = videos.filter(v => v.id !== req.params.id);
        await writeVideos(filteredVideos);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 영상 수정
app.put('/api/videos/:id', async (req, res) => {
    try {
        const videos = await readVideos();
        const index = videos.findIndex(v => v.id === req.params.id);
        if (index !== -1) {
            videos[index] = { ...videos[index], ...req.body };
            await writeVideos(videos);
            res.json({ success: true, data: videos[index] });
        } else {
            res.status(404).json({ success: false, error: 'Video not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 서버 시작
async function startServer() {
    await initDataDir();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ Kimchi Gallery Server running on port ${PORT}`);
        console.log(`📁 Data directory: ${DATA_DIR}`);
        console.log(`🌐 Access: http://localhost:${PORT}`);
    });
}

startServer();
