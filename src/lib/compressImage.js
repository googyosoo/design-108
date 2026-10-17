/**
 * 클라이언트 측 Canvas 기반 이미지 압축 유틸리티
 * @param {File} file - 원본 이미지 파일
 * @param {Object} [options]
 * @param {number} [options.maxWidth=1280] - 최대 가로 폭
 * @param {number} [options.maxHeight=1280] - 최대 세로 높이
 * @param {number} [options.quality=0.82] - 압축 품질
 * @returns {Promise<{ blob: Blob, dataUrl: string, width: number, height: number, size: number }>}
 */
export async function compressImage(file, options = {}) {
  const { maxWidth = 1280, maxHeight = 1280, quality = 0.82 } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let width = img.width
        let height = img.height

        // 비율 유지 리사이징
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas 2D context를 생성할 수 없습니다.'))
          return
        }

        // 흰색 배경으로 초기화 (투명 PNG 대응)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('이미지 압축 변환에 실패했습니다.'))
              return
            }
            const dataUrl = canvas.toDataURL('image/jpeg', quality)
            resolve({
              blob,
              dataUrl,
              width,
              height,
              size: blob.size,
            })
          },
          'image/jpeg',
          quality
        )
      }

      img.onerror = () => reject(new Error('이미지를 로드할 수 없습니다.'))
      img.src = e.target.result
    }

    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'))
    reader.readAsDataURL(file)
  })
}
