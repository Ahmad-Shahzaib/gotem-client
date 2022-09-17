import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { getMissionInfo } from '@/http/missionsAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import MissionPageSideBarPrivate from '@/components/Pages/Missions/MissionPage/MissionPageSideBarPrivate';
import MissionPageSideBarCrowdfund from '@/components/Pages/Missions/MissionPage/MissionPageSideBarCrowdfund';
import MissionPageContent from '@/components/Pages/Missions/MissionPage/MissionPageContent';

const Index = () => {
	const router = useRouter();
	const { id } = router.query;
	const [mission, setMission] = useState({});
	const [fetch, setFetch] = useState(false);
	const zoom = 5;

	useEffect(() => {
		const fetchMission = async () => {
			setFetch(true);
			try {
				if (id) {
					const missionData = await getMissionInfo(id);
					setMission(missionData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchMission();
	}, [id]);

	return (
		<section className="case-item">
			<MWT_Container fluid className="px-0">
				{fetch && (
					<MWT_Row>
						<MWT_Col>
							<CustomLoader />
						</MWT_Col>
					</MWT_Row>
				)}
				{!fetch && Object.keys(mission).length > 0 && (
					<MWT_Row className="mx-0">
						<MWT_Col xxl={10} xl={9} className="py-30 px-30 py-xxl-55 px-xxl-55">
							<MissionPageContent mission={mission} />
						</MWT_Col>
						<MWT_Col
							xxl={2}
							xl={3}
							className="ls py-30 px-30 py-xxl-55 px-xxl-35 border-xl-left"
						>
							{mission.missionTypeId === 1 && (
								<MissionPageSideBarPrivate mission={mission} />
							)}
							{mission.missionTypeId === 2 && (
								<MissionPageSideBarCrowdfund mission={mission} />
							)}
						</MWT_Col>
					</MWT_Row>
				)}
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
