export class HelperFile {
  constructor() {}

  public createBaseFileBase64(
    base64data: string,
    name: string,
    imageType: string,
  ) {
    const bin = atob(base64data.replace(/^.*,/, ''))
    const buffer = new Uint8Array(bin.length)
    for (let index = 0; index < bin.length; index++) {
      buffer[index] = bin.charCodeAt(index)
    }
    return new File([buffer.buffer], `${name}.${imageType}`, {
      type: `image/${imageType}`,
    })
  }

  public generateString() {
    let result = ''
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let index = 0; index < 10; index++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
