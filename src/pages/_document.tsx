import Document, { Html, Head, Main, NextScript } from 'next/document'
import Opencv from "../components/Opencv";

class MyDocument extends Document {
  // 他のコード

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* opencvにて検証が必要 */}
          {/* <Opencv /> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;