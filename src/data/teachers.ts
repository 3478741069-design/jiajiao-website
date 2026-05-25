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
  detail: {
    teachingStyle: string
    achievements: string[]
    availableTime: string
    studentCases: { title: string; desc: string }[]
    introVideos: string[]
    contactHint: string
  }
}

export const allTeachers: Teacher[] = [
  {
    id: 1, name: '张明远', initial: '张', gender: '男', age: 21, year: '大三',
    subjects: ['数学', '物理'], grades: ['初中', '高中'],
    experience: '2年家教经验', rating: 4.9, students: 23, price: 80,
    university: '中南大学', major: '数学与应用数学',
    description: '高考数学142分，讲题耐心细致，善于用通俗的方式讲清楚难题。带过三个初三学生全部考入四大名校。',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['高考数学142', '耐心细致', '带过初三冲刺'],
    district: '岳麓区', lat: 28.21, lng: 112.92,
    detail: {
      teachingStyle: '注重基础概念的理解，不搞题海战术。先帮学生梳理知识框架，再针对薄弱环节专项突破。每节课会留10分钟答疑，确保学生真正掌握。',
      achievements: ['高考数学142分（满分150）', '全国高中数学联赛省二等奖', '中南大学数学系专业排名前5%', '带过3名初三学生全部考入长郡/雅礼'],
      availableTime: '周一至周五晚上 18:00-21:00，周六周日全天',
      studentCases: [
        { title: '初三李同学', desc: '刚接手时数学60多分，基础薄弱。通过半学期系统梳理初二初三知识点 + 针对性刷题，中考数学102分，考入雅礼中学。' },
        { title: '高二王同学', desc: '物理力学部分始终弄不懂，我用了大量生活实例帮助理解。期末考试物理从50多分提升到78分。' },
      ],
      introVideos: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
      contactHint: '预约后可安排免费试听一节课，满意再付款',
    },
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
    detail: {
      teachingStyle: '寓教于乐，低年级学生通过游戏和歌曲学英语，高年级学生注重听说读写综合能力。会用英语绘本和原版动画辅助教学。',
      achievements: ['英语专业四级优秀', '全国大学生英语竞赛二等奖', '曾在长沙新东方担任助教'],
      availableTime: '周三周五下午 14:00-18:00，周六周日全天',
      studentCases: [
        { title: '小学四年级陈同学', desc: '对英语没兴趣，通过一学期的趣味教学，现在会主动看英文动画片，期末英语从害羞不说话变成积极举手发言。' },
      ],
      introVideos: [],
      contactHint: '可以带孩子先来试听，感受教学风格是否合适',
    },
  },
  {
    id: 3, name: '王浩然', initial: '王', gender: '男', age: 22, year: '大四',
    subjects: ['语文', '历史'], grades: ['初中', '高中'],
    experience: '3年家教经验', rating: 4.9, students: 31, price: 90,
    university: '湖南大学', major: '汉语言文学',
    description: '湖南省高考语文135分，作文接近满分。有一套自己的阅读理解和写作教学方法。',
    videoUrl: '',
    tags: ['高考语文135', '作文方法', '阅读技巧'],
    district: '岳麓区', lat: 28.20, lng: 112.94,
    detail: {
      teachingStyle: '不喜欢让学生背模板。阅读理解教"文本细读法"，作文教"素材活用法"。重在培养学生的独立思考和文字表达能力。',
      achievements: ['高考语文135分（全省前50）', '作文多次被选入校刊范文', '湖南大学文学院奖学金获得者'],
      availableTime: '每天晚上 19:00-22:00，周六全天',
      studentCases: [
        { title: '高三赵同学', desc: '作文长期在40分左右徘徊，通过一学期的写作训练掌握了素材运用和逻辑结构，最终高考作文52分。' },
        { title: '初二刘同学', desc: '文言文完全看不懂，我用"三步翻译法"教会他拆解句子，期中考试文言文部分只扣了2分。' },
      ],
      introVideos: [],
      contactHint: '试听前可先微信沟通学生目前的语文基础和学习困难',
    },
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
    detail: {
      teachingStyle: '注重原理理解，先讲清楚"为什么"再讲"怎么做"。会给学生整理每个章节的思维导图和常见题型，方便复习。',
      achievements: ['中南大学化学工程专业GPA 3.9', '全国大学生化学竞赛三等奖', '带过雅礼、长郡等名校学生'],
      availableTime: '周二周四晚上 19:00-22:00，周日全天',
      studentCases: [
        { title: '高二张同学', desc: '化学方程式记不住，我教她用"分类归纳法"整理，不再死记硬背。期中考试从40分提到72分。' },
      ],
      introVideos: [],
      contactHint: '建议带最近一次考试试卷来试听，方便我了解薄弱点',
    },
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
    detail: {
      teachingStyle: '项目驱动式教学，每完成一个知识点就带孩子做一个小项目。Scratch教做小游戏，Python教做小工具，让孩子有成就感。',
      achievements: ['全国青少年信息学奥林匹克竞赛省一等奖', '国防科技大学计算机系新生奖学金'],
      availableTime: '周五晚上 19:00-21:00，周六周日全天',
      studentCases: [
        { title: '小学六年级吴同学', desc: '零基础开始学Scratch，两个月后能独立做躲避球小游戏，对编程兴趣浓厚。' },
      ],
      introVideos: [],
      contactHint: '第一次课免费，让孩子体验编程乐趣再决定',
    },
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
    detail: {
      teachingStyle: '不强迫练琴，用鼓励和游戏化的方式培养乐感。考级辅导有系统的训练计划，每年固定帮学生备战上音/央音考级。',
      achievements: ['钢琴十级（上海音乐学院）', '长沙市钢琴比赛青年组一等奖', '辅导12名学生通过上音钢琴考级'],
      availableTime: '周三至周五下午 15:00-19:00，周六全天',
      studentCases: [
        { title: '小学三年级黄同学', desc: '学琴一年半没有兴趣想放弃，我换了一种教学方式后慢慢重拾兴趣，今年顺利通过上音五级。' },
        { title: '小学五年级周同学', desc: '零基础学琴一年半，考过四级，现在每周自觉练琴。' },
      ],
      introVideos: [],
      contactHint: '家里需要有钢琴或电钢琴，我可以上门教学',
    },
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
    detail: {
      teachingStyle: '物理不是背公式。我会用大量生活中的例子帮学生理解物理概念，再引导他们自己推导公式，这样记得牢而且能灵活运用。',
      achievements: ['全国大学生物理竞赛三等奖', '湖南省物理竞赛二等奖'],
      availableTime: '周一至周四晚上 19:00-21:30，周日全天',
      studentCases: [
        { title: '初二吴同学', desc: '物理一直在及格线徘徊，我用一学期帮他理解了力学和电学的核心概念，期末物理81分。' },
      ],
      introVideos: [],
      contactHint: '基础薄弱的学生优先，有信心帮他们建立物理思维',
    },
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
    detail: {
      teachingStyle: '每个孩子都有独特的艺术表达方式。我的课堂不是模仿秀，而是引导孩子用画笔讲自己的故事。课程涵盖水彩、国画、素描、手工等。',
      achievements: ['长沙市少儿美术比赛优秀指导教师', '作品入选湖南省大学生美术展', '指导学生获市级美术比赛一等奖3次'],
      availableTime: '周六周日 9:00-17:00',
      studentCases: [
        { title: '小学二年级林同学', desc: '之前只会临摹，经过一学期引导开始自己创作，作品《我的家》获得长沙市少儿美术比赛二等奖。' },
      ],
      introVideos: [],
      contactHint: '提供所有画材，家长无需额外购买',
    },
  },
]

export const allSubjects = [...new Set(allTeachers.flatMap((t) => t.subjects))]
export const allGrades = [...new Set(allTeachers.flatMap((t) => t.grades))]
export const allDistricts = [...new Set(allTeachers.map((t) => t.district))]
