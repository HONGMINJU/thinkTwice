// Value Dimension Types
export interface ValueSide {
  label: string;
  description: string;
}

export interface ValueDimension {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  leftValue: ValueSide;
  rightValue: ValueSide;
  issues: string[];
}

// User Value Types
export interface UserValueScore {
  dimensionId: string;
  value: number; // 0-100, 0 = left, 100 = right
  participatedIssues: number;
}

export interface UserProfile {
  id: string;
  nickname: string;
  profileImage?: string;
  valueScores: UserValueScore[];
  createdAt: string;
  updatedAt: string;
}

// Issue Types
export interface Issue {
  id: string;
  title: string;
  summary: string;
  originalContent: string;
  neutralContent: string;
  dimensionId: string;
  source: string;
  publishedAt: string;
  participantCount: number;
  imageUrl?: string;
}

// Balance Pick Types
export interface BalancePickResult {
  issueId: string;
  dimensionId: string;
  selectedValue: number; // 0-100
  timestamp: string;
}

// Value Spectrum Types
export interface ValueDistribution {
  dimensionId: string;
  leftPercentage: number;
  rightPercentage: number;
  leftReasons: string[];
  rightReasons: string[];
}

// Blind Spot Types
export interface BlindSpot {
  id: string;
  issueId: string;
  content: string;
  relatedDimensions: string[];
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  ArticleDetail: { issueId: string };
  BalancePick: { issueId: string };
  BlindSpot: {
    issueId: string;
    oppositeLabel: string;
    oppositePercent: number;
    selectedValue: number;
  };
  ValueSpectrum: { issueId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  MyJourney: undefined;
  Settings: undefined;
};

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
}

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  leftDescription?: string;
  rightDescription?: string;
}
