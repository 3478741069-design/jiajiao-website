-- 在 Supabase SQL Editor 中运行此文件

-- 创建 teachers 表
CREATE TABLE teachers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  initial TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT '男',
  age INTEGER NOT NULL,
  year TEXT NOT NULL DEFAULT '大二',
  subjects TEXT[] NOT NULL DEFAULT '{}',
  grades TEXT[] NOT NULL DEFAULT '{}',
  price INTEGER NOT NULL DEFAULT 80,
  university TEXT NOT NULL,
  major TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  district TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL DEFAULT 28.175,
  lng DOUBLE PRECISION NOT NULL DEFAULT 112.98,
  rating DOUBLE PRECISION NOT NULL DEFAULT 5.0,
  student_count INTEGER NOT NULL DEFAULT 0,
  experience TEXT NOT NULL DEFAULT '新入驻',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 插入初始示例数据
INSERT INTO teachers (name, initial, gender, age, year, subjects, grades, price, university, major, description, tags, district, lat, lng, rating, student_count, experience) VALUES
('张明远', '张', '男', 21, '大三', ARRAY['数学','物理'], ARRAY['初中','高中'], 80, '中南大学', '数学与应用数学', '高考数学142分，讲题耐心细致，善于用通俗的方式讲清楚难题。带过三个初三学生全部考入四大名校。', ARRAY['高考数学142','耐心细致','带过初三冲刺'], '岳麓区', 28.21, 112.92, 4.9, 23, '2年家教经验'),
('李雪琴', '李', '女', 20, '大二', ARRAY['英语'], ARRAY['小学','初中'], 70, '湖南师范大学', '英语师范', '英语专业在读，发音标准，注重培养学生的学习兴趣和习惯，擅长和小孩子沟通。', ARRAY['英语师范','发音标准','喜欢孩子'], '雨花区', 28.13, 113.04, 4.8, 12, '1年家教经验'),
('王浩然', '王', '男', 22, '大四', ARRAY['语文','历史'], ARRAY['初中','高中'], 90, '湖南大学', '汉语言文学', '湖南省高考语文135分，作文接近满分。有一套自己的阅读理解和写作教学方法。', ARRAY['高考语文135','作文方法','阅读技巧'], '岳麓区', 28.20, 112.94, 4.9, 31, '3年家教经验'),
('陈思雨', '陈', '女', 21, '大三', ARRAY['化学','生物'], ARRAY['高中'], 80, '中南大学', '化学工程', '理综成绩优异，擅长归纳题型和解题思路，帮助学生建立知识框架而非死记硬背。', ARRAY['理综高分','归纳题型','方法导向'], '天心区', 28.115, 112.97, 4.8, 18, '2年家教经验'),
('刘天宇', '刘', '男', 19, '大一', ARRAY['编程','数学'], ARRAY['小学','初中'], 60, '国防科技大学', '计算机科学', '信息学竞赛省一等奖，能用有趣的小项目激发孩子对编程的兴趣，入门教学很有经验。', ARRAY['竞赛省一','编程入门','趣味教学'], '开福区', 28.235, 112.98, 4.6, 6, '半年家教经验'),
('赵雅文', '赵', '女', 22, '大四', ARRAY['钢琴','音乐'], ARRAY['小学','初中'], 100, '湖南师范大学', '音乐教育', '钢琴十级，亲和力强，辅导过多名学生顺利通过考级，会根据孩子性格调整教学节奏。', ARRAY['钢琴十级','亲和力强','考级辅导'], '芙蓉区', 28.19, 113.03, 5.0, 28, '3年家教经验'),
('孙浩宇', '孙', '男', 20, '大二', ARRAY['物理','数学'], ARRAY['初中','高中'], 75, '长沙理工大学', '物理学', '物理竞赛获奖，善于用生活实例解释抽象概念，带过基础薄弱的学生明显进步。', ARRAY['竞赛获奖','实例教学','基础薄弱有经验'], '雨花区', 28.14, 113.03, 4.7, 14, '1年家教经验'),
('周晓萌', '周', '女', 21, '大三', ARRAY['美术','书法'], ARRAY['小学','初中'], 75, '湖南师范大学', '美术教育', '擅长少儿美术启蒙，不追求画得像而是鼓励孩子表达自己，多位学生作品获得市级奖项。', ARRAY['创意启蒙','鼓励表达','获奖指导'], '岳麓区', 28.215, 112.925, 4.8, 20, '2年家教经验');

-- 开启 RLS（行级安全），允许公开读取
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许所有人查看老师" ON teachers
  FOR SELECT USING (true);

CREATE POLICY "允许注册用户创建老师" ON teachers
  FOR INSERT WITH CHECK (true);
