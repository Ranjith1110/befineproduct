import MyParentRecordsCom from '../../components/dependent/my-parent-records/MyParentRecordsCom'
import { DependentLayout } from '../../layouts/DependentLayout'

const MyParentRecords = () => {
  return (
    <DependentLayout>
        <MyParentRecordsCom />
    </DependentLayout>
  )
}

export default MyParentRecords
