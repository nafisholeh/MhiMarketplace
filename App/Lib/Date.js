import moment from 'moment'
import momenthijri from 'moment-hijri'
import 'moment/locale/id'
var _ = require('lodash')

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_READABLE_FORMAT = 'DD MMM YYYY'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function getCurrentDate() {
  return moment()
}

export function isSameDay(_date1, _date2) {
  let date1 = moment(_date1).format(DATE_TIME_FORMAT)
  let date2 = moment(_date2).format(DATE_TIME_FORMAT)
  return moment(date1).diff(date2, 'days') == 0 ? true : false
}

export function stringToDate(date) {
  return moment(date)
}

export function stringToDateWithFormat(date, format) {
  return moment(date).format(format == null ? DATE_FORMAT : null)
}

export function getIntervalTime(old, current) {
  return moment(old).from(moment(current))
}

// output: 3 hari yang lalu, 22 hari yang lalu, dst
export function getIntervalTimeToday(old, isShort) {
  if (!old) return null;
  const interval = moment(old).from(moment())
  if (isShort && typeof interval === 'string') {
    if (interval.includes('yang lalu')) {
      return interval.replace('yang lalu', '');
    }
  }
  return interval
}

// output: Hari ini, Kemarin, 22 Juli, 21 Juli, dst
export function getIntervalDateToday(old, _format) {
  let a = moment(old)
  let b = moment()
  let diff = a.diff(b, 'days')
  let format = !_format ? 'DD MMM' : _format
  if(moment(old).isSame(moment(), 'year')) {  // jika tahunnya sama
    switch(diff) {
      case 0: return 'Hari ini'; break
      case -1: return 'Kemarin'; break
      case 1: return 'Besok'; break
      case 2: return 'Lusa'; break
      default: return exports.getReadableDate(old, null, null, format)
    }
  } else {    // jika tahunnya tidak sama
    let isContainYear = format.includes('Y') || format.includes('y') ? true : false
    if(!isContainYear) format += ' YY'
    return exports.getReadableDate(old, null, format)
  }
}

export function getReadableDate(date, originFormat, locale, format) {
  if(date === 'undefined' || date === '' || date === null || date === '0000-00-00 00:00:00')
    return '-'
  return moment(date, originFormat || 'DD-MM-YYYY').locale(locale ? locale : 'id').format(format ? format : DATE_READABLE_FORMAT)
}

export function getReadableWeekdays(date) {
  if(date === 'undefined' || date === '' || date === null || date === '0000-00-00 00:00:00')
    return ''
  else return translateWeekdays(moment(date).isoWeekday())
}

export function translateMonthIndex(index) {
  switch(index) {
    case 1: return 'Januari'
    case 2: return 'Februari'
    case 3: return 'Maret'
    case 4: return 'April'
    case 5: return 'Mei'
    case 6: return 'Juni'
    case 7: return 'Juli'
    case 8: return 'Agustus'
    case 9: return 'Nopember'
    case 10: return 'Oktober'
    case 11: return 'November'
    case 12: return 'Desember'
  }
}

export function translateMonthName(name) {
  switch(name) {
    case 'Januari': return 1
    case 'Februari': return 2
    case 'Maret': return 3
    case 'April': return 4
    case 'Mei': return 5
    case 'Juni': return 6
    case 'Juli': return 7
    case 'Agustus': return 8
    case 'Nopember': return 9
    case 'Oktober': return 10
    case 'November': return 11
    case 'Desember': return 12
  }
}

export function translateWeekdays(day) {
  switch(day) {
    case 1: return 'Senin'
    case 2: return 'Selasa'
    case 3: return 'Rabu'
    case 4: return 'Kamis'
    case 5: return 'Jumat'
    case 6: return 'Sabtu'
    case 7: return 'Minggu'
  }
}

export function isValidDate(str) {
  if(str === '0000-00-00 00:00:00') return true
  return moment(str, DATE_TIME_FORMAT, true).isValid()
}

