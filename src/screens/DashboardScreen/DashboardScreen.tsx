import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import DashBoardRevenueOverView from '../../components/DashBoardRevenueOverView/DashBoardRevenueOverView';
import DashboardAmountReport from '../../components/DashboardAmountReport/DashboardAmountReport';
import DashboardReacentTransaction from '../../components/DashboardReacentTransaction/DashboardReacentTransaction';
import DashboardRecentActivities from '../../components/DashboardRecentActivities/DashboardRecentActivities';
import DashboardReport from '../../components/DashboardReport/DashboardReport';
import DashboardTaskSummary from '../../components/DashboardTaskSummary/DashboardTaskSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*Tenant*/ 
import TenantDashboardReport from '../../components/Tenant/TenantDashboardReport/TenantDashboardReport';
import TenantDashboardTransaction from '../../components/Tenant/TenantDashboardTransaction/TenantDashboardTransaction';
import TenantDashboardTaskSummary from '../../components/Tenant/TenantDashboardTaskSummary/TenantDashboardTaskSummary';
import TenantDashboardActivities from '../../components/Tenant/TenantDashboardActivities/TenantDashboardactivities';

import LoadingModal from '../../components/LoadingModal/LoadingModal';
import {
  useOwnerDashboardMutation,
  useTenantDashboardMutation,
} from '../../features/auth/auth';
import {OwnerDashBoardData, TenantDashboardData} from '../../features/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {};

const DashboardScreen = (props: Props) => {

  const auth = useSelector<RootState>(state=>state.auth)

  const [loading, setLoading] = useState(false);
  const [tenantDashboardData, setTenantDashboardData] =
    useState<TenantDashboardData>();
  const [ownerDashboardData, setOwnerDashboardData] =
    useState<OwnerDashBoardData>();

  const [userRole, setUserRole] = useState(2);
  const [getOwnerDashboardData] = useOwnerDashboardMutation();
  const [getTenantDashboardData] = useTenantDashboardMutation();

  const getAllDashboardData = async () => {
    setLoading(true);
    try {

      
      console.log('roleId',JSON.parse(auth.user).user_details.role_id);


      const role_id = JSON.parse(auth.user).user_details.role_id;
      setUserRole(role_id);
      if (role_id === 2) {
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
          {userRole==2 ? (<>
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
        </> ) : (<>
          <TenantDashboardReport
            key={'Report'}
            total_invitations= {tenantDashboardData?.total_invitations}
            total_contracts= {tenantDashboardData?.total_contracts}
            rented_property= {tenantDashboardData?.rented_property}
          />  
          <DashBoardRevenueOverView />
          <TenantDashboardTransaction
              trasactions={tenantDashboardData?.transactions}
            />
          <TenantDashboardTaskSummary
              completed={tenantDashboardData?.task_summary.completed}
              work_in_progress={tenantDashboardData?.task_summary?.work_in_progress}
              new={tenantDashboardData?.task_summary?.new}
            />
          <TenantDashboardActivities
              activity={tenantDashboardData?.recent_activity}
            />
        </>
        )}
        <View style={{marginTop: 100}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
