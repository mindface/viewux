import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  // 他のコード

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
