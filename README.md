# lzzhy的SDK

* 本仓库采用monorepo进行管理，所有SDK在packages下面。
* 支持按需引入，该仓库内所有SDK都是单独导出的，支持tree shaking
* 使用方式可参考测试用例，__tests__下对应的测试用例文件

## YouDao

接入有道翻译API，若项目中有需要使用到翻译的可直接引入该SDK

传入参数为secreat和key，支持批量翻译和自定义翻译语言
