import React, {createContext, useContext, useState} from 'react';
import {FoodDataItem} from '../types/food';

interface FoodContextType {
  foods: FoodDataItem[];
  activateFood: (name: string, address: string, plantingDate: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const initialFoods: FoodDataItem[] = [
  {
    id: 1,
    name: '감자',
    image: require('../assets/potato.png'),
    isActive: true,
  },
  {
    id: 2,
    name: '토마토',
    image: require('../assets/tomato.png'),
    isActive: true,
  },
  {
    id: 3,
    name: '양파',
    image: require('../assets/onion.png'),
    isActive: false,
  },
  {
    id: 4,
    name: '고구마',
    image: require('../assets/sweet-potato.png'),
    isActive: false,
  },
];

export const FoodProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [foods, setFoods] = useState<FoodDataItem[]>(initialFoods);

  const activateFood = (
    name: string,
    address: string,
    plantingDate: string,
  ) => {
    setFoods(prevFoods =>
      prevFoods.map(food =>
        food.name === name
          ? {...food, isActive: true, address, plantingDate}
          : food,
      ),
    );
  };

  return (
    <FoodContext.Provider value={{foods, activateFood}}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};
