import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, TagGroup } from 'rsuite';
import dateHelpers from '@/helpers/dateHelpers';
import WaterDropIcon from '@/components/Svg/WaterDropIcon';
import More from '@/components/UI/More';
import CustomRate from '@/components/UI/CustomRate';
import { useDispatch, useSelector } from 'react-redux';
import { AddToFavoritesMission } from '@/http/missionsAPI';
import { updateUserAction } from '@/store/user/action';
import CustomNotice from '@/components/UI/CustomNotice';
import ReportModal from '@/components/Modals/ReportModal';
import MissionItemContent from '@/components/Pages/Missions/MissionItemContent';
import MissionItemAuthor from '@/components/Pages/Missions/MissionItemAuthor';

const MissionsItem = ({ mission }) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [modalShow, setModalShow] = useState(false);

	const isBooked = useMemo(() => {
		if (Object.keys(currentUser).length > 0) {
			return currentUser.missionBookmarks.some((el) => el.missionId === mission.id);
		}
		return false;
	}, [currentUser, mission]);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const addToFavoritesHandler = async () => {
		try {
			const missionBookmarks = await AddToFavoritesMission(mission.id);
			dispatch(updateUserAction({ missionBookmarks }));
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<>
			<ReportModal
				modalShow={modalShow}
				user={mission.user}
				handlerModalClose={handlerModalClose}
			/>
			<div className="case-item bordered ls">
				<div className="content">
					<div className="d-flex d-wrap">
						<Link
							href={`/dashboard-source/${currentUser.slug}/mission-catalog/${mission.id}`}
						>
							<a className="mr-auto pr-15 mb-20">
								<h4 className="fw-400 fs-18 links-darkColor d-inline-block">
									{mission.title}
								</h4>
							</a>
						</Link>
						<div className="fs-18 mb-20 cursor-pointer">
							<i
								className="ico-Flag mr-15 links-darkColor"
								onClick={handlerModalShow}
							/>
							<i
								className={`links-darkColor ${
									isBooked ? 'ico-Heart1' : 'ico-Heart'
								}`}
								onClick={addToFavoritesHandler}
							/>
						</div>
					</div>
					<MissionItemContent mission={mission} />
				</div>
				<div className="content">
					<MissionItemAuthor user={mission.user} />
				</div>
			</div>
		</>
	);
};

export default MissionsItem;
