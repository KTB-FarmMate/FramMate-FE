import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import DatePicker from 'react-native-date-picker';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {useFoodContext} from '../context/FoodContext';
import {AI_SERVER_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreadCreateRequestDto from '../dto/thread/request/ThreadCreateRequestDto';
import ThreadCreateResponseDto from '../dto/thread/response/ThreadCreateResponseDto';

type FoodRegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodRegister'
>;

type FoodRegisterScreenRouteProp = RouteProp<
  RootStackParamList,
  'FoodRegister'
>;

interface AddressData {
  address: string;
  buildingName?: string;
  zonecode: number;
}

export const FoodRegister: React.FC = () => {
  const navigation = useNavigation<FoodRegisterScreenNavigationProp>();
  const route = useRoute<FoodRegisterScreenRouteProp>();
  const {id, name} = route.params;

  const [address, setAddress] = useState<string>('');
  const [showPostcode, setShowPostcode] = useState<boolean>(false);
  const [plantedDate, setPlantingDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const {activateFood} = useFoodContext();

  const handleAddress = (data: AddressData = {address: '', zonecode: 0}) => {
    const fullAddress = data.buildingName
      ? `${data.address} (${data.buildingName})`
      : data.address;
    setAddress(fullAddress);
    setShowPostcode(false);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  const handleRegister = (memberId: string) => {
    if (!address) {
      return;
    }

    const requestUrl = `${AI_SERVER_URL}/members/${memberId}/threads`;

    fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cropId: id,
        cropName: name,
        address,
        plantedDate: formatDate(plantedDate),
      } as ThreadCreateRequestDto),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data: ThreadCreateResponseDto) => handleSuccess(data))
      .catch((error: Error) => handleError(error));

    const handleSuccess = (data: ThreadCreateResponseDto) => {
      activateFood(name, address, formatDate(plantedDate), data.data.threadId);
      navigation.replace('ChatScreen');
    };

    const handleError = (error: any) => {
      console.error('오류 발생:', error);
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>재배 위치</Text>
        <TouchableOpacity
          style={styles.addressButton}
          onPress={() => setShowPostcode(true)}>
          <Text style={styles.addressButtonText}>
            {address || '주소 검색하기'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>심은 날짜</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>{formatDate(plantedDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerButton,
            !address && styles.registerButtonDisabled,
          ]}
          onPress={async () => {
            const memberId = await AsyncStorage.getItem('memberId');
            if (memberId) {
              handleRegister(memberId);
            }
          }}
          disabled={!address}>
          <Text style={styles.registerButtonText}>등록하기</Text>
        </TouchableOpacity>

        <Modal
          visible={showPostcode}
          animationType="slide"
          onRequestClose={() => setShowPostcode(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.closeButton}>
                <Text style={[styles.closeButtonText, styles.invisibleText]}>
                  닫기
                </Text>
                {/* 왼쪽 버튼은 보이지 않음 */}
              </View>
              <Text style={styles.modalTitle}>주소 검색</Text>
              <TouchableOpacity
                style={styles.closeButton} // 오른쪽 버튼
                onPress={() => setShowPostcode(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
                {/* 오른쪽 버튼은 보이게 */}
              </TouchableOpacity>
            </View>
            <Postcode
              style={styles.postcode}
              jsOptions={{animation: true}}
              onSelected={handleAddress}
              onError={(error: unknown) => {
                console.error('Postcode Error:', error);
              }}
            />
          </View>
        </Modal>

        <DatePicker
          modal
          open={showDatePicker}
          date={plantedDate}
          mode="date"
          locale="ko"
          onConfirm={(date: Date) => {
            setShowDatePicker(false);
            setPlantingDate(date);
          }}
          onCancel={() => setShowDatePicker(false)}
          title="심은 날짜 선택"
          confirmText="확인"
          cancelText="취소"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  addressButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  addressButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    padding: 10,
    width: 50, // 버튼 공간 확보
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF', // 닫기 버튼 색상
  },
  invisibleText: {
    opacity: 0,
  },
  postcode: {
    flex: 1,
    width: '100%',
  },
});

export default FoodRegister;
