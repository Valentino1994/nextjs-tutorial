import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/Layout'
import utilStyle from '../styles/utils.module.css'
import { getPostsData } from '../../lib/post'

const inter = Inter({ subsets: ['latin'] })

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail ...
  return {
    props: {
      allPostsData,
    },
  } // これもNextJSの書き方
}

//　SSRの場合
// contextはユーザがリクエストした情報が入っている
// export async function getServerSideProps(context) { 
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          今回内定をもらうことになりました。パクと申します。よろしくお願い申し上げます。
        </p>
      </section>
      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          { allPostsData.map(({id, title, date, thumbnail}) => ( // この形でmap関数の中にHTMLを書くことができる。
            <airtcle key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyle.boldText}>
                <p>{`${title}`}</p>
              </Link>
              <small className={utilStyle.lightText}>{`${date}`}</small>
            </airtcle>
          ))}
        </div>
      </section>
    </Layout>
  );
}
