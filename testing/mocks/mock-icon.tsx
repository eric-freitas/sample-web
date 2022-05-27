import React from 'react';
import BaseIcon from '../../src/components/Icons/BaseIcon';

export default class IconMock extends BaseIcon {
    width     = 246;
    height    = 246;
    className = "icon-mock";
    content   = ( <rect x="0" y="0" width={246} height={246} fill="white" /> )
}
  
