/**
 * 获取手机系统
 */
import { ref, Ref } from "vue";
import { SystemType } from "@/ts/enums/mobile.enums";

const system: Ref<SystemType | null> = ref(null);

export default function useMobile() {
  function judgeStystemType(): SystemType {
    const u = navigator.userAgent.toLowerCase();
    let _system = null as SystemType | null;

    if (u.indexOf("android") > -1) {
      _system = SystemType.Android;
    } else if (u.indexOf("iphone")) {
      _system = SystemType.Ios;
    } else {
      _system = SystemType.Other;
    }

    system.value = _system;
    console.log("type", _system);
    return _system;
  }

  function getSystemType(): SystemType | null {
    return system.value === null ? judgeStystemType() : system.value;
  }

  return {
    getSystemType,
  };
}
