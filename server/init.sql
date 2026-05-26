CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
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
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO teachers (phone, password_hash, name, initial, gender, age, year, subjects, grades, price, university, major, description, tags, district, lat, lng, rating, student_count, experience) VALUES
('13800001111', '$2b$10$placeholder_hash_1', '张明远', '张', '男', 21, '大三', ARRAY['数学','物理'], ARRAY['初中','高中'], 80, '中南大学', '数学与应用数学', '高考数学142分，讲题耐心细致，善于用通俗的方式讲清楚难题。', ARRAY['高考数学142','耐心细致'], '岳麓区', 28.21, 112.92, 4.9, 23, '2年家教经验'),
('13800002222', '$2b$10$placeholder_hash_2', '李雪琴', '李', '女', 20, '大二', ARRAY['英语'], ARRAY['小学','初中'], 70, '湖南师范大学', '英语师范', '英语专业在读，发音标准，注重培养学生兴趣。', ARRAY['英语师范','发音标准'], '雨花区', 28.13, 113.04, 4.8, 12, '1年家教经验'),
('13800003333', '$2b$10$placeholder_hash_3', '王浩然', '王', '男', 22, '大四', ARRAY['语文','历史'], ARRAY['初中','高中'], 90, '湖南大学', '汉语言文学', '高考语文135分，有自己的一套阅读写作教学方法。', ARRAY['高考语文135','作文方法'], '岳麓区', 28.20, 112.94, 4.9, 31, '3年家教经验'),
('13800004444', '$2b$10$placeholder_hash_4', '陈思雨', '陈', '女', 21, '大三', ARRAY['化学','生物'], ARRAY['高中'], 80, '中南大学', '化学工程', '理综成绩优异，擅长归纳题型和解题思路。', ARRAY['理综高分','归纳题型'], '天心区', 28.115, 112.97, 4.8, 18, '2年家教经验'),
('13800005555', '$2b$10$placeholder_hash_5', '刘天宇', '刘', '男', 19, '大一', ARRAY['编程','数学'], ARRAY['小学','初中'], 60, '国防科技大学', '计算机科学', '信息学竞赛省一，擅长编程启蒙教育。', ARRAY['竞赛省一','编程入门'], '开福区', 28.235, 112.98, 4.6, 6, '半年家教经验'),
('13800006666', '$2b$10$placeholder_hash_6', '赵雅文', '赵', '女', 22, '大四', ARRAY['钢琴','音乐'], ARRAY['小学','初中'], 100, '湖南师范大学', '音乐教育', '钢琴十级，亲和力强，擅长考级辅导。', ARRAY['钢琴十级','亲和力强'], '芙蓉区', 28.19, 113.03, 5.0, 28, '3年家教经验'),
('13800007777', '$2b$10$placeholder_hash_7', '孙浩宇', '孙', '男', 20, '大二', ARRAY['物理','数学'], ARRAY['初中','高中'], 75, '长沙理工大学', '物理学', '物理竞赛获奖，善于用实例解释抽象概念。', ARRAY['竞赛获奖','实例教学'], '雨花区', 28.14, 113.03, 4.7, 14, '1年家教经验'),
('13800008888', '$2b$10$placeholder_hash_8', '周晓萌', '周', '女', 21, '大三', ARRAY['美术','书法'], ARRAY['小学','初中'], 75, '湖南师范大学', '美术教育', '擅长少儿美术启蒙，鼓励孩子表达自己。', ARRAY['创意启蒙','鼓励表达'], '岳麓区', 28.215, 112.925, 4.8, 20, '2年家教经验');

CREATE TABLE IF NOT EXISTS needs (
  id SERIAL PRIMARY KEY,
  student_grade TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  frequency TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  teacher_gender TEXT NOT NULL DEFAULT '不限',
  district TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  student_name TEXT NOT NULL DEFAULT '',
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
