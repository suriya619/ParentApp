import * as React from 'react';
import { Dimensions, Animated } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Box, Button, HStack } from 'native-base';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample(props: any) {
  const [index, setIndex] = React.useState(0);
  const renderTabBar = (props: any) => {
    return (
      <HStack
        _light={{ bg: 'primary.900' }}
        _dark={{ bg: 'coolGray.600' }}
        shadow={2}
        pt="2"
        px="2"
        borderRadius="sm"
      >
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? 'white' : '#EBEBEB';
          const lightBorderColor = index === i ? 'white' : 'transparent';
          const darkBorderColor = index === i ? 'primary.700' : 'transparent';
          const fontWeight = index === i ? 'bold' : 'normal';

          return (
            <Box
              key={i}
              flex={1}
              alignItems="center"
              _web={{
                cursor: 'pointer',
              }}
            >
              <Button
                borderBottomWidth="3"
                pb="3"
                _light={{ borderColor: lightBorderColor }}
                _dark={{ borderColor: darkBorderColor }}
                rounded="0"
                variant="unstyled"
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text style={{ color, fontWeight }}>
                  {route.title}
                </Animated.Text>
              </Button>
            </Box>
          );
        })}
      </HStack>
    );
  };

  return (
    <TabView
      lazy
      navigationState={{ index, routes: props.routes }}
      renderScene={props.renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ zIndex: 2, marginTop: -8 }}
    />
  );
}
