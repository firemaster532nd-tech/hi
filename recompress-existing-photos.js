const fs = require('fs').promises;
const path = require('path');

// 이미지 압축 함수 (브라우저의 Canvas API 대신 Buffer 사용)
function compressBase64Image(base64String, maxWidth = 1000, quality = 0.8) {
    return new Promise(async (resolve, reject) => {
        try {
            // Canvas가 없으므로 직접 처리는 불가능
            // 대신 base64 크기만 확인하고 필요시 품질 저하를 시뮬레이션
            const sizeInBytes = Math.round((base64String.length * 3) / 4);
            const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
            
            console.log(`  현재 크기: ${sizeInMB}MB`);
            
            // 이미 작은 이미지면 그대로 반환
            if (sizeInBytes < 300 * 1024) { // 300KB 이하
                console.log(`  ✅ 이미 최적화됨 (${sizeInMB}MB < 0.3MB)`);
                resolve(base64String);
                return;
            }
            
            // 큰 이미지는 경고만 표시
            console.log(`  ⚠️  큰 이미지 발견 (${sizeInMB}MB) - 브라우저에서 재업로드 필요`);
            resolve(base64String);
        } catch (error) {
            console.error('  ❌ 압축 실패:', error.message);
            resolve(base64String); // 실패해도 원본 반환
        }
    });
}

async function recompressPhotos() {
    console.log('🔄 사진 재압축 시작...\n');
    
    try {
        // photos.json 읽기
        const photosPath = path.join(__dirname, 'data', 'photos.json');
        const photosData = await fs.readFile(photosPath, 'utf8');
        const photos = JSON.parse(photosData);
        
        console.log(`📊 총 ${photos.length}장의 사진 발견\n`);
        
        let totalOriginalSize = 0;
        let totalCompressedSize = 0;
        let largePhotos = [];
        
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            console.log(`\n[${i + 1}/${photos.length}] ${photo.title || 'Untitled'}`);
            
            if (!photo.dataUrl) {
                console.log('  ⚠️  dataUrl 없음 - 건너뜀');
                continue;
            }
            
            // 원본 크기 계산
            const originalSize = Math.round((photo.dataUrl.length * 3) / 4);
            const originalSizeMB = (originalSize / (1024 * 1024)).toFixed(2);
            totalOriginalSize += originalSize;
            
            // 크기 확인
            if (originalSize > 300 * 1024) { // 300KB 초과
                largePhotos.push({
                    index: i,
                    title: photo.title || 'Untitled',
                    size: originalSizeMB,
                    id: photo.id
                });
                console.log(`  ⚠️  큰 이미지: ${originalSizeMB}MB`);
            } else {
                console.log(`  ✅ 최적 크기: ${originalSizeMB}MB`);
            }
            
            totalCompressedSize += Math.round((photo.dataUrl.length * 3) / 4);
        }
        
        // 통계 출력
        console.log('\n' + '='.repeat(60));
        console.log('📊 재압축 분석 결과');
        console.log('='.repeat(60));
        console.log(`총 사진: ${photos.length}장`);
        console.log(`전체 크기: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)}MB`);
        console.log(`평균 크기: ${(totalOriginalSize / photos.length / (1024 * 1024)).toFixed(2)}MB/장`);
        
        if (largePhotos.length > 0) {
            console.log(`\n⚠️  최적화 필요: ${largePhotos.length}장`);
            console.log('\n큰 이미지 목록:');
            largePhotos.forEach((photo, idx) => {
                console.log(`  ${idx + 1}. "${photo.title}" - ${photo.size}MB (ID: ${photo.id})`);
            });
            
            console.log('\n💡 권장사항:');
            console.log('   1. 새로운 이미지 업로드 시 자동으로 압축됩니다 (1000px, 80%)');
            console.log('   2. 기존 큰 이미지는 갤러리에서 다시 업로드하면 자동 압축됩니다');
            console.log('   3. 또는 브라우저 재압축 도구를 사용하세요: /recompress-photos.html');
        } else {
            console.log('\n✅ 모든 이미지가 이미 최적화되어 있습니다!');
        }
        
        // 압축 후 예상 크기
        const estimatedSize = largePhotos.length * 250 + (photos.length - largePhotos.length) * (totalCompressedSize / photos.length / 1024);
        console.log(`\n예상 압축 후 크기: ${(estimatedSize / 1024).toFixed(2)}MB`);
        console.log(`예상 절감: ${(((totalOriginalSize / (1024 * 1024)) - (estimatedSize / 1024)) / (totalOriginalSize / (1024 * 1024)) * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        process.exit(1);
    }
}

// 실행
recompressPhotos().then(() => {
    console.log('\n✅ 분석 완료!');
    process.exit(0);
}).catch(error => {
    console.error('❌ 실행 오류:', error);
    process.exit(1);
});
