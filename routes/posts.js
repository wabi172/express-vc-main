import express from 'express'
const router = express.Router()
import prisma from '../lib/prisma.js'
import { dateToStringWithTimeZone } from '../lib/utils.js'
/* 得到所有的文章資料*/
router.get('/', async function (req, res) {
  //post 指的是模型的名稱
  const rows = await prisma.post.findMany()
  const posts = rows.map((row) => {
    return {
      ...row,
      createdAt: dateToStringWithTimeZone(row.createdAt),
      updatedAt: dateToStringWithTimeZone(row.updatedAt),
    }
  })

  res.json({ status: 'success', data: posts })
})

//得到單筆的資料(動態路由要寫在後面)
router.get('/:postId', async function (req, res) {
  // 從網址上的參數得到ID， 需要轉為數字
  const postId = Number(req.params.postId)
  // findUnique可以用ID來查詢
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  post.createdAt = dateToStringWithTimeZone(post.createdAt)
  post.updatedAt = dateToStringWithTimeZone(post.updatedAt)
  res.json({ status: 'success', data: post })
})

export default router
