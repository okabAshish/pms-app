import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import DashBoardNavBar from '../../components/DashBoardNavBar/DashBoardNavBar';
import DashBoardRevenueOverView from '../../components/DashBoardRevenueOverView/DashBoardRevenueOverView';
import DashboardAmountReport from '../../components/DashboardAmountReport/DashboardAmountReport';
import DashboardReacentTransaction from '../../components/DashboardReacentTransaction/DashboardReacentTransaction';
import DashboardRecentActivities from '../../components/DashboardRecentActivities/DashboardRecentActivities';
import DashboardReport from '../../components/DashboardReport/DashboardReport';
import DashboardTaskSummary from '../../components/DashboardTaskSummary/DashboardTaskSummary';

import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {
  useOwnerDashboardMutation,
  useTenantDashboardMutation,
} from '../../features/auth/auth';
import {OwnerDashBoardData, TenantDashboardData} from '../../features/types';

type Props = {};

const DashboardScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [tenantDashboardData, setTenantDashboardData] =
    useState<TenantDashboardData>();
  const [ownerDashboardData, setOwnerDashboardData] =
    useState<OwnerDashBoardData>();

  const [getOwnerDashboardData] = useOwnerDashboardMutation();
  const [getTenantDashboardData] = useTenantDashboardMutation();

  const getAllDashboardData = async () => {
    setLoading(true);
    try {
      // const role_id = await AsyncStorage.getItem('role_id');

      const role_id = '2';

      if (role_id === '2') {
        await getOwnerDashboardData({})
          .unwrap()
          .then(res => {
            if (res.success) {
              setOwnerDashboardData(res.data);

              console.log(res.data);
            }
          });
      } else {
        await getTenantDashboardData({})
          .unwrap()
          .then(res => {
            if (res.success) {
              setTenantDashboardData(res.data);

              console.log(res.data);
            }
          });
      }
    } catch (err) {
      console.log(err, '<<<<<<<<<<Dashboard Error');
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllDashboardData();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <DashBoardNavBar />
        <DashboardReport
          key={'Report'}
          total_properties={ownerDashboardData?.total_properties}
          total_invitaion={ownerDashboardData?.total_invitation_sent}
          rented={ownerDashboardData?.total_rented}
        />
        <DashBoardRevenueOverView />
        <DashboardAmountReport
          dueAmount={ownerDashboardData?.total_due_revenue}
          paidAmount={ownerDashboardData?.total_revenue}
        />
        <DashboardReacentTransaction
          trasactions={ownerDashboardData?.recent_transaction}
        />
        <DashboardTaskSummary
          completed={ownerDashboardData?.task_summary.completed}
          work_in_progress={ownerDashboardData?.task_summary?.work_in_progress}
          new={ownerDashboardData?.task_summary?.new}
        />
        <DashboardRecentActivities
          activity={ownerDashboardData?.recent_activity}
        />
        <View style={{marginTop: 100}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
