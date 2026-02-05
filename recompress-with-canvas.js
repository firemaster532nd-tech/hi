const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 이미지 압축 함수
async function compressBase64Image(base64String, maxWidth = 1000, quality = 0.8) {
    try {
        // Base64에서 이미지 버퍼 추출
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        // 이미지 로드
        const img = await loadImage(imageBuffer);
        
        // 리사이즈 계산
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
        
        // Canvas에 그리기
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // JPEG로 압축
        const compressedBuffer = canvas.toBuffer('image/jpeg', { quality });
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        
        return compressedBase64;
    } catch (error) {
        console.error('압축 실패:', error.message);
        return base64String; // 실패시 원본 반환
    }
}

async function recompressPhotos() {
    console.log('🔄 사진 재압축 시작...\n');
    
    try {
        const photosPath = path.join(__dirname, 'data', 'photos.json');
        const photosData = await fs.readFile(photosPath, 'utf8');
        const photos = JSON.parse(photosData);
        
        console.log(`📊 총 ${photos.length}장의 사진 발견\n`);
        
        let totalOriginalSize = 0;
        let totalCompressedSize = 0;
        let compressedCount = 0;
        
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            console.log(`[${i + 1}/${photos.length}] ${photo.title || 'Untitled'}`);
            
            if (!photo.dataUrl) {
                console.log('  ⚠️  dataUrl 없음 - 건너뜀\n');
                continue;
            }
            
            // 원본 크기
            const originalSize = Math.round((photo.dataUrl.length * 3) / 4);
            const originalMB = (originalSize / (1024 * 1024)).toFixed(2);
            totalOriginalSize += originalSize;
            
            console.log(`  원본: ${originalMB}MB`);
            
            // 300KB 이하면 건너뛰기
            if (originalSize <= 300 * 1024) {
                console.log(`  ✅ 이미 최적화됨 - 건너뜀\n`);
                totalCompressedSize += originalSize;
                continue;
            }
            
            // 압축 시작
            console.log(`  🔧 압축 중...`);
            const compressedDataUrl = await compressBase64Image(photo.dataUrl, 1000, 0.8);
            
            // 압축 후 크기
            const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);
            const compressedMB = (compressedSize / (1024 * 1024)).toFixed(2);
            const savedMB = ((originalSize - compressedSize) / (1024 * 1024)).toFixed(2);
            const savedPercent = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
            
            totalCompressedSize += compressedSize;
            
            console.log(`  압축 완료: ${originalMB}MB → ${compressedMB}MB`);
            console.log(`  절약: ${savedMB}MB (${savedPercent}% 감소)`);
            
            // 데이터 업데이트
            photo.dataUrl = compressedDataUrl;
            compressedCount++;
            console.log(`  ✅ 완료\n`);
        }
        
        // 파일 저장
        if (compressedCount > 0) {
            console.log('💾 변경사항 저장 중...');
            await fs.writeFile(photosPath, JSON.stringify(photos, null, 2));
            console.log('✅ 저장 완료!\n');
        }
        
        // 최종 통계
        console.log('='.repeat(60));
        console.log('📊 재압축 완료');
        console.log('='.repeat(60));
        console.log(`총 사진: ${photos.length}장`);
        console.log(`압축 완료: ${compressedCount}장`);
        console.log(`건너뛰기: ${photos.length - compressedCount}장`);
        console.log(`원본 크기: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)}MB`);
        console.log(`압축 후: ${(totalCompressedSize / (1024 * 1024)).toFixed(2)}MB`);
        console.log(`절약: ${((totalOriginalSize - totalCompressedSize) / (1024 * 1024)).toFixed(2)}MB`);
        console.log(`압축률: ${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        process.exit(1);
    }
}

recompressPhotos().then(() => {
    console.log('\n🎉 모든 작업 완료!');
    process.exit(0);
}).catch(error => {
    console.error('❌ 실행 오류:', error);
    process.exit(1);
});
