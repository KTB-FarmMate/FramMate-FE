import React, {createContext, useContext, useState} from 'react';
import {FoodDataItem} from '../types/food';
import {BACKEND_SERVER_URL} from 'react-native-dotenv';
import {ImageSourcePropType} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodContextType {
  foods: FoodDataItem[];
  activateFood: (
    name: string,
    address: string,
    plantedDate: string,
    threadId: string,
  ) => void;
}

const cropImages: {[key: string]: any} = {
  감자: require('../assets/감자.png'),
  당근: require('../assets/당근.png'),
  고구마: require('../assets/고구마.png'),
  양파: require('../assets/양파.png'),
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const fetchInitialFoods = async () => {
  interface Crop {
    id: number;
    name: string;
    image: ImageSourcePropType;
    isActive: boolean;
  }

  const crops: Crop[] = await fetch(`${BACKEND_SERVER_URL}/crops`)
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data =>
      data.map((item: any) => ({
        id: item.cropId,
        name: item.cropName,
        image: cropImages[item.cropName],
      })),
    )
    .catch(error => {
      console.error('Error fetching crops:', error);
      return [];
    });

  const initialFoods = crops.map((crop: Crop) => ({
    id: crop.id,
    name: crop.name,
    image: crop.image,
    isActive: false,
  }));

  const memberId = await AsyncStorage.getItem('memberId');

  if (!memberId) {
    console.error('memberId not found');
    throw new Error('memberId not found');
  }

  const threads = await fetch(
    `${BACKEND_SERVER_URL}/members/${memberId}/threads`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 좋지 않습니다.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching threads:', error);
      throw new Error('Error fetching threads');
    });

  console.log(threads);
  initialFoods.forEach((food: any) => {
    const thread = threads.find((thread: any) => thread.cropName === food.name);
    if (thread) {
      food.isActive = true;
      food.address = thread.address;
      food.plantingDate = thread.plantingDate;
      food.threadId = thread.id;
    }
  });

  return initialFoods;
};

export const FoodProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [foods, setFoods] = useState<FoodDataItem[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const initialFoods = await fetchInitialFoods();
      setFoods(initialFoods);
    };

    fetchData();
  }, []);

  const activateFood = (
    name: string,
    address: string,
    plantedDate: string,
    threadId: string,
  ) => {
    setFoods(prevFoods =>
      prevFoods.map(food =>
        food.name === name
          ? {
              ...food,
              isActive: true,
              name: name,
              address,
              threadId: threadId,
              plantedDate: plantedDate,
            }
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
