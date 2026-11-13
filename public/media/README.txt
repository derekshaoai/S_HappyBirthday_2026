视频放这里
==========

每个城市一个文件夹，文件名固定为 video.mp4：

  public/media/deqin/video.mp4
  public/media/shunde/video.mp4
  public/media/dalian/video.mp4
  public/media/budapest/video.mp4
  public/media/cassis/video.mp4
  public/media/aix/video.mp4
  public/media/cagnes/video.mp4

建议：
- 16:9，H.264 + AAC，720p 或 1080p
- 单个 10 秒视频压到 4-8MB
- 视频结束会自动盖章；文件不存在时会显示占位页

ffmpeg 压缩示例：
  ffmpeg -i input.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 24 \
    -preset slow -c:a aac -b:a 128k -movflags +faststart video.mp4

城市卡片封面暂时用 CSS 生成的插画，不需要额外图片。
