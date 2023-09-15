import React from 'react';
import Happy from '../assets/Happy.svg';
import HappyChecked from '../assets/HappyChecked.svg';
import Calm from '../assets/Neutral.svg';
import CalmChecked from '../assets/NeutralChecked.svg';
import Sad from '../assets/Sad.svg';
import SadChecked from '../assets/SadChecked.svg';
import Sleepy from '../assets/Sleepy.svg';
import SleepyChecked from '../assets/SleepyChecked.svg';


import SignIn from '../assets/Daily-Care/Sign-In.svg';
import SignOut from '../assets/Daily-Care/Sign-Out.svg';

import Food from '../assets/Daily-Care/Food.svg';

import Nappy from '../assets/Daily-Care/Nappy.svg';
import Undies from '../assets/Daily-Care/Undies.svg';
import Toilet from '../assets/Daily-Care/Toilet.svg';

import Water from '../assets/Daily-Care/Water.svg';
import Milk from '../assets/Daily-Care/Milk.svg';
import Bottle from '../assets/Daily-Care/Bottle.svg';

import Sleep from '../assets/Daily-Care/Sleep.svg';

const Icon = (props) => {
  const { iconName } = props;
  const IconSets = {
    HAPPY: Happy,
    HAPPY_CHECKED: HappyChecked,
    CALM: Calm,
    CALM_CHECKED: CalmChecked,
    SAD: Sad,
    SAD_CHECKED: SadChecked,
    SLEEPY: Sleepy,
    SLEEPY_CHECKED: SleepyChecked,

    SIGNIN: SignIn,
    SIGNOUT: SignOut,
    FOOD: Food,
    NAPPY: Nappy,
    UNDIES: Undies,
    TOILET: Toilet,
    WATER: Water,
    MILK: Milk,
    BOTTLE: Bottle,
    SLEEP: Sleep,
  };

  const iconNameFromProps = () => {
    return IconSets[iconName];
  };

  const Icons = iconNameFromProps();

  return <Icons {...props} />;
};

export default Icon;