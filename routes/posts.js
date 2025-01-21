import express from 'express'
const router = express.Router()
import db from '../config/mysql.js'
// import prisma from '../lib/prisma.js'
// import { dateToStringWithTimeZone } from '../lib/utils.js'
/* 得到所有的文章資料*/
// GET /api/posts
router.get('/', async function (req, res) {
  //post 指的是模型的名稱
  // const rows = await prisma.post.findMany()
  // const posts = rows.map((row) => {
  //   return {
  //     ...row,
  //     createdAt: dateToStringWithTimeZone(row.createdAt),
  //     updatedAt: dateToStringWithTimeZone(row.updatedAt),
  //   }
  // })

  // res.json({ status: 'success', data: posts })
  const [rows] = await db.query(`SELECT * FROM post ;`)
  console.log(rows)
  res.json({ status: 'success', data: rows })
})

//得到單筆的資料(動態路由要寫在後面)
// GET /api/posts/:postId
router.get('/:postId', async function (req, res) {
  // // 從網址上的參數得到ID， 需要轉為數字
  // const postId = Number(req.params.postId)
  // // findUnique可以用ID來查詢
  // const post = await prisma.post.findUnique({
  //   where: {
  //     id: postId,
  //   },
  // })
  // post.createdAt = dateToStringWithTimeZone(post.createdAt)
  // post.updatedAt = dateToStringWithTimeZone(post.updatedAt)
  // res.json({ status: 'success', data: post })
  const postId = Number(req.params.postId)
  const [posts] = await db.query(`SELECT * FROM post WHERE id = ${postId} ;`)
  console.log(posts)
  // posts是陣列 而我們只需要第一筆
  const post = posts[0]
  // 回應到客戶端
  res.json({ status: 'success', data: { post } })
})

// 新增
router.post('/', async function (req, res) {
  // 從body 得到 title content 資料
  const { title, content } = req.body
  // 執行查詢
  const [result] = await db.query(
    `INSERT INTO post(title,content) VALUES ('${title}','${content}');`
  )
  console.log(result)
  // 回應到客戶端
  res.json({ status: 'success', data: null })
})

// 更新
router.put('/:postId', async function (req, res) {
  const postId = Number(req.params.postId)
  const { title, content } = req.body

  const [result] = await db.query(
    `UPDATE post SET title = '${title}', content = '${content}' WHERE id=${postId};`
  )
  console.log(result)

  res.json({ status: 'success', data: null })
})

// 刪除
router.delete('/:postId', async function (req, res) {
  const postId = Number(req.params.postId)
  const [result] = await db.query(`DELETE FROM post WHERE id=${postId};`)
  console.log(result)

  res.json({ status: 'success', data: null })
})

export default router
