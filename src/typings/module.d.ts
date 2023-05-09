interface Window {
  ZwLog;
  AlipayJSBridge;
}

/** 图片静态资源类型声明文件 */
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

/** 高德地图 */
declare namespace AMap {
  function Geolocation(data: any): void;
}
