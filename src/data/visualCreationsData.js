import { getR2Url } from "../config/r2";

export const IMAGES_DATA = [
  { id: "img-1", src: getR2Url("visual_creations/images/1.webp") },
  { id: "img-2", src: getR2Url("visual_creations/images/2.webp") },
  { id: "img-3", src: getR2Url("visual_creations/images/3.webp") },
  { id: "img-4", src: getR2Url("visual_creations/images/4.webp") },
  { id: "img-5", src: getR2Url("visual_creations/images/5.webp") },
  { id: "img-6", src: getR2Url("visual_creations/images/6.webp") },
  { id: "img-7", src: getR2Url("visual_creations/images/7.webp") },
  { id: "img-8", src: getR2Url("visual_creations/images/8.webp") },
  { id: "img-9", src: getR2Url("visual_creations/images/9.webp") },
  { id: "img-10", src: getR2Url("visual_creations/images/10.webp") },
  { id: "img-11", src: getR2Url("visual_creations/images/11.webp") },
  { id: "img-12", src: getR2Url("visual_creations/images/12.webp") },
  { id: "img-13", src: getR2Url("visual_creations/images/13.webp") },
  { id: "img-14", src: getR2Url("visual_creations/images/14.webp") },
  { id: "img-15", src: getR2Url("visual_creations/images/15.webp") },
  { id: "img-16", src: getR2Url("visual_creations/images/16.webp") },
];

export const VIDEO_SECTIONS = [
  {
    id: "folder-1",
    title: "Video Works 01",
    videos: [
      { id: "v1-1", src: getR2Url("visual_creations/videos/video_folder_1/1.mp4") },
      { id: "v1-2", src: getR2Url("visual_creations/videos/video_folder_1/2.mp4") },
      { id: "v1-3", src: getR2Url("visual_creations/videos/video_folder_1/3.mp4") },
      { id: "v1-4", src: getR2Url("visual_creations/videos/video_folder_1/4.mp4") },
      { id: "v1-5", src: getR2Url("visual_creations/videos/video_folder_1/5.mp4") },
      { id: "v1-6", src: getR2Url("visual_creations/videos/video_folder_1/6.mp4") },
      { id: "v1-7", src: getR2Url("visual_creations/videos/video_folder_1/7.mp4") },
      { id: "v1-8", src: getR2Url("visual_creations/videos/video_folder_1/8.mp4") },
    ],
  },
  {
    id: "folder-2",
    title: "Video Works 02",
    videos: [
      { id: "v2-1", src: getR2Url("visual_creations/videos/video_folder_2/1.mp4") },
      { id: "v2-2", src: getR2Url("visual_creations/videos/video_folder_2/2.mp4") },
      { id: "v2-3", src: getR2Url("visual_creations/videos/video_folder_2/3.mp4") },
      { id: "v2-4", src: getR2Url("visual_creations/videos/video_folder_2/4.mp4") },
      { id: "v2-5", src: getR2Url("visual_creations/videos/video_folder_2/5.mp4") },
      { id: "v2-6", src: getR2Url("visual_creations/videos/video_folder_2/6.mp4") },
      { id: "v2-7", src: getR2Url("visual_creations/videos/video_folder_2/7.mp4") },
      { id: "v2-8", src: getR2Url("visual_creations/videos/video_folder_2/8.mp4") },
      { id: "v2-9", src: getR2Url("visual_creations/videos/video_folder_2/9.mp4") },
      { id: "v2-10", src: getR2Url("visual_creations/videos/video_folder_2/10.mp4") },
      { id: "v2-11", src: getR2Url("visual_creations/videos/video_folder_2/11.mp4") },
      { id: "v2-12", src: getR2Url("visual_creations/videos/video_folder_2/12.mp4") },
      { id: "v2-13", src: getR2Url("visual_creations/videos/video_folder_2/13.mp4") },
      { id: "v2-14", src: getR2Url("visual_creations/videos/video_folder_2/14.mp4") },
      { id: "v2-15", src: getR2Url("visual_creations/videos/video_folder_2/15.mp4") },
      { id: "v2-16", src: getR2Url("visual_creations/videos/video_folder_2/16.mp4") },
    ],
  },
];

export const VIDEOS_DATA = [
  ...VIDEO_SECTIONS[0].videos,
  ...VIDEO_SECTIONS[1].videos,
];

export default {
  IMAGES_DATA,
  VIDEO_SECTIONS,
  VIDEOS_DATA,
};
