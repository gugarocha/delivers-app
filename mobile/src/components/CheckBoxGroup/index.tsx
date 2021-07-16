import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { styles } from './styles';

interface Props {
  values: string[];
  selectedValue: string;
  setSelectedValue: (selectedValue: string) => void;
};

export function CheckBoxGroup({ values, selectedValue, setSelectedValue }: Props) {
  const [checkBoxIsSelected, setCheckBoxIsSelected] = useState(true);

  return (
    <View>
      {
        values.map((value) => (
          <View key={value} style={styles.container}>
            <CheckBox
              value={selectedValue === value && checkBoxIsSelected}
              onValueChange={(isSelected) => {
                setSelectedValue(isSelected ? value : '')
                setCheckBoxIsSelected(isSelected)
              }}
            />
            <Text>
              {value}
            </Text>
          </View>
        ))
      }
    </View>
  );
};