import Document, { Head, Main, NextScript } from 'next/document';
import { getServerSideToken, getUserScript } from '../lib/auth';

class CustomDocumentPage extends Document {

  static getInitialProps = async (ctx) => {
    const props = await Document.getInitialProps(ctx);
    console.log('_doc > getInitialProps > props: ', props);
    console.log('_doc > getInitialProps > ctx: ', ctx);
    const userData = await getServerSideToken(ctx.req);
    console.log('_doc > getInitialProps > userData: ', userData);
    return { ...props, ...userData };
  }

  render() {
    const { user } = this.props;
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default CustomDocumentPage;