/*
* konversi 2017-9-8 jadi 2017-09-08
*/
export function normalizeDate(date) {
  let output = date.split('-')
  let month = output[1].length == 1 ? '0'+output[1] : output[1]
  let day = output[2].length == 1 ? '0'+output[2] : output[2]
  return output[0]+'-'+month+'-'+day
}

/*
* konversi 9:8 jadi 09:08
*/
export function normalizeTime(time) {
  let output = time.split(':')
  let hours = output[0].length == 1 ? '0'+output[0] : output[0]
  let minutes = output[1].length == 1 ? '0'+output[1] : output[1]
  return hours+':'+minutes
}

/*
* hapus (WIB) dari string waktu
*/
export function removeTimeZone(time) {
  if(_.isNil(time)) return time
  if(time.length > 6) {
    return time.substring(0,5)
  } else {
    return time
  }
}

/*
* real time in format
*/
export function getCurrentTime() {
  let date = new Date()
  return exports.normalizeTime(date.getHours() + ':' + date.getMinutes())
}

/*
* konversi tanggal masehi ke hijriyah
*/
export function gmod(n,m) {
  return ((n%m)+m)%m
}

export function kuwaiticalendar(pivotDate, adjust) {
  if(adjust) {
      adjustmili = 1000*60*60*24*adjust
      todaymili = pivotDate.getTime()+adjustmili
      pivotDate = new Date(todaymili)
  }
  day = pivotDate.getDate()
  month = pivotDate.getMonth()
  year = pivotDate.getFullYear()
  m = month+1
  y = year
  if(m<3) {
      y -= 1
      m += 12
  }

  a = Math.floor(y/100.)
  b = 2-a+Math.floor(a/4.)
  if(y<1583) b = 0
  if(y==1582) {
      if(m>10)  b = -10
      if(m==10) {
          b = 0
          if(day>4) b = -10
      }
  }

  jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524

  b = 0
  if(jd>2299160){
      a = Math.floor((jd-1867216.25)/36524.25)
      b = 1+a-Math.floor(a/4.)
  }
  bb = jd+b+1524
  cc = Math.floor((bb-122.1)/365.25)
  dd = Math.floor(365.25*cc)
  ee = Math.floor((bb-dd)/30.6001)
  day =(bb-dd)-Math.floor(30.6001*ee)
  month = ee-1
  if(ee>13) {
      cc += 1
      month = ee-13
  }
  year = cc-4716


  wd = exports.gmod(jd+1,7)+1

  iyear = 10631./30.
  epochastro = 1948084
  epochcivil = 1948085

  shift1 = 8.01/60.

  z = jd-epochastro
  cyc = Math.floor(z/10631.)
  z = z-10631*cyc
  j = Math.floor((z-shift1)/iyear)
  iy = 30*cyc+j
  z = z-Math.floor(j*iyear+shift1)
  im = Math.floor((z+28.5001)/29.5)
  if(im==13) im = 12
  id = z-Math.floor(29.5001*im-29)

  var myRes = new Array(8)

  myRes[0] = day //calculated day (CE)
  myRes[1] = month-1 //calculated month (CE)
  myRes[2] = year //calculated year (CE)
  myRes[3] = jd-1 //julian day number
  myRes[4] = wd-1 //weekday number
  myRes[5] = id //islamic date
  myRes[6] = im-1 //islamic month
  myRes[7] = iy //islamic year

  return myRes
}

