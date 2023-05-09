/** 业务中单点状态 */
enum SSOStatus {
  /** 已尝试登录，但失败 */
  Failed = -1,
  /** 未尝试登录 */
  Unlogged = 0,
  /** 登录中 */
  IsLogging = 1,
  /** 登录成功 */
  Logged = 2,
}

/** 埋点中单点登录状态 */
const enum LogStatus {
  Unlogged = "01",
  Logged = "02",
}

/** ui 样式，是否适老化 */
const enum UiStyle {
  NormalMode = "normal",
  ElderMode = "elder",
}

/** 打包环境 */
enum BuildEnvironment {
  /** 线上环境及测试环境 */
  Production = "production",
  /** 开发环境 */
  Development = "development",
}

/** 容器环境 */
enum ContainerEnv {
  /** 未定义 */
  Unknown = "未定义",
  /** 浙里办 App */
  ZwApp = "浙里办",
  /** 支付宝小程序 */
  AlipayMiniProgram = "支付宝小程序",
  /** 支付宝 */
  AlipayApp = "支付宝App",
  /** 微信 */
  Wechat = "微信",
}

export { SSOStatus, LogStatus, UiStyle, BuildEnvironment, ContainerEnv };
