const SUPPORTED_FILE_TYPES = [
  // Document types
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/rtf", // .rtf
  "application/xml", // .xml
  "application/json", // .json
  "application/epub+zip", // .epub
  "application/zip", // .zip
  "application/x-rar-compressed", // .rar
  "application/x-7z-compressed", // .7z
  "application/vnd.oasis.opendocument.text", // .odt
  "application/vnd.oasis.opendocument.spreadsheet", // .ods
  "application/vnd.oasis.opendocument.presentation", // .odp
  "application/vnd.ms-visio.drawing", // .vsd
  "application/x-tar", // .tar
  "application/x-bzip2", // .tar.bz2

  // Image types
  "image/jpeg", // .jpg, .jpeg
  "image/png", // .png
  "image/gif", // .gif
  "image/bmp", // .bmp
  "image/tiff", // .tiff
  "image/svg+xml", // .svg
  "image/webp", // .webp
  "image/x-icon", // .ico

  // Video types
  "video/mp4", // .mp4
  "video/quicktime", // .mov
  "video/x-matroska", // .mkv
  "video/x-msvideo", // .avi
  "video/webm", // .webm
  "video/ogg", // .ogv
  "video/3gpp", // .3gp
  "video/x-flv", // .flv
  "video/x-ms-wmv", // .wmv

  // Audio types
  "audio/mpeg", // .mp3
  "audio/wav", // .wav
  "audio/ogg", // .ogg
  "audio/mp4", // .m4a
  "audio/x-wav", // .wav
  "audio/flac", // .flac
  "audio/aac", // .aac
  "audio/x-ms-wma", // .wma

  // Text types
  "text/plain", // .txt
  "text/csv", // .csv
  "text/html", // .html
  "text/css", // .css
  "application/javascript", // .js
  "application/xml", // .xml
  "text/markdown", // .md
];

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

module.exports = { SUPPORTED_FILE_TYPES, MAX_SIZE };