/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '840px',
        xl: '920px',
        '2xl': '1024px'
      }
    },
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem'
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
