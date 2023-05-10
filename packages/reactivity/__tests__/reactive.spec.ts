import YoudaoTranslator from "../../reactivity/src/youdao"

describe("test youdao", () => {
  test("array", async () => {
    const translator = new YoudaoTranslator(
      "134091160dab32dc",
      "3311tctKCixHm1BffJb8z7rSEbsoAaOO"
    )
    await expect(await translator.translate(["哈哈哈"])).toStrictEqual([
      "hahaha"
    ])
  })
})
