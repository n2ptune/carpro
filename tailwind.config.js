/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      container: {
        screens: {
          '2xl': '1280px'
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Pretendard Variable"',
          'Pretendard',
          'Roboto',
          '"Noto Sans KR"',
          '"Segoe UI"',
          '"Malgun Gothic"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif'
        ]
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
