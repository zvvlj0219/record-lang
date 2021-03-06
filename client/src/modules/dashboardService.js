import axios from 'axios';

const url = 'api/v1/dashboard';

class DashboardService {
  //get record
  static getRecord(){
    const  promiseExecutor = async ()=>{
      const res = await axios.get(url);
      const data = await res.data;
      return data;
    }
    return promiseExecutor();
  }
  //aggregate data for weekly
  static aggregate_weekly(data){
    const weekly_records = [];
    
    for(let i=0;i<7;i++){
      let object = new Object;
      object.day = i;
      object.study_time = 0;
      weekly_records[i] = object;
    }
    
    data.forEach(el=>{
      let day = new Date(el.timestamps).getDay();//曜日
      weekly_records[day].study_time += el.study_time;
    });
    return weekly_records;
  }
  //aggregate data for today
  static aggregate_today(data){
    //array
    let arr1 = [];
    let loopkey = [];
    let today_records = [];
    
    //今日の分のデータを抽出
    arr1 = data.filter(element=>{
      let dt = new Date();
      let today_year = dt.getFullYear();
      let today_month = dt.getMonth();
      let today_date = dt.getDate();
      let today = `${today_year}-${today_month}-${today_date}`;
      let jd = new Date(element.timestamps)
      let judgeday_year = jd.getFullYear();
      let judgeday_month = jd.getMonth();
      let judgeday_date = jd.getDate();
      let judgeday = `${judgeday_year}-${judgeday_month}-${judgeday_date}`;
      return today == judgeday;
    });

    //配列比較
    //同じ言語は時間を追加する
    arr1.forEach((element,index)=>{
      let lang = element.language;
      if(loopkey.indexOf(lang) == -1){
        loopkey.push(lang)
        today_records.push({
          id:index,
          language:element.language,
          study_time:element.study_time
        })
      }else{
        const duplicatedIndex = loopkey.indexOf(lang);
        const presentIndex = index;
        today_records[duplicatedIndex].study_time += arr1[presentIndex].study_time;
      }
    })
    console.log(today_records);
    return today_records;
  }
}

export default DashboardService;