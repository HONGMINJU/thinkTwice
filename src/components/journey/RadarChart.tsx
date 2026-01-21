import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors, typography, spacing } from '../../styles';
import { VALUE_DIMENSIONS } from '../../constants/valueDimensions';
import { UserValueScore } from '../../types';

interface RadarChartProps {
  scores: UserValueScore[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 280 }) => {
  const center = size / 2;
  const radius = (size - 60) / 2;
  const numPoints = VALUE_DIMENSIONS.length;
  const angleStep = (2 * Math.PI) / numPoints;

  const getScore = (dimensionId: string): number => {
    const score = scores.find((s) => s.dimensionId === dimensionId);
    return score?.value ?? 50;
  };

  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number): { x: number; y: number } => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = radius + 25;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const polygonPoints = VALUE_DIMENSIONS.map((dim, index) => {
    const value = getScore(dim.id);
    const point = getPoint(index, value);
    return `${point.x},${point.y}`;
  }).join(' ');

  const backgroundPolygonPoints = VALUE_DIMENSIONS.map((_, index) => {
    const point = getPoint(index, 100);
    return `${point.x},${point.y}`;
  }).join(' ');

  const gridLevels = [25, 50, 75, 100];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {gridLevels.map((level) => {
          const points = VALUE_DIMENSIONS.map((_, index) => {
            const point = getPoint(index, level);
            return `${point.x},${point.y}`;
          }).join(' ');
          return (
            <Polygon
              key={level}
              points={points}
              fill="none"
              stroke={colors.border.light}
              strokeWidth={1}
            />
          );
        })}

        {VALUE_DIMENSIONS.map((_, index) => {
          const endPoint = getPoint(index, 100);
          return (
            <Line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke={colors.border.light}
              strokeWidth={1}
            />
          );
        })}

        <Polygon
          points={polygonPoints}
          fill={colors.accent.primary}
          fillOpacity={0.3}
          stroke={colors.accent.primary}
          strokeWidth={2}
        />

        {VALUE_DIMENSIONS.map((dim, index) => {
          const value = getScore(dim.id);
          const point = getPoint(index, value);
          return (
            <Circle
              key={dim.id}
              cx={point.x}
              cy={point.y}
              r={5}
              fill={colors.accent.primary}
            />
          );
        })}

        {VALUE_DIMENSIONS.map((dim, index) => {
          const pos = getLabelPosition(index);
          return (
            <SvgText
              key={dim.id}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={10}
              fill={colors.text.secondary}
            >
              {dim.icon}
            </SvgText>
          );
        })}
      </Svg>

      <View style={styles.legend}>
        {VALUE_DIMENSIONS.slice(0, 5).map((dim) => (
          <View key={dim.id} style={styles.legendItem}>
            <Text style={styles.legendIcon}>{dim.icon}</Text>
            <Text style={styles.legendText}>{dim.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        {VALUE_DIMENSIONS.slice(5).map((dim) => (
          <View key={dim.id} style={styles.legendItem}>
            <Text style={styles.legendIcon}>{dim.icon}</Text>
            <Text style={styles.legendText}>{dim.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs,
  },
  legendIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  legendText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontSize: 10,
  },
});
