import path from "path"; // directoryを持ってくる
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts"); // process.cwd() => ルートディレクトリのパス、その後"posts"はルートの後のパースを表せる。変換

//mdファウィルのデータを取り出す。
export function getPostsData() {

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); // ファイル名
        
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        
        const matterResult = matter(fileContents);

        //idとデータを返す。
        return {
            id,
            ...matterResult.data,
        }
    })

    return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            //このparamsのバリューとしては使うファイルのネームと同じくすること
            params: {
                id: fileName.replace(/\.md$/, "") 
            }
        };
    });
    /*
        [
            {
                params: {
                    id: "xxx"
                }
            },
            {
                params: {
                    id: "xxx"
                }
            }
        ]
    */
}

//　idに基づいてファイルの情報を持っていくる
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    
    const matterResult = matter(fileContents);
    
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content); // htmlとして解析してくれる。

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}