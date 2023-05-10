import axios from "axios"
import { stringify } from "qs"
import md5 from "blueimp-md5"
import CryptoJS from "crypto-js"

export default class YoudaoTranslator {
  constructor(private key: string, private secret: string) {
    this.key = key
    this.secret = secret
  }

  async translate(
    txts: string[],
    options?: { from: string; to: string }
  ): Promise<string[]> {
    const salt = new Date().getTime()
    const str1 = this.key + txts.join("") + salt + this.secret
    const sign = md5(str1)
    // const sign = CryptoJS.MD5(str1).toString()
    const params = {
      q: txts,
      appKey: this.key,
      from: options?.from || "zh-CHS",
      to: options?.to || "en",
      sign,
      salt
    }
    const { data } = await axios({
      method: "post",
      url: "https://openapi.youdao.com/v2/api",
      data: stringify(params, { arrayFormat: "repeat" }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    })
    if (data.errorCode === "0") {
      const result = data.translateResults.map((item: any) => item.translation)
      return result
    } else {
      throw new Error(`${data.errorCode}: ${errorCode[data.errorCode]}`)
    }
  }
}

export const errorCode: Record<string, string> = {
  "101": "缺少必填的参数,首先确保必填参数齐全，然后确认参数书写是否正确",
  "102": "不支持的语言类型",
  "103": "翻译文本过长",
  "105": "不支持的签名类型",
  "106": "不支持的响应类型",
  "107": "不支持的传输加密类型",
  "108":
    "appKey无效，注册账号， 登录后台创建应用和实例并完成绑定， 可获得应用ID和密钥等信息，其中应用ID就是appKey（ 注意不是应用密钥）",
  "110": "无相关服务的有效实例",
  "111": "开发者账号无效",
  "113": "q不能为空",
  "201": "解密失败，可能为DES,BASE64,URLDecode的错误",
  "202": "签名检验失败",
  "203": "访问IP地址不在可访问IP列表",
  "205": "请求的接口与选择的接入方式不一致",
  "301": "辞典查询失败",
  "302": "翻译查询失败",
  "303": "服务端的其它异常",
  "401": "账户已经欠费",
  "411": "访问频率受限,请稍后访问"
}
