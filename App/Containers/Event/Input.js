import React, { PureComponent, Fragment } from 'react';
import { ScrollView, Text, TimePickerAndroid, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

import { moderateScale, screenHeight, screenWidth, InAppNotification } from 'Lib';
import { InputText, ButtonPrimary } from 'Components';
import styles from './Styles';

const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY = moment().format(DATE_FORMAT);

class Input extends PureComponent {
  state = {
    title: '',
    detail: '',
    url: '',
    markedDates: {},
    times: '',
  };
  
  onOpenTimeInput = async () => {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({ times: `${hour}:${minute}` })
      }
    } catch ({code, message}) {
      InAppNotification.errorLocal(
        'Error',
        'Gagal membuka isian jam'
      );
    }
  };
  
  onDaySelect = day => {
    const { markedDates } = this.state;
    const selectedDay = moment(day.dateString).format(DATE_FORMAT);
      
    let selected = true;
    if (markedDates[selectedDay]) {
      selected = !markedDates[selectedDay].selected;
    }
    
    const updatedMarkedDates = {...markedDates, ...{ [selectedDay]: { selected } } };
    this.setState({ markedDates: updatedMarkedDates });
  };

  render() {
    const { title, detail, url, markedDates, times } = this.state;
    return (
      <Fragment>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(10)
          }}
        >
          <InputText
            title='Judul event'
            value={title}
            onChangeText={(title) => this.setState({ title })}
            placeholder='Judul event'
            // error={error_rtrw}
            onSubmitEditing={() => this._detail.focus()}
            returnKeyType='next'
          />
          
          <InputText
            refs={(ref) => this._detail = ref}
            title='Detail'
            value={detail}
            onChangeText={(detail) => this.setState({ detail })}
            placeholder='Deskripsi event'
            multiline={true}
            // error={error_alamat_detail}
            styleContainer={{ height: moderateScale(screenHeight / 2) }}
            styleBorder={{ height: moderateScale(screenHeight / 2 - 20), alignItems: 'flex-start' }}
            onSubmitEditing={() => this._url.focus()}
            returnKeyType='next'
          />
        
          <InputText
            refs={(ref) => this._url = ref}
            title='URL'
            value={url}
            onChangeText={(url) => this.setState({ url })}
            placeholder='Link URL'
            // error={error_rtrw}
          />
          
          <Text style={styles.title}>Isi jadwal notifikasi</Text>
          <CalendarList
            horizontal={true}
            minDate={TODAY}
            onDayPress={this.onDaySelect}
            markedDates={markedDates}
            calendarWidth={moderateScale(screenWidth - 45)}
          />

          <TouchableOpacity
            onPress={this.onOpenTimeInput}
          >
            <InputText
              title='Jam'
              value={times}
              placeholder='Jam'
              editable={false}
            />
          </TouchableOpacity>
        </ScrollView>
        <ButtonPrimary
          onPress={this.uploadEvent}
          title="MULAI EVENT"
          // loading={loading}
        />
      </Fragment>
    );
  }
}

export default Input;
