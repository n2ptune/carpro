/**
 * uid 생성
 * 생성 범위 0-9a-zA-Z 특수문자 _
 */
export function genUid(len: number = 10) {
  const numberOptions: string[] = []
  const alphabetOptions: string[] = []
  const specialOptions = ['_']
  let result = ''

  for (let i = 0; i < 10; i++) numberOptions.push(String(i))
  for (let i = 65; i < 91; i++) alphabetOptions.push(String.fromCharCode(i))
  for (let i = 97; i < 123; i++) alphabetOptions.push(String.fromCharCode(i))

  const options = ([] as string[]).concat(
    numberOptions,
    alphabetOptions,
    specialOptions
  )

  for (let i = 0; i < len; i++) {
    result += options[Math.floor(Math.random() * options.length)]
  }
  return result
}
