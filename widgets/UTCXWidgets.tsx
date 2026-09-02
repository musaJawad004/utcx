import { HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { background, cornerRadius, font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers';
import { createLiveActivity, createWidget, type LiveActivityEnvironment, type WidgetEnvironment } from 'expo-widgets';

const ink = '#10100F';
const canvas = '#F2F0EA';
const ember = '#5E6873';

export type SingleClockProps = { city: string; time: string; offset: string; isDay: boolean };
export type ThreeCityProps = { cities: Array<{ city: string; time: string; offset: string }> };
export type WorldTimeProps = { primary: SingleClockProps; cities: Array<{ city: string; time: string }> };
export type ClockActivityProps = { localCode: string; localTime: string; cityCode: string; cityTime: string };

const SingleClock = (props: SingleClockProps, environment: WidgetEnvironment) => {
  'widget';
  if (environment.widgetFamily === 'accessoryInline') return <Text>{props.city} {props.time}</Text>;
  if (environment.widgetFamily === 'accessoryCircular') return <Text modifiers={[font({ design: 'monospaced', size: 15, weight: 'semibold' })]}>{props.time}</Text>;
  return (
    <VStack alignment="leading" spacing={5} modifiers={[padding({ all: 14 }), background(canvas), cornerRadius(20)]}>
      <HStack><Text modifiers={[font({ size: 12, weight: 'medium' }), foregroundStyle(ink)]}>{props.city}</Text><Spacer /><Text modifiers={[font({ size: 10, design: 'monospaced' }), foregroundStyle(ember)]}>{props.isDay ? 'DAY' : 'NIGHT'}</Text></HStack>
      <Spacer />
      <Text modifiers={[font({ design: 'monospaced', size: 34, weight: 'light' }), foregroundStyle(ink)]}>{props.time}</Text>
      <Text modifiers={[font({ design: 'monospaced', size: 9 }), foregroundStyle('#777670')]}>{props.offset}</Text>
    </VStack>
  );
};

const ThreeCity = (props: ThreeCityProps) => {
  'widget';
  return (
    <HStack spacing={0} modifiers={[padding({ all: 14 }), background(canvas), cornerRadius(20)]}>
      {props.cities.map((city) => (
        <VStack key={city.city} alignment="leading" spacing={5}>
          <Text modifiers={[font({ size: 10, weight: 'medium' }), foregroundStyle('#777670')]}>{city.city}</Text>
          <Text modifiers={[font({ design: 'monospaced', size: 21, weight: 'light' }), foregroundStyle(ink)]}>{city.time}</Text>
          <Text modifiers={[font({ design: 'monospaced', size: 8 }), foregroundStyle(ember)]}>{city.offset}</Text>
        </VStack>
      ))}
    </HStack>
  );
};

const WorldTime = (props: WorldTimeProps) => {
  'widget';
  return (
    <VStack alignment="leading" spacing={10} modifiers={[padding({ all: 18 }), background(canvas), cornerRadius(24)]}>
      <HStack><Text modifiers={[font({ size: 11, weight: 'semibold' }), foregroundStyle(ember)]}>UTCX</Text><Spacer /><Text modifiers={[font({ design: 'monospaced', size: 9 }), foregroundStyle('#777670')]}>{props.primary.offset}</Text></HStack>
      <Text modifiers={[font({ size: 17, weight: 'medium' }), foregroundStyle(ink)]}>{props.primary.city}</Text>
      <Text modifiers={[font({ design: 'monospaced', size: 50, weight: 'light' }), foregroundStyle(ink)]}>{props.primary.time}</Text>
      <Spacer />
      {props.cities.map((city) => <HStack key={city.city}><Text modifiers={[font({ size: 12 }), foregroundStyle('#777670')]}>{city.city}</Text><Spacer /><Text modifiers={[font({ design: 'monospaced', size: 15, weight: 'medium' }), foregroundStyle(ink)]}>{city.time}</Text></HStack>)}
    </VStack>
  );
};

const ClockActivity = (props: ClockActivityProps, _environment: LiveActivityEnvironment) => {
  'widget';
  return {
    banner: <HStack modifiers={[padding({ all: 14 })]}><Text modifiers={[font({ design: 'monospaced', weight: 'semibold' })]}>{props.localCode} {props.localTime}</Text><Spacer /><Text modifiers={[foregroundStyle(ember)]}>•</Text><Spacer /><Text modifiers={[font({ design: 'monospaced', weight: 'semibold' })]}>{props.cityCode} {props.cityTime}</Text></HStack>,
    compactLeading: <Text modifiers={[font({ design: 'monospaced', size: 12, weight: 'semibold' })]}>{props.localCode}</Text>,
    compactTrailing: <Text modifiers={[font({ design: 'monospaced', size: 12 })]}>{props.cityTime}</Text>,
    minimal: <Text modifiers={[foregroundStyle(ember)]}>●</Text>,
    expandedLeading: <VStack modifiers={[padding({ all: 8 })]}><Text>{props.localCode}</Text><Text modifiers={[font({ design: 'monospaced', size: 20 })]}>{props.localTime}</Text></VStack>,
    expandedTrailing: <VStack modifiers={[padding({ all: 8 })]}><Text>{props.cityCode}</Text><Text modifiers={[font({ design: 'monospaced', size: 20 })]}>{props.cityTime}</Text></VStack>,
    expandedBottom: <Text modifiers={[padding({ all: 8 }), font({ size: 11 }), foregroundStyle('#777670')]}>WORLD TIME · UPDATED LOCALLY</Text>,
  };
};

export const UTCXSingleClock = createWidget('UTCXSingleClock', SingleClock);
export const UTCXThreeCity = createWidget('UTCXThreeCity', ThreeCity);
export const UTCXWorldTime = createWidget('UTCXWorldTime', WorldTime);
export const UTCXClockActivity = createLiveActivity('UTCXClockActivity', ClockActivity);
