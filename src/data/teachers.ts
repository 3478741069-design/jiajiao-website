export interface Teacher {
  id: number | string
  name: string
  initial: string
  gender: string
  age: number
  year: string
  subjects: string[]
  grades: string[]
  experience: string
  rating: number
  students: number
  price: number
  university: string
  major: string
  description: string
  videoUrl: string
  tags: string[]
  district: string
  lat: number
  lng: number
}

export const allTeachers: Teacher[] = [
  {
    id: 1, name: '张明远', initial: '张', gender: '男', age: 21, year: '大三',
    subjects: ['数学', '物理'], grades: ['初中', '高中'],
    experience: '2年家教经验', rating: 4.9, students: 23, price: 80,
    university: '中南大学', major: '数学与应用数学',
    description: '高考数学142分,讲题耐心细致,善于用通俗的方式讲清楚难题。带过三个初三学生全部考入四大名校。',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['高考数学142', '耐心细致', '带过初三冲刺'],
    district: '岳麓区', lat: 28.21, lng: 112.92,
  },
  {
    id: 2, name: '李雪琴', initial: '李', gender: '女', age: 20, year: '大二',
    subjects: ['英语'], grades: ['小学', '初中'],
    experience: '1年家教经验', rating: 4.8, students: 12, price: 70,
    university: '湖南师范大学', major: '英语师范',
    description: '英语专业在读，发音标准，注重培养学生的学习兴趣和习惯，擅长和小孩子沟通。',
    videoUrl: '',
    tags: ['英语师范', '发音标准', '喜欢孩子'],
    district: '雨花区', lat: 28.13, lng: 113.04,
  },
  {
    id: 3, name: '王浩然', initial: '王', gender: '男', age: 22, year: '大四',
    subjects: ['语文', '历史'], grades: ['初中', '高中'],
    experience: '3年家教经验', rating: 4.9, students: 31, price: 90,
    university: '湖南大学', major: '汉语言文学',
    description: '湖南省高考语文135分,作文接近满分。有一套自己的阅读理解和写作教学方法。',
    videoUrl: '',
    tags: ['高考语文135', '作文方法', '阅读技巧'],
    district: '岳麓区', lat: 28.20, lng: 112.94,
  },
  {
    id: 4, name: '陈思雨', initial: '陈', gender: '女', age: 21, year: '大三',
    subjects: ['化学', '生物'], grades: ['高中'],
    experience: '2年家教经验', rating: 4.8, students: 18, price: 80,
    university: '中南大学', major: '化学工程',
    description: '理综成绩优异，擅长归纳题型和解题思路，帮助学生建立知识框架而非死记硬背。',
    videoUrl: '',
    tags: ['理综高分', '归纳题型', '方法导向'],
    district: '天心区', lat: 28.115, lng: 112.97,
  },
  {
    id: 5, name: '刘天宇', initial: '刘', gender: '男', age: 19, year: '大一',
    subjects: ['编程', '数学'], grades: ['小学', '初中'],
    experience: '半年家教经验', rating: 4.6, students: 6, price: 60,
    university: '国防科技大学', major: '计算机科学',
    description: '信息学竞赛省一等奖，能用有趣的小项目激发孩子对编程的兴趣，入门教学很有经验。',
    videoUrl: '',
    tags: ['竞赛省一', '编程入门', '趣味教学'],
    district: '开福区', lat: 28.235, lng: 112.98,
  },
  {
    id: 6, name: '赵雅文', initial: '赵', gender: '女', age: 22, year: '大四',
    subjects: ['钢琴', '音乐'], grades: ['小学', '初中'],
    experience: '3年家教经验', rating: 5.0, students: 28, price: 100,
    university: '湖南师范大学', major: '音乐教育',
    description: '钢琴十级，亲和力强，辅导过多名学生顺利通过考级，会根据孩子性格调整教学节奏。',
    videoUrl: '',
    tags: ['钢琴十级', '亲和力强', '考级辅导'],
    district: '芙蓉区', lat: 28.19, lng: 113.03,
  },
  {
    id: 7, name: '孙浩宇', initial: '孙', gender: '男', age: 20, year: '大二',
    subjects: ['物理', '数学'], grades: ['初中', '高中'],
    experience: '1年家教经验', rating: 4.7, students: 14, price: 75,
    university: '长沙理工大学', major: '物理学',
    description: '物理竞赛获奖，善于用生活实例解释抽象概念，带过基础薄弱的学生明显进步。',
    videoUrl: '',
    tags: ['竞赛获奖', '实例教学', '基础薄弱有经验'],
    district: '雨花区', lat: 28.14, lng: 113.03,
  },
  {
    id: 8, name: '周晓萌', initial: '周', gender: '女', age: 21, year: '大三',
    subjects: ['美术', '书法'], grades: ['小学', '初中'],
    experience: '2年家教经验', rating: 4.8, students: 20, price: 75,
    university: '湖南师范大学', major: '美术教育',
    description: '擅长少儿美术启蒙，不追求画得像而是鼓励孩子表达自己，多位学生作品获得市级奖项。',
    videoUrl: '',
    tags: ['创意启蒙', '鼓励表达', '获奖指导'],
    district: '岳麓区', lat: 28.215, lng: 112.925,
  },
]

export const allSubjects = [...new Set(allTeachers.flatMap((t) => t.subjects))]
export const allGrades = [...new Set(allTeachers.flatMap((t) => t.grades))]
export const allDistricts = [...new Set(allTeachers.map((t) => t.district))]
