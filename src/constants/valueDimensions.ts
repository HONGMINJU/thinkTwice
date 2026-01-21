import { ValueDimension } from '../types';

export const VALUE_DIMENSIONS: ValueDimension[] = [
  {
    id: 'tech_ethics',
    name: '기술과 윤리',
    nameEn: 'Tech & Ethics',
    icon: '🤖',
    leftValue: {
      label: '혁신의 속도',
      description: '기술 발전을 막아서는 안 된다',
    },
    rightValue: {
      label: '인격권 보호',
      description: '개인의 권리와 윤리가 우선이다',
    },
    issues: ['AI 저작권', '자율주행 사고 책임', '유전자 편집', '디지털 감시'],
  },
  {
    id: 'generations',
    name: '세대와 공정',
    nameEn: 'Generations',
    icon: '👥',
    leftValue: {
      label: '연공서열',
      description: '기성세대의 경험과 노력을 인정해야 한다',
    },
    rightValue: {
      label: '능력주의',
      description: '미래세대의 기회와 공정한 경쟁이 중요하다',
    },
    issues: ['국민연금 개혁', '정년 연장', '청년 주거 지원'],
  },
  {
    id: 'work_life',
    name: '노동과 삶',
    nameEn: 'Work & Life',
    icon: '💼',
    leftValue: {
      label: '노동 유연성',
      description: '개인과 기업의 선택권을 보장해야 한다',
    },
    rightValue: {
      label: '고용 안정성',
      description: '노동자의 권리와 안정이 우선이다',
    },
    issues: ['주 52시간제', '플랫폼 노동자 권리', '최저임금', '원격 근무'],
  },
  {
    id: 'gender',
    name: '젠더와 평등',
    nameEn: 'Gender',
    icon: '⚖️',
    leftValue: {
      label: '차이의 인정',
      description: '성별 간 차이를 있는 그대로 인정해야 한다',
    },
    rightValue: {
      label: '결과의 평등',
      description: '실질적인 평등을 위한 적극적 조치가 필요하다',
    },
    issues: ['할당제 논란', '성별 임금 격차', '젠더 갈등 이슈'],
  },
  {
    id: 'global',
    name: '외교와 국익',
    nameEn: 'Global',
    icon: '🌍',
    leftValue: {
      label: '실리주의 외교',
      description: '국익을 최우선으로 실리를 추구해야 한다',
    },
    rightValue: {
      label: '가치/동맹 중심',
      description: '민주주의와 동맹 가치를 지켜야 한다',
    },
    issues: ['미중 갈등 사이의 선택', '대북 정책', '난민 수용 문제'],
  },
  {
    id: 'local',
    name: '로컬과 분권',
    nameEn: 'Local',
    icon: '🏙️',
    leftValue: {
      label: '수도권 집중',
      description: '효율성과 경쟁력을 위해 집중이 필요하다',
    },
    rightValue: {
      label: '지역 균형',
      description: '전국이 골고루 발전해야 한다',
    },
    issues: ['메가시티 서울', '지방 소멸 대책', '공공기관 지방 이전'],
  },
  {
    id: 'education',
    name: '교육과 기회',
    nameEn: 'Education',
    icon: '📚',
    leftValue: {
      label: '수월성 교육',
      description: '우수한 인재를 집중 육성해야 한다',
    },
    rightValue: {
      label: '보편적 교육',
      description: '모든 학생에게 평등한 기회를 줘야 한다',
    },
    issues: ['자사고/특목고 폐지', '입시 제도 변경', '교육 격차 해소'],
  },
  {
    id: 'safety_rights',
    name: '안전과 인권',
    nameEn: 'Safety & Rights',
    icon: '🛡️',
    leftValue: {
      label: '공공 안전',
      description: '사회의 안전을 위해 일부 제한은 불가피하다',
    },
    rightValue: {
      label: '개인 프라이버시',
      description: '개인의 자유와 프라이버시가 우선이다',
    },
    issues: ['CCTV 확대', '범죄자 신상 공개', '집회의 자유 제한'],
  },
  {
    id: 'tax_welfare',
    name: '복지와 조세',
    nameEn: 'Tax & Welfare',
    icon: '💰',
    leftValue: {
      label: '보편적 복지',
      description: '세금을 더 내더라도 모두를 위한 복지가 필요하다',
    },
    rightValue: {
      label: '선별적 복지',
      description: '꼭 필요한 곳에만 효율적으로 지원해야 한다',
    },
    issues: ['기본소득', '부자 감세 논란', '건강보험 재정 건전성'],
  },
  {
    id: 'culture',
    name: '문화와 다양성',
    nameEn: 'Culture',
    icon: '🎭',
    leftValue: {
      label: '전통 보존',
      description: '우리 사회의 전통적 가치를 지켜야 한다',
    },
    rightValue: {
      label: '다양성 수용',
      description: '새로운 가치와 문화를 포용해야 한다',
    },
    issues: ['다문화 가정 지원', '표현의 자유 범위', '차별금지법'],
  },
];

export const getDimensionById = (id: string): ValueDimension | undefined => {
  return VALUE_DIMENSIONS.find((d) => d.id === id);
};

export const getDimensionLabel = (id: string, value: number): string => {
  const dimension = getDimensionById(id);
  if (!dimension) return '';

  if (value < 35) {
    return `${dimension.leftValue.label}을(를) 중시하는 편`;
  } else if (value > 65) {
    return `${dimension.rightValue.label}을(를) 중시하는 편`;
  } else {
    return '균형 잡힌 시각';
  }
};
