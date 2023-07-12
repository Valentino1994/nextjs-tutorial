import Layout from "../../../components/Layout";
import Head from 'next/head'
import { getAllPostIds, getPostData } from "../../../lib/post";
import utilStyles from "../../styles/utils.module.css"

//　getStaticPropsと同時に使わないといけない
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false, // falseの場合、paths以外のページが入れば404ページを開く
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    } // これもNextJSの書き方
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
            </article>
        </Layout>
    );
}