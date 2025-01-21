--建立資料表
CREATE OR REPLACE  TABLE `post` (
  `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  `title` VARCHAR(255),
  `content` TEXT(65535),
  PRIMARY KEY(`id`)
);
-- 新增
INSERT INTO post(title,content) VALUES ('Post2','asddfsfsdf');
-- 讀取 所有
SELECT * FROM post;
-- 讀取 單筆(id=1)
SELECT * FROM post WHERE id=1;

-- 更新 (id=1)
UPDATE post SET title = 'Post123', content = 'XXXXXX' WHERE id=1;
-- 刪除 (id=1)
DELETE FROM post WHERE id=1;