export function getIslamicDate(pivotDate) {
  let m = momenthijri(pivotDate)
  var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt")
  var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir",
  "Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban",
  "Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja")
  var outputIslamicDate = //wdNames[iDate[4]] + ", " +
  m.format('iD') + " " + iMonthNames[m.format('iM')-1] + " " + m.format('iYYYY')
  return outputIslamicDate
}
/*
* konversi 01:00 pm ke 13:00
*/
export function get24HourFormat(time) {
  let output = time.split(' ')
  if(output[1] === 'am') {
    return exports.normalizeTime(output[0])
  } else {
    let times = output[0].split(':')
    let newHour = Number(times[0]) < 12 ? Number(times[0]) + 12 : times[0]
    return exports.normalizeTime(newHour+':'+times[1])
  }
}

// konversi nama hari ke nomor urut hari nya Date
export function getDayNumberOfWeek(dayOfWeek) {
  switch(dayOfWeek) {
    case 'Sunday': case 'Minggu':
      return 0
      break
    case 'Monday': case 'Senin':
      return 1
      break
    case 'Tuesday': case 'Selasa':
      return 2
      break
    case 'Wednesday': case 'Rabu':
      return 3
      break
    case 'Thursday': case 'Kamis':
      return 4
      break
    case 'Friday': case 'Jumat': case "Jum'at":
      return 5
      break
    case 'Saturday': case 'Sabtu':
      return 6
      break
    default:
      return 0
      break
  }
}

/*
* mencari semua tanggal untuk nama hari yg telah ditentukan
* dengan jangka waktu yg ditentukan dari tgl mulai sampai tgl selesai
*/
export function getDatesOfDay(dayOfWeek, dateStart, dateEnd) {
  let x = dateStart
  let y = dateEnd
  let j = 1
  let output = []
  for (let i = 0; x < y; i += j) {
    if (x.getDay() === exports.getDayNumberOfWeek(dayOfWeek)) {

      let year = x.getFullYear()
      let month = (x.getMonth() + 1) < 10 ? '0'+(x.getMonth() + 1) : (x.getMonth() + 1)
      let day = x.getDate() < 10 ? '0'+x.getDate() : x.getDate()
      let fullDate = year + '-' + month + '-' + day
      output.push(fullDate)

      x.setDate(x.getDate() + 1)
      j = 7
    } else {
      j = 1
      x.setDate(x.getDate() + 1)
    }
  }
  return output
}

// cek apa input betul berformat date atau tidak
export function isDate(date) {
  return date instanceof Date && !isNaN(date.valueOf())
}

/*
* cari tanggal pertama dari bulan berdasar input tanggal
* input dan output bertipe native Date
*/
export function getFirstDayOfMonth(date) {
  if(!exports.isDate(date)) return null
  return moment(date).startOf('month').toDate()
}

/*
* cari tanggal terakhir dari bulan berdasar input tanggal
* input dan output bertipe native Date
*/
export function getLastDayOfMonth(date) {
  if(!exports.isDate(date)) return null
  return moment(date).endOf('month').toDate()
}

// generate data utk menampilkan tanggal utk komponen react-native-picker
export function generateDateForPicker(minYear, maxYear) {
  let date = []
  let min = minYear ? minYear : 1950
  let max = maxYear ? maxYear : 2020
  for(let i=min;i<max;i++){
      let month = []
      for(let j = 1;j<13;j++){
          let day = []
          if(j === 2){
              for(let k=1;k<29;k++){
                  day.push(k)
              }
              if(i%4 === 0){
                  day.push(29)
              }
          }
          else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
              for(let k=1;k<32;k++){
                  day.push(k)
              }
          }
          else{
              for(let k=1;k<31;k++){
                  day.push(k)
              }
          }
          let _month = {}
          _month[exports.translateMonthIndex(j)] = day
          month.push(_month)
      }
      let _date = {}
      _date[i] = month
      date.push(_date)
  }
  return date
}

// konversi waktu dalam millisecond ke menit dan detik
export function millisecondToTime(time) {
  let minutes = moment.duration(time).minutes()
  let seconds = moment.duration(time).seconds()
  return (minutes < 10 ? '0' + minutes : minutes)
         + ':' +
         (seconds < 10 ? '0' + seconds : seconds)
}
