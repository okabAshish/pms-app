import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {TenantDashboardRecentActivity} from '../../features/types';

dayjs.extend(relativeTime);

interface Activity {
  message: string;
  created_at: string;
}

interface Activities extends Array<Activity> {}

interface Props {
  activity: Activities;
}

const DashboardRecentActivities = (props: Props) => {
  const [demoData, setDemoData] = useState<Activities>([]);

  if (props.activity) {
    const arrayRearrange = (a: TenantDashboardRecentActivity) => {
      let arr: Activities = [];

      for (let i = 0; i < a.length; i++) {
        arr.push({
          message: a[i].notification_message,
          created_at: a[i]?.created_at,
        });
      }

      // console.log(arr);

      setDemoData(arr);
    };

    useEffect(() => {
      arrayRearrange(props.activity);
    }, []);

    return (
      <View>
        <View style={{marginTop: 20, marginBottom: 15}}>
          <Text
            style={{color: '#000', fontSize: 16, fontFamily: 'Poppins-Medium'}}>
            Recent Activities
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#f3f3f3',
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 12,
          }}>
          {demoData.map((item, index) => (
            <View
              style={{flexDirection: 'row', alignItems: 'center'}}
              key={index + item?.message}>
              <View
                style={{
                  backgroundColor: '#45485F',
                  padding: 6,
                  borderRadius: 5,
                }}>
                <FontAwesomeIcon icon={faUser} color="#fff" />
              </View>

              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  backgroundColor: '#00ABE4',
                  marginHorizontal: 12,
                  alignSelf: 'flex-start',
                }}></View>

              <View>
                <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                  {item?.message}
                </Text>
                <Text
                  style={{
                    color: 'rgba(0, 41, 102, 0.5)',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                  }}>
                  {dayjs().to(dayjs(item?.created_at).format())}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
};

export default DashboardRecentActivities;
