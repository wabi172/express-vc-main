import prisma from './lib/prisma.js'

const data = await prisma.post.findMany()

console.log(data)